import type { Meta, StoryObj } from '@storybook/react';
import { TodoList } from './TodoList.tsx';
import { TodosFetchingError } from '../../api/todos/TodosFetchingError.ts';

const meta = {
  title: 'dashboard/TodoList',
  component: TodoList,
} satisfies Meta<typeof TodoList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: null,
    isFetching: false,
    todoItems: [
      {
        id: '1',
        content: 'Short todo 1',
        createdAt: '2022-01-01T16:00:00Z',
      },
      {
        id: '2',
        content: 'Short todo 2',
        createdAt: '2022-01-01T15:43:00Z',
      },
    ],
    fetchNextPage: () => {},
    hasNextPage: false,
  },
};

export const Empty: Story = {
  args: {
    error: null,
    isFetching: false,
    todoItems: [],
    fetchNextPage: () => {},
    hasNextPage: false,
  },
};

export const IsFetching: Story = {
  args: {
    error: null,
    isFetching: true,
    todoItems: [],
    fetchNextPage: () => {},
    hasNextPage: false,
  },
};

export const Error: Story = {
  args: {
    error: new TodosFetchingError(
      'Error',
      { error: 'error', message: 'error', statusCode: 500 },
      500,
    ),
    isFetching: false,
    todoItems: [],
    fetchNextPage: () => {},
    hasNextPage: false,
  },
};
