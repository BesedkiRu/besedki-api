import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PavilionMapService } from './pavilionMap.service';
import { CreatePavilionMapDto } from './dto/createPavilionMap.dto';
import { PavilionMapEntity } from '../../models/PavilionMap.entity';

@ApiTags('Карта беседок')
@Controller('pavilion_map')
export class PavilionMapController {
  constructor(private readonly pavilionMapService: PavilionMapService) {}

  @ApiOperation({
    summary: 'Создать карту беседок',
  })
  @ApiResponse({ type: PavilionMapEntity, status: 201 })
  @Post('/create')
  createPavilionMap(@Body() dto: CreatePavilionMapDto) {
    return this.pavilionMapService.createPavilionMap(dto);
  }
}
