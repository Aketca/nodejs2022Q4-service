import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'integer' })
  year: number;

  @ManyToOne((type) => Artist, (artist) => artist.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @Column({ type: 'uuid', nullable: true, default: null })
  artistId: string;
}
