import { CircularProgress, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FormattedMessage, useIntl } from 'react-intl';
import { TodoItem } from './TodoItem.tsx';
import { useInView } from 'react-intersection-observer';
import { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import { TodoItemDto } from '../../api/todos/create-todo-item.ts';
import { TodosFetchingError } from '../../api/todos/TodosFetchingError.ts';
import { deleteTodoItem } from '../../api/todos/delete-todo-item.ts';
import { useLogout } from '../../auth/hooks/useLogout.ts';
import { Toast, ToastProps } from '../../common/toast/Toast.tsx';
import { toastMessages } from '../../common/toast/toast-messages.ts';

interface TodoListProps {
  todoItems: TodoItemDto[];
  error?: TodosFetchingError | Error | null;
  isFetching: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  resetQuery: () => void;
}

export const TodoList = ({
  todoItems,
  error,
  isFetching,
  fetchNextPage,
  hasNextPage,
  resetQuery,
}: TodoListProps) => {
  const intl = useIntl();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && !isFetching && !error && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isFetching, error, hasNextPage]);
  const [isFetchingError, setFetchingError] = useState(false);

  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: ToastProps['type'];
  } | null>(null);

  const logout = useLogout();
  if (error instanceof TodosFetchingError) {
    if (error.status === HttpStatusCode.Unauthorized && !isFetchingError) {
      setFetchingError(true);
      logout();
    }
  }

  const deleteTodoItemById = async (id: string) => {
    const response = await deleteTodoItem(id);
    if (response.status === HttpStatusCode.NoContent) {
      setToastMessage({
        type: 'success',
        message: intl.formatMessage({
          defaultMessage: 'Todo item successfully deleted!',
          id: 'T5Og+U',
        }),
      });
      resetQuery();
      return;
    }
    if (response.status === HttpStatusCode.Unauthorized) {
      logout();
      return;
    }
    setToastMessage({
      type: 'error',
      message: toastMessages.SOMETHING_WENT_ERROR(intl),
    });
  };

  return (
    <div className="flex">
      <div className="m-auto">
        <div>
          <Typography variant="h4" align="center">
            <FormattedMessage defaultMessage="Todo List" id="qWjzaH" />
          </Typography>
        </div>
        {todoItems.map((todo) => (
          <TodoItem
            key={todo.id}
            todoItem={todo}
            deleteTodoItem={deleteTodoItemById}
          />
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
        <Toast
          open={!!toastMessage}
          onClose={() => setToastMessage(null)}
          message={toastMessage?.message}
          type={toastMessage?.type || 'success'}
        />
      </div>
    </div>
  );
};
