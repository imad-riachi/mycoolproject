'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import formbricks from '@formbricks/js';

export default function FormbricksProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    formbricks.setup({
      environmentId: process.env
        .NEXT_PUBLIC_FORMBRICKS_ENVIRONMENT_ID as string,
      appUrl: process.env.NEXT_PUBLIC_FORMBRICKS_APP_URL as string,
    });
  }, []);

  useEffect(() => {
    formbricks?.registerRouteChange();
  }, [pathname, searchParams]);

  return null;
}
