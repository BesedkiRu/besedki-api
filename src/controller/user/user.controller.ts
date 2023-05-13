import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserEntity } from '../../models/User.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Получить пользователя',
  })
  @ApiBearerAuth()
  @ApiResponse({ type: UserEntity, status: 200 })
  @Get('/me')
  getUserByToken(@Req() request) {
    return this.userService.getUserById(request.user.id);
  }
}
