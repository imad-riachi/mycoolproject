'use client';

import { motion } from 'framer-motion';

interface PricingHeaderProps {
  title: string;
  subtitle: string;
}

const PricingHeader = ({ title, subtitle }: PricingHeaderProps) => {
  const highlightedText = title.split(' ').pop() || '';
  const regularText = title.substring(
    0,
    title.length - highlightedText.length - 1,
  );

  return (
    <div className='mb-16 text-center'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className='text-foreground mb-4 text-4xl font-bold tracking-tight md:text-5xl'>
          {regularText}{' '}
          <span className='bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent'>
            {highlightedText}
          </span>
        </h1>
        <p className='text-foreground mx-auto max-w-2xl text-xl'>{subtitle}</p>
      </motion.div>
    </div>
  );
};

export default PricingHeader;
