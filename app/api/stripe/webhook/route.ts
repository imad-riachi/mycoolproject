import Stripe from 'stripe';
import { handleSubscriptionChange, stripe } from '@/lib/payments/stripe';
import { NextRequest, NextResponse } from 'next/server';
// Keep this for future reference on how to track events with PostHog
// import PostHogClient from '@/lib/posthog';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature') as string;
  // const posthog = PostHogClient();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed.' },
      { status: 400 },
    );
  }

  // switch (event.type) {
  //   case 'customer.subscription.updated': {
  //     const subscription = event.data.object as Stripe.Subscription;
  //     await handleSubscriptionChange(subscription);

  //     // Track subscription updated event
  //     posthog.capture({
  //       distinctId: subscription.customer as string,
  //       event: 'subscription_updated',
  //       properties: {
  //         subscription_id: subscription.id,
  //         status: subscription.status,
  //         plan: subscription.items.data[0]?.price.id,
  //         interval: subscription.items.data[0]?.price.recurring?.interval,
  //         amount: subscription.items.data[0]?.price.unit_amount,
  //         currency: subscription.currency,
  //         cancel_at_period_end: subscription.cancel_at_period_end,
  //       },
  //     });
  //     break;
  //   }
  //   case 'customer.subscription.deleted': {
  //     const subscription = event.data.object as Stripe.Subscription;
  //     await handleSubscriptionChange(subscription);

  //     // Track subscription canceled event
  //     posthog.capture({
  //       distinctId: subscription.customer as string,
  //       event: 'subscription_canceled',
  //       properties: {
  //         subscription_id: subscription.id,
  //         status: subscription.status,
  //         plan: subscription.items.data[0]?.price.id,
  //         canceled_at: subscription.canceled_at
  //           ? new Date(subscription.canceled_at * 1000).toISOString()
  //           : null,
  //       },
  //     });
  //     break;
  //   }
  //   default:
  //     console.log(`Unhandled event type ${event.type}`);
  // }

  return NextResponse.json({ received: true });
}
