import type { Meta, StoryObj } from '@storybook/react';
import { DottedLayout } from './DottedLayout.tsx';

const meta = {
  title: 'common/DottedLayout',
  component: DottedLayout,
  decorators: [
    (Story) => (
      <div className="bg-stone-800 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DottedLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <></>,
  },
};
