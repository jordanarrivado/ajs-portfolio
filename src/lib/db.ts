import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "❌ Please define the MONGODB_URI environment variable inside Vercel or .env.local"
  );
}

// Now TS knows this is a string
const MONGODB_URI_STRING: string = MONGODB_URI;

// Type for the cached connection
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend global to include mongoose cache
declare global {
  var mongoose: MongooseCache | undefined;
}

// Initialize global cache if it doesn't exist
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🔗 Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI_STRING, {
      dbName: "portfolio_chat",
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: false, // only true for local testing
      serverSelectionTimeoutMS: 10000,
    }).then((mongooseInstance) => {
      console.log(`✅ MongoDB Connected: ${mongooseInstance.connection.host}`);
      return mongooseInstance;
    }).catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
