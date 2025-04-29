'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export type ThemeProviderProps = React.ComponentProps<
  typeof NextThemesProvider
>;

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  ...props
}) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
