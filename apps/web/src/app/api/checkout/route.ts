import Stripe from "stripe";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { priceId } = await req.json();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${req.nextUrl.origin}/dashboard?sub=success`,
    cancel_url: `${req.nextUrl.origin}/pricing?canceled=1`,
  });

  return new Response(JSON.stringify({ url: session.url }), { status: 200 });
}
