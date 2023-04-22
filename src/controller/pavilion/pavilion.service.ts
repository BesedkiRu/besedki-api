import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PavilionEntity } from '../../models/Pavilion.entity';
import { CreatePavilionDto } from './dto/createPavilion.dto';

@Injectable()
export class PavilionService {
  constructor(
    @InjectRepository(PavilionEntity)
    private readonly repo: Repository<PavilionEntity>,
  ) {}

  async createPavilion(dto: CreatePavilionDto): Promise<PavilionEntity> {
    return await this.repo.save(dto);
  }
}
