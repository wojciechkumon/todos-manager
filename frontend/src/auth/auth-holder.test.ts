import {
  getJwt,
  getJwtAsAuthorizationHeader,
  JwtPayload,
  removeJwt,
  saveJwt,
} from './auth-holder.ts';
import * as jwtDecodeModule from 'jwt-decode';

describe('auth-holder', () => {
  const jwtString = 'JWT';

  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
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

    saveJwt(jwtString);
    const jwtPayload = getJwt();

    expect(jwtPayload).toEqual(createJwtPayload(minuteLater));
  });

  it('should retrieve saved JWT as Authorization header', () => {
    const nowInSeconds = Date.now() / 1_000;
    const minuteLater = nowInSeconds + 60;
    jest
      .spyOn(jwtDecodeModule, 'jwtDecode')
      .mockReturnValue(createJwtPayload(minuteLater));

    saveJwt(jwtString);
    const authorizationHeader = getJwtAsAuthorizationHeader();

    expect(authorizationHeader).toEqual(`Bearer ${jwtString}`);
  });

  it('should return null when JWT not save', () => {
    expect(getJwt()).toBeNull();
    expect(getJwtAsAuthorizationHeader()).toBeNull();
  });

  it('should remove saved JWT', () => {
    const nowInSeconds = Date.now() / 1_000;
    const minuteLater = nowInSeconds + 60;
    jest
      .spyOn(jwtDecodeModule, 'jwtDecode')
      .mockReturnValue(createJwtPayload(minuteLater));

    saveJwt(jwtString);
    removeJwt();
    expect(getJwt()).toBeNull();
  });

  it('should not retrieve expired', () => {
    const nowInSeconds = Date.now() / 1_000;
    const secondAgo = nowInSeconds - 1;
    jest
      .spyOn(jwtDecodeModule, 'jwtDecode')
      .mockReturnValue(createJwtPayload(secondAgo));

    saveJwt(jwtString);
    expect(getJwt()).toBeNull();
  });
});
