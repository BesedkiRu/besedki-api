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
import { getPavilionMapItemsDto } from './dto/getPavilionMapItems.dto';
import { OrganizationEntity } from '../../models/Organization.entity';

@Injectable()
export class PavilionService {
  constructor(
    @InjectRepository(PavilionEntity)
    private readonly repo: Repository<PavilionEntity>,
    private readonly pavilionMapService: PavilionMapService,
  ) {}

  async createPavilion(dto: CreatePavilionDto): Promise<PavilionEntity> {
    return await this.repo.save(dto);
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
    console.log(targetPavilionMap);
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
}
