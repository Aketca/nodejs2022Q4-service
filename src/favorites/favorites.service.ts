import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class FavoritesService {
  @Inject(forwardRef(() => AlbumsService))
  @Inject(forwardRef(() => TracksService))
  @Inject(forwardRef(() => ArtistsService))
  private readonly albumsService: AlbumsService;
  private readonly tracksService: TracksService;
  private readonly artistsService: ArtistsService;
  private readonly favorites: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };
  addTrack(id: string) {
    if (!this.favorites.tracks.find((el) => el === id)) {
      this.favorites.tracks.push(id);
    }
    const detailInfo = this.tracksService.findOne(id);
    if (detailInfo) {
      return detailInfo;
    }
    return 422;
  }

  addAlbum(id: string) {
    if (!this.favorites.albums.find((el) => el === id)) {
      this.favorites.albums.push(id);
    }
    const detailInfo = this.albumsService.findOne(id);
    if (detailInfo) {
      return detailInfo;
    }
    return 422;
  }

  addArtist(id: string) {
    if (!this.favorites.artists.find((el) => el === id)) {
      this.favorites.artists.push(id);
    }
    const detailInfo = this.artistsService.findOne(id);
    if (detailInfo) {
      return detailInfo;
    }
    return 422;
  }

  removeTrack(id: string) {
    const index = this.favorites.tracks.findIndex((el) => el === id);
    if (index > -1) {
      this.favorites.tracks.splice(index, 1);
      return 'track was removed from favorites';
    }
    return undefined;
  }

  removeAlbum(id: string) {
    const index = this.favorites.albums.findIndex((el) => el === id);
    if (index > -1) {
      this.favorites.albums.splice(index, 1);
      return 'album was removed from favorites';
    }
    return undefined;
  }

  removeArtist(id: string) {
    const index = this.favorites.artists.findIndex((el) => el === id);
    if (index > -1) {
      this.favorites.artists.splice(index, 1);
      return 'artist was removed from favorites';
    }
    return undefined;
  }

  findAll() {
    return this.favorites;
  }
}
