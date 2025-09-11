import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/common/decorators/roles.decorators";
import { UserRole } from "src/common/enums/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean{
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY,[
            context.getHandler(),
            context.getClass(),
        ]);
        if(!requiredRoles) return true;

        const { user } = context.switchToHttp().getRequest();

        const hasRole = requiredRoles.some((role) => Array.isArray(user.roles) ? user.roles.includes(role) : user.roles === role);
        if (!hasRole) {
            throw new ForbiddenException(`acceso denegado, necesitas uno de estos roles: ${requiredRoles.join(', ',)}`,);
        }

        return true;
    }
}