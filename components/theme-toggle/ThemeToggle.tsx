'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export type ThemeToggleProps = {};

const ThemeToggle: React.FC<ThemeToggleProps> = () => {
  const { setTheme, theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (theme === 'light') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={toggleTheme}
      className='relative overflow-hidden transition-all duration-300 ease-in-out'
      aria-label='Toggle theme'
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
          isDarkMode ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
        }`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
          isDarkMode ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
        }`}
      />
    </Button>
  );
};

export default ThemeToggle;
