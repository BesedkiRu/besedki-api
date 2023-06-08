import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './User.dto';

export class UpdateUserDto extends UserDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  readonly id: number;
}
