import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!stripeKey || !priceId) {
    return NextResponse.json(
      { ok: false, error: "Stripe not configured", unavailable: true },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { discountCode, email } = body;

    // Dynamic import to avoid build errors when Stripe keys are absent
    const StripeLib = await import("stripe");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stripe = new (StripeLib.default as any)(stripeKey, {
      apiVersion: "2024-04-10",
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://full-audit.vercel.app";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionParams: any = {
      payment_method_types: ["card", "ideal", "bancontact"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/intake?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?cancelled=true`,
      customer_email: email || undefined,
      invoice_creation: {
        enabled: true,
      },
      metadata: {
        product: "full-spatial-wellness-audit",
      },
    };

    // Apply discount code if provided
    if (discountCode && discountCode.toUpperCase() === "LITE30") {
      try {
        const coupons = await stripe.coupons.list({ limit: 10 });
        const lite30 = coupons.data.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (c: any) => c.name?.toUpperCase() === "LITE30" || c.id.toUpperCase() === "LITE30"
        );
        if (lite30) {
          sessionParams.discounts = [{ coupon: lite30.id }];
        }
      } catch {
        // Coupon lookup failed, continue without discount
      }
    } else if (discountCode) {
      sessionParams.allow_promotion_codes = true;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ ok: true, url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { ok: false, error: "Checkout creation failed" },
      { status: 500 }
    );
  }
}
