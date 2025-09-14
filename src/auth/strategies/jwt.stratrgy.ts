import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRole } from "src/common/enums/roles.enum";
import { ReturnDocument } from "typeorm";

interface JwtPayload {
    sub: string,
    username: string,
    roles: UserRole[],
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(private readonly config: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>('JWT_SECRET_PASSWORD')!,
        });
    }

    async validate(payload: JwtPayload){
        return {
            userId: payload.sub,
            username: payload.username,
            role: payload.roles,
        }
    }
}
