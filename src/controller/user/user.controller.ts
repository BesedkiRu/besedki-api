import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Headers } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Получить пользователя',
  })
  @Get('/me')
  getUserByToken(@Headers() headers) {
    console.log(headers.Authorization);
    return HttpStatus.OK;
  }
}
