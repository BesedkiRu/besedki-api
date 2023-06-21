import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { PavilionDto } from './pavilion.dto';

export class CreatePavilionDto extends PavilionDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  pavilionMap: number;
}
