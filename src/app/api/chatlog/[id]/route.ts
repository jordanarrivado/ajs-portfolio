import { NextRequest, NextResponse } from "next/server";
import { ChatLog } from "@/models/ChatLog";
import { connectDB } from "@/lib/db";

// GET specific chat log by ID
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Chat log ID is required" },
        { status: 400 }
      );
    }

    const chatLog = await ChatLog.findById(id).lean();

    if (!chatLog) {
      return NextResponse.json(
        { success: false, error: "Chat log not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: chatLog,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("ChatLog GET by ID error:", message);

    return NextResponse.json(
      {
        success: false,
        error: message || "Failed to fetch chat log",
      },
      { status: 500 }
    );
  }
}

// DELETE specific chat log by ID
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Chat log ID is required" },
        { status: 400 }
      );
    }

    const deletedChatLog = await ChatLog.findByIdAndDelete(id);

    if (!deletedChatLog) {
      return NextResponse.json(
        { success: false, error: "Chat log not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Chat log deleted successfully",
      data: deletedChatLog,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("ChatLog DELETE error:", message);

    return NextResponse.json(
      {
        success: false,
        error: message || "Failed to delete chat log",
      },
      { status: 500 }
    );
  }
}
