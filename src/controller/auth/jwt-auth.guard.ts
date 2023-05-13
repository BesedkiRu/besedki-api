import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';

export function throwError(e) {
  throw e;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const authHeader = request.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throwError(
          new UnauthorizedException({
            message: 'Пользователь не авторизован',
          }),
        );
      }
      const tokenPayload = this.jwtService.verify(token);
      request.user = await this.userService.getUserById(tokenPayload.id);
    } catch (e) {
      throwError(
        new UnauthorizedException({
          message: 'Пользователь не авторизован',
          error: e,
        }),
      );
    }
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    if (!roles.includes(request.user.role)) {
      throwError(new HttpException('Нет доступа', HttpStatus.FORBIDDEN));
    }
    return true;
  }
}
