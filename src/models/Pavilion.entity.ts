import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PavilionMapEntity } from './PavilionMap.entity';
import { ExtraServicePavilionEntity } from './ExtraServicePavilion.entity';

@Index('pavilion_pkey', ['id'], { unique: true })
@Entity('pavilion', { schema: 'public' })
export class PavilionEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('numeric', { name: 'square' })
  square: number;

  @Column('text', { name: 'type' })
  type: string;

  @Column('integer', { name: 'capacity' })
  capacity: number;

  @Column('integer', { name: 'bedrooms' })
  bedrooms: number;

  @Column('numeric', { name: 'price' })
  price: number;

  @Column('text', { name: 'main_img', nullable: true })
  mainImg: string | null;

  @Column('text', { name: 'images', nullable: true, array: true })
  images: string[] | null;

  @ManyToOne(
    () => PavilionMapEntity,
    (pavilionMap: PavilionMapEntity) => pavilionMap.id,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'pavilion_map_id', referencedColumnName: 'id' }])
  pavilionMap: PavilionMapEntity | number;

  @OneToMany(
    () => ExtraServicePavilionEntity,
    (extraServicePavilion: ExtraServicePavilionEntity) =>
      extraServicePavilion.pavilion,
  )
  extraServices: ExtraServicePavilionEntity[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;
}
