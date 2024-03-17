import { saveJwt } from './auth-holder.ts';
import { routes } from '../config/routes.ts';
import { NavigateFunction } from 'react-router';

export const loginWithJwt = (jwt: string, navigate: NavigateFunction): void => {
  saveJwt(jwt);
  navigate(routes.dashboard);
};
