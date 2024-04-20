import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthzModule } from './authz/authz.module';
import { UsersModule } from './users/users.module';
// import { AppService } from './app.service';
import { FlightsModule } from './flights/flights.module';
import sequelize from './db/config';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelize.options),
    UsersModule,
    AuthzModule,
    FlightsModule,
    ConfigModule.forRoot(),
    AuthzModule,
    FlightsModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
