import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { LoggingService } from '../logging.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, LoggingService],
  exports: [ArtistsService],
  imports: [TypeOrmModule.forFeature([Artist])],
})
export class ArtistsModule {}
