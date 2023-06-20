import { IsInt, IsNotEmpty } from 'class-validator';
import { PavilionMapDto } from './pavilionMap.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePavilionMapDto extends PavilionMapDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  id: number;
}
