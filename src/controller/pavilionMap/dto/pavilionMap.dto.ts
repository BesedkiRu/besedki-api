import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PavilionMapDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Лебяжье' })
  readonly name: string;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @ApiProperty({ example: [55.84158954990046, 48.968362759580394] })
  readonly coords: number[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Респ. Татарстан, г. Казань, ул. Пушкина 152' })
  readonly address: string;
}
