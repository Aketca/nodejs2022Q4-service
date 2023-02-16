// import { forwardRef, Module } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
// import { FavoritesModule } from '../favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
  imports: [
    // forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([Track]),
  ],
})
export class TracksModule {}
