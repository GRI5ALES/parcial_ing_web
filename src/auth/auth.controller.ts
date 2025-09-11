import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly user: UserService,
  ) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto){
    const user = await this.user.create(dto);

    return { id: user.id , username: user.username}
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto){
    const user = await this.auth.validateUser(dto);
    return this.auth.issueToken(user);
  }
  
}
