import { NextResponse } from "next/server";
import Papa from "papaparse";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return new NextResponse("No file provided", { status: 400 });
    
    const text = await file.text();
    const parsed = Papa.parse(text, { 
      header: true, 
      dynamicTyping: true, 
      skipEmptyLines: true 
    });
    
    const comps = parsed.data as any[];
    if (comps.length === 0) {
      return new NextResponse("No data found in CSV", { status: 400 });
    }
    
    // Get first property for demo
    const property = await prisma.property.findFirst();
    if (!property) {
      return new NextResponse("No property found", { status: 400 });
    }
    
    await prisma.compSnapshot.create({
      data: { 
        propertyId: property.id, 
        date: new Date(), 
        comps 
      }
    });
    
    console.log(`🏢 Competitor data uploaded: ${comps.length} records processed`);
    
    return new NextResponse(
      `✅ Competitor data uploaded successfully! Processed ${comps.length} competitor records.`
    );
  } catch (error) {
    console.error("Competitor upload error:", error);
    return new NextResponse("Upload failed: " + error, { status: 500 });
  }
}