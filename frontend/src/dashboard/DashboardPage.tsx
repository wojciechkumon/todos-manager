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
import { useCallback, useMemo } from 'react';

export const DashboardPage = () => {
  const jwtPayload = useLoaderData() as JwtPayload;

  const { data, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: TODOS_QUERY_KEY,
      queryFn: ({ pageParam }) => fetchTodosPage(pageParam, PAGE_SIZE),
      initialPageParam: 1,
      getNextPageParam: ({ metadata }) =>
        metadata.hasNextPage ? metadata.pageNumber + 1 : undefined,
    });
  const todoItems = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );
  const queryClient = useQueryClient();
  const resetQuery = useCallback(
    () => queryClient.resetQueries({ queryKey: TODOS_QUERY_KEY }),
    [queryClient],
  );

  return (
    <DottedLayout>
      <Header email={jwtPayload.email} />
      <div className="my-8">
        <CreateTodoForm onTodoCreated={resetQuery} />
      </div>
      <div className="my-8">
        <TodoList
          todoItems={todoItems}
          error={error}
          isFetching={isFetching}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          resetQuery={resetQuery}
        />
      </div>
    </DottedLayout>
  );
};
