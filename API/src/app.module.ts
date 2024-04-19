import 'dotenv/config';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthzModule } from './authz/authz.module';
import sequelize from './db/config';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelize.options),
    UsersModule,
    AuthzModule,
  ],
})
export class AppModule {}
