// app/api/tests/route.js
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Test from "@/models/Test";

// ✅ GET ALL IMAGES
export async function GET() {
  try {
    await connectDB();

    const data = await Test.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("❌ GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch data",
        data: [],
      },
      { status: 500 },
    );
  }
}

// ✅ CREATE NEW IMAGE ENTRY
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, imageUri } = body;

    // ❌ Validation
    if (!imageUri) {
      return NextResponse.json(
        { success: false, message: "imageUri is required" },
        { status: 400 },
      );
    }

    // ✅ Create document
    const created = await Test.create({
      name: name || "Untitled",
      imageUri,
    });

    return NextResponse.json({
      success: true,
      message: "Saved successfully",
      data: created,
    });
  } catch (error) {
    console.error("❌ POST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save data",
      },
      { status: 500 },
    );
  }
}
