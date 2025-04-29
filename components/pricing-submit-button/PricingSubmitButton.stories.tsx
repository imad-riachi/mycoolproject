import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import PricingSubmitButton, {
  PricingSubmitButtonProps,
} from './PricingSubmitButton';

export default {
  title: 'Components/PricingSubmitButton',
  component: PricingSubmitButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<PricingSubmitButtonProps> = (args) => (
  <PricingSubmitButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Get Started',
  gradientFrom: 'from-blue-500',
  gradientTo: 'to-indigo-700',
  hoverFrom: 'from-blue-600',
  hoverTo: 'to-indigo-800',
};

export const Alternative = Template.bind({});
Alternative.args = {
  label: 'Subscribe Now',
  gradientFrom: 'from-purple-500',
  gradientTo: 'to-pink-700',
  hoverFrom: 'from-purple-600',
  hoverTo: 'to-pink-800',
};
