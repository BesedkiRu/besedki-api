import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  isEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Social } from '../../../types/enum-type';

export class OauthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'F0AbUR2VOO4b_-6VUTjU0TD5LlSJR' })
  readonly code: string;

  @IsNotEmpty()
  @IsEnum(Social)
  @ApiProperty({ example: 'google', enum: Social })
  readonly social: Social;
}
