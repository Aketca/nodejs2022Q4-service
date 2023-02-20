import { IsNotEmpty, IsString, IsNumber, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @ValidateIf((object, value) => value !== null)
  @IsString()
  artistId: string | null;
  @ValidateIf((object, value) => value !== null)
  @IsString()
  albumId: string | null;
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
