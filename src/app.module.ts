import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UserModule } from './controller/user/user.module';
import { AuthModule } from './controller/auth/auth.module';
import { OrganizationModule } from './controller/organization/organization.module';
import { PavilionMapModule } from './controller/pavilionMap/pavilionMap.module';
import { PavilionModule } from './controller/pavilion/pavilion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    AuthModule,
    OrganizationModule,
    PavilionMapModule,
    PavilionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
