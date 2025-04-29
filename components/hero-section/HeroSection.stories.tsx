import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import HeroSection from './HeroSection';

export default {
  title: 'Components/HeroSection',
  component: HeroSection,
} as Meta;

const Template: StoryFn<typeof HeroSection> = (args) => (
  <HeroSection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  href: '#log-in',
  ctaText: 'Log In',
};
