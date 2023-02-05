import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';

@Injectable()
export class ArtistsService {
  @Inject(forwardRef(() => FavoritesService))
  private readonly favoritesService: FavoritesService;
  @Inject(forwardRef(() => TracksService))
  private readonly tracksService: TracksService;
  @Inject(forwardRef(() => AlbumsService))
  private readonly albumsService: AlbumsService;
  private readonly artists: Artist[] = [];
  create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.artists.push(artist);
    return artist;
  }

  async findAll() {
    return this.artists;
  }

  findOne(id: string) {
    return this.artists.find((item) => item.id === id);
  }

  findAllByIds(ids: Array<string>) {
    const result = [];
    ids.forEach((id) => {
      const el = this.findOne(id);
      result.push(el);
    });
    return result;
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
      this.favoritesService.removeArtist(id);
      this.albumsService.removeArtistId(id);
      this.tracksService.removeArtistId(id);
      this.artists.splice(index, 1);
      return 'Artist was removed';
    }
    return undefined;
  }
}
