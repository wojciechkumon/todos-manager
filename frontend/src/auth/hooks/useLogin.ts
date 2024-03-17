import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { saveJwt } from '../auth-holder.ts';
import { routes } from '../../config/routes.ts';
import { JwtResponse } from '../../api/JwtResponse.ts';

export const useLogin = (): ((_: JwtResponse) => void) => {
  const navigate = useNavigate();
  const [jwtResponse, setJwtResponse] = useState<JwtResponse | null>(null);

  useEffect(() => {
    if (jwtResponse) {
      saveJwt(jwtResponse.access_token);
      navigate(routes.dashboard);
    }
  }, [jwtResponse, navigate]);

  return useMemo(
    () => (jwtResponse: JwtResponse) => setJwtResponse(jwtResponse),
    [setJwtResponse],
  );
};
