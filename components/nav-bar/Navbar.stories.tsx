import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Navbar from './Navbar';
import { NavbarProps } from './Navbar';

export default {
  title: 'Components/Navbar',
  component: Navbar,
} as Meta;

const Template: StoryFn<NavbarProps> = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  links: [{ name: 'Pricing', path: '#pricing' }],
};
