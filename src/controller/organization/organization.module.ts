import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { OrganizationEntity } from '../../models/Organization.entity';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from '../../models/User.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationEntity, UserEntity]),
    AuthModule,
    UserModule,
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
