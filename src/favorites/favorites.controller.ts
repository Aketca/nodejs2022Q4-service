import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  ParseUUIDPipe,
  HttpCode,
  UseFilters,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ResponseInterceptor } from '../response.interceptor';
import { HttpExceptionFilter } from '../http-exception.filter';

@Controller('favs')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('/track/:id')
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Post('/album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Post('/artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.deleteTrack(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.deleteAlbum(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.deleteArtist(id);
  }

  @Get()
  findAllFavorites() {
    return this.favoritesService.returnAllFavorites();
  }
}
