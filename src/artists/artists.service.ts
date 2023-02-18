import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const createdArtist = this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(createdArtist);
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findAllByParams(data: string[]) {
    return await this.artistRepository.find({ where: { id: In(data) } });
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id: id } });
    if (artist) {
      return artist;
    }
    return undefined;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const updatedArtist = await this.findOne(id);
    if (updatedArtist) {
      Object.assign(updatedArtist, updateArtistDto);
      return await this.artistRepository.save(updatedArtist);
    }
    return undefined;
  }

  async remove(id: string) {
    const result = await this.artistRepository.delete(id);
    if (result.affected === 0) {
      return undefined;
    } else {
      return 'success';
    }
  }
}
