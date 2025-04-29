import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ThemeProvider, { ThemeProviderProps } from './ThemeProvider';

export default {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<ThemeProviderProps> = (args) => (
  <ThemeProvider {...args}>
    <div className='bg-background text-foreground border-border rounded border p-4'>
      <h3 className='font-bold'>Themed Content</h3>
      <p>This content uses the current theme</p>
    </div>
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  defaultTheme: 'system',
  enableSystem: true,
  attribute: 'class',
};
