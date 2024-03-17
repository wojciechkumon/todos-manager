import { render, screen } from '@testing-library/react';
import { TodoItem } from './TodoItem.tsx';
import { userEvent } from '@testing-library/user-event';

describe('TodoItem', () => {
  it('should delete item on icon click', async () => {
    const deleteItem = jest.fn();

    render(
      <TodoItem
        todoItem={{
          id: '1',
          content: 'Short todo',
          createdAt: '2022-01-01T00:00:00Z',
        }}
        deleteTodoItem={deleteItem}
      />,
    );
    await userEvent.click(screen.getByTestId('delete-icon'));

    expect(deleteItem).toHaveBeenCalledWith('1');
  });
});
