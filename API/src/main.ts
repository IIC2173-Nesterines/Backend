import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import sequelize from './db/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3001);

  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
    console.log('API started on port 3001');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

bootstrap();
