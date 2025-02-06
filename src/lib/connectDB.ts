import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

declare global {
  var mongooseCache: MongooseCache;
}

// Use a global cache to prevent multiple connections in development mode
const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

export const connectDB = async (): Promise<mongoose.Connection> => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  global.mongooseCache = cached; // Store connection globally

  return cached.conn;
};
