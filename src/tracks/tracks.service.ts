import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TracksService {
  private readonly tracks: Track[] = [];
  create(createTrackDto: CreateTrackDto) {
    const track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    this.tracks.push(track);
    return track;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    return this.tracks.find((item) => item.id === id);
  }

  findAllByIds(ids: Array<string>) {
    const result = [];
    ids.forEach((id) => {
      const el = this.findOne(id);
      result.push(el);
    });
    return result;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const item = this.tracks.find((item) => item.id === id);
    if (item) {
      item.name = updateTrackDto.name;
      item.artistId = updateTrackDto.artistId;
      item.albumId = updateTrackDto.albumId;
      item.duration = updateTrackDto.duration;
      return item;
    }
    return undefined;
  }

  remove(id: string) {
    const index = this.tracks.findIndex((item) => item.id === id);
    if (index > -1) {
      this.tracks.splice(index, 1);
      return 'Track was removed';
    }
    return undefined;
  }

  removeAlbumId(id: string) {
    this.tracks.forEach((item, index) => {
      if (item.albumId === id) {
        item.albumId = null;
        this.tracks[index] = item;
      }
    });
  }

  removeArtistId(id: string) {
    this.tracks.forEach((item, index) => {
      if (item.artistId === id) {
        item.artistId = null;
        this.tracks[index] = item;
      }
    });
  }
}
