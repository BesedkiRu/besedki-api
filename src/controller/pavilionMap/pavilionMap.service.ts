import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePavilionMapDto } from './dto/createPavilionMap.dto';
import { PavilionMapEntity } from '../../models/PavilionMap.entity';
import { UserEntity } from '../../models/User.entity';
import { PageOptionsDto } from '../../utils/dtos';
import { PageDto } from '../../utils/pagination/page.dto';
import { PageMetaDto } from '../../utils/pagination/page-meta.dto';
import { OrganizationEntity } from '../../models/Organization.entity';

@Injectable()
export class PavilionMapService {
  constructor(
    @InjectRepository(PavilionMapEntity)
    private readonly repo: Repository<PavilionMapEntity>,
  ) {}

  async createPavilionMap(
    dto: CreatePavilionMapDto,
    user: UserEntity,
  ): Promise<PavilionMapEntity> {
    return await this.repo.save({ ...dto, organization: user.organization });
  }

  async getPavilionMapById(id: number) {
    return this.repo.findOne({ id }, { relations: ['organization'] });
  }

  async getPavilionMaps(
    pageOptionsDto: PageOptionsDto,
    user: UserEntity,
  ): Promise<PageDto<PavilionMapEntity>> {
    const queryBuilder = this.repo.createQueryBuilder('pavilion_map');

    if (user.organization instanceof OrganizationEntity) {
      queryBuilder
        .orderBy('pavilion_map.id', pageOptionsDto.order)
        .where('pavilion_map.organization = :organization', {
          organization: user.organization.id,
        })
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take);
      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      return new PageDto(entities, pageMetaDto);
    }
    throw new HttpException(
      'Не удалось получить карты беседок беседок. Попробуйте позже',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async deletePavilionMap(pavilionMapId: number, user: UserEntity) {
    if (!user.organization) {
      throw new HttpException(
        'У пользователя нет огранизация',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (user.organization instanceof OrganizationEntity) {
      const targetPavilionMap = await this.repo.findOne({
        id: pavilionMapId,
        organization: user.organization.id,
      });
      if (targetPavilionMap) {
        await this.repo.softDelete({ id: pavilionMapId });
        return targetPavilionMap;
      } else {
        throw new HttpException(
          'Такой карты беседок не существует',
          HttpStatus.NOT_FOUND,
        );
      }
    }
    throw new HttpException(
      'Не удалось удалить карту беседок. Попробуйте позже',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
