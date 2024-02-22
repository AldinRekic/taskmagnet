import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
	try {
		const body = await req.text();
		const signature = headers().get("Stripe-Signature") as string;

		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
		} catch (error) {
			return new NextResponse("Webhook error", { status: 400 });
		}

		if (event.type === "checkout.session.completed") {
			const session = event.data.object as Stripe.Checkout.Session;

			if (!session?.metadata?.orgId) {
				return new NextResponse("Org ID is required", { status: 400 });
			}

			const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

			const createdOrgSubscription = await db.orgSubscription.create({
				data: {
					orgId: session?.metadata?.orgId,
					stripeSubscriptionId: subscription.id,
					stripeCustomerId: subscription.customer as string,
					stripePriceId: subscription.items.data[0].price.id,
					stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
				},
			});

			console.log("createdOrgSubscription: ", createdOrgSubscription);
		}

		console.log("Event type:", event.type);

		if (event.type === "invoice.payment_succeeded") {
			const subscription = await stripe.subscriptions.retrieve(
				event.data.object.subscription as string
			);

			console.log("Subscription ID for update:", subscription.id);

			console.log("Subscription object before update:", subscription);

			const existingSubscription = await db.orgSubscription.findUnique({
				where: { stripeSubscriptionId: subscription.id },
			});

			console.log("existingSubscription: ", existingSubscription);

			if (existingSubscription) {
				// Update the existing record
				await db.orgSubscription.update({
					where: { stripeSubscriptionId: subscription.id },
					data: {
						stripePriceId: subscription.items.data[0].price.id,
						stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
					},
				});
			} else {
				// Handle the case where the record is not found
				console.warn(`Subscription record not found for ID: ${subscription.id}`);
			}
		}

		return new NextResponse(null, { status: 200 });
	} catch (error) {
		console.error("Error in webhook handler:", error);
		return new NextResponse("Webhook error", { status: 500 });
	}
}
