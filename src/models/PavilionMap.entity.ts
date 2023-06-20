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
import { PavilionEntity } from './Pavilion.entity';
import { ApiProperty } from '@nestjs/swagger';
import { OrganizationEntity } from './Organization.entity';
import { Exclude } from 'class-transformer';

@Index('pavilion_map_pkey', ['id'], { unique: true })
@Entity('pavilion_map', { schema: 'public' })
export class PavilionMapEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ApiProperty({ example: 'ООО Чайка' })
  @Column('text', { name: 'name' })
  name: string;

  @ApiProperty({ example: [55.84158954990046, 48.968362759580394] })
  @Column('numeric', { name: 'coords', array: true })
  coords: number[];

  @ApiProperty({ example: 'Респ. Татарстан, г. Казань, ул. Пушкина 152' })
  @Column('text', { name: 'address' })
  address: string;

  @ApiProperty({ example: OrganizationEntity })
  @ManyToOne(
    () => OrganizationEntity,
    (organization: OrganizationEntity) => organization.id,
    {
      primary: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'organization_id', referencedColumnName: 'id' }])
  organization: OrganizationEntity | number;

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

  @DeleteDateColumn({ select: false })
  @Exclude()
  deletedAt: Date;
}
