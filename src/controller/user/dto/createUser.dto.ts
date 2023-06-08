import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './User.dto';

export class CreateUserDto extends UserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'qwerty123' })
  readonly password: string;
}
