import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { LoggingService } from '../logging.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, LoggingService],
  exports: [AlbumsService],
  imports: [TypeOrmModule.forFeature([Album])],
})
export class AlbumsModule {}
