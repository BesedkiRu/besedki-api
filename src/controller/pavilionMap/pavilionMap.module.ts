import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PavilionMapController } from './pavilionMap.controller';
import { PavilionMapService } from './pavilionMap.service';
import { PavilionMapEntity } from '../../models/PavilionMap.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PavilionMapEntity]),
    AuthModule,
    UserModule,
  ],
  controllers: [PavilionMapController],
  providers: [PavilionMapService],
  exports: [PavilionMapService],
})
export class PavilionMapModule {}
