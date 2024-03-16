import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { TodosModule } from './todos/todos.module';
import { getTypeOrmConfig } from './config/typeorm';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTypeOrmConfig,
    }),
    UsersModule,
    AuthModule,
    TodosModule,
    StatusModule,
  ],
})
export class AppModule {}
