const JWT_STORAGE_KEY = 'SESSION';

export const saveJwt = (jwt: string): void => {
  localStorage.setItem(JWT_STORAGE_KEY, jwt);
};

export const getJwt = (): string | null =>
  localStorage.getItem(JWT_STORAGE_KEY);

export const removeJwt = (): void => {
  localStorage.removeItem(JWT_STORAGE_KEY);
};
