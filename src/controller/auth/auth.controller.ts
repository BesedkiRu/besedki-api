import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokensDto } from './dto/tokens.dto';
import { CreateUserDto } from '../user/dto/createUser.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Авторизация пользователя',
  })
  @ApiResponse({ type: TokensDto, status: 200 })
  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ type: TokensDto, status: 201 })
  @Post('/signup')
  registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }
}
