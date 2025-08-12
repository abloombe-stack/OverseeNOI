import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const channelId = req.nextUrl.searchParams.get("channelId");
    if (!channelId) return NextResponse.json([]);
    
    const tasks = await prisma.task.findMany({
      where: { channelId },
      include: { 
        assignee: { select: { displayName: true } },
        createdBy: { select: { displayName: true } }
      },
      orderBy: [
        { priority: "desc" },
        { createdAt: "desc" }
      ]
    });
    
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Tasks GET error:", error);
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Get a default user for demo
    const defaultUser = await prisma.user.findFirst();
    if (!defaultUser) {
      return new NextResponse("No users found", { status: 400 });
    }
    
    const task = await prisma.task.create({
      data: {
        channelId: body.channelId,
        title: body.title || "Untitled Task",
        description: body.description || "",
        priority: body.priority || "MEDIUM",
        createdById: defaultUser.id,
        assigneeId: body.assigneeId || defaultUser.id,
        tags: body.tags || []
      },
      include: { 
        assignee: { select: { displayName: true } },
        createdBy: { select: { displayName: true } }
      }
    });
    
    return NextResponse.json(task);
  } catch (error) {
    console.error("Tasks POST error:", error);
    return new NextResponse("Failed to create task", { status: 500 });
  }
}