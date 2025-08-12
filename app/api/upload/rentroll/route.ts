import { NextResponse } from "next/server";
import Papa from "papaparse";
import { prisma } from "@/src/lib/prisma";

export const runtime = "nodejs";

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
    
    const units = parsed.data as any[];
    if (units.length === 0) {
      return new NextResponse("No data found in CSV", { status: 400 });
    }
    
    // Calculate aggregates
    const aggregates = {
      total_units: units.length,
      occupied_units: units.filter(u => 
        String(u.Status || u.status || "").toLowerCase().includes("occ")
      ).length,
      total_balance: units.reduce((s, u) => 
        s + (Number(u.Balance || u.balance || 0)), 0
      ),
      total_market_rent: units.reduce((s, u) => 
        s + (Number(u["Market Rent"] || u.market_rent || 0)), 0
      ),
      total_actual_rent: units.reduce((s, u) => 
        s + (Number(u["Current Rent"] || u.actual_rent || 0)), 0
      ),
    };
    
    // Get first property for demo
    const property = await prisma.property.findFirst();
    if (!property) {
      return new NextResponse("No property found", { status: 400 });
    }
    
    await prisma.rentRollSnapshot.create({
      data: { 
        propertyId: property.id, 
        date: new Date(), 
        units: units,
        aggregates 
      }
    });
    
    console.log(`📊 Rent roll uploaded: ${units.length} units processed`);
    
    return new NextResponse(
      `✅ Rent roll uploaded successfully! Processed ${units.length} units with ${aggregates.occupied_units} occupied (${Math.round(aggregates.occupied_units/aggregates.total_units*100)}% occupancy).`
    );
  } catch (error) {
    console.error("Rent roll upload error:", error);
    return new NextResponse("Upload failed: " + error, { status: 500 });
  }
}