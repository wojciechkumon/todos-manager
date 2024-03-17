import { getJwt, removeJwt, saveJwt } from './auth-holder.ts';

describe('auth-holder', () => {
  it('should retrieve saved JWT', () => {
    const nowInSeconds = Date.now() / 1_000;
    const minuteLater = nowInSeconds + 60;

    saveJwt('JWT', minuteLater)
    expect(getJwt()).toBe('JWT');
  });

  it('should remove saved JWT', () => {
    const nowInSeconds = Date.now() / 1_000;
    const minuteLater = nowInSeconds + 60;

    saveJwt('JWT', minuteLater);
    removeJwt();
    expect(getJwt()).toBeNull();
  });

  it('should not retrieve expired', () => {
    const nowInSeconds = Date.now() / 1_000;
    const secondAgo = nowInSeconds - 1;

    saveJwt('JWT', secondAgo);
    expect(getJwt()).toBeNull();
  });
});
