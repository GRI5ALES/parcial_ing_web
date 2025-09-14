import { IsString, IsUUID } from "class-validator";

export class CreateRewardDto {
    @IsString()
    description: string;

    @IsUUID()
    assignedToId: string;
}
