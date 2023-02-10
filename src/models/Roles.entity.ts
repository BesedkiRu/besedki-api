import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles', { schema: 'public' })
export class RoleEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'name' })
  name: string;
}
