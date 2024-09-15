import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, ROLES_PUBLIC_KEY } from '../../decorators';
import { Role } from '../../../core/users/role.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../../core/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const noRolesRequired = this.reflector.getAllAndOverride(ROLES_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (noRolesRequired) return true;

    const requiredRoles = this.reflector.getAllAndMerge<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // bypass when there is no required role on an endpoint
    if (!requiredRoles) return true;

    const authorization = context.switchToHttp().getRequest()
      .headers.authorization;
    if (!authorization)
      throw new UnauthorizedException('User not authenticated');

    const bearerToken = authorization.split(' ')[1];
    const jwtPayload = await this.jwtService.verifyAsync(bearerToken, {
      secret: this.configService.get<string>('jwt.secret'),
    });

    const { sub, username } = jwtPayload;
    const user = await this.usersService.findById(sub);
    const allowed = requiredRoles.some((role) => user.roles?.includes(role));
    if (!allowed)
      throw new ForbiddenException(`User does not have required roles`);

    return allowed;
  }
}
