import { configuration } from '../config/configuration.ts';

export const apiUrls = {
  auth: {
    register: `${configuration.apiBaseUrl}/auth/registration`,
    login: `${configuration.apiBaseUrl}/auth/login`,
  },
  todos: {
    create: `${configuration.apiBaseUrl}/todos`,
    listPage: `${configuration.apiBaseUrl}/todos`,
    delete: (id: string) => `${configuration.apiBaseUrl}/todos/${id}`,
  },
};
