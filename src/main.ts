import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.enableCors({
    origin: "http://localhost:3000", // ✅ Allow requests from Next.js
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });
  app.setGlobalPrefix('api')
  const PORT = process.env.PORT || 4000;
  app.use(express.json());
  await app.listen(PORT);
}
bootstrap();
