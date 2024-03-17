import { apiUrls } from './api-urls.ts';
import { getAxios } from './http-client.ts';
import { AxiosResponse } from 'axios';
import { ErrorResponse } from './error-response.ts';

export interface RegistrationDto {
  email: string;
  password: string;
}

export interface JwtResponse {
  access_token: string;
  token_type: string;
  expires: number;
}

export const register = (
  email: string,
  password: string,
): Promise<AxiosResponse<JwtResponse | ErrorResponse>> => {
  const registrationDto: RegistrationDto = { email, password };
  return getAxios().post<JwtResponse>(apiUrls.auth.register, registrationDto);
};
