import { getJwt } from './auth-holder.ts';
import { redirect } from 'react-router-dom';
import { routes } from '../config/routes.ts';

/**
 * Redirects the user to the dashboard if they are logged in
 */
export const redirectLoggedInToDashboard = () => {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  if (getJwt()) {
    return redirect(routes.dashboard);
  }
  return null;
};
