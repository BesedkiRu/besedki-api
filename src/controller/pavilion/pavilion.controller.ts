import {
  Body,
  Controller,
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
import { PavilionService } from './pavilion.service';
import { CreatePavilionDto } from './dto/createPavilion.dto';
import { PavilionEntity } from '../../models/Pavilion.entity';
import { PageOptionsDto } from '../../utils/dtos';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { getPavilionMapItemsDto } from './dto/getPavilionMapItems.dto';
import { Request } from 'express';
import { PageDto } from '../../utils/pagination/page.dto';

@ApiTags('Беседка')
@Controller('pavilion')
export class PavilionController {
  constructor(private readonly pavilionService: PavilionService) {}

  @ApiOperation({
    summary: 'Создать беседку',
  })
  @ApiResponse({ type: PavilionEntity, status: 201 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createPavilion(@Body() dto: CreatePavilionDto) {
    return this.pavilionService.createPavilion(dto);
  }

  @ApiOperation({
    summary: 'Получить все беседки',
  })
  @ApiResponse({ type: PavilionEntity, status: 200 })
  @Get('')
  getAllPavilions(@Query() dto: PageOptionsDto) {
    return this.pavilionService.getAllPavilions(dto);
  }

  @ApiOperation({
    summary: 'Получить беседки определенной карты',
  })
  @ApiResponse({ type: PageDto, status: 200 })
  @ApiParam({ name: 'pavilionMapId' })
  @Get('/:pavilionMapId')
  getPavilionMapItems(
    @Query() dto: PageOptionsDto,
    @Param() params,
    @Req() request: Request,
  ) {
    return this.pavilionService.getPavilionMapItems(
      dto,
      request.user,
      params.pavilionMapId,
    );
  }
}
