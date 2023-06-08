import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrganizationDto } from './dto/createOrganization.dto';
import { OrganizationEntity } from '../../models/Organization.entity';
import { UserEntity } from '../../models/User.entity';
import { UserService } from '../user/user.service';
import { UserRole } from '../../types/enum-type';

interface CreateOrganizationPayload extends CreateOrganizationDto {
  user: UserEntity;
}

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly repo: Repository<OrganizationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private userService: UserService,
    private readonly connection: Connection,
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

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const organization = await this.repo.create(payload);
      const savedOrganization = await queryRunner.manager.save(organization);

      const user: UserEntity = await this.userService.getUserById(
        payload.user.id,
      );
      user.organization = savedOrganization.id;
      user.role = UserRole.OWNER;
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();
      return savedOrganization;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw new HttpException(
        'Не удалось создать организацию. Попробуйте позже',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
