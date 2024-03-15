import { config as dotenvConfig } from 'dotenv';
import { DataSource } from 'typeorm';
import { getTypeOrmConfig } from './typeorm';

dotenvConfig();

export default new DataSource(getTypeOrmConfig());
