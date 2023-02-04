import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  ParseUUIDPipe,
  HttpCode,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ResponseInterceptor } from '../response.interceptor';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';

@Controller('album')
@UseInterceptors(ResponseInterceptor)
export class AlbumsController {
  constructor(
    @Inject(forwardRef(() => TracksService))
    @Inject(forwardRef(() => FavoritesService))
    private readonly tracksService: TracksService,
    private readonly favoritesService: FavoritesService,
    private readonly albumsService: AlbumsService,
  ) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    await this.favoritesService.removeAlbum(id);
    await this.tracksService.removeAlbumId(id);
    return this.albumsService.remove(id);
  }
}
