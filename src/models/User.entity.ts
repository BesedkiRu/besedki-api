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
import { UserRole } from '../enum-types/enum-type';
import { Exclude } from 'class-transformer';

@Index('user_pkey', ['id'], { unique: true })
@Entity('user', { schema: 'public' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'surname' })
  surname: string;

  @Column('text', { name: 'email' })
  email: string;

  @Exclude()
  @Column('text', { name: 'password' })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @ManyToOne(
    () => OrganizationEntity,
    (organization: OrganizationEntity) => organization.id,
    {
      onDelete: 'SET NULL',
      onUpdate: 'RESTRICT',
      nullable: true,
    },
  )
  @JoinColumn([{ name: 'organization_id', referencedColumnName: 'id' }])
  organization: OrganizationEntity | number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;
}
