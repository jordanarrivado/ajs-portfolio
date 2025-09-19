import mongoose, { Schema, Document } from "mongoose";

// Each message has role + content
export interface ChatMessage {
  role: string;
  content: string;
}

export interface IChatLog extends Document {
  userAgent: string;
  device: Record<string, unknown>; 
  messages: ChatMessage[];
  aiResponse: string;
  personality?: string;
  timestamp: string;
}

// Schema for ChatMessage
const ChatMessageSchema = new Schema<ChatMessage>(
  {
    role: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false } // Disable _id for subdocuments
);

const ChatLogSchema = new Schema<IChatLog>(
  {
    userAgent: { type: String, required: true },
    device: { type: Schema.Types.Mixed, required: true }, // Use Mixed for dynamic objects
    messages: {
      type: [ChatMessageSchema],
      required: true,
      validate: {
        validator: (v: unknown): v is ChatMessage[] =>
          Array.isArray(v) && v.length > 0,
        message: "Messages must be a non-empty array",
      },
    },
    aiResponse: { type: String, required: true },
    personality: { type: String },
    timestamp: { type: String, required: true },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

// Remove existing model to avoid overwrite errors
if (mongoose.models.ChatLog) {
  delete mongoose.models.ChatLog;
}

export const ChatLog = mongoose.model<IChatLog>("ChatLog", ChatLogSchema);
