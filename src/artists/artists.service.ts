import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistsService {
  private readonly artists: Artist[] = [];
  create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.artists.push(artist);
    return artist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    return this.artists.find((item) => item.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const item = this.artists.find((item) => item.id === id);
    if (item) {
      item.name = updateArtistDto.name;
      item.grammy = updateArtistDto.grammy;
      return item;
    }
    return undefined;
  }

  remove(id: string) {
    const index = this.artists.findIndex((item) => item.id === id);
    if (index > -1) {
      this.artists.splice(index, 1);
      return 'Artist was removed';
    }
    return undefined;
  }
}
