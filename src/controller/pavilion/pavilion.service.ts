import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PavilionEntity } from '../../models/Pavilion.entity';
import { CreatePavilionDto } from './dto/createPavilion.dto';
import { PageOptionsDto } from '../../utils/dtos';
import { PageDto } from '../../utils/pagination/page.dto';
import { PageMetaDto } from '../../utils/pagination/page-meta.dto';
import { UserEntity } from '../../models/User.entity';
import { PavilionMapService } from '../pavilionMap/pavilionMap.service';
import { OrganizationEntity } from '../../models/Organization.entity';
import { PavilionMapEntity } from '../../models/PavilionMap.entity';
import { UpdatePavilionDto } from './dto/updatePavilion.dto';

@Injectable()
export class PavilionService {
  constructor(
    @InjectRepository(PavilionEntity)
    private readonly repo: Repository<PavilionEntity>,
    private readonly pavilionMapService: PavilionMapService,
  ) {}

  async createPavilion(
    dto: CreatePavilionDto,
    user: UserEntity,
  ): Promise<PavilionEntity> {
    if (!user.organization) {
      throw new HttpException(
        'У пользователя нет организации',
        HttpStatus.FORBIDDEN,
      );
    }
    if (user.organization instanceof OrganizationEntity) {
      const targetPavilionMap =
        await this.pavilionMapService.getPavilionMapById(dto.pavilionMap);
      if (
        targetPavilionMap.organization instanceof OrganizationEntity &&
        targetPavilionMap.organization.id === user.organization.id
      ) {
        return await this.repo.save(dto);
      } else {
        throw new HttpException(
          'Такой карты беседок не существует',
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new HttpException(
        'Не удалось создать беседку. Попробуйте позже',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllPavilions(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<PavilionEntity>> {
    const queryBuilder = this.repo.createQueryBuilder('pavilion');
    queryBuilder
      .orderBy('pavilion.id', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async getPavilionMapItems(
    pageOptionsDto: PageOptionsDto,
    user: UserEntity,
    pavilionMapId: number,
  ): Promise<PageDto<PavilionEntity>> {
    const targetPavilionMap = await this.pavilionMapService.getPavilionMapById(
      pavilionMapId,
    );
    if (targetPavilionMap) {
      const queryBuilder = this.repo.createQueryBuilder('pavilion');
      queryBuilder
        .orderBy('pavilion.id', pageOptionsDto.order)
        .where('pavilion.pavilionMap = :pavilionMapId', {
          pavilionMapId,
        })
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take);
      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();

      const pageMetaDto = new PageMetaDto({
        itemCount,
        pageOptionsDto,
      });

      return new PageDto(entities, pageMetaDto);
    } else {
      throw new HttpException(
        'Такой карты беседок не существует',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deletePavilion(pavilionId: number, user: UserEntity) {
    if (!user.organization) {
      throw new HttpException(
        'У пользователя нет организации',
        HttpStatus.FORBIDDEN,
      );
    }
    if (user.organization instanceof OrganizationEntity) {
      const targetPavilion = await this.repo.findOne(
        {
          id: pavilionId,
        },
        { relations: ['pavilionMap', 'pavilionMap.organization'] },
      );
      if (
        targetPavilion &&
        targetPavilion.pavilionMap instanceof PavilionMapEntity &&
        targetPavilion.pavilionMap.organization instanceof OrganizationEntity &&
        targetPavilion.pavilionMap.organization.id === user.organization.id
      ) {
        await this.repo.softDelete({ id: pavilionId });
        return targetPavilion;
      } else {
        throw new HttpException(
          'Такой беседки не существует',
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }

  async updatePavilion(pavilion: UpdatePavilionDto, user: UserEntity) {
    if (!user.organization) {
      throw new HttpException(
        'У пользователя нет организации',
        HttpStatus.FORBIDDEN,
      );
    }
    if (user.organization instanceof OrganizationEntity) {
      const targetPavilion = await this.repo.findOne(
        {
          id: pavilion.id,
        },
        { relations: ['pavilionMap', 'pavilionMap.organization'] },
      );
      if (
        targetPavilion &&
        targetPavilion.pavilionMap instanceof PavilionMapEntity &&
        targetPavilion.pavilionMap.organization instanceof OrganizationEntity &&
        targetPavilion.pavilionMap.organization.id === user.organization.id
      ) {
        await this.repo.update({ id: pavilion.id }, pavilion);
        return { ...targetPavilion, ...pavilion };
      } else {
        throw new HttpException(
          'Такой беседки не существует',
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }
}
