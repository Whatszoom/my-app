"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-2xl font-bold">Mahadev Page Gydium</h1>

      <button
        onClick={() => router.push("/upload")}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Go to Upload Page 🚀
      </button>
    </div>
  );
}
