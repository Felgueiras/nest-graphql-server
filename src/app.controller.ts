import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { LoginUserDto } from './users/dto/login-user.dto';
import { RegisterUserDto } from './users/dto/register-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @Post('auth/login')
  async login(@Body() loginUserDTO: LoginUserDto) {
    return this.authService.login(loginUserDTO);
  }

  @Post('auth/recover')
  async recoverPassword(@Request() req) {
    return this.authService.recoverPassword(req.body);
  }

  @Post('auth/delete')
  async delete(@Request() req) {
    return this.authService.delete(req.body);
  }

  @Post('auth/register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  findAll(): string {
    return this.appService.helloWorld();
  }
}
