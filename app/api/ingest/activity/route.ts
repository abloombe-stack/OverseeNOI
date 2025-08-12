import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { sha256 } from "@/src/lib/crypto";

export async function POST(req: NextRequest) {
  try {
    const { events } = await req.json();
    if (!Array.isArray(events)) {
      return new NextResponse("Invalid events format", { status: 400 });
    }

    // Process and sanitize events
    const rows = events.slice(0, 200).map((e: any) => ({
      userHash: e.userId ? sha256(e.userId) : sha256("anonymous"),
      recordIdHash: e.recordId ? sha256(e.recordId) : null,
      pms: e.context?.pms || "unknown",
      url: (e.context?.url || "").substring(0, 500), // Limit URL length
      action: e.type || "event",
      success: e.success !== false,
      duration: typeof e.duration === "number" ? e.duration : null,
      metadata: e.context || {}
    }));

    // Batch insert events
    for (const row of rows) {
      try {
        await prisma.activityEvent.create({ data: row });
      } catch (error) {
        console.error("Failed to insert activity event:", error);
        // Continue with other events
      }
    }
    
    console.log(`📊 Ingested ${rows.length} activity events`);
    
    return NextResponse.json({ 
      ok: true, 
      count: rows.length,
      message: `Successfully ingested ${rows.length} events`
    });
  } catch (error) {
    console.error("Activity ingest error:", error);
    return new NextResponse("Ingestion failed", { status: 500 });
  }
}