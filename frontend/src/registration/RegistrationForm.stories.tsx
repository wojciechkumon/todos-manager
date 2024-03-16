import type { Meta, StoryObj } from '@storybook/react';
import { RegistrationForm } from './RegistrationForm.tsx';

const meta = {
  title: 'registration/RegistrationForm',
  component: RegistrationForm,
  decorators: [
    (Story) => (
      <div className="bg-stone-800 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RegistrationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
