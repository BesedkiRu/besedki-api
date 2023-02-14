import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';

@Index('organization_pkey', ['id'], { unique: true })
@Entity('organization', { schema: 'public' })
export class OrganizationEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'director_full_name' })
  directorFullName: string;

  @Column('text', { name: 'email' })
  email: string;

  @Column('text', { name: 'phone' })
  phone: string;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.organization)
  users: UserEntity[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;
}
