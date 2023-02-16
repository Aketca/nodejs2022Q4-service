// import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
// import { v4 as uuidv4 } from 'uuid';
// import { TracksService } from '../tracks/tracks.service';
// import { FavoritesService } from '../favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  // @Inject(forwardRef(() => TracksService))
  // private readonly tracksService: TracksService;
  // @Inject(forwardRef(() => FavoritesService))
  // private readonly favoritesService: FavoritesService;
  // private readonly albums: Album[] = [];

  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const createdAlbum = this.albumRepository.create(createAlbumDto);
    return await this.albumRepository.save(createdAlbum);
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    return await this.albumRepository.findOne({ where: { id: id } });
  }

  // findAllByIds(ids: Array<string>) {
  //   const result = [];
  //   ids.forEach((id) => {
  //     const el = this.findOne(id);
  //     result.push(el);
  //   });
  //   return result;
  // }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const updatedAlbum = await this.findOne(id);
    if (updatedAlbum) {
      Object.assign(updatedAlbum, updateAlbumDto);
      return await this.albumRepository.save(updatedAlbum);
    }
    return undefined;
  }

  async remove(id: string) {
    const result = await this.albumRepository.delete(id);
    if (result.affected === 0) {
      return undefined;
    } else {
      return 'success';
    }
  }

  // async removeArtistId(id: string) {
  //   const updatedTrack = await this.findOne(id);
  //   return await this.update(id, {
  //     ...updatedTrack,
  //     artistId: null,
  //   });
  // }
}
