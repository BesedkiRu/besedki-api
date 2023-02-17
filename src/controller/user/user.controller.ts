import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Получить пользователя',
  })
  @Get('/me')
  getUserByToken(@Req() request) {
    return request.user;
  }
}
