// import { forwardRef, Module } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
// import { FavoritesModule } from '../favorites/favorites.module';
// import { TracksModule } from '../tracks/tracks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
  imports: [
    // forwardRef(() => FavoritesModule),
    // forwardRef(() => TracksModule),
    TypeOrmModule.forFeature([Album]),
  ],
})
export class AlbumsModule {}
