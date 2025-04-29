import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../route';
import { handleSubscriptionChange } from '@/lib/payments/stripe';
import { NextRequest } from 'next/server';

// Mock the stripe module
vi.mock('@/lib/payments/stripe', () => ({
  stripe: {
    webhooks: {
      constructEvent: vi.fn(),
    },
  },
  handleSubscriptionChange: vi.fn(),
}));

describe('Stripe Webhook Route', () => {
  const mockWebhookSecret = 'test_webhook_secret';
  const mockSignature = 'test_signature';
  const mockPayload = JSON.stringify({
    type: 'customer.subscription.updated',
    data: {
      object: {
        id: 'sub_123',
        customer: 'cus_123',
        status: 'active',
      },
    },
  });

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STRIPE_WEBHOOK_SECRET = mockWebhookSecret;
  });

  it('should successfully handle a valid subscription update event', async () => {
    const { stripe } = await import('@/lib/payments/stripe');
    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue({
      type: 'customer.subscription.updated',
      data: {
        object: {
          id: 'sub_123',
          customer: 'cus_123',
          status: 'active',
        },
      },
    } as any);

    const request = new NextRequest(
      'http://localhost:3000/api/stripe/webhook',
      {
        method: 'POST',
        body: mockPayload,
        headers: {
          'stripe-signature': mockSignature,
        },
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ received: true });
    expect(handleSubscriptionChange).toHaveBeenCalledWith({
      id: 'sub_123',
      customer: 'cus_123',
      status: 'active',
    });
  });

  it('should handle subscription deletion events', async () => {
    const { stripe } = await import('@/lib/payments/stripe');
    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue({
      type: 'customer.subscription.deleted',
      data: {
        object: {
          id: 'sub_123',
          customer: 'cus_123',
          status: 'canceled',
        },
      },
    } as any);

    const request = new NextRequest(
      'http://localhost:3000/api/stripe/webhook',
      {
        method: 'POST',
        body: JSON.stringify({
          type: 'customer.subscription.deleted',
          data: {
            object: {
              id: 'sub_123',
              customer: 'cus_123',
              status: 'canceled',
            },
          },
        }),
        headers: {
          'stripe-signature': mockSignature,
        },
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ received: true });
    expect(handleSubscriptionChange).toHaveBeenCalledWith({
      id: 'sub_123',
      customer: 'cus_123',
      status: 'canceled',
    });
  });

  it('should return 400 for invalid webhook signatures', async () => {
    const { stripe } = await import('@/lib/payments/stripe');
    vi.mocked(stripe.webhooks.constructEvent).mockImplementation(() => {
      throw new Error('Invalid signature');
    });

    const request = new NextRequest(
      'http://localhost:3000/api/stripe/webhook',
      {
        method: 'POST',
        body: mockPayload,
        headers: {
          'stripe-signature': 'invalid_signature',
        },
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      error: 'Webhook signature verification failed.',
    });
    expect(handleSubscriptionChange).not.toHaveBeenCalled();
  });

  it('should handle unknown event types gracefully', async () => {
    const { stripe } = await import('@/lib/payments/stripe');
    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue({
      type: 'unknown.event.type',
      data: {
        object: {},
      },
    } as any);

    const request = new NextRequest(
      'http://localhost:3000/api/stripe/webhook',
      {
        method: 'POST',
        body: JSON.stringify({
          type: 'unknown.event.type',
          data: { object: {} },
        }),
        headers: {
          'stripe-signature': mockSignature,
        },
      },
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ received: true });
    expect(handleSubscriptionChange).not.toHaveBeenCalled();
  });
});
