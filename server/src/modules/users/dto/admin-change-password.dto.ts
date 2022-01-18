import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class AdminChangePasswordDto {
    @ApiProperty({example:'hello'})
    @IsString()
    @MinLength(5)
    password:string;
}