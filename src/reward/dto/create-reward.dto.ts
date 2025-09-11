import { IsString } from "class-validator";

export class CreateRewardDto {
    @IsString()
    description: string;
}
