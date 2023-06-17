import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PavilionEntity } from './Pavilion.entity';
import { PavilionMapEntity } from './PavilionMap.entity';

@Index('organization_pkey', ['id'], { unique: true })
@Entity('organization', { schema: 'public' })
export class OrganizationEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ApiProperty({ example: 'ООО Чайка' })
  @Column('text', { name: 'name' })
  name: string;

  @ApiProperty({ example: 'Фролов Вадим Вадимовчи' })
  @Column('text', { name: 'director_full_name' })
  directorFullName: string;

  @ApiProperty({ example: 'test@mail.ru' })
  @Column('text', { name: 'email' })
  email: string;

  @ApiProperty({ example: '+7 965 451 87 12' })
  @Column('text', { name: 'phone' })
  phone: string;

  @OneToMany(
    () => PavilionMapEntity,
    (pavilionMap: PavilionMapEntity) => pavilionMap.organization,
  )
  pavilionMaps: PavilionEntity[];

  @OneToMany(() => UserEntity, (user: UserEntity) => user.organization)
  users: UserEntity[];

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

  @DeleteDateColumn()
  deletedAt?: Date;
}
