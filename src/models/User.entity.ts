import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './Roles.entity';

@Index('user_pkey', ['id'], { unique: true })
@Entity('user', { schema: 'public' })
export class OrganizerEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'surname' })
  surname: string;

  @Column('text', { name: 'email' })
  email: string;

  @Column('text', { name: 'password' })
  password: string;

  @ManyToOne(() => RoleEntity, (role: RoleEntity) => role.id, {
    onDelete: 'SET NULL',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role: RoleEntity | number;

  @Column('timestamptz', {
    name: 'reg_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  regDate: string;
}
