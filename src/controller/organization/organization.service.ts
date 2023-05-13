import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrganizationDto } from './dto/createOrganization.dto';
import { OrganizationEntity } from '../../models/Organization.entity';
import { UserEntity } from '../../models/User.entity';
import { throwError } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';

interface CreateOrganizationPayload extends CreateOrganizationDto {
  user: UserEntity;
}

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly repo: Repository<OrganizationEntity>,
    private userService: UserService,
  ) {}

  async createOrganization(
    payload: CreateOrganizationPayload,
  ): Promise<OrganizationEntity> {
    if (payload.user.organization) {
      throw new HttpException(
        'У пользователя уже есть огранизация',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const organization = await this.repo.save(payload);
    const user: UserEntity = await this.userService.getUserById(
      payload.user.id,
    );
    user.organization = organization.id;
    await this.userService.updateUser(user);
    return organization;
  }
}
