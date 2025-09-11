import { IsString } from "class-validator";

export class CreateFeedbackDto {
    @IsString()
    message: string;

    @IsString()
    athor: string;
}
