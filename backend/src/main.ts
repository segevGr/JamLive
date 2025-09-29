import * as dotenv from 'dotenv';
dotenv.config();

// test comment
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN!,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  });

  app.use('/images', express.static(join(__dirname, '..', 'public/images')));

  const port = process.env.PORT ?? 8000;
  await app.listen(port);
  console.log(`Server is running on port: ${port}`);
}
bootstrap();
