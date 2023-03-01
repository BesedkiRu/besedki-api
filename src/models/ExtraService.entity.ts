import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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
