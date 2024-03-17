import type { Meta, StoryObj } from '@storybook/react';
import { ErrorPageContent } from './ErrorPage.tsx';

const meta = {
  title: 'error/ErrorPage',
  component: ErrorPageContent,
} satisfies Meta<typeof ErrorPageContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PageNotFound: Story = {
  args: { error: { status: 404 } },
};

export const GenericError: Story = {
  args: { error: { status: 500 } },
};
