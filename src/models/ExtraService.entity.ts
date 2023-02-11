import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrganizationEntity } from './Organization.entity';
import { RoleEntity } from './Roles.entity';
import { PavilionMapEntity } from './PavilionMap.entity';
import { ApiProperty } from '@nestjs/swagger';

@Index('extra_service_pkey', ['id'], { unique: true })
@Entity('extra_service', { schema: 'public' })
export class ExtraServiceEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ApiProperty({ example: '/uploads/filename.png' })
  @Column('text', { name: 'src' })
  src: string;

  @ApiProperty({ example: 'Фуршет' })
  @Column('text', { name: 'name' })
  name: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;
}
