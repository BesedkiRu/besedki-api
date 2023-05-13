import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PavilionMapService } from './pavilionMap.service';
import { CreatePavilionMapDto } from './dto/createPavilionMap.dto';
import { PavilionMapEntity } from '../../models/PavilionMap.entity';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Карта беседок')
@Controller('pavilion_map')
export class PavilionMapController {
  constructor(private readonly pavilionMapService: PavilionMapService) {}

  @ApiOperation({
    summary: 'Создать карту беседок',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: PavilionMapEntity, status: 201 })
  @Post('/create')
  createPavilionMap(
    @Body() dto: CreatePavilionMapDto,
    @Req() request: Request,
  ) {
    return this.pavilionMapService.createPavilionMap(dto, request.user);
  }
}
