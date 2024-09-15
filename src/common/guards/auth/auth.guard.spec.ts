import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;
  let configService: ConfigService;
  let reflector: Reflector;

  beforeEach(() => {
    jwtService = { verifyAsync: jest.fn() } as unknown as JwtService;
    configService = { get: jest.fn() } as unknown as ConfigService;
    authGuard = new AuthGuard(jwtService, configService, reflector);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true for valid token', async () => {
      const token = 'valid-token';
      const payload = { userId: '123' };

      // Mocking the ConfigService and JwtService
      jest.spyOn(configService, 'get').mockReturnValue('secret');
      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(payload);

      const request = { headers: { authorization: `Bearer ${token}` } } as any;
      const context = {
        switchToHttp: () => ({ getRequest: () => request }),
      } as unknown as ExecutionContext;

      expect(await authGuard.canActivate(context)).toBe(true);
      expect(request['user']).toEqual(payload);
    });

    it('should throw UnauthorizedException if no token is provided', async () => {
      const request = { headers: {} } as any;
      const context = {
        switchToHttp: () => ({ getRequest: () => request }),
      } as unknown as ExecutionContext;

      await expect(authGuard.canActivate(context)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if token is invalid', async () => {
      const token = 'invalid-token';

      // Mocking the ConfigService and JwtService
      jest.spyOn(configService, 'get').mockReturnValue('secret');
      jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue(new Error());

      const request = { headers: { authorization: `Bearer ${token}` } } as any;
      const context = {
        switchToHttp: () => ({ getRequest: () => request }),
      } as unknown as ExecutionContext;

      await expect(authGuard.canActivate(context)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
