import { AxiosResponse } from 'axios';
import { ErrorResponse } from '../error-response.ts';
import { getAxios } from '../http-client.ts';
import { apiUrls } from '../api-urls.ts';
import { getJwtAsAuthorizationHeader } from '../../auth/auth-holder.ts';

export const deleteTodoItem = (
  todoItemId: string,
): Promise<AxiosResponse<void | ErrorResponse>> =>
  getAxios().delete<void | ErrorResponse>(apiUrls.todos.delete(todoItemId), {
    headers: { Authorization: getJwtAsAuthorizationHeader() },
  });
