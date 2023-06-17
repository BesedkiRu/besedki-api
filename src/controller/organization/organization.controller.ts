import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/createOrganization.dto';
import { OrganizationEntity } from '../../models/Organization.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@ApiTags('Организация')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @ApiOperation({
    summary: 'Создать организацию',
  })
  @ApiResponse({ type: OrganizationEntity, status: 201 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createOrganization(
    @Body() dto: CreateOrganizationDto,
    @Req() request: Request,
  ) {
    return this.organizationService.createOrganization({
      ...dto,
      user: request.user,
    });
  }

  @ApiOperation({
    summary: 'Изменить организацию',
  })
  @ApiResponse({ type: OrganizationEntity, status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('')
  updateOrganization(
    @Body() dto: CreateOrganizationDto,
    @Req() request: Request,
  ) {
    return this.organizationService.updateOrganization({
      ...dto,
      user: request.user,
    });
  }

  @ApiOperation({
    summary: 'Удалить организацию',
  })
  @ApiResponse({ type: OrganizationEntity, status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('')
  deleteOrganization(@Req() request: Request) {
    return this.organizationService.deleteOrganization(request.user);
  }
}
