import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PavilionController } from './pavilion.controller';
import { PavilionService } from './pavilion.service';
import { PavilionEntity } from '../../models/Pavilion.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { PavilionMapModule } from '../pavilionMap/pavilionMap.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PavilionEntity]),
    AuthModule,
    UserModule,
    PavilionMapModule,
  ],
  controllers: [PavilionController],
  providers: [PavilionService],
  exports: [PavilionService],
})
export class PavilionModule {}
