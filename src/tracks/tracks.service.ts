import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const createdTrack = this.trackRepository.create(createTrackDto);
    return await this.trackRepository.save(createdTrack);
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({ where: { id: id } });
    if (track) {
      return track;
    }
    return undefined;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const updatedTrack = await this.findOne(id);
    if (updatedTrack) {
      Object.assign(updatedTrack, updateTrackDto);
      return await this.trackRepository.save(updatedTrack);
    }
    return undefined;
  }

  async remove(id: string) {
    const result = await this.trackRepository.delete(id);
    if (result.affected === 0) {
      return undefined;
    } else {
      return 'success';
    }
  }
}
