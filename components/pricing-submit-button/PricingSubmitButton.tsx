'use client';

import { ArrowRight, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export type PricingSubmitButtonProps = {
  gradientFrom: string;
  gradientTo: string;
  hoverFrom: string;
  hoverTo: string;
  label: string;
};

const PricingSubmitButton: React.FC<PricingSubmitButtonProps> = ({
  gradientFrom,
  gradientTo,
  hoverFrom,
  hoverTo,
  label,
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      className={`group relative w-full overflow-hidden rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} px-8 py-4 font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg hover:${hoverFrom} hover:${hoverTo} cursor-pointer`}
    >
      <span className='relative z-10 flex items-center justify-center'>
        {pending ? '...Loading' : label}
        {pending ? (
          <Loader2 className='ml-2 h-5 w-5 animate-spin' />
        ) : (
          <ArrowRight className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
        )}
      </span>
      <div
        className={`absolute inset-0 -translate-x-full bg-gradient-to-r ${hoverFrom} ${hoverTo} transition-transform duration-300 group-hover:translate-x-0`}
      ></div>
    </button>
  );
};

export default PricingSubmitButton;
