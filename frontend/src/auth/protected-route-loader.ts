import { redirect } from 'react-router-dom';
import { getJwt } from './auth-holder.ts';
import { routes } from '../config/routes.ts';

/**
 * Redirects the user to the login page if they are not logged in
 */
export function protectedRouteLoader() {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  const jwt = getJwt();
  if (!jwt) {
    return redirect(routes.login);
  }
  return jwt;
}
