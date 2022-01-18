import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsInt, IsNumber } from "class-validator";
import { UserEntity } from "../entities/user.entity";

export class GetListUserDto {
    @ApiProperty({example:1})
    @IsInt()
    page:number;

    @ApiProperty({example:10})
    @IsInt()
    pageSize:number;
    
}
export class ResGetListUserDto extends OmitType(UserEntity,['password']) {}