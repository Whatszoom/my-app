import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add MONGODB_URI in .env.local");
}

// Global cache for MongoDB connection (to prevent multiple connections in dev)
let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((m) => {
      console.log("✅ MongoDB Connected (Mongoose)");
      return m;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
