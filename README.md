# Next.js SaaS Starter

This is a starter template for building a SaaS application using **Next.js** with support for authentication, Stripe integration for payments, and a dashboard for logged-in users.

**Demo: [https://leonairdo.honulabs.xyz/](https://leonairdo.honulabs.xyz/)**

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Storybook](#storybook)
  - [Why We Use Storybook](#why-we-use-storybook)
  - [Running Storybook](#running-storybook)
  - [Creating Stories](#creating-stories)
  - [Best Practices](#best-practices)
- [Prerequisites](#prerequisites)
  - [1. Vercel Account](#1-vercel-account)
  - [2. Stripe Account and Webhook Setup](#2-stripe-account-and-webhook-setup)
  - [3. Supabase Database](#3-supabase-database)
- [Getting Started](#getting-started)
- [Environment Variables Setup](#environment-variables-setup)
  - [Detailed Setup Instructions](#detailed-setup-instructions)
  - [Important Notes](#important-notes)
- [Local Setup](#local-setup)
  - [Prerequisites](#prerequisites-1)
  - [Database Commands](#database-commands)
  - [Run The App Locally](#run-the-app-locally)
  - [Accessing pgAdmin](#accessing-pgadmin)
  - [Database Connection Details](#database-connection-details)
  - [Cleaning Up](#cleaning-up)
- [Setting Up Local Stripe Webhooks](#setting-up-local-stripe-webhooks)
- [Testing Payments](#testing-payments)
- [Going to Production](#going-to-production)
  - [Deploy to Vercel](#deploy-to-vercel)
  - [Deploy Script Capabilities](#deploy-script-capabilities)
  - [Add environment variables](#add-environment-variables)
  - [Set up a production Stripe webhook](#set-up-a-production-stripe-webhook)
- [Other Templates](#other-templates)

## Features

- Marketing landing page (`/`) with animated Terminal element
- Pricing page (`/pricing`) which connects to Stripe Checkout
- Dashboard pages with CRUD operations on users/teams
- Basic RBAC with Owner and Member roles
- Subscription management with Stripe Customer Portal
- Email/password authentication with JWTs stored to cookies
- Global middleware to protect logged-in routes
- Local middleware to protect Server Actions or validate Zod schemas
- Activity logging system for any user events

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Postgres](https://www.postgresql.org/)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Payments**: [Stripe](https://stripe.com/)
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/)
- **Analytics**: [PostHog](https://posthog.com/)
- **Surveys & Feedback**: [Formbrick](https://formbricks.com/)

## PostHog Integration

This project uses [PostHog](https://posthog.com/) for product analytics, feature flags, and user tracking.

### Why PostHog?

- **Product Analytics** - Track user behavior and understand how people use your SaaS application
- **Feature Flags** - Safely roll out new features, perform A/B tests, and manage feature access
- **Session Recording** - Watch real user sessions to understand usability issues
- **User Identification** - Track users across their journey from anonymous visitors to paying customers
- **Self-hosted Option** - PostHog can be self-hosted for complete data ownership
- **Open Source** - PostHog offers an open-source core with transparent development

### Integration Details

PostHog is integrated in several key areas of the codebase:

1. **Client-side Tracking** (`components/posthog-provider/PostHogProvider.tsx`)

   - Automatically captures pageviews and page leave events
   - Provider component wraps the application for global PostHog access

2. **Server-side API** (`lib/posthog/index.ts`)

   - Server-side PostHog client for capturing events from API routes
   - Provides feature flag access on the server

3. **Feature Flags Bootstrap** (`app/layout.tsx`)

   - Initializes feature flags during application bootstrap
   - Ensures consistent feature flag state between server and client

4. **API Forwarding** (`next.config.ts`)
   - Configures API endpoint rewrites for PostHog tracking
   - Maintains proper handling of PostHog's API requirements

### Setup

To use PostHog in this project:

1. Create a PostHog account at [posthog.com](https://posthog.com/)
2. Create a new project in your PostHog dashboard
3. Add your PostHog API keys to your `.env` file:
   ```
   NEXT_PUBLIC_POSTHOG_KEY=your_project_api_key
   NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com  # or your self-hosted URL
   ```

### Best Practices

When using feature flags:

- Limit the use of a single flag to as few locations as possible
- Use descriptive naming for flags
- Verify flag values before applying conditional logic

When tracking events:

- Maintain consistent naming conventions for events and properties
- Use enums or constant objects for event names used in multiple places
- Consider privacy implications and avoid tracking sensitive information

## Formbrick Integration

This project uses [Formbrick](https://formbricks.com/) for in-app surveys, user feedback collection, and micro-surveys.

### Why Formbrick?

- **In-App Surveys** - Collect valuable user feedback directly within your application
- **Micro-Surveys** - Create targeted short surveys to gain specific insights
- **Customer Feedback Loop** - Understand user sentiment and identify areas for improvement
- **Contextual Data Collection** - Gather feedback at specific points in the user journey
- **Open Source** - Formbrick offers an open-source solution that can be self-hosted
- **Privacy-Focused** - Designed with privacy in mind, giving you control over your data

### Integration Details

Formbrick is integrated in the codebase as follows:

1. **Client-side Provider** (`components/formbricks-provider/index.tsx`)

   - Sets up the Formbrick client with your environment configuration
   - Tracks page navigation automatically with `registerRouteChange()`
   - Runs in a React Suspense boundary for optimal performance

2. **Root Layout Integration** (`app/layout.tsx`)

   - The Formbrick provider is commented out by default
   - Can be easily enabled by uncommenting the provider component

### Setup

To use Formbrick in this project:

1. Create a Formbrick account at [formbricks.com](https://formbricks.com/)
2. Create a new project in your Formbrick dashboard
3. Add your Formbrick configuration to your `.env` file:
   ```
   NEXT_PUBLIC_FORMBRICKS_ENVIRONMENT_ID=your_environment_id
   NEXT_PUBLIC_FORMBRICKS_APP_URL=https://app.formbricks.com
   ```
4. Uncomment the Formbrick provider in `app/layout.tsx`:
   ```tsx
   {
     /* Uncomment to enable Formbricks integration */
   }
   <Suspense>
     <FormbricksProvider />
   </Suspense>;
   ```

### Usage Best Practices

When creating surveys:

- Keep surveys short and focused
- Target specific user segments
- Use surveys at appropriate points in the user journey
- Test surveys before deploying them to all users
- Regularly review and act on the feedback collected

### Embedding Surveys in Your Application

Formbricks provides multiple ways to display surveys to your users. Here's how to implement them in your Next.js SaaS Starter:

#### 1. Automatic Triggers

Once you've enabled the Formbricks provider in `app/layout.tsx`, you can create surveys in the Formbricks dashboard that trigger automatically based on:

- **Page Navigation**: Surveys can appear when users navigate to specific pages
- **Exit Intent**: Capture feedback when users are about to leave your site
- **Scroll Depth**: Trigger surveys when users scroll to a certain point on the page

#### 2. Custom Code Triggers

For more targeted surveys, you can implement custom triggers in your components:

```tsx
'use client';

import { Button } from '@/components/ui/button';
import formbricks from '@formbricks/js';

export default function FeedbackButton() {
  const handleFeedbackClick = () => {
    // Track a custom event that can trigger a survey
    formbricks.track('requested_feedback');
  };

  return <Button onClick={handleFeedbackClick}>Give Feedback</Button>;
}
```

In your Formbricks dashboard, create a survey that triggers on the `requested_feedback` action.

#### 3. User Identification

To associate survey responses with specific users, add user identification after authentication:

```tsx
'use client';

import { useEffect } from 'react';
import formbricks from '@formbricks/js';

export function UserIdentifier({ user }) {
  useEffect(() => {
    if (user?.id) {
      formbricks.setUserId(user.id);

      // Optionally set user attributes for targeting
      formbricks.setAttributes({
        email: user.email,
        plan: user.subscription?.plan || 'free',
        createdAt: user.createdAt,
      });
    }
  }, [user]);

  return null;
}
```

Add this component to your authenticated layout or within components that have access to the user context.

#### 4. Debugging Survey Display

If your surveys aren't appearing as expected:

1. Add `?formbricksDebug=true` to your URL while testing
2. Open your browser's developer console to see debug information
3. Verify that your triggers are being tracked correctly
4. Check that your targeting conditions in the Formbricks dashboard are set correctly

By using these techniques, you can collect valuable user feedback at critical points in your application's user journey, helping you improve your product based on real user insights.

## Storybook

This project uses [Storybook](https://storybook.js.org/) as a development environment for UI components. Storybook allows us to build, test, and document UI components in isolation, which improves development efficiency and ensures consistent design implementation.

### Why We Use Storybook

- **Component Development in Isolation**: Work on UI components without needing to run the entire application
- **Visual Testing**: Preview UI components in different states and configurations
- **Documentation**: Auto-generate documentation for our component library
- **Collaboration**: Makes it easier for designers and developers to collaborate on UI components

### Running Storybook

To start Storybook locally:

```bash
pnpm storybook
```

This will launch Storybook at [http://localhost:6006](http://localhost:6006).

### Creating Stories

When building a new component, always create a corresponding Storybook story to document its usage:

```tsx
// ComponentName.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Click Me',
  },
};
```

### Best Practices

1. Create stories for all reusable components
2. Document component variations and edge cases
3. Use the [Component Story Format (CSF)](https://storybook.js.org/docs/react/api/csf) for writing stories
4. Use [Args](https://storybook.js.org/docs/react/writing-stories/args) to demonstrate different states of a component

## Prerequisites

Before you begin setting up this project, you'll need to have the following accounts and configurations ready:

### 1. Vercel Account

- Sign up for a Vercel account at [vercel.com](https://vercel.com)
- Create a new project in your Vercel dashboard
- You'll need this to deploy your application to production

### 2. Stripe Account and Webhook Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Install the Stripe CLI:
   - **macOS** (using Homebrew):
     ```bash
     brew install stripe/stripe-cli/stripe
     ```
   - **Windows** (using Scoop):
     ```bash
     scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
     scoop install stripe
     ```
   - **Linux**:
     ```bash
     # Download the latest Linux tar.gz
     curl -s https://packages.stripe.dev/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
     echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.dev/stripe-cli-debian-local stable main" | sudo tee -a /etc/apt/sources.list.d/stripe.list
     sudo apt update
     sudo apt install stripe
     ```
   - **Alternative**: Download directly from [Stripe CLI releases](https://github.com/stripe/stripe-cli/releases/latest)
3. Set up a webhook endpoint:
   - Go to Stripe Dashboard → Developers → Webhooks
   - Click "Add endpoint"
   - For local development:
     - Use the Stripe CLI command: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
     - Copy the webhook signing secret (starts with `whsec_`)
   - For production:
     - Set the endpoint URL to `https://your-domain.com/api/stripe/webhook`
     - Select events to listen for:
       - `checkout.session.completed`
       - `customer.subscription.updated`
       - `customer.subscription.deleted`
     - Copy the webhook signing secret
4. Get your API keys:
   - Go to Stripe Dashboard → Developers → API keys
   - Copy your "Secret key" (starts with `sk_test_` for test mode)
   - Keep these keys secure and never commit them to version control
   - To automatically create your Stripe products:
     - Products are defined in `content.json` under the `pricing.products` section
     - Run `pnpm stripe:create-products` to create the products in your Stripe account
     - This script is safe to run multiple times - it won't affect existing products (including archived ones) that match the ones defined in `content.json`

### 3. Supabase Database

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get your database connection string:
   - Go to Project Settings → Database
   - Find the "Connection string" section
   - Copy the "URI" connection string
   - It should look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`
   - Keep this connection string secure and never commit it to version control

## Getting Started

```bash
git clone https://github.com/nextjs/saas-starter
cd saas-starter
pnpm install
```

## Environment Variables Setup

The repository includes a `.env.example` file that you can use as a template. To get started:

1. Copy the example file:

```bash
cp .env.example .env
```

2. Update the values in your `.env` file with your own configuration:

```env
# Database URL for PostgreSQL
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
# For local development with Docker, use:
POSTGRES_URL=postgresql://postgres:postgres@localhost:5433/saas_db

# Stripe Configuration
# Get these from your Stripe Dashboard (https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret

# Base URL for your application
# For local development:
BASE_URL=http://localhost:3000

# Authentication Secret
# Generate a random string using: openssl rand -base64 32
AUTH_SECRET=your_generated_auth_secret

# PostHog Configuration
# Get these from your PostHog Project Settings
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Formbrick Configuration
NEXT_PUBLIC_FORMBRICKS_ENVIRONMENT_ID=your_environment_id
NEXT_PUBLIC_FORMBRICKS_APP_URL=https://app.formbricks.com
```

### Detailed Setup Instructions

1. **Database URL (POSTGRES_URL)**:

   - For local development with Docker: `postgresql://postgres:postgres@localhost:5433/saas_db`
   - For production: Use your production database URL
   - Make sure the database is running before starting the application

2. **Stripe Configuration**:

   - Sign up for a Stripe account at https://stripe.com
   - Go to the Stripe Dashboard → Developers → API keys
   - Copy your "Secret key" (starts with `sk_test_` for test mode)
   - For webhook secret:
     - Go to Stripe Dashboard → Developers → Webhooks
     - Create a new webhook endpoint pointing to your application
     - Copy the "Signing secret" (starts with `whsec_`)
   - To automatically create your Stripe products:
     - Products are defined in `content.json` under the `pricing.products` section
     - Run `pnpm stripe:create-products` to create the products in your Stripe account
     - This script is safe to run multiple times - it won't affect existing products (including archived ones) that match the ones defined in `content.json`

3. **Base URL (BASE_URL)**:

   - For local development: `http://localhost:3000`
   - For production: Your actual domain (e.g., `https://your-app.com`)

4. **Auth Secret (AUTH_SECRET)**:

   - Generate a secure random string using:
     ```bash
     openssl rand -base64 32
     ```
   - Copy the generated string
   - Keep this secret secure and never commit it to version control

5. **PostHog Configuration**:

   - Sign up for a PostHog account at https://posthog.com
   - Create a new project in your PostHog dashboard
   - Go to "Project Settings" → "Project API Key"
   - Copy your "Project API Key" (starts with `phc_`)
   - Add to your `.env` file:
     ```
     NEXT_PUBLIC_POSTHOG_KEY=your_project_api_key
     NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com  # or your self-hosted URL
     ```

6. **Formbrick Configuration**:
   - Sign up for a Formbrick account at https://formbricks.com
   - Create a new project in your Formbrick dashboard
   - Go to "Settings" → "Developer" to find your environment ID
   - Copy your "Environment ID"
   - Add to your `.env` file:
     ```
     NEXT_PUBLIC_FORMBRICKS_ENVIRONMENT_ID=your_environment_id
     NEXT_PUBLIC_FORMBRICKS_APP_URL=https://app.formbricks.com  # or your self-hosted URL
     ```

### Important Notes

- Never commit your `.env` file to version control
- Keep your production secrets secure and rotate them regularly
- Use different API keys for development and production environments
- The provided values in the example are for illustration only - you must replace them with your own values

## Local Setup

This project uses Docker to run PostgreSQL and pgAdmin locally. The setup is isolated to avoid conflicts with other local databases.

### Prerequisites

- Docker and Docker Compose installed on your machine
- Make (usually pre-installed on Unix-based systems)

### Database Commands

The following Make commands are available to manage your local database:

```bash
# Start the database and pgAdmin
make db-up

# Stop the database and pgAdmin
make db-down

# Stop and remove all containers and volumes (this will delete all data)
make db-clean

# View database logs
make db-logs

# Check status of database containers
make db-status

# Show database connection information
make db-info
```

### Run The App Locally

1. Start the database:

```bash
make db-up
```

2. Verify the database is running:

```bash
make db-status
```

3. Run database migrations:

```bash
pnpm db:migrate
```

4. Seed the database with initial data:

```bash
pnpm db:seed
```

This will create the following user and team:

- User: `test@test.com`
- Password: `admin123`

You can, of course, create new users as well through `/sign-up`.

4. Setup products in Stripe:

```bash
pnpm stripe:create-products
```

This will setup the default products:

```json
[
  {
    "name": "Base",
    "description": "Base subscription plan",
    "unit_amount": 800,
    "currency": "usd",
    "recurring": {
      "interval": "month",
      "trial_period_days": 7
    }
  },
  {
    "name": "Plus",
    "description": "Plus subscription plan",
    "unit_amount": 1200,
    "currency": "usd",
    "recurring": {
      "interval": "month",
      "trial_period_days": 7
    }
  },
  {
    "name": "Enterprise",
    "description": "Enterprise subscription plan",
    "unit_amount": 12000,
    "currency": "usd",
    "recurring": {
      "interval": "month",
      "trial_period_days": 7
    }
  }
]
```

Feel free to edit the `content.json` file in the root folder to set different products.

5. Finally, run the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## Setting Up Local Stripe Webhooks

To test Stripe webhooks locally during development, follow these steps:

1. Ensure you've installed the Stripe CLI as described in the [Prerequisites section](#2-stripe-account-and-webhook-setup)

2. Login to your Stripe account via the CLI:

   ```bash
   stripe login
   ```

3. Start the webhook forwarding:

   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

4. The CLI will display a webhook signing secret. Copy this secret and update your `.env` file:

   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_signing_secret
   ```

5. Keep this terminal window open while testing Stripe integrations. The Stripe CLI will forward events from Stripe to your local application.

6. To test specific events, you can trigger them manually using:
   ```bash
   stripe trigger checkout.session.completed
   ```

You can find more information about testing webhooks in the [Stripe CLI documentation](https://stripe.com/docs/stripe-cli/webhooks).

### Accessing pgAdmin

1. Open pgAdmin in your browser at `http://localhost:5051`
2. Log in with:

   - Email: admin@admin.com
   - Password: admin

3. Connect to your PostgreSQL database:
   - Right-click on "Servers" in the left sidebar
   - Select "Register" → "Server"
   - In the "General" tab:
     - Name: "SaaS Starter DB" (or any name you prefer)
   - In the "Connection" tab:
     - Host name/address: `postgres` (this is the Docker service name)
     - Port: `5432` (use the internal container port)
     - Maintenance database: `saas_db`
     - Username: `postgres`
     - Password: `postgres`
   - Click "Save"

### Database Connection Details

- **Host**: localhost
- **Port**: 5433 (external port for host machine)
- **Database**: saas_db
- **Username**: postgres
- **Password**: postgres

Note: When connecting from pgAdmin (which runs in Docker), use:

- Host: `postgres` (Docker service name)
- Port: `5432` (internal container port)

### Cleaning Up

To completely remove the database and all its data:

```bash
make db-clean
```

This will:

- Stop all containers
- Remove all containers
- Remove all volumes (deleting all data)
- Remove the custom network

## Testing Payments

To test Stripe payments, use the following test card details:

- Card Number: `4242 4242 4242 4242`
- Expiration: Any future date
- CVC: Any 3-digit number

## Going to Production

When you're ready to deploy your SaaS application to production, follow these steps:

### Deploy to Vercel

We provide a deploy script that abstracts away the Vercel CLI functionality, so you don't need to install the Vercel CLI globally on your machine. This script handles the entire deployment process in one convenient command:

```bash
pnpm run deploy
```

The deploy script will:

1. **Log you in to your Vercel account** - You'll be prompted to enter your Vercel credentials or authenticate through a browser
2. **Guide you through project creation** - The script will ask you to name your project and configure basic settings
3. **Set up deployment settings** - It will automatically detect your Next.js project and suggest optimal settings
4. **Deploy your application** - Your code will be built and deployed to Vercel's global CDN

### Deploy Script Capabilities

Our deploy script is a wrapper around the Vercel CLI, providing access to all its functionality without requiring a global installation. You can leverage these powerful features by passing additional arguments to the script:

```bash
pnpm run deploy --[vercel-cli-arguments]
```

For example:

```bash
# List all your Vercel projects
pnpm run deploy --ls

```

For a complete list of commands and options, run:

```bash
pnpm run deploy -- help
```

The deploy script gives you the full power of the Vercel CLI while maintaining a consistent environment for your team and eliminating the need for separate CLI installation.

### Add environment variables

After deployment, you'll need to configure environment variables on Vercel. This is a critical step for your application to function properly in production.

#### 1. Create your production environment file

First, create a `.env.vercel` file based on the example template:

```bash
cp .env.example .env.vercel
```

#### 2. Update production variables

Open the `.env.vercel` file in your code editor and update these essential variables:

```env
# Production environment variables
BASE_URL=https://your-project-name.vercel.app
POSTGRES_URL=your_production_database_url
STRIPE_SECRET_KEY=sk_live_your_stripe_production_key
STRIPE_WEBHOOK_SECRET=whsec_your_production_webhook_secret
AUTH_SECRET=your_generated_auth_secret
NEXT_PUBLIC_POSTHOG_KEY=phc_your_production_project_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
NEXT_PUBLIC_FORMBRICKS_ENVIRONMENT_ID=your_production_environment_id
NEXT_PUBLIC_FORMBRICKS_APP_URL=https://app.formbricks.com
```

Key variables to configure:

- `BASE_URL`: Your production domain (e.g., `https://your-project-name.vercel.app`)
- `POSTGRES_URL`: The connection string for your production database
- `STRIPE_SECRET_KEY`: Your Stripe live mode secret key (starts with `sk_live_`)
- `STRIPE_WEBHOOK_SECRET`: The webhook secret from the production webhook you set up
- `AUTH_SECRET`: A secure random string (generate with `openssl rand -base64 32`)
- `NEXT_PUBLIC_POSTHOG_KEY`: Your PostHog project API key for production analytics
- `NEXT_PUBLIC_POSTHOG_HOST`: The PostHog host URL (or your self-hosted instance)
- `NEXT_PUBLIC_FORMBRICKS_ENVIRONMENT_ID`: Your Formbrick production environment ID
- `NEXT_PUBLIC_FORMBRICKS_APP_URL`: The Formbrick host URL (or your self-hosted instance)

#### 3. Deploy your environment variables

Run our environment deployment script to push these variables to Vercel:

```bash
pnpm run deploy-env
```

This script will:

- Connect to your Vercel project
- Sync all variables from your `.env.vercel` file to Vercel's environment variables
- Confirm once the variables are successfully deployed

The variables will be available in your Vercel production environment, separate from your local development variables. You can verify them in the Vercel dashboard under your project's Settings → Environment Variables.

Make sure to redeploy again for the env vars to be picked up by the app.

### Set up a production Stripe webhook

Once your project is deployed, you'll need to set up a Stripe webhook for the production environment:

1. Go to the Stripe Dashboard and create a new webhook for your production environment.
2. Set the endpoint URL to your production API route (e.g., `https://your-project-name.vercel.app/api/stripe/webhook`).
3. Select the events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the webhook signing secret for the next step.

## Other Templates
