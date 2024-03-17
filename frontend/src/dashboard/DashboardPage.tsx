import { logout } from '../auth/login-with-jwt.ts';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>Dashboard</div>
      <button onClick={() => logout(navigate)}>Logout</button>
    </div>
  );
};
