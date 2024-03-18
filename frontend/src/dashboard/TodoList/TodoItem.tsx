import { Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { TodoItemDto } from '../../api/todos/create-todo-item.ts';
import { formatDateTime, parseIsoDateTime } from '../../common/dates/dates.ts';
import { useCallback } from 'react';

interface TodoItemProps {
  todoItem: TodoItemDto;
  deleteTodoItem: (_: string) => void;
}

export const TodoItem = ({ todoItem, deleteTodoItem }: TodoItemProps) => {
  const onDeleteClick = useCallback(() => {
    deleteTodoItem(todoItem.id);
  }, [todoItem.id, deleteTodoItem]);

  return (
    <div className="todo-item rounded bg-stone-700 p-4 mt-2 m-auto">
      <div className="w-96">
        <div className="flex">
          <div className="mr-auto">
            <Typography variant="body1">{todoItem.content}</Typography>
          </div>
          <div>
            <DeleteOutlineIcon
              color="error"
              onClick={onDeleteClick}
              data-testid="delete-icon"
            />
          </div>
        </div>
        <div className="text-right">
          <Typography variant="caption" color="textSecondary">
            {formatDateTime(parseIsoDateTime(todoItem.createdAt))}
          </Typography>
        </div>
      </div>
    </div>
  );
};
