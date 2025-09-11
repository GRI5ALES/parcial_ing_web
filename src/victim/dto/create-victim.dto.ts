import { IsArray, IsString } from "class-validator";

export class CreateVictimDto {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsArray()
    @IsString()
    skills: string[];

    @IsString()
    lastSeen: string;
}
