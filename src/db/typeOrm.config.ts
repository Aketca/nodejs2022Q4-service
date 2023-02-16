import * as dotenv from 'dotenv';
import { DataSourceOptions, DataSource } from 'typeorm';
import { user1676377370365 } from './migrations/1676377370365-user';
import { track1676565240480 } from './migrations/1676565240480-track';
import { album1676566301759 } from './migrations/1676566301759-album';
import { artist1676567388571 } from './migrations/1676567388571-artist';
import { User } from '../users/entities/user.entity';
import { Track } from '../tracks/entities/track.entity';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';

dotenv.config();

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  entities: [User, Track, Album, Artist],
  migrations: [
    user1676377370365,
    track1676565240480,
    album1676566301759,
    artist1676567388571,
  ],
};

const dataSource = new DataSource(config);
export default dataSource;
