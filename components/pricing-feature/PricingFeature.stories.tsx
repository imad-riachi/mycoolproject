import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import PricingFeature, { PricingFeatureProps } from './PricingFeature';

export default {
  title: 'Components/PricingFeature',
  component: PricingFeature,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<PricingFeatureProps> = (args) => (
  <PricingFeature {...args} />
);

export const Default = Template.bind({});
Default.args = {
  feature: 'Unlimited users',
  index: 0,
  gradientFrom: 'from-blue-500',
  gradientTo: 'to-indigo-700',
  highlight: false,
  delay: 0.1,
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  ...Default.args,
  feature: 'Priority support',
  highlight: true,
};
