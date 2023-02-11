import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PavilionEntity } from './Pavilion.entity';

@Index('pavilion_map_pkey', ['id'], { unique: true })
@Entity('pavilion_map', { schema: 'public' })
export class PavilionMapEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'address' })
  address: string;

  @OneToMany(
    () => PavilionEntity,
    (pavilion: PavilionEntity) => pavilion.pavilionMap,
  )
  pavilions: PavilionEntity[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;
}
