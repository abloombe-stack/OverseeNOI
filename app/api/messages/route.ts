import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { postToSlack } from "@/src/lib/slack";

export async function GET(req: NextRequest) {
  try {
    const taskId = req.nextUrl.searchParams.get("taskId");
    const channelId = req.nextUrl.searchParams.get("channelId");
    
    if (taskId) {
      const msgs = await prisma.message.findMany({
        where: { taskId },
        include: { author: { select: { displayName: true } } },
        orderBy: { createdAt: "asc" }
      });
      return NextResponse.json(msgs);
    }
    
    if (channelId) {
      const msgs = await prisma.message.findMany({
        where: { channelId },
        include: { author: { select: { displayName: true } } },
        orderBy: { createdAt: "desc" },
        take: 50
      });
      return NextResponse.json(msgs);
    }
    
    return NextResponse.json([]);
  } catch (error) {
    console.error("Messages GET error:", error);
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { taskId, channelId, content } = await req.json();
    
    if (!content?.trim()) {
      return new NextResponse("Content required", { status: 400 });
    }
    
    // Get default user for demo
    const user = await prisma.user.findFirst();
    if (!user) {
      return new NextResponse("No user found", { status: 400 });
    }
    
    const msg = await prisma.message.create({
      data: { 
        taskId: taskId || null,
        channelId: channelId || null,
        authorId: user.id, 
        content: content.trim()
      },
      include: { author: { select: { displayName: true } } }
    });
    
    // Post to Slack
    const context = taskId ? `task ${taskId}` : `channel ${channelId}`;
    await postToSlack(`New message on ${context}: ${content}`);
    
    return NextResponse.json(msg);
  } catch (error) {
    console.error("Messages POST error:", error);
    return new NextResponse("Failed to send message", { status: 500 });
  }
}