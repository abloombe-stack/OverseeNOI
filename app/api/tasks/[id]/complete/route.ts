import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { postToSlack } from "@/src/lib/slack";

export async function POST(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const task = await prisma.task.update({
      where: { id: params.id },
      data: { status: "COMPLETED" },
      include: { channel: { include: { property: true } } }
    });
    
    // Get a default user for system message
    const defaultUser = await prisma.user.findFirst();
    if (defaultUser) {
      await prisma.message.create({
        data: { 
          taskId: task.id, 
          authorId: defaultUser.id, 
          content: "✅ Task completed successfully.", 
          isSystem: true 
        }
      });
    }
    
    // Post to Slack
    await postToSlack(`Task completed: ${task.title} in ${task.channel.property.name}`);
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Task complete error:", error);
    return new NextResponse("Failed to complete task", { status: 500 });
  }
}