import { PavilionType } from '../../../enum-types/enum-type';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePavilionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Беседка Уютная' })
  name: string;

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

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 2 })
  pavilionMap: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  @ApiProperty({ example: [2, 3, 5] })
  extraServices: number[] | null;
}
