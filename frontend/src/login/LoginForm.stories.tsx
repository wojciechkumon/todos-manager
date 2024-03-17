import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm.tsx';

const meta = {
  title: 'login/LoginForm',
  component: LoginForm,
  decorators: [
    (Story) => (
      <div className="bg-stone-800 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
