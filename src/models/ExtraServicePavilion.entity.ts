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
import { PavilionEntity } from './Pavilion.entity';
import { ExtraServiceEntity } from './ExtraService.entity';

@Index('extra_service_pavilion_pkey', ['id'], { unique: true })
@Entity('extra_service_pavilion', { schema: 'public' })
export class ExtraServicePavilionEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => PavilionEntity, (pavilion: PavilionEntity) => pavilion.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'pavilion_id', referencedColumnName: 'id' }])
  pavilion: PavilionEntity | number;

  @ManyToOne(
    () => ExtraServiceEntity,
    (extraService: ExtraServiceEntity) => extraService.id,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'extra_service_id', referencedColumnName: 'id' }])
  extraService: ExtraServiceEntity | number;

  @Column('numeric', { name: 'price', nullable: true, default: 0 })
  price: number | null;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;
}
