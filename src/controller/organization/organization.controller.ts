import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/createOrganization.dto';
import { OrganizationEntity } from '../../models/Organization.entity';

@ApiTags('Организация')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @ApiOperation({
    summary: 'Создать организацию',
  })
  @ApiResponse({ type: OrganizationEntity, status: 201 })
  @Post('/create')
  getUserByToken(@Body() dto: CreateOrganizationDto) {
    return this.organizationService.createOrganization(dto);
  }
}
