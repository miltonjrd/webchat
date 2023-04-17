import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000'
  });
  //app.useGlobalFilters(new TypeOrmExceptionFilter());
  await app.listen(5000);
}
bootstrap();
