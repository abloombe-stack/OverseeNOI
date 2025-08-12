import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const props = await prisma.property.findMany({
      include: { 
        channels: {
          orderBy: { name: "asc" }
        }
      },
      orderBy: { name: "asc" }
    });
    
    return NextResponse.json({ properties: props });
  } catch (error) {
    console.error("Bootstrap error:", error);
    return NextResponse.json({ properties: [] });
  }
}