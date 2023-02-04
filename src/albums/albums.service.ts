import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService {
  private readonly albums: Album[] = [];
  async create(createAlbumDto: CreateAlbumDto) {
    const user = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.albums.push(user);
    return user;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    return this.albums.find((item) => item.id === id);
  }

  findAllByIds(ids: Array<string>) {
    const result = [];
    ids.forEach((id) => {
      const el = this.findOne(id);
      result.push(el);
    });
    return result;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const item = this.albums.find((item) => item.id === id);
    if (item) {
      item.name = updateAlbumDto.name;
      item.year = updateAlbumDto.year;
      item.artistId = updateAlbumDto.artistId;
      return item;
    }
    return undefined;
  }

  remove(id: string) {
    const index = this.albums.findIndex((item) => item.id === id);
    if (index > -1) {
      this.albums.splice(index, 1);
      return 'Album was removed';
    }
    return undefined;
  }

  removeArtistId(id: string) {
    this.albums.forEach((item, index) => {
      if (item.artistId === id) {
        item.artistId = null;
        this.albums[index] = item;
      }
    });
  }
}
