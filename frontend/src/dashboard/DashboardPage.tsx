import { DottedLayout } from '../common/dotted-layout/DottedLayout.tsx';
import { Header } from './Header/Header.tsx';
import { getJwt } from '../auth/auth-holder.ts';
import { useNavigate } from 'react-router-dom';
import { routes } from '../config/routes.ts';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const jwtPayload = getJwt();
  if (!jwtPayload) {
    navigate(routes.login);
    return null;
  }

  return (
    <DottedLayout>
      <Header email={jwtPayload.email} />
      <div>Dashboard</div>
    </DottedLayout>
  );
};
