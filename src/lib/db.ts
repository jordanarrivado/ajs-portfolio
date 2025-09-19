import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable inside .env.local");
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return mongoose.connection;
  }

  try {
    console.log("🔗 Connecting to MongoDB...");
    console.log(`🌐 URI: ${MONGODB_URI.replace(/\/\/.*@/, "//<credentials>@")}`); // hide creds

    const conn = await mongoose.connect(MONGODB_URI, {
      dbName: "portfolio_chat",
      ssl: true, // ensure TLS
      tls: true,
      tlsAllowInvalidCertificates: false, // set to true ONLY for local testing
      serverSelectionTimeoutMS: 10000, // fail fast if unreachable
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn.connection;
  } catch (err: unknown) {
    console.error("❌ MongoDB connection error:");

    if (err instanceof Error) {
      if (err.message.includes("tlsv1 alert internal error")) {
        console.error(
          "⚠️ TLS handshake failed. Check:\n" +
            "- Your Node.js version (must support TLS 1.2+)\n" +
            "- Your network/firewall/VPN settings\n" +
            "- Whether MongoDB Atlas is reachable from your machine"
        );
      }
      console.error(err.message);
      throw err;
    } else {
      // Fallback for non-Error throwables
      console.error(err);
      throw new Error("Unknown MongoDB connection error");
    }
  }
}
