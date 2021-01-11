import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // prefijo para acceder a la api
  // /api/endpoint
  app.setGlobalPrefix('api');

  // AppModule.port será setteado porque configuramos en el constructor de ConfigService que se le asigne el PORT correspondiente
  await app.listen(AppModule.port);
}
bootstrap();
