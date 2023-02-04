import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  ParseUUIDPipe,
  HttpCode,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ResponseInterceptor } from '../response.interceptor';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Controller('favs')
@UseInterceptors(ResponseInterceptor)
export class FavoritesController {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post('/track/:id')
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const favoriteTracks = this.favoritesService.findAllTracks();
    const track = this.tracksService.findOne(id);
    if (track) {
      favoriteTracks.push(id);
      return track;
    }
    return 422;
  }

  @Post('/album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const favoriteAlbums = this.favoritesService.findAllAlbums();
    const album = this.albumsService.findOne(id);
    if (album) {
      favoriteAlbums.push(id);
      return album;
    }
    return 422;
  }

  @Post('/artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const favoriteArtists = this.favoritesService.findAllArtists();
    const artist = this.artistsService.findOne(id);
    if (artist) {
      favoriteArtists.push(id);
      return artist;
    }
    return 422;
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const favoriteTracks = this.favoritesService.findAllTracks();
    const index = favoriteTracks.findIndex((item) => item === id);
    if (index > -1) {
      favoriteTracks.splice(index, 1);
      return favoriteTracks;
    }
    return undefined;
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const favoriteAlbums = this.favoritesService.findAllAlbums();
    const index = favoriteAlbums.findIndex((item) => item === id);
    if (index > -1) {
      favoriteAlbums.splice(index, 1);
      return favoriteAlbums;
    }
    return undefined;
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const favoriteArtists = this.favoritesService.findAllArtists();
    const index = favoriteArtists.findIndex((item) => item === id);
    if (index > -1) {
      favoriteArtists.splice(index, 1);
      return favoriteArtists;
    }
    return undefined;
  }

  @Get()
  findAllFavorites() {
    const favoriteTracks = this.favoritesService.findAllTracks();
    const favoriteAlbums = this.favoritesService.findAllAlbums();
    const favoriteArtists = this.favoritesService.findAllArtists();
    const tracks = this.tracksService.findAllByIds(favoriteTracks);
    const albums = this.albumsService.findAllByIds(favoriteAlbums);
    const artists = this.artistsService.findAllByIds(favoriteArtists);
    return {
      tracks,
      albums,
      artists,
    };
  }
}
