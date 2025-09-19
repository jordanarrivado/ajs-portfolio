import mongoose from "mongoose";

// Get MongoDB URI from env
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error(
    "❌ Please define the MONGODB_URI environment variable inside Vercel or .env.local"
  );
}

// Now `uri` is definitely a string
const MONGODB_URI: string = uri;

// Type for the cached connection
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend global to include mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Initialize global cache if it doesn't exist
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log("🔗 Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "portfolio_chat",
        ssl: true,
        tls: true,
        tlsAllowInvalidCertificates: false,
        serverSelectionTimeoutMS: 10000,
      })
      .then((mongooseInstance) => {
        console.log(`✅ MongoDB Connected: ${mongooseInstance.connection.host}`);
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
