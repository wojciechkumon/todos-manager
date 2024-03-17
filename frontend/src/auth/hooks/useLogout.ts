import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { removeJwt } from '../auth-holder.ts';
import { routes } from '../../config/routes.ts';

export const useLogout = (): (() => void) => {
  const navigate = useNavigate();
  const [shouldLogout, setShouldLogout] = useState<boolean>(false);

  useEffect(() => {
    if (shouldLogout) {
      removeJwt();
      navigate(routes.login);
    }
  }, [shouldLogout, navigate]);

  return useMemo(() => () => setShouldLogout(true), [setShouldLogout]);
};
