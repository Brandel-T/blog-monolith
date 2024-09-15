import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/**
 * Used to bypass the authentication guard
 * @constructor
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
