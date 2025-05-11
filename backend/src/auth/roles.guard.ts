import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY } from '../common/decorators/roles.decorator';
  import { UserRole } from '../users/user.schema';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}
  
	canActivate(context: ExecutionContext): boolean {
	  const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
		context.getHandler(),
		context.getClass(),
	  ]);
	  if (!requiredRoles || requiredRoles.length === 0) return true;
  
	  const { user } = context.switchToHttp().getRequest();
	  
	  const hasRole = requiredRoles.includes(user.role);
	  if (!hasRole) {
		throw new ForbiddenException(
		  `Access denied: ${user.role} is not allowed to access this resource`,
		);
	  }
  
	  return true;
	  }
  }
  