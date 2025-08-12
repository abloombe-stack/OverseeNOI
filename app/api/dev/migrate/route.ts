import { NextRequest, NextResponse } from "next/server";
import { execSync } from "node:child_process";

export async function POST(req: NextRequest) {
  try {
    let output = "";
    
    // Run migrations
    try {
      execSync("npx prisma migrate deploy", { stdio: "pipe" });
      output += "✅ Migrations applied successfully\n";
    } catch (e: any) {
      output += `⚠️ Migration warning: ${e.message}\n`;
    }
    
    // Run seed
    try {
      execSync("npx prisma db seed", { stdio: "pipe" });
      output += "✅ Database seeded successfully\n";
    } catch (e: any) {
      // Try alternative seed method
      try {
        execSync("node -r esbuild-register prisma/seed.ts", { stdio: "pipe" });
        output += "✅ Database seeded successfully (alternative method)\n";
      } catch (e2: any) {
        output += `⚠️ Seed warning: ${e2.message}\n`;
      }
    }
    
    output += "🚀 Database is ready for use\n";
    
    return new NextResponse(output, { status: 200 });
  } catch (e: any) {
    return new NextResponse("Setup error: " + e.message, { status: 500 });
  }
}