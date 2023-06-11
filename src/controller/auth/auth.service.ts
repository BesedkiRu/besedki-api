import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { TokensDto } from './dto/tokens.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { OauthDto } from './dto/oauth.dto';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async oauthLogin(dto: OauthDto): Promise<any> {
    try {
      const $axios = axios.create();
      const response = await $axios.post(
        'https://oauth2.googleapis.com/token',
        {
          code: dto.code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: process.env.FRONT_URL + '/callback/google',
          grant_type: 'authorization_code',
        },
      );
      const token = response.data.access_token;
      const profileResponse = await $axios.get(
        'https://openidconnect.googleapis.com/v1/userinfo',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const findUser = await this.userService.getUserByEmail(
        profileResponse.data.email,
      );
      if (findUser) {
        return this.generateTokens(findUser);
      } else {
        const createdUser = await this.userService.createUser({
          name: profileResponse.data.given_name,
          surname: profileResponse.data.family_name,
          email: profileResponse.data.email,
          password: await bcrypt.hash(token, 5),
        });
        return this.generateTokens(createdUser);
      }
    } catch (e) {
      throw new HttpException(
        'Ошибка авторизации. Попробуйте позже.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(dto: LoginDto): Promise<TokensDto> {
    const user = await this.userService.getUserByEmail(dto.email, true);
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
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(
        { ...payload, type: 'access' },
        { expiresIn: process.env.ACCESS_EXP },
      ),
      refresh_token: this.jwtService.sign(
        { ...payload, type: 'refresh' },
        { expiresIn: '30 days' },
      ),
    };
  }

  async refreshTokens(refreshToken: RefreshTokenDto): Promise<TokensDto> {
    try {
      const tokenPayload = this.jwtService.verify(refreshToken.refresh);
      if (tokenPayload) {
        const user = await this.userService.getUserById(tokenPayload.id);
        if (user) {
          return await this.generateTokens(user);
        }
      }
    } catch (e) {}
    throw new HttpException(
      'Токен невалидный или истек срок годности',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
