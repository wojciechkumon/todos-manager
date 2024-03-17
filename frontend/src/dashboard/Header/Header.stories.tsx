import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header.tsx';

const meta = {
  title: 'dashboard/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    email: 'test@email.com',
  },
};
