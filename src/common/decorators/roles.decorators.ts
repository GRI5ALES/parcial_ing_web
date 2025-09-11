import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enums/roles.enum';


export const ROLES_KEY = 'role';
export const Roles = (...role: UserRole[]) => SetMetadata(ROLES_KEY, role);