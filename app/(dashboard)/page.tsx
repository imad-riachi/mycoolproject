import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, Database, icons } from 'lucide-react';
import { Terminal } from './terminal';
import HeroSection from '@/components/hero-section';
import FeatureCard from '@/components/feature-card';
import content from '../../content.json';

export default async function HomePage() {
  return (
    <main>
      <section>
        <HeroSection
          href={content.hero.href}
          ctaText={content.hero.ctaText}
          heroText={content.hero.heroText}
          heroDescriptionHeading={content.hero.heroDescriptionHeading}
          heroDescription={content.hero.heroDescription}
        />
      </section>
      <section className='py-16'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h2 className='text-primary text-2xl font-semibold'>
              {content.features.title}
            </h2>
            <h1 className='text-foreground mt-2 text-3xl font-bold sm:text-4xl'>
              {content.features.subtitle}
            </h1>
            <p className='text-foreground-muted mt-4 text-lg'>
              {content.features.subtitle}
            </p>
          </div>
          <div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {content.features.cards.map(
              ({ icon, title, description }, index) => (
                <FeatureCard
                  key={index}
                  icon={icon as keyof typeof icons}
                  title={title}
                  description={description}
                />
              ),
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
