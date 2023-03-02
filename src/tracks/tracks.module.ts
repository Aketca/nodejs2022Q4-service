import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { LoggingService } from '../logging.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, LoggingService],
  exports: [TracksService],
  imports: [TypeOrmModule.forFeature([Track])],
})
export class TracksModule {}
