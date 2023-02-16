import { Injectable } from '@nestjs/common';
// import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
// import { v4 as uuidv4 } from 'uuid';
// import { FavoritesService } from '../favorites/favorites.service';
// import { TracksService } from '../tracks/tracks.service';
// import { AlbumsService } from '../albums/albums.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  // @Inject(forwardRef(() => FavoritesService))
  // private readonly favoritesService: FavoritesService;
  // @Inject(forwardRef(() => TracksService))
  // private readonly tracksService: TracksService;
  // @Inject(forwardRef(() => AlbumsService))
  // private readonly albumsService: AlbumsService;
  // private readonly artists: Artist[] = [];
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const createdArtist = this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(createdArtist);
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    return await this.artistRepository.findOne({ where: { id: id } });
  }

  // findAllByIds(ids: Array<string>) {
  //   const result = [];
  //   ids.forEach((id) => {
  //     const el = this.findOne(id);
  //     result.push(el);
  //   });
  //   return result;
  // }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const updatedArtist = await this.findOne(id);
    if (updatedArtist) {
      Object.assign(updatedArtist, updateArtistDto);
      return await this.artistRepository.save(updatedArtist);
    }
    return undefined;
  }

  async remove(id: string) {
    const result = await this.artistRepository.delete(id);
    if (result.affected === 0) {
      return undefined;
    } else {
      return 'success';
    }
  }
}
