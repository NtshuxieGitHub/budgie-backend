import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ENV from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(ENV.port));
}
void bootstrap();
