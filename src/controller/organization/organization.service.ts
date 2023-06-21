import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrganizationDto } from './dto/createOrganization.dto';
import { OrganizationEntity } from '../../models/Organization.entity';
import { UserEntity } from '../../models/User.entity';
import { UserService } from '../user/user.service';
import { UserRole } from '../../types/enum-type';

interface OrganizationRequestPayload extends CreateOrganizationDto {
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
    payload: OrganizationRequestPayload,
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

  async updateOrganization(payload: OrganizationRequestPayload) {
    if (!payload.user.organization) {
      throw new HttpException(
        'У пользователя нет огранизация',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (payload.user.organization instanceof OrganizationEntity) {
      return await this.repo.save({
        ...payload,
        id: payload.user.organization.id,
      });
    }
    throw new HttpException(
      'Не удалось обновить данные организации. Попробуйте позже',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  async deleteOrganization(user: UserEntity) {
    if (!user.organization) {
      throw new HttpException(
        'У пользователя нет огранизация',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (user.organization instanceof OrganizationEntity) {
        await queryRunner.manager.softDelete(OrganizationEntity, {
          id: user.organization.id,
        });

        const targetUser: UserEntity = await this.userService.getUserById(
          user.id,
        );
        targetUser.role = UserRole.CLIENT;
        await queryRunner.manager.save(targetUser);

        await queryRunner.commitTransaction();
        return HttpStatus.OK;
      }
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
