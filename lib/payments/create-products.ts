import { stripe } from './stripe';

import Stripe from 'stripe';

import content from '../../content.json';

const createStripeProducts = async () => {
  console.log('Creating Stripe products and prices...');

  // Fetch existing products from Stripe
  const existingProducts = await stripe.products.list();
  const existingProductNames = new Set(
    existingProducts.data.map((p) => p.name),
  );

  for (const product of content.pricing.products) {
    // Check if the product already exists
    if (existingProductNames.has(product.name)) {
      console.log(
        `Product '${product.name}' already exists. Skipping creation.`,
      );
      continue;
    }

    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
    });

    await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: product.unit_amount,
      currency: product.currency,
      recurring: {
        interval: product.recurring
          .interval as Stripe.PriceCreateParams.Recurring.Interval,
        trial_period_days: product.recurring.trial_period_days,
      },
    });
  }
};

createStripeProducts()
  .catch((error) => {
    console.error('Products creation failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Products created successfully. Exiting...');
    process.exit(0);
  });
