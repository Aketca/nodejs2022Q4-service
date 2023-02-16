// import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
// import { v4 as uuidv4 } from 'uuid';
// import { FavoritesService } from '../favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  // @Inject(forwardRef(() => FavoritesService))
  // private readonly favoritesService: FavoritesService;

  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const createdTrack = this.trackRepository.create(createTrackDto);
    return await this.trackRepository.save(createdTrack);
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    return await this.trackRepository.findOne({ where: { id: id } });
  }

  // async findAllByIds(ids: Array<string>) {
  //   const result = [];
  //   ids.forEach((id) => {
  //     const el = this.findOne(id);
  //     result.push(el);
  //   });
  //   return result;
  // }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const updatedTrack = await this.findOne(id);
    if (updatedTrack) {
      Object.assign(updatedTrack, updateTrackDto);
      return await this.trackRepository.save(updatedTrack);
    }
    return undefined;
  }

  async remove(id: string) {
    const result = await this.trackRepository.delete(id);
    if (result.affected === 0) {
      return undefined;
    } else {
      return 'success';
    }
  }

  // async removeAlbumId(id: string) {
  //   const updatedTrack = await this.findOne(id);
  //   return await this.update(id, {
  //     ...updatedTrack,
  //     albumId: null,
  //   });
  // }
  //
  // async removeArtistId(id: string) {
  //   const updatedTrack = await this.findOne(id);
  //   return await this.update(id, {
  //     ...updatedTrack,
  //     artistId: null,
  //   });
  // }
}
