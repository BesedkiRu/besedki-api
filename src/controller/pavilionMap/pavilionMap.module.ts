import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PavilionMapController } from './pavilionMap.controller';
import { PavilionMapService } from './pavilionMap.service';
import { PavilionMapEntity } from '../../models/PavilionMap.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PavilionMapEntity])],
  controllers: [PavilionMapController],
  providers: [PavilionMapService],
  exports: [PavilionMapService],
})
export class PavilionMapModule {}
