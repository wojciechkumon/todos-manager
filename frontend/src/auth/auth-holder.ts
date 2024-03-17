import { jwtDecode } from 'jwt-decode';

const JWT_STORAGE_KEY = 'SESSION';

export interface JwtPayload {
  email: string;
  sub: string; // user ID
  exp: number; // expires at
  iat: number; // issued at
}

export const saveJwt = (jwt: string): void => {
  localStorage.setItem(JWT_STORAGE_KEY, jwt);
};

export const getJwt = (): JwtPayload | null => {
  const jwt = localStorage.getItem(JWT_STORAGE_KEY);
  if (!jwt) {
    return null;
  }

  const decoded = jwtDecode<JwtPayload>(jwt);
  const isValid = decoded.exp > Date.now() / 1_000;
  if (!isValid) {
    removeJwt();
    return null;
  }

  return decoded;
};

export const removeJwt = (): void => {
  localStorage.removeItem(JWT_STORAGE_KEY);
};
