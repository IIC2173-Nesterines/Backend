import "dotenv/config"
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';
import sequelize from "./db/config";

@Module({
  imports: [
    SequelizeModule.forRoot(sequelize.options),
  ],
  providers: [AppService],
})

export class AppModule {}
