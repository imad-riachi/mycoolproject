'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export type NavbarProps = {
  links: { name: string; path: string }[];
  children?: React.ReactNode;
};

const Navbar: React.FC<NavbarProps> = ({ links, children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isDashboard = pathname?.startsWith('/dashboard') ?? false;

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className='container mx-auto flex h-17 items-center justify-between px-4'>
        {/* Logo */}
        <Link href='/' className='relative z-10 flex items-center'>
          <span className='text-2xl font-bold'>
            <span className='text-foreground'>Leon</span>
            <span className='text-primary'>Ai</span>
            <span className='text-foreground'>rdo</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden items-center space-x-1 md:flex'>
          <ul className='flex space-x-1'>
            {links.map((item) => (
              <li key={item.name}>
                {pathname === item.path ? (
                  <span className='text-primary after:bg-primary relative rounded-md px-4 py-2 text-sm font-medium transition duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-[calc(100%-1rem)] after:-translate-x-1/2'>
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className='text-foreground/80 hover:text-foreground after:bg-primary relative rounded-md px-4 py-2 text-sm font-medium transition duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[calc(100%-1rem)]'
                    passHref
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className='ml-4 flex items-center space-x-2'>
            <ThemeToggle />
            {children}
          </div>
        </nav>
        <div className='flex items-center md:hidden'>
          <ThemeToggle />
          {children}
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label='Toggle menu'
            className='ml-2'
          >
            {mobileMenuOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`bg-background fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '60px' }}
      >
        <nav className='container mx-auto px-4 py-6'>
          <ul className='space-y-4'>
            {links.map((item) => (
              <li key={item.name}>
                {pathname === item.path ? (
                  <span className='text-primary after:bg-primary relative block w-full rounded-md px-4 py-3 text-lg font-medium transition duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-[calc(100%-2rem)] after:-translate-x-1/2'>
                    {item.name}
                  </span>
                ) : (
                  <button
                    className='text-foreground after:bg-primary relative block w-full rounded-md px-4 py-3 text-lg font-medium transition duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-[calc(100%-2rem)] active:scale-95'
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push(item.path);
                    }}
                  >
                    {item.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
