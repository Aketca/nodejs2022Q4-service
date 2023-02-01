import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
// import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();
const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      transform: true,
    }),
  );
  // useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(port || 4000);
}
bootstrap();
