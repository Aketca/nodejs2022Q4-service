import { IsNotEmpty, IsString, IsNumber, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @ValidateIf((object, value) => value !== null)
  @IsString()
  artistId: string | null; // refers to Artist
}
