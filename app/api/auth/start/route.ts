import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { randomBytes } from "crypto";
import { sendEmail } from "@/src/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return new NextResponse("Email required", { status: 400 });
    
    // Find or create a company for demo
    let company = await prisma.company.findFirst();
    if (!company) {
      company = await prisma.company.create({ 
        data: { name: "Demo Company" }
      });
    }
    
    // Find or create user
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { 
          email, 
          displayName: email.split("@")[0], 
          companyId: company.id 
        }
      });
    }

    // Create session token
    const token = randomBytes(24).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes
    
    await prisma.session.create({ 
      data: { 
        userId: user.id, 
        token, 
        expiresAt: expires 
      }
    });

    // Send magic link
    const baseUrl = process.env.APP_BASE_URL || "http://localhost:3000";
    const link = `${baseUrl}/api/auth/verify?token=${token}`;
    
    await sendEmail(
      email, 
      "Your OverseeNOI magic link", 
      `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Sign in to OverseeNOI</h2>
          <p>Click the link below to sign in to your account:</p>
          <p style="margin: 20px 0;">
            <a href="${link}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              Sign in to OverseeNOI
            </a>
          </p>
          <p style="color: #666; font-size: 14px;">
            This link will expire in 15 minutes. If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `
    );
    
    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("Auth start error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}