import { NextRequest, NextResponse } from "next/server";
import { ChatLog } from "@/models/ChatLog";
import { connectDB } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get('days') || '30'); // Default to last 30 days

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    // Convert to Philippine time strings for comparison
    const startDateStr = startDate.toLocaleString('en-PH');
    const endDateStr = endDate.toLocaleString('en-PH');

    const filter = {
      timestamp: {
        $gte: startDateStr,
        $lte: endDateStr
      }
    };

    // Total conversations
    const totalConversations = await ChatLog.countDocuments(filter);

    // Personality breakdown
    const personalityStats = await ChatLog.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$personality",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Browser breakdown
    const browserStats = await ChatLog.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$device.browser.name",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 } // Top 10 browsers
    ]);

    // OS breakdown
    const osStats = await ChatLog.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$device.os.name",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 } // Top 10 OS
    ]);

    // Device type breakdown
    const deviceStats = await ChatLog.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$device.device.type", null] },
              then: "Desktop",
              else: "$device.device.type"
            }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Daily activity (last 7 days)
    const dailyActivity = await ChatLog.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $dateFromString: {
                  dateString: "$timestamp"
                }
              }
            }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 7 }
    ]);

    // Average message length
    const messageLengthStats = await ChatLog.aggregate([
      { $match: filter },
      {
        $unwind: "$messages"
      },
      {
        $group: {
          _id: null,
          avgLength: { $avg: { $strLenCP: "$messages.content" } },
          totalMessages: { $sum: 1 }
        }
      }
    ]);

    return NextResponse.json({
      success: true,
      dateRange: {
        start: startDateStr,
        end: endDateStr,
        days: days
      },
      analytics: {
        totalConversations,
        personalityBreakdown: personalityStats,
        browserBreakdown: browserStats,
        osBreakdown: osStats,
        deviceBreakdown: deviceStats,
        dailyActivity: dailyActivity.reverse(), // Show oldest to newest
        messageStats: messageLengthStats[0] || { avgLength: 0, totalMessages: 0 }
      }
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("ChatLog Analytics error:", message);
    console.error("Full error:", err);
    
    return NextResponse.json(
      { 
        success: false,
        error: message || "Failed to fetch analytics" 
      }, 
      { status: 500 }
    );
  }
}