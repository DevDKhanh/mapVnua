import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class AddPermissionAdminDto {
  @ApiProperty({ description: 'quyền xem', example: true })
  @IsBoolean()
  @IsOptional()
  permissionSeen: boolean;

  @ApiProperty({ description: 'quyền sửa', example: true })
  @IsBoolean()
  @IsOptional()
  permissionEdit: boolean;

  @ApiProperty({ description: 'quyền xóa', example: true })
  @IsBoolean()
  @IsOptional()
  permissionDelete: boolean;

  @ApiProperty({ description: 'quyền tạo mới', example: true })
  @IsBoolean()
  @IsOptional()
  permissionCreate: boolean;
}
