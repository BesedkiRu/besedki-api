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
import { PavilionService } from './pavilion.service';
import { CreatePavilionDto } from './dto/createPavilion.dto';
import { PavilionEntity } from '../../models/Pavilion.entity';
import { PageOptionsDto } from '../../utils/dtos';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { PageDto } from '../../utils/pagination/page.dto';
import { UpdatePavilionDto } from './dto/updatePavilion.dto';

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
  createPavilion(@Body() dto: CreatePavilionDto, @Req() req: Request) {
    return this.pavilionService.createPavilion(dto, req.user);
  }

  @ApiOperation({
    summary: 'Получить все беседки',
  })
  @ApiResponse({ type: PageDto, status: 200 })
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

  @ApiOperation({
    summary: 'Удалить беседку',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: PavilionEntity, status: 200 })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  deletePavilionMap(@Req() request: Request, @Param() params) {
    return this.pavilionService.deletePavilion(
      parseInt(params.id),
      request.user,
    );
  }

  @ApiOperation({
    summary: 'Изменить беседку',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: PavilionEntity, status: 200 })
  @Patch('')
  updatePavilionMap(@Body() dto: UpdatePavilionDto, @Req() request: Request) {
    return this.pavilionService.updatePavilion(dto, request.user);
  }
}
