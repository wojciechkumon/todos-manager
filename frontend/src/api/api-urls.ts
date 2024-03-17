import { configuration } from '../config/configuration.ts';

export const apiUrls = {
  auth: {
    register: `${configuration.apiBaseUrl}/auth/registration`,
    login: `${configuration.apiBaseUrl}/auth/login`,
  },
  todos: {
    create: `${configuration.apiBaseUrl}/todos`,
    listPage: (pageNumber: number, pageSize: number) =>
      `${configuration.apiBaseUrl}/todos?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    delete: (id: string) => `${configuration.apiBaseUrl}/todos/${id}`,
  },
};
