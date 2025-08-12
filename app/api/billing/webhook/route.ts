import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/src/lib/stripe";
import { sendEmail } from "@/src/lib/email";

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      console.log("🔔 Stripe webhook received (dry-run mode)");
      return new NextResponse("Webhook received (Stripe not configured)", { status: 200 });
    }
    
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");
    
    if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
      console.log("🔔 Stripe webhook received (signature verification disabled in preview)");
      return new NextResponse("Webhook received", { status: 200 });
    }
    
    // In production, verify the webhook signature
    // const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    
    // Handle different event types
    const event = JSON.parse(body);
    
    switch (event.type) {
      case "customer.subscription.created":
        console.log("🎉 New subscription created");
        // Send welcome email
        break;
        
      case "customer.subscription.deleted":
        console.log("❌ Subscription cancelled");
        // Send cancellation email
        break;
        
      case "invoice.payment_succeeded":
        console.log("💰 Payment succeeded");
        break;
        
      case "invoice.payment_failed":
        console.log("⚠️ Payment failed");
        break;
        
      default:
        console.log(`🔔 Unhandled webhook event: ${event.type}`);
    }
    
    return new NextResponse("Webhook processed", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new NextResponse("Webhook failed", { status: 400 });
  }
}