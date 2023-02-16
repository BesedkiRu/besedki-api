import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { TokensDto } from './dto/tokens.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<TokensDto> {
    const user = await this.userService.getUserByEmail(dto.email);
    if (user) {
      const userPassword = bcrypt.compareSync(dto.password, user.password);
      if (userPassword) {
        return await this.generateTokens(user);
      } else {
        throw new HttpException(
          'Неверный пароль или email',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(
        'Такого пользователя не существует',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async registration(dto: CreateUserDto): Promise<TokensDto> {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже есть',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hash = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({
      ...dto,
      password: hash,
    });
    return this.generateTokens(user);
  }

  async generateTokens(user: CreateUserDto): Promise<TokensDto> {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '30m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '30 days' }),
    };
  }
  // async refreshTokens(refreshToken: RefreshTokenDto): Promise<TokensDto> {
  //   return a
  // }
}
