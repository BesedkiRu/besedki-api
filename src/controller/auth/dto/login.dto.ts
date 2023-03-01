import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'test@mail.ru' })
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @ApiProperty({ example: 'qwerty123' })
  readonly password: string;
}
