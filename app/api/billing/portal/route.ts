import { NextResponse } from "next/server";
import { stripe } from "@/src/lib/stripe";

export async function POST() {
  try {
    if (!stripe) {
      return NextResponse.json({ 
        url: "", 
        message: "Stripe not configured in preview mode" 
      });
    }
    
    // In production, you'd look up the customer ID from your database
    const customerId = "cus_demo"; // Replace with actual customer lookup
    
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.APP_BASE_URL || "http://localhost:3000/billing"
    });
    
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Billing portal error:", error);
    return NextResponse.json({ 
      url: "", 
      message: "Failed to create portal session" 
    });
  }
}