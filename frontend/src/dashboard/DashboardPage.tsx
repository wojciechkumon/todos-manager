import { DottedLayout } from '../common/dotted-layout/DottedLayout.tsx';
import { Header } from './Header/Header.tsx';
import { CreateTodoForm } from './CreateTodoForm/CreateTodoForm.tsx';
import { useLoaderData } from 'react-router-dom';
import { JwtPayload } from '../auth/auth-holder.ts';
import { TodoList } from './TodoList/TodoList.tsx';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchTodosPage,
  PAGE_SIZE,
  TODOS_QUERY_KEY,
} from '../api/todos/fetch-todos-page.ts';
import { TodosFetchingError } from '../api/todos/TodosFetchingError.ts';
import { HttpStatusCode } from 'axios';
import { useLogout } from '../auth/hooks/useLogout.ts';
import { useCallback, useMemo, useState } from 'react';

export const DashboardPage = () => {
  const jwtPayload = useLoaderData() as JwtPayload;
  const [isFetchingError, setFetchingError] = useState(false);

  const { data, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: TODOS_QUERY_KEY,
      queryFn: ({ pageParam }) => fetchTodosPage(pageParam, PAGE_SIZE),
      initialPageParam: 1,
      getNextPageParam: ({ metadata }) =>
        metadata.hasNextPage ? metadata.pageNumber + 1 : undefined,
      enabled: !isFetchingError,
    });
  const todoItems = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );
  const queryClient = useQueryClient();
  const onTodoCreated = useCallback(
    () => queryClient.resetQueries({ queryKey: TODOS_QUERY_KEY }),
    [queryClient],
  );

  const logout = useLogout();
  if (error instanceof TodosFetchingError) {
    if (error.status === HttpStatusCode.Unauthorized && !isFetchingError) {
      setFetchingError(true);
      logout();
    }
  }

  return (
    <DottedLayout>
      <Header email={jwtPayload.email} />
      <div className="my-8">
        <CreateTodoForm onTodoCreated={onTodoCreated} />
      </div>
      <div className="my-8">
        <TodoList
          todoItems={todoItems}
          error={error}
          isFetching={isFetching}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </DottedLayout>
  );
};
