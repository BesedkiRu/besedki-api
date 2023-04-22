import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePavilionMapDto {
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Лебяжье' })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Респ. Татарстан, г. Казань, ул. Пушкина 152' })
  readonly address: string;
}
