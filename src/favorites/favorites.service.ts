import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class FavoritesService {
  @Inject(forwardRef(() => TracksService))
  private readonly tracksService: TracksService;
  @Inject(forwardRef(() => AlbumsService))
  private readonly albumsService: AlbumsService;
  @Inject(forwardRef(() => ArtistsService))
  private readonly artistsService: ArtistsService;
  private readonly favorites: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };

  addTrack(id: string) {
    const favoriteTracks = this.findAllTracks();
    const track = this.tracksService.findOne(id);
    if (track) {
      favoriteTracks.push(id);
      return track;
    }
    return 422;
  }

  addAlbum(id: string) {
    const favoriteAlbums = this.findAllAlbums();
    const album = this.albumsService.findOne(id);
    if (album) {
      favoriteAlbums.push(id);
      return album;
    }
    return 422;
  }

  addArtist(id: string) {
    const favoriteArtists = this.findAllArtists();
    const artist = this.artistsService.findOne(id);
    if (artist) {
      favoriteArtists.push(id);
      return artist;
    }
    return 422;
  }

  removeArtist(id: string) {
    const index = this.favorites.artists.findIndex((item) => item === id);
    if (index > -1) {
      this.favorites.artists.splice(index, 1);
    }
  }

  deleteArtist(id: string) {
    const favoriteArtists = this.findAllArtists();
    const index = favoriteArtists.findIndex((item) => item === id);
    if (index > -1) {
      favoriteArtists.splice(index, 1);
      return favoriteArtists;
    }
    return undefined;
  }

  removeAlbum(id: string) {
    const index = this.favorites.albums.findIndex((item) => item === id);
    if (index > -1) {
      this.favorites.albums.splice(index, 1);
    }
  }

  deleteAlbum(id: string) {
    const favoriteAlbums = this.findAllAlbums();
    const index = favoriteAlbums.findIndex((item) => item === id);
    if (index > -1) {
      favoriteAlbums.splice(index, 1);
      return favoriteAlbums;
    }
    return undefined;
  }

  removeTrack(id: string) {
    const index = this.favorites.tracks.findIndex((item) => item === id);
    if (index > -1) {
      this.favorites.tracks.splice(index, 1);
    }
  }

  deleteTrack(id: string) {
    const favoriteTracks = this.findAllTracks();
    const index = favoriteTracks.findIndex((item) => item === id);
    if (index > -1) {
      favoriteTracks.splice(index, 1);
      return favoriteTracks;
    }
    return undefined;
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

  returnAllFavorites() {
    // const favoriteTracks = this.findAllTracks();
    // const favoriteAlbums = this.findAllAlbums();
    // const favoriteArtists = this.findAllArtists();
    // const tracks = this.tracksService.findAllByIds(favoriteTracks);
    // const albums = this.albumsService.findAllByIds(favoriteAlbums);
    // const artists = this.artistsService.findAllByIds(favoriteArtists);
    // return {
    //   tracks,
    //   albums,
    //   artists,
    // };
  }
}
