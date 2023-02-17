import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';

export function handleError(e) {
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
        handleError(
          new UnauthorizedException({
            message: 'Пользователь не авторизован',
          }),
        );
      }
      const tokenPayload = this.jwtService.verify(token);
      request.user = await this.userService.getUserByEmail(tokenPayload.email);
    } catch (e) {
      handleError(
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
      handleError(new HttpException('Нет доступа', HttpStatus.FORBIDDEN));
    }
    return true;
  }
}
