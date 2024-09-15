import { SetMetadata } from '@nestjs/common';
import { Role } from '../../core/users/role.enum';

export const ROLES_KEY = 'userRoles';
export const ROLES_PUBLIC_KEY = 'userRolesPublic';

/**
 * Specifies required roles
 * @param args roles
 * @constructor
 */
export const Roles = (...args: Role[]) => SetMetadata(ROLES_KEY, args);
/**
 * Used to bypass role guards on certain endpoints
 * @constructor
 */
export const NoRolesRequired = () => SetMetadata(ROLES_PUBLIC_KEY, true);
