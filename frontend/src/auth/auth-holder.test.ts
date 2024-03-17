import { getJwt, JwtPayload, removeJwt, saveJwt } from './auth-holder.ts';
import * as jwtDecodeModule from 'jwt-decode';

describe('auth-holder', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const createJwtPayload = (expiresAt: number): JwtPayload => ({
    sub: 'df53214b-eb2d-43ec-b956-13e0ea99aff6',
    email: 'email@email.com',
    exp: expiresAt,
    iat: Math.floor(Date.now() / 1_000),
  });

  it('should retrieve saved JWT', () => {
    const nowInSeconds = Date.now() / 1_000;
    const minuteLater = nowInSeconds + 60;
    jest
      .spyOn(jwtDecodeModule, 'jwtDecode')
      .mockReturnValue(createJwtPayload(minuteLater));

    saveJwt('JWT');
    expect(getJwt()).toEqual(createJwtPayload(minuteLater));
  });

  it('should remove saved JWT', () => {
    const nowInSeconds = Date.now() / 1_000;
    const minuteLater = nowInSeconds + 60;
    jest
      .spyOn(jwtDecodeModule, 'jwtDecode')
      .mockReturnValue(createJwtPayload(minuteLater));

    saveJwt('JWT');
    removeJwt();
    expect(getJwt()).toBeNull();
  });

  it('should not retrieve expired', () => {
    const nowInSeconds = Date.now() / 1_000;
    const secondAgo = nowInSeconds - 1;
    jest
      .spyOn(jwtDecodeModule, 'jwtDecode')
      .mockReturnValue(createJwtPayload(secondAgo));

    saveJwt('JWT');
    expect(getJwt()).toBeNull();
  });
});
