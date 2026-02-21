import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  try {
    const StripeLib = await import("stripe");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stripe = new (StripeLib.default as any)(stripeKey, {
      apiVersion: "2024-04-10",
    });

    const payload = await request.text();
    const signature = request.headers.get("stripe-signature");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let event: any;

    if (webhookSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
      } catch (err) {
        console.error("Stripe webhook signature verification failed:", err);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    } else {
      event = JSON.parse(payload);
    }

    console.log("STRIPE_WEBHOOK:", event.type, JSON.stringify(event.data?.object));

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log("PAYMENT_COMPLETE:", {
          sessionId: session.id,
          email: session.customer_email,
          amount: session.amount_total,
          currency: session.currency,
          paidAt: new Date().toISOString(),
        });

        if (process.env.RESEND_API_KEY) {
          try {
            await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              },
              body: JSON.stringify({
                from: "Spatial Wellness Payments <hello@spatial-wellness.com>",
                to: "hello@spatial-wellness.com",
                subject: `Payment received - Full Audit (${session.customer_email})`,
                text: `New Full Audit payment received!\n\nSession: ${session.id}\nEmail: ${session.customer_email}\nAmount: ${((session.amount_total || 0) / 100).toFixed(2)} ${(session.currency || "eur").toUpperCase()}\nPaid at: ${new Date().toISOString()}\n\nThe customer will now complete their intake form.`,
              }),
            });
          } catch (e) {
            console.error("Email notification failed:", e);
          }
        }

        if (process.env.RESEND_API_KEY && session.customer_email) {
          try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://full-audit.vercel.app";
            await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              },
              body: JSON.stringify({
                from: "Spatial Wellness <hello@spatial-wellness.com>",
                to: session.customer_email,
                subject: "Your Full Spatial Wellness Audit - next steps",
                text: `Thank you for booking your Full Spatial Wellness Audit!\n\nYour payment has been received. Here is what happens next:\n\n1. Complete your intake form at: ${baseUrl}/intake\n2. Upload your photos (minimum 8) and any floorplan you have\n3. We will review your submission within 1 business day\n4. Your personalised report and results page will be ready within 5 working days\n\nIf you have any questions, reply to this email or contact hello@spatial-wellness.com\n\nThank you,\nElianne\nSpatial Wellness`,
              }),
            });
          } catch (e) {
            console.error("Customer confirmation email failed:", e);
          }
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const intent = event.data.object;
        console.log("PAYMENT_FAILED:", intent.id, intent.last_payment_error?.message);
        break;
      }

      default:
        console.log("Unhandled Stripe event:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
