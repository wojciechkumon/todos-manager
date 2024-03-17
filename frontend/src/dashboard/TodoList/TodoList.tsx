import { CircularProgress, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FormattedMessage } from 'react-intl';
import { TodoItem } from './TodoItem.tsx';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { TodoItemDto } from '../../api/todos/create-todo-item.ts';
import { TodosFetchingError } from '../../api/todos/TodosFetchingError.ts';

interface TodoListProps {
  todoItems: TodoItemDto[];
  error?: TodosFetchingError | Error | null;
  isFetching: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export const TodoList = ({
  todoItems,
  error,
  isFetching,
  fetchNextPage,
  hasNextPage,
}: TodoListProps) => {
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && !isFetching && !error && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isFetching, error, hasNextPage]);

  return (
    <div className="flex">
      <div className="m-auto">
        <div>
          <Typography variant="h4" align="center">
            <FormattedMessage defaultMessage="Todo List" id="qWjzaH" />
          </Typography>
        </div>
        {todoItems.map((todo) => (
          <TodoItem key={todo.id} todoItem={todo} />
        ))}
        {isFetching && (
          <div className="text-center">
            <CircularProgress />
          </div>
        )}
        {error && (
          <div className="text-center mt-4">
            <Typography variant="h6" color="error">
              <span className="mr-2 align-middle">
                <ErrorOutlineIcon />
              </span>
              <FormattedMessage
                defaultMessage="Failed to fetch todos"
                id="+YAQFV"
              />
            </Typography>
          </div>
        )}
        <div ref={ref}></div>
      </div>
    </div>
  );
};
