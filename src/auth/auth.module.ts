import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from "./strategies/jwt.stratrgy";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_PASSWORD'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES') || '15m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  
  
})
export class AuthModule {}
