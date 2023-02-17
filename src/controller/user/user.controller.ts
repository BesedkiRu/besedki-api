import { Controller, Get, Headers, HttpStatus } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Получить пользователя',
  })
  @Get('/me')
  getUserByToken(@Headers() headers) {
    return HttpStatus.OK;
  }
}
