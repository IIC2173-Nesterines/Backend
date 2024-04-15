import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sequelize } from './database/connection';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  try {
    sequelize.authenticate()
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
bootstrap();
