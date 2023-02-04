import { Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  private readonly favorites: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };

  removeArtist(id: string) {
    const index = this.favorites.artists.findIndex((item) => item === id);
    if (index > -1) {
      this.favorites.artists.splice(index, 1);
    }
  }

  removeAlbum(id: string) {
    const index = this.favorites.albums.findIndex((item) => item === id);
    if (index > -1) {
      this.favorites.albums.splice(index, 1);
    }
  }

  removeTrack(id: string) {
    const index = this.favorites.tracks.findIndex((item) => item === id);
    if (index > -1) {
      this.favorites.tracks.splice(index, 1);
    }
  }

  findAll() {
    return this.favorites;
  }

  findAllArtists() {
    return this.favorites.artists;
  }

  findAllAlbums() {
    return this.favorites.albums;
  }

  findAllTracks() {
    return this.favorites.tracks;
  }
}
