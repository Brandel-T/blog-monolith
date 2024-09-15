import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'userRole';
export const Role = (...args: string[]) => SetMetadata(ROLE_KEY, args);
