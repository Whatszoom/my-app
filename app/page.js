"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-green-950 px-6">
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] h-72 w-72 rounded-full bg-green-500/20 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-xl">
        {/* Logo Circle */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-3xl shadow-lg shadow-green-500/30">
          🚀
        </div>

        {/* Title */}
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white">
          Mahadev Page
        </h1>

        {/* Subtitle */}
        <p className="mb-8 text-sm leading-relaxed text-zinc-300">
          Modern upload experience with smooth UI, clean animations, and premium
          glassmorphism design.
        </p>

        {/* Button */}
        <button
          onClick={() => router.push("/upload")}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/30 active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-2">
            Go to Upload Page
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              🚀
            </span>
          </span>

          {/* Shine Effect */}
          <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
        </button>
      </div>
    </main>
  );
}
