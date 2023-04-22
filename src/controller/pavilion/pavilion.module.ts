import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PavilionController } from './pavilion.controller';
import { PavilionService } from './pavilion.service';
import { PavilionEntity } from '../../models/Pavilion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PavilionEntity])],
  controllers: [PavilionController],
  providers: [PavilionService],
  exports: [PavilionService],
})
export class PavilionModule {}
