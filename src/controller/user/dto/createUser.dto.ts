import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../types/enum-type';

export class CreateUserDto {
  readonly id: number;
  readonly role: UserRole;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Рустем' })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Галимов' })
  readonly surname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'test@mail.ru' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'qwerty123' })
  readonly password: string;
}
