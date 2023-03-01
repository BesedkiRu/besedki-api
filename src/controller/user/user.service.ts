import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../models/User.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    return await this.repo.save(dto);
  }

  async getUserByEmail(email: string) {
    return await this.repo.findOne({ email });
  }

  async getUserById(id: number) {
    return await this.repo.findOne({ id });
  }
}
