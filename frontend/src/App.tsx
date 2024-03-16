import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardPage } from './dashboard/DashboardPage.tsx';
import ErrorPage from './error/ErrorPage.tsx';
import { RegistrationPage } from './registration/RegistrationPage.tsx';
import { LoginPage } from './login/LoginPage.tsx';
import { routes } from './config/routes.ts';

const router = createBrowserRouter([
  {
    path: routes.dashboard,
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: routes.login,
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: routes.register,
    element: <RegistrationPage />,
    errorElement: <ErrorPage />,
  },
]);

export const App = () => <RouterProvider router={router} />;
