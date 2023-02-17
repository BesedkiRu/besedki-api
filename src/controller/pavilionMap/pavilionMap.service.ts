import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePavilionMapDto } from './dto/createPavilionMap.dto';
import { PavilionMapEntity } from '../../models/PavilionMap.entity';

@Injectable()
export class PavilionMapService {
  constructor(
    @InjectRepository(PavilionMapEntity)
    private readonly repo: Repository<PavilionMapEntity>,
  ) {}

  async createPavilionMap(
    dto: CreatePavilionMapDto,
  ): Promise<PavilionMapEntity> {
    return await this.repo.save(dto);
  }
}
