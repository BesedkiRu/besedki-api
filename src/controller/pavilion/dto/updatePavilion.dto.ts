import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PavilionDto } from './pavilion.dto';

export class UpdatePavilionDto extends PavilionDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 1 })
  id: number;
}
