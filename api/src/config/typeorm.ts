import { DataSourceOptions } from 'typeorm';
import { configuration } from './configuration';
import { User } from '../users/entities/user.entity';
import { TodoItem } from '../todos/entities/todo-item.entity';

export const getTypeOrmConfig = (): DataSourceOptions => {
  const { database } = configuration();
  return {
    type: 'postgres',
    host: database.host,
    port: database.port,
    username: database.user,
    password: database.password,
    database: database.dbName,
    entities: [User, TodoItem],
    migrations: ['./dist/database-migrations/*.js'],
    migrationsRun: true,
  };
};
