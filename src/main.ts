import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  const seedService = app.get(SeedService);
  await seedService.seedAll();
  const PORT = app.get(ConfigService).get('PORT');
  await app.listen(PORT);
}
bootstrap();
