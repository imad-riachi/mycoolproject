'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import PricingFeature from '@/components/pricing-feature';
import PricingSubmitButton from '@/components/pricing-submit-button';

import clsx from 'clsx';

export type PricingCardProps = {
  name: string;
  price: number;
  interval: string;
  trialDays: number;
  features: string[];
  gradientFrom: string;
  gradientTo: string;
  hoverFrom: string;
  hoverTo: string;
  hoverBorderColor: string;
  hoverShadowColor: string;
  featured?: boolean;
  highlightFeatureIndex?: number;
  priceId?: string;
  checkoutAction?: (formData: FormData) => Promise<void>;
};

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  interval,
  trialDays,
  features,
  gradientFrom,
  gradientTo,
  hoverFrom,
  hoverTo,
  hoverBorderColor,
  hoverShadowColor,
  featured,
  highlightFeatureIndex,
  priceId,
  checkoutAction,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const initialAnimation = featured
    ? { opacity: 0, x: 40 }
    : { opacity: 0, x: -40 };

  return (
    <motion.div
      initial={initialAnimation}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: featured ? 0.2 : 0.1 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className='relative'
    >
      <div
        className={`relative overflow-hidden rounded-3xl border-2 border-transparent bg-white p-8 shadow-lg transition-all duration-300 ${
          isHovering
            ? `${hoverBorderColor} shadow-xl ${hoverShadowColor} -translate-y-1`
            : ''
        }`}
      >
        {/* Animated background gradient */}
        <div
          className={clsx(
            'absolute inset-0 bg-gradient-to-br to-white opacity-0 transition-opacity duration-300',
            featured ? gradientFrom : 'from-white',
          )}
          style={{ opacity: isHovering ? 0.8 : 0 }}
        />

        <div className='relative'>
          <div className='mb-8'>
            <h2 className='text-3xl font-bold text-gray-900'>{name}</h2>
            <p className='mt-2 text-gray-600'>
              with {trialDays} day free trial
            </p>
          </div>

          <div className='mb-8'>
            <div className='flex items-baseline'>
              <span className='text-5xl font-bold text-gray-900'>
                ${price / 100}
              </span>
              <span className='ml-2 text-lg text-gray-600'>
                per user / {interval}
              </span>
            </div>
          </div>

          <ul className='mb-8 space-y-5'>
            {features.map((feature, index) => (
              <PricingFeature
                key={index}
                feature={feature}
                index={index}
                gradientFrom={gradientFrom}
                gradientTo={gradientTo}
                highlight={index === highlightFeatureIndex}
                delay={featured ? 0.3 + index * 0.1 : 0.2 + index * 0.1}
              />
            ))}
          </ul>
          <form action={checkoutAction}>
            <input type='hidden' name='priceId' value={priceId} />
            <PricingSubmitButton
              label='Get Started'
              gradientFrom={gradientFrom}
              gradientTo={gradientTo}
              hoverFrom={hoverFrom}
              hoverTo={hoverTo}
            />
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default PricingCard;
