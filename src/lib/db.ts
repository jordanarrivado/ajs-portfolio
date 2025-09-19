// lib/chatdb.ts
import mongoose from "mongoose";
import { ChatLog as ChatLogModel, IChatLog } from "@/models/ChatLog";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("⚠️ Please define MONGODB_URI in Vercel or .env.local");
}

const uri: string = MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((m) => m);
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
}

// Fetch chat logs with optional filters and pagination
export async function fetchChatLogs(
  filter: Partial<Omit<IChatLog, "_id">> = {},
  limit?: number,
  skip?: number
): Promise<(IChatLog & { _id: string })[]> {
  await connectDB();

  const rawDocs = await ChatLogModel.find(filter)
    .limit(limit ?? 0)
    .skip(skip ?? 0)
    .sort({ timestamp: -1 })
    .lean();

  return rawDocs.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
  }));
}

// Optional: fetch single chat log by ID
export async function fetchChatLogById(id: string): Promise<(IChatLog & { _id: string }) | null> {
  await connectDB();

  const doc = await ChatLogModel.findById(id).lean();
  if (!doc) return null;

  return { ...doc, _id: doc._id.toString() };
}
