import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'shared/decorator/roles.decorator';
import { Role } from 'shared/interfaces/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const headers: Map<string, string> = context.switchToHttp().getRequest();
    const userRoles = headers['x-user-roles'];

    if (!userRoles) {
      throw new Error('User roles not found in request headers');
    }

    const userRolesArray = userRoles.split(',') as Role[];

    return requiredRoles.some((role) => userRolesArray.includes(role));
  }
}
