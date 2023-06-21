import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../models/User.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDto } from './dto/User.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    return await this.repo.save(dto);
  }

  async getUserByEmail(email: string, selectPassword = false) {
    if (selectPassword) {
      return this.repo
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.email = :email', { email })
        .getOne();
    }
    return await this.repo.findOne({ email }, { loadRelationIds: true });
  }

  async getUserById(id: number, selectPassword = false) {
    if (selectPassword) {
      return this.repo
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.id = :id', { id })
        .getOne();
    }
    return await this.repo.findOne({ id }, { relations: ['organization'] });
  }

  async updateUser(user: UserDto) {
    return await this.repo.save(user);
  }
}
