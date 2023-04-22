import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PavilionService } from './pavilion.service';
import { CreatePavilionDto } from './dto/createPavilion.dto';
import { PavilionEntity } from '../../models/Pavilion.entity';

@ApiTags('Беседка')
@Controller('pavilion')
export class PavilionController {
  constructor(private readonly pavilionService: PavilionService) {}

  @ApiOperation({
    summary: 'Создать беседку',
  })
  @ApiResponse({ type: PavilionEntity, status: 201 })
  @Post('/create')
  createPavilion(@Body() dto: CreatePavilionDto) {
    return this.pavilionService.createPavilion(dto);
  }
}
