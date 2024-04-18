import "dotenv/config"
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      database: process.env.DATABASE_NAME,
      dialect: 'postgres',
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule
  ],
  providers: [AppService],
})

export class AppModule {}
