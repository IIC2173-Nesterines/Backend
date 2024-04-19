import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import sequelize from './db/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.API_PORT || 3000);

  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
    // await sequelize.sync({ force: true });
    // console.log('All models were synchronized successfully.');
    console.log(
      'API is running on: http://localhost:' + (process.env.API_PORT || 3000),
    );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

bootstrap();
