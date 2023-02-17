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
import { ApiProperty } from '@nestjs/swagger';

@Index('pavilion_map_pkey', ['id'], { unique: true })
@Entity('pavilion_map', { schema: 'public' })
export class PavilionMapEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ApiProperty({ example: 'ООО Чайка' })
  @Column('text', { name: 'name' })
  name: string;

  @ApiProperty({ example: 'Респ. Татарстан, г. Казань, ул. Пушкина 152' })
  @Column('text', { name: 'address' })
  address: string;

  @OneToMany(
    () => PavilionEntity,
    (pavilion: PavilionEntity) => pavilion.pavilionMap,
  )
  pavilions: PavilionEntity[];

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
}
