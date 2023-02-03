import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { FavoritesModule } from '../favorites/favorites.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
  ],
})
export class ArtistsModule {}
