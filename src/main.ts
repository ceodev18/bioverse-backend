import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.enableCors();
  app.setGlobalPrefix('api')
  const PORT = process.env.PORT || 4000;
  app.use(express.json());
  await app.listen(PORT);
}
bootstrap();
