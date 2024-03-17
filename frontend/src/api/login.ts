import { apiUrls } from './api-urls.ts';
import { getAxios } from './http-client.ts';
import { AxiosResponse } from 'axios';
import { ErrorResponse } from './error-response.ts';
import { JwtResponse } from './JwtResponse.ts';

export interface LoginDto {
  email: string;
  password: string;
}

export const login = (
  email: string,
  password: string,
): Promise<AxiosResponse<JwtResponse | ErrorResponse>> => {
  const loginDto: LoginDto = { email, password };
  return getAxios().post<JwtResponse>(apiUrls.auth.login, loginDto);
};
