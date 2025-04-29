'use client';
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { icons } from 'lucide-react';

export type FeatureCardProps = {
  icon: keyof typeof icons;
  title: string;
  description: string;
  delay?: number;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay = 0,
}: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = icons[icon];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-fade-up');
            entry.target.classList.remove('opacity-0');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const currentCard = cardRef.current;

    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, [delay]);

  return (
    <Card
      ref={cardRef}
      className='translate-y-4 transform opacity-0 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl'
    >
      <CardHeader>
        <div className='bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full'>
          <Icon className='text-primary h-6 w-6' />
        </div>
        <CardTitle className='font-heading mb-2 text-xl font-semibold tracking-wide'>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-foreground/70'>{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
