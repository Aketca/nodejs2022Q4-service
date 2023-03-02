import { Inject, Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(TracksService)
    private tracksService: TracksService,
    @Inject(AlbumsService)
    private albumsService: AlbumsService,
    @Inject(ArtistsService)
    private artistsService: ArtistsService,
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async addTrack(id: string) {
    const track = await this.tracksService.findOne(id);
    const favoriteTrack = await this.favoriteRepository.findOne({
      where: { trackId: id },
    });
    if (track && !favoriteTrack) {
      const createdFavoriteTrack = this.favoriteRepository.create({
        trackId: id,
      });
      await this.favoriteRepository.save(createdFavoriteTrack);
      return track;
    }
    return 422;
  }

  async addAlbum(id: string) {
    const album = await this.albumsService.findOne(id);
    const favoriteAlbum = await this.favoriteRepository.findOne({
      where: { albumId: id },
    });
    if (album && !favoriteAlbum) {
      const createdFavoriteAlbum = this.favoriteRepository.create({
        albumId: id,
      });
      await this.favoriteRepository.save(createdFavoriteAlbum);
      return album;
    }
    return 422;
  }

  async addArtist(id: string) {
    const artist = await this.artistsService.findOne(id);
    const favoriteArtist = await this.favoriteRepository.findOne({
      where: { artistId: id },
    });
    if (artist && !favoriteArtist) {
      const createdFavoriteArtist = this.favoriteRepository.create({
        artistId: id,
      });
      await this.favoriteRepository.save(createdFavoriteArtist);
      return artist;
    }
    return 422;
  }

  async deleteArtist(id: string) {
    const result = await this.favoriteRepository.delete({ artistId: id });
    if (result.affected === 0) {
      return undefined;
    } else {
      return 'success';
    }
  }

  async deleteAlbum(id: string) {
    const result = await this.favoriteRepository.delete({ albumId: id });
    if (result.affected === 0) {
      return undefined;
    } else {
      return 'success';
    }
  }

  async deleteTrack(id: string) {
    const result = await this.favoriteRepository.delete({ trackId: id });
    if (result.affected === 0) {
      return undefined;
    } else {
      return 'success';
    }
  }

  async returnAllFavorites() {
    const tracks = await this.favoriteRepository.find({
      where: {
        trackId: Not(IsNull()),
      },
    });
    const albums = await this.favoriteRepository.find({
      where: {
        albumId: Not(IsNull()),
      },
    });
    const artists = await this.favoriteRepository.find({
      where: {
        artistId: Not(IsNull()),
      },
    });
    const tracksIds = tracks.map((item) => item.trackId);
    const albumsIds = albums.map((item) => item.albumId);
    const artistsIds = artists.map((item) => item.artistId);
    const tracksResult = await this.tracksService.findAllByParams(tracksIds);
    const albumResult = await this.albumsService.findAllByParams(albumsIds);
    const artistsResult = await this.artistsService.findAllByParams(artistsIds);
    return {
      tracks: tracksResult,
      albums: albumResult,
      artists: artistsResult,
    };
  }
}
