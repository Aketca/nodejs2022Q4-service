import * as dotenv from 'dotenv';
import { DataSourceOptions, DataSource } from 'typeorm';
import { user1676377370365 } from './migrations/1676377370365-user';
import { User } from '../users/entities/user.entity';

dotenv.config();

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  entities: [User],
  migrations: [user1676377370365],
};

const dataSource = new DataSource(config);
export default dataSource;
