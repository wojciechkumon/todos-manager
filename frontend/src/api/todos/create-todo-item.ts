import { AxiosResponse } from 'axios';
import { getAxios } from '../http-client.ts';
import { apiUrls } from '../api-urls.ts';
import { getJwtAsAuthorizationHeader } from '../../auth/auth-holder.ts';
import { ErrorResponse } from '../error-response.ts';

export interface CreateTodoItemDto {
  content: string;
}

export interface TodoItemDto {
  id: string;
  content: string;
  createdAt: string; // example: '2024-03-15T16:29:37.616Z'
}

export const createTodoItem = (
  content: string,
): Promise<AxiosResponse<TodoItemDto | ErrorResponse>> => {
  const createTodoItemDto: CreateTodoItemDto = { content };
  return getAxios().post<TodoItemDto | ErrorResponse>(
    apiUrls.todos.create,
    createTodoItemDto,
    { headers: { Authorization: getJwtAsAuthorizationHeader() } },
  );
};
