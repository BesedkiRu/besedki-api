import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { UpdatePavilionMapDto } from './dto/updatePavilionMap.dto';

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
    summary: 'Получить список всех карт беседок',
  })
  @ApiResponse({ type: PageDto, status: 200 })
  @Get()
  getPavilionMaps(@Query() dto: PageOptionsDto) {
    return this.pavilionMapService.getPavilionMaps(dto);
  }

  @ApiOperation({
    summary: 'Получить список карт беседок пользователя',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: PageDto, status: 200 })
  @Get('/owner')
  getOwnerPavilionMaps(@Query() dto: PageOptionsDto, @Req() request: Request) {
    return this.pavilionMapService.getOwnerPavilionMaps(dto, request.user);
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

  @ApiOperation({
    summary: 'Изменить карту беседок',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: PavilionMapEntity, status: 200 })
  @Patch('')
  updatePavilionMap(
    @Body() dto: UpdatePavilionMapDto,
    @Req() request: Request,
  ) {
    return this.pavilionMapService.updatePavilionMap(dto, request.user);
  }
}
