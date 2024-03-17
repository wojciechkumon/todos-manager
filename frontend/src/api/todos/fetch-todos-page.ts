import { HttpStatusCode } from 'axios';
import { getAxios } from '../http-client.ts';
import { apiUrls } from '../api-urls.ts';
import { getJwtAsAuthorizationHeader } from '../../auth/auth-holder.ts';
import { ErrorResponse } from '../error-response.ts';
import { TodoItemDto } from './create-todo-item.ts';
import { TodosFetchingError } from './TodosFetchingError.ts';

export interface PageMetadataDto {
  pageNumber: number;
  pageSize: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PageDto<T> {
  data: T[];
  metadata: PageMetadataDto;
}

export const PAGE_SIZE = 5;

export const TODOS_QUERY_KEY = ['todos'];

/**
 * Fetcher to use with react-query
 */
export const fetchTodosPage = async (
  pageNumber: number,
  pageSize: number,
): Promise<PageDto<TodoItemDto>> => {
  const url = apiUrls.todos.listPage(pageNumber, pageSize);
  const response = await getAxios().get<PageDto<TodoItemDto> | ErrorResponse>(
    url,
    { headers: { Authorization: getJwtAsAuthorizationHeader() } },
  );
  if (response.status === HttpStatusCode.Ok) {
    return response.data as PageDto<TodoItemDto>;
  }

  throw new TodosFetchingError(
    'Failed to fetch todos page',
    response.data as ErrorResponse,
    response.status,
  );
};
