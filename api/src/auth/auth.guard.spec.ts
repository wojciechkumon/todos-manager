import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthenticatedRequest, AuthGuard } from './auth.guard';
import { Request } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { JwtPayload } from './auth.service';
import { DeepMocked } from '@golevelup/ts-jest/lib/mocks';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;
  const jwtPayload: JwtPayload = {
    sub: '5e22e562-abcd-40ba-a40a-3a4055c80cb0',
    email: 'email@email.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'jwt-secret-key',
          signOptions: { expiresIn: '7 days' },
        }),
      ],
      providers: [AuthGuard],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
  });

  const createRequestWithHeaders = (headers: Record<string, string>): Request =>
    ({
      method: 'GET',
      url: '/test',
      headers,
    }) as Request;

  const mockExecutionContextWithRequest = (
    request: Request,
  ): DeepMocked<ExecutionContext> => {
    const mockHttpArgumentsHost = createMock<HttpArgumentsHost>();
    mockHttpArgumentsHost.getRequest.mockReturnValue(request);
    const mockExecutionContext = createMock<ExecutionContext>();
    mockExecutionContext.switchToHttp.mockReturnValue(mockHttpArgumentsHost);
    return mockExecutionContext;
  };

  it('should accept a request with a valid token', async () => {
    const token = await jwtService.signAsync(jwtPayload);
    const request = createRequestWithHeaders({
      authorization: `Bearer ${token}`,
    });
    const mockExecutionContext = mockExecutionContextWithRequest(request);

    const result = await authGuard.canActivate(mockExecutionContext);

    expect(result).toEqual(true);
    const jwtPayloadSet = (request as AuthenticatedRequest).jwt;
    expect(jwtPayloadSet).toBeDefined();
    expect(jwtPayloadSet.sub).toEqual(jwtPayload.sub);
    expect(jwtPayloadSet.email).toEqual(jwtPayload.email);
  });

  it('should throw an exception when the token has wrong signature', async () => {
    const token = await jwtService.signAsync(jwtPayload, {
      secret: 'different-secret-key-than-used-in-the-guard',
    });
    const request = createRequestWithHeaders({
      authorization: `Bearer ${token}`,
    });
    const mockExecutionContext = mockExecutionContextWithRequest(request);

    await expect(() =>
      authGuard.canActivate(mockExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });

  it.each([
    ['the authorization header is missing', {}],
    [
      'the authorization header not in Bearer format',
      { authorization: 'token token' },
    ],
    ['the token not in JWT format', { authorization: 'Bearer token' }],
  ])(
    'should throw an exception when %s',
    async (name: string, headers: Record<string, string>) => {
      const request = createRequestWithHeaders(headers);
      const mockExecutionContext = mockExecutionContextWithRequest(request);

      await expect(() =>
        authGuard.canActivate(mockExecutionContext),
      ).rejects.toThrow(UnauthorizedException);
    },
  );
});
