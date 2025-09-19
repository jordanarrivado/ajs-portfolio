import { NextRequest, NextResponse } from "next/server";
import { ChatLog, IChatLog } from "@/models/ChatLog";
import { FilterQuery } from "mongoose";
import { connectDB } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    
    // Query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const personality = searchParams.get('personality');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const userAgent = searchParams.get('userAgent');
    
    // Build filter object
    const filter: FilterQuery<IChatLog> = {};
    
    if (personality) {
      filter.personality = { $regex: personality, $options: 'i' }; // Case-insensitive search
    }
    
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) {
        filter.timestamp.$gte = startDate;
      }
      if (endDate) {
        filter.timestamp.$lte = endDate;
      }
    }
    
    if (userAgent) {
      filter.userAgent = { $regex: userAgent, $options: 'i' };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination info
    const totalCount = await ChatLog.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    // Fetch chat logs with pagination and sorting (newest first)
    const chatLogs = await ChatLog.find(filter)
      .sort({ timestamp: -1 }) // Sort by timestamp descending (newest first)
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() for better performance when you don't need full Mongoose documents

    // Calculate pagination metadata
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      success: true,
      data: chatLogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage,
        hasPrevPage,
        nextPage: hasNextPage ? page + 1 : null,
        prevPage: hasPrevPage ? page - 1 : null,
      },
      filter: {
        personality,
        startDate,
        endDate,
        userAgent,
      }
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("ChatLog GET error:", message);
    console.error("Full error:", err);
    
    return NextResponse.json(
      { 
        success: false,
        error: message || "Failed to fetch chat logs" 
      }, 
      { status: 500 }
    );
  }
}

// Optional: GET specific chat log by ID
export async function GET_BY_ID(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const { id } = params;

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
      data: chatLog
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("ChatLog GET by ID error:", message);
    
    return NextResponse.json(
      { 
        success: false,
        error: message || "Failed to fetch chat log" 
      }, 
      { status: 500 }
    );
  }
}