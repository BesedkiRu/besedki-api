import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserEntity } from '../../models/User.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Request } from 'express';

@ApiTags('Пользователь')
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
  getUserByToken(@Req() request: Request) {
    return this.userService.getUserById(request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Изменить пользователя',
  })
  @ApiBearerAuth()
  @ApiResponse({ type: UserEntity, status: 200 })
  @Patch()
  updateUserByToken(@Req() request: Request, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser({ ...dto, id: request.user.id });
  }
}
