import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/common/enums/roles.enum';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly users: UserService,
        private readonly jwt: JwtService
    ){}

    async validateUser({username, passwordDelUser}: LoginDto){
        const user = await this.users.findByUsername(username);
        if(!user) throw new UnauthorizedException("credenciales invalidas");

        const contraseñaValida: boolean = 
        await this.users.validatePassword(user, passwordDelUser);
        
        if(!contraseñaValida) throw new UnauthorizedException("credenciales invalidas");

        const { password, ...userSinPassword} = user
        return userSinPassword
    }

    async issueToken(user: {id: string, username: string, roles?: UserRole}){
        const payload = {
            sub: user.id,
            username: user.username,
            roles: user.roles ?? UserRole.DEVELOPER, // debe ser 'roles'
        };
        return {
            access_token: this.jwt.sign(payload),
        };
    }
}
