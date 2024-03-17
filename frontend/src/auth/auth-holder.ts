const JWT_STORAGE_KEY = 'SESSION';
const JWT_EXPIRATION = 'SESSION_EXPIRATION';

export const saveJwt = (jwt: string, expiresTime: number): void => {
  localStorage.setItem(JWT_STORAGE_KEY, jwt);
  localStorage.setItem(JWT_EXPIRATION, String(expiresTime));
};

export const getJwt = (): string | null => {
  const expirationString = localStorage.getItem(JWT_EXPIRATION);
  const jwt = localStorage.getItem(JWT_STORAGE_KEY);
  if (!expirationString || !jwt) {
    return null;
  }

  const expires = parseInt(expirationString, 10);
  const isValid = expires > Date.now() / 1_000;
  if (!isValid) {
    removeJwt();
    return null;
  }

  return jwt;
};

export const removeJwt = (): void => {
  localStorage.removeItem(JWT_STORAGE_KEY);
  localStorage.removeItem(JWT_EXPIRATION);
};
