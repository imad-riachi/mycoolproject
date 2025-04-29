'use client';

import Link from 'next/link';
import Image from 'next/image';
import AnimatedText from '../ui/animated-text';

export type HeroSectionProps = {
  href: string;
  ctaText: string;
  heroText: string;
  heroDescriptionHeading: string;
  heroDescription: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  href,
  ctaText,
  heroText,
  heroDescriptionHeading,
  heroDescription,
}) => {
  return (
    <>
      <div className='relative z-10'>
        <main className='container mx-auto px-4 py-12'>
          <div className='bg-foreground relative mx-auto mt-8 max-w-6xl rounded-3xl shadow-2xl'>
            <div className='grid gap-8 md:grid-cols-2'>
              <div className='space-y-6 p-4'>
                <AnimatedText
                  text={heroText}
                  tag='h1'
                  className='text-background text-5xl leading-tight font-bold md:text-6xl lg:text-7xl'
                />

                <div className='bg-accent-foreground text-background max-w-md space-y-4 rounded-xl p-6'>
                  <h2 className='text-xl font-bold uppercase'>
                    {heroDescriptionHeading}
                  </h2>
                  <p className='text-background/80 text-sm'>
                    {heroDescription}
                  </p>
                  <Link
                    href={href}
                    className='group bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-full px-8 py-3 text-lg font-bold shadow transition-all'
                  >
                    {ctaText}
                    <span className='bg-background group-hover:bg-background text-foreground ml-2 rounded-full p-1'>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M5 12H19M19 12L12 5M19 12L12 19'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
              {/* <HeroVisual /> */}
              <div className='relative flex items-center justify-center'>
                {/* Character placeholder */}
                <Image
                  sizes='100vw'
                  src='/blog-posting-agent.png?height=500&width=400'
                  width={400}
                  height={500}
                  alt='Virtual Assistant Character'
                  style={{ width: '100%', height: 'auto' }}
                  className='relative z-10'
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default HeroSection;
