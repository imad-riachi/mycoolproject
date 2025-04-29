import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { UserProvider } from '@/lib/auth';
import { getUser } from '@/lib/db/queries';
import Script from 'next/script';

import ThemeProvider from '@/components/theme-provider';
import PostHogProvider from '@/components/posthog-provider';
import { getBootstrapData } from '@/lib/posthog';
import { Suspense } from 'react';
// Uncomment to enable Formbricks integration
// import FormbricksProvider from '@/components/formbricks-provider';

import content from '../content.json';

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPromise = getUser();
  const gtmId = process.env.GTM_ID; // Access the GTM ID from the environment
  const bootstrap = await getBootstrapData();

  return (
    <html lang='en' className={`${manrope.className}`} suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`}
        ></Script>
        <Script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtmId}');
          `}
        </Script>
      </head>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <PostHogProvider bootstrap={bootstrap}>
            <UserProvider userPromise={userPromise}>
              {/* Uncomment to enable Formbricks integration */}
              {/* <Suspense>
                <FormbricksProvider />
              </Suspense> */}
              {children}
            </UserProvider>
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
