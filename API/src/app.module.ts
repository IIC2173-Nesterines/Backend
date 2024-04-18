import "dotenv/config"
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';
import sequelize from "./db/config";

@Module({
  imports: [
    SequelizeModule.forRoot(sequelize.options),
    UsersModule
  ],
  providers: [AppService],
})

export class AppModule {}
