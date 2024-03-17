import { DottedLayout } from '../common/dotted-layout/DottedLayout.tsx';
import { Header } from './Header/Header.tsx';
import { getJwt } from '../auth/auth-holder.ts';
import { useLogout } from '../auth/hooks/useLogout.ts';

export const DashboardPage = () => {
  const logout = useLogout();
  const jwtPayload = getJwt();
  if (!jwtPayload) {
    logout();
    return null;
  }

  return (
    <DottedLayout>
      <Header email={jwtPayload.email} />
      <div>Dashboard</div>
    </DottedLayout>
  );
};
