import * as dotenv from 'dotenv';
import { DataSourceOptions, DataSource } from 'typeorm';
import { migrationFile1676739405207 } from './migrations/1676739405207-migrationFile';
import { User } from '../users/entities/user.entity';
import { Track } from '../tracks/entities/track.entity';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Favorite } from '../favorites/entities/favorite.entity';

dotenv.config();

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  entities: [User, Artist, Album, Track, Favorite],
  migrations: [migrationFile1676739405207],
};

const dataSource = new DataSource(config);
export default dataSource;
