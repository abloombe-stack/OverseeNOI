import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { SignJWT } from "jose";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");
    if (!token) return new NextResponse("Missing token", { status: 400 });
    
    const session = await prisma.session.findUnique({ where: { token } });
    if (!session || session.expiresAt < new Date()) {
      return new NextResponse("Invalid or expired token", { status: 400 });
    }

    const user = await prisma.user.findUnique({ 
      where: { id: session.userId }, 
      include: { company: true }
    });
    if (!user) return new NextResponse("User not found", { status: 400 });

    // Create JWT
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "dev-secret");
    const jwt = await new SignJWT({ 
      uid: user.id, 
      cid: user.companyId,
      email: user.email 
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    // Set secure cookie
    cookies().set("oversee_session", jwt, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      path: "/",
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    // Clean up session token
    await prisma.session.delete({ where: { id: session.id } });

    // Send welcome email on first login (optional)
    // await sendEmail(user.email, "Welcome to OverseeNOI", welcomeTemplate);

    return NextResponse.redirect(new URL("/app", req.url));
  } catch (error) {
    console.error("Auth verify error:", error);
    return new NextResponse("Authentication failed", { status: 500 });
  }
}