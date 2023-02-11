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
import { UserEntity } from './User.entity';
import { PavilionEntity } from './Pavilion.entity';

@Index('reserve_pkey', ['id'], { unique: true })
@Entity('reserve', { schema: 'public' })
export class ReserveEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'hours' })
  hours: number;

  @Column('text', { name: 'client_name' })
  clientName: string;

  @Column('text', { name: 'client_surname' })
  clientSurname: string;

  @Column('text', { name: 'client_phone' })
  clientPhone: string;

  @Column('integer', { name: 'guests' })
  guests: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    nullable: true,
  })
  @JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
  client: UserEntity | null;

  @ManyToOne(() => PavilionEntity, (pavilion: PavilionEntity) => pavilion.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'pavilion_id', referencedColumnName: 'id' }])
  pavilion: PavilionEntity;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;
}
