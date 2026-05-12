"use client";

import { useState, useEffect } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  // ✅ Fetch all images
  const fetchImages = async () => {
    try {
      const res = await fetch("/api/test");
      const result = await res.json();

      // handle both formats (with or without success wrapper)
      setImages(result.data || result);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    setLoading(true);

    try {
      // 1️⃣ Upload to S3
      const formData = new FormData();
      formData.append("image", file);

      const uploadRes = await fetch("/api/test/upload-image", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.url) throw new Error("Upload failed");

      // 2️⃣ Save to MongoDB
      await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name || "Untitled",
          imageUri: uploadData.url,
        }),
      });

      // 3️⃣ Refresh gallery
      await fetchImages();

      // Reset form
      setFile(null);
      setName("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 text-center">Upload Image 🚀</h1>

      {/* Upload Section */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Enter image name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* ✅ Image Grid */}
      {images.length === 0 ? (
        <p className="text-center text-gray-500">No images found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((item) => (
            <div
              key={item._id}
              className="border rounded overflow-hidden shadow-sm"
            >
              <img
                src={item.imageUri}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
              <p className="text-sm text-center p-2 font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
