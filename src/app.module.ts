import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavoritesModule } from './favorites/favorites.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST as string,
      port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
      username: process.env.POSTGRES_USER as string,
      password: process.env.POSTGRES_PASSWORD as string,
      database: process.env.POSTGRES_DATABASE as string,
      entities: ['dist/**/entities/*.entity.js'],
      migrations: [],
      migrationsRun: true,
      synchronize: false,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
