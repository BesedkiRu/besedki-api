import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PavilionMapService } from './pavilionMap.service';
import { CreatePavilionMapDto } from './dto/createPavilionMap.dto';
import { PavilionMapEntity } from '../../models/PavilionMap.entity';

@ApiTags('Карта беседок')
@Controller('pavilion_map')
export class PavilionMapController {
  constructor(private readonly organizationService: PavilionMapService) {}

  @ApiOperation({
    summary: 'Создать карту беседок',
  })
  @ApiResponse({ type: PavilionMapEntity, status: 201 })
  @Post('/create')
  getUserByToken(@Body() dto: CreatePavilionMapDto) {
    return this.organizationService.createPavilionMap(dto);
  }
}
