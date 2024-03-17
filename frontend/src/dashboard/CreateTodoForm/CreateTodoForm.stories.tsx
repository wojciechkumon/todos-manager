import type { Meta, StoryObj } from '@storybook/react';
import { CreateTodoForm } from './CreateTodoForm.tsx';

const meta = {
  title: 'dashboard/CreateTodoForm',
  component: CreateTodoForm,
} satisfies Meta<typeof CreateTodoForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
