import type { Meta, StoryObj } from '@storybook/react';
import { ErrorSnackbar } from './ErrorSnackbar.tsx';

const meta = {
  title: 'common/snackbar/ErrorSnackbar',
  component: ErrorSnackbar,
  decorators: [
    (Story) => (
      <div className="bg-stone-800 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ErrorSnackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'An error occurred',
    open: true,
    onClose: () => {},
  },
};
