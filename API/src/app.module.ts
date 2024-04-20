import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';
import { FlightsModule } from './flights/flights.module';
import sequelize from './db/config';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelize.options),
    FlightsModule,
    ConfigModule.forRoot(),
  ],
  providers: [AppService],
})
export class AppModule {}
