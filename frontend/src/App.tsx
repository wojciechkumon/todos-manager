import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardPage } from './dashboard/DashboardPage.tsx';
import ErrorPage from './error/ErrorPage.tsx';
import { RegistrationPage } from './registration/RegistrationPage.tsx';
import { LoginPage } from './login/LoginPage.tsx';
import { routes } from './config/routes.ts';
import { protectedRouteLoader } from './auth/protected-route-loader.ts';
import { redirectLoggedInToDashboard } from './auth/redirect-logged-in-to-dashboard.ts';

const router = createBrowserRouter([
  {
    path: routes.dashboard,
    element: <DashboardPage />,
    loader: protectedRouteLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: routes.login,
    element: <LoginPage />,
    loader: redirectLoggedInToDashboard,
    errorElement: <ErrorPage />,
  },
  {
    path: routes.register,
    element: <RegistrationPage />,
    loader: redirectLoggedInToDashboard,
    errorElement: <ErrorPage />,
  },
]);

export const App = () => <RouterProvider router={router} />;
