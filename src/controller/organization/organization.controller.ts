import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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
}
