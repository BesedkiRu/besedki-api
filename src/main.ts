import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from '../filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { configService } from './config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Besedki.ru API')
      .setDescription('API documentation for web-application of Besedki.ru')
      .addBearerAuth()
      .build(),
  );

  SwaggerModule.setup('docs', app, document);
  await app.listen(configService.getPort());
  console.log(`Server start on port: ${configService.getPort()}`);
}

bootstrap();
