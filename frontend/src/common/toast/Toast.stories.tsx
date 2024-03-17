import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast.tsx';

const meta = {
  title: 'common/Toast',
  component: Toast,
  decorators: [
    (Story) => (
      <div className="bg-stone-800 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    message: 'Success!',
    open: true,
    onClose: () => {},
    type: 'success',
  },
};

export const Info: Story = {
  args: {
    message: 'Information',
    open: true,
    onClose: () => {},
    type: 'info',
  },
};

export const Warning: Story = {
  args: {
    message: 'Warning',
    open: true,
    onClose: () => {},
    type: 'warning',
  },
};

export const Error: Story = {
  args: {
    message: 'Error',
    open: true,
    onClose: () => {},
    type: 'error',
  },
};
