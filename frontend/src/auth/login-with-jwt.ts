import { removeJwt, saveJwt } from './auth-holder.ts';
import { routes } from '../config/routes.ts';
import { NavigateFunction } from 'react-router';
import { JwtResponse } from '../api/JwtResponse.ts';

export const loginWithJwt = (
  jwtResponse: JwtResponse,
  navigate: NavigateFunction,
): void => {
  saveJwt(jwtResponse.access_token, jwtResponse.expires);
  navigate(routes.dashboard);
};

export const logout = (navigate: NavigateFunction): void => {
  removeJwt();
  navigate(routes.login);
};
