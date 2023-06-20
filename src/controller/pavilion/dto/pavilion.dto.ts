import { PavilionType } from '../../../types/enum-type';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PavilionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Беседка Уютная' })
  name: string;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @ApiProperty({ example: [55.84158954990046, 48.968362759580394] })
  coords: number[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 70 })
  square: number;

  @IsNotEmpty()
  @IsEnum(PavilionType)
  @ApiProperty({ example: PavilionType.PAVILION, enum: PavilionType })
  type: PavilionType;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 100 })
  capacity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 5 })
  bedrooms: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 5000 })
  price: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '/images/house-my.jpg' })
  mainImg: string | null;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({ example: ['/images/house-my.jpg', '/images/pavilion.jpg'] })
  images: string[] | null;

  @IsOptional()
  @IsNumber({}, { each: true })
  @ApiProperty({ example: [2, 3, 5] })
  extraServices: number[] | null;
}
