import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {json, urlencoded} from 'express';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.use(json({limit: '10mb'}));
  app.use(urlencoded({extended: true, limit: '10mb'}));

  const config = new DocumentBuilder()
    .setTitle('Diploma-EDC')
    .setDescription('Movie-guesser API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  app.enableCors();

  await app.listen(3333);
}

bootstrap();