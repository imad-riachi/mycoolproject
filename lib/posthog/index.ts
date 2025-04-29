import { PostHog } from 'posthog-node';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/auth/session';
import { randomUUID } from 'crypto';

export default function PostHogClient() {
  const posthogClient = new PostHog(
    process.env.NEXT_PUBLIC_POSTHOG_KEY as string,
    {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
    },
  );
  return posthogClient;
}

export async function getBootstrapData() {
  let distinct_id = '';
  const phProjectAPIKey = 'phc_tbN4IFm4fzYM03Uc8D0XFCTYnt84K3RHWgQzhFE8Uc';
  const phCookieName = `ph_${phProjectAPIKey}_posthog`;
  const cookieStore = await cookies();
  const phCookie = cookieStore.get(phCookieName);

  if (phCookie) {
    const phCookieParsed = JSON.parse(phCookie.value);
    distinct_id = phCookieParsed.distinct_id;
  }

  if (!distinct_id) {
    // Try to get the user ID from the session
    const session = await getSession();
    if (session && session.user && session.user.id) {
      distinct_id = String(session.user.id);
    } else {
      // Generate a random UUID as fallback
      distinct_id = randomUUID();
    }
  }

  const client = new PostHog(phProjectAPIKey, {
    host: 'https://us.i.posthog.com',
  });
  const flags = await client.getAllFlags(distinct_id);
  const bootstrap = {
    distinctID: distinct_id,
    featureFlags: flags,
  };

  return bootstrap;
}
