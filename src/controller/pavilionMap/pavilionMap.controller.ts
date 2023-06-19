import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PavilionMapService } from './pavilionMap.service';
import { CreatePavilionMapDto } from './dto/createPavilionMap.dto';
import { PavilionMapEntity } from '../../models/PavilionMap.entity';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PageDto } from '../../utils/pagination/page.dto';
import { PageOptionsDto } from '../../utils/dtos';

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

  @ApiOperation({
    summary: 'Получить список карт беседок',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: PageDto, status: 200 })
  @Get()
  getPavilionMaps(@Query() dto: PageOptionsDto, @Req() request: Request) {
    return this.pavilionMapService.getPavilionMaps(dto, request.user);
  }

  @ApiOperation({
    summary: 'Удалить карту беседок',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: PavilionMapEntity, status: 200 })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  deletePavilionMap(@Req() request: Request, @Param() params) {
    return this.pavilionMapService.deletePavilionMap(
      parseInt(params.id),
      request.user,
    );
  }
}
