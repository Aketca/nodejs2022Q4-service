import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';
import { Track } from '../../tracks/entities/track.entity';

@Entity('favorite')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @OneToOne((type) => Artist, (artist) => artist.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @Column({ type: 'uuid', nullable: true, default: null })
  artistId: string;

  @OneToOne((type) => Album, (album) => album.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'albumId' })
  album: Album;

  @Column({ type: 'uuid', nullable: true, default: null })
  albumId: string;

  @OneToOne((type) => Track, (track) => track.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trackId' })
  track: Track;

  @Column({ type: 'uuid', nullable: true, default: null })
  trackId: string;
}
