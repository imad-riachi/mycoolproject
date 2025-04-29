'use client';
import { useEffect, useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export default function AnimatedText({
  text,
  className = '',
  once = true,
  delay = 0,
  tag: Tag = 'p',
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = textRef.current;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (currentRef) {
              currentRef.classList.add('animate-fade-up');
              currentRef.classList.remove('opacity-0');
            }
          }, delay);

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once && currentRef) {
          currentRef.classList.remove('animate-fade-up');
          currentRef.classList.add('opacity-0');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, delay]);

  return (
    <div
      ref={textRef}
      className={`translate-y-4 transform opacity-0 ${className}`}
    >
      <Tag>{text}</Tag>
    </div>
  );
}
