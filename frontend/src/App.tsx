import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardPage } from './dashboard/DashboardPage.tsx';
import ErrorPage from './error/ErrorPage.tsx';
import { RegistrationPage } from './registration/RegistrationPage.tsx';
import { LoginPage } from './login/LoginPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <RegistrationPage />,
    errorElement: <ErrorPage />,
  },
]);

export const App = () => <RouterProvider router={router} />;
