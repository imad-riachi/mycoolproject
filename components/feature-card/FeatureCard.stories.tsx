import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import FeatureCard, { FeatureCardProps } from './FeatureCard';
import { Database, Server, Shield, Zap } from 'lucide-react';

export default {
  title: 'Components/FeatureCard',
  component: FeatureCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<FeatureCardProps> = (args) => <FeatureCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: 'Database',
  title: 'Robust Database',
  description: 'Efficient data management with our intuitive ORM.',
};

export const WithDelay = Template.bind({});
WithDelay.args = {
  icon: 'Server',
  title: 'High Performance',
  description:
    'Lightning-fast server response times for optimal user experience.',
  delay: 200,
};

export const Security = Template.bind({});
Security.args = {
  icon: 'Shield',
  title: 'Enterprise Security',
  description:
    'Bank-grade security with end-to-end encryption and regular audits.',
};

export const Performance = Template.bind({});
Performance.args = {
  icon: 'Zap',
  title: 'Lightning Fast',
  description:
    'Optimized performance with minimal latency and maximum throughput.',
};

// Grid of multiple cards
export const Grid = () => (
  <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
    <FeatureCard
      icon='Database'
      title='Robust Database'
      description='Efficient data management with our intuitive ORM.'
    />
    <FeatureCard
      icon='Server'
      title='High Performance'
      description='Lightning-fast server response times for optimal user experience.'
      delay={200}
    />
    <FeatureCard
      icon='Shield'
      title='Enterprise Security'
      description='Bank-grade security with end-to-end encryption and regular audits.'
      delay={400}
    />
    <FeatureCard
      icon='Zap'
      title='Lightning Fast'
      description='Optimized performance with minimal latency and maximum throughput.'
      delay={600}
    />
  </div>
);
