// app/api/upload-image/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "@/lib/s3";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    // ❌ No file
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    // ❌ Validate type (only images)
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Only image files allowed" },
        { status: 400 },
      );
    }

    // ✅ Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // ✅ Safe filename (remove spaces & special chars)
    const safeName = file.name
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.-]/g, "");

    const fileName = `images/${Date.now()}-${safeName}`;

    // ❗ Ensure env exists
    if (!process.env.AWS_BUCKET_NAME || !process.env.AWS_REGION) {
      throw new Error("AWS environment variables missing");
    }

    // ✅ Upload to S3
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,

        // 🔥 IMPORTANT → make file public
        ACL: "public-read",
      }),
    );

    // ✅ Public URL
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    console.log("✅ Image uploaded successfully:", fileUrl);

    return NextResponse.json({
      success: true,
      url: fileUrl,
    });
  } catch (err: any) {
    console.error("❌ Upload Error:", err);

    return NextResponse.json(
      {
        success: false,
        error: err.message || "Upload failed",
      },
      { status: 500 },
    );
  }
}
