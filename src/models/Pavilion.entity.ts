import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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
import { PavilionType } from '../types/enum-type';
import { ApiProperty } from '@nestjs/swagger';
import { serviceExample } from '../types/examples';
import { Exclude } from 'class-transformer';

@Index('pavilion_pkey', ['id'], { unique: true })
@Entity('pavilion', { schema: 'public' })
export class PavilionEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ApiProperty({ example: 'Беседка Уютная' })
  @Column('text', { name: 'name' })
  name: string;

  @ApiProperty({ example: [55.84158954990046, 48.968362759580394] })
  @Column('numeric', { name: 'coords', array: true })
  coords: number[];

  @ApiProperty({ example: 70 })
  @Column('numeric', { name: 'square' })
  square: number;

  @ApiProperty({ example: PavilionType.PAVILION, enum: PavilionType })
  @Column({
    type: 'enum',
    enum: PavilionType,
    default: PavilionType.PAVILION,
  })
  type: PavilionType;

  @ApiProperty({ example: 100 })
  @Column('integer', { name: 'capacity' })
  capacity: number;

  @ApiProperty({ example: 5 })
  @Column('integer', { name: 'bedrooms' })
  bedrooms: number;

  @ApiProperty({ example: 5000 })
  @Column('numeric', { name: 'price' })
  price: number;

  @ApiProperty({ example: '/images/house-my.jpg' })
  @Column('text', { name: 'main_img', nullable: true })
  mainImg: string | null;

  @ApiProperty({ example: ['/images/house-my.jpg', '/images/pavilion.jpg'] })
  @Column('text', { name: 'images', default: [], array: true })
  images: string[] | null;

  @ApiProperty({ example: 2 })
  @ManyToOne(
    () => PavilionMapEntity,
    (pavilionMap: PavilionMapEntity) => pavilionMap.id,
    {
      primary: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'pavilion_map_id', referencedColumnName: 'id' }])
  pavilionMap: PavilionMapEntity | number;

  @ApiProperty({ example: [serviceExample] })
  @OneToMany(
    () => ExtraServicePavilionEntity,
    (extraServicePavilion: ExtraServicePavilionEntity) =>
      extraServicePavilion.pavilion,
  )
  extraServices: ExtraServicePavilionEntity[] | number[];

  @ApiProperty({ example: '2023-02-17 01:43:31.438015+03' })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @ApiProperty({ example: '2023-02-17 01:43:31.438015+03' })
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
