import { UserEntity } from '../models/User.entity';
declare module 'express' {
  interface Request {
    user: UserEntity;
  }
}
