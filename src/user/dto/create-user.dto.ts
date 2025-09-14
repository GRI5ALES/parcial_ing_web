import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "src/common/enums/roles.enum";

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(UserRole)
    @IsOptional()
    roles?: UserRole;
}
