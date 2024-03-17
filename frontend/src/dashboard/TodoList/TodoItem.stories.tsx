import type { Meta, StoryObj } from '@storybook/react';
import { TodoItem } from './TodoItem.tsx';

const meta = {
  title: 'dashboard/TodoItem',
  component: TodoItem,
  decorators: [
    (Story) => (
      <div className="flex">
        <div className="m-auto">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof TodoItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShortTodo: Story = {
  args: {
    todoItem: {
      id: '1',
      content: 'Short todo',
      createdAt: '2022-01-01T00:00:00Z',
    },
    deleteTodoItem: () => {},
  },
};

export const LongTodo: Story = {
  args: {
    todoItem: {
      id: '1',
      content:
        'Long todo, long todo, long todo, long todo, long todo, long todo' +
        ', long todo, long todo, long todo, long todo, long todo, long todo, long todo' +
        ', long todo, long todo, long todo, long todo, long todo, long todo, long todo',
      createdAt: '2022-01-01T00:00:00Z',
    },
    deleteTodoItem: () => {},
  },
};
