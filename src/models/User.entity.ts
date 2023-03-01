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
import { ApiProperty } from '@nestjs/swagger';

@Index('user_pkey', ['id'], { unique: true })
@Entity('user', { schema: 'public' })
export class UserEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ApiProperty({ example: 'Rustem' })
  @Column('text', { name: 'name' })
  name: string;

  @ApiProperty({ example: 'Galimov' })
  @Column('text', { name: 'surname' })
  surname: string;

  @ApiProperty({ example: 'example@mail.ru' })
  @Column('text', { name: 'email' })
  email: string;

  @Exclude()
  @Column('text', { name: 'password' })
  password: string;

  @ApiProperty({ example: UserRole.CLIENT })
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
