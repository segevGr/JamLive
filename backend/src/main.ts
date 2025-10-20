import * as dotenv from 'dotenv';
dotenv.config();

// note for cache 3
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const frontendOrigin = process.env.FRONTEND_URL || 'http://localhost';
  app.enableCors({
    origin: frontendOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  });

  app.use('/images', express.static(join(__dirname, '..', 'public/images')));

  const port = process.env.PORT ?? 8000;
  await app.listen(port);
  console.log(`Server is running on port: ${port}`);
}
bootstrap();
