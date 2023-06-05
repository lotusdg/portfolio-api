import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const userExists = await this.usersService.findUserByUsername(
      signUpDto.username,
    );
    if (userExists) {
      throw new HttpException('user already exists', HttpStatus.CONFLICT);
    }
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const { accessToken } = await this.authService.login(loginDto);
    res.cookie('access_token', accessToken, { httpOnly: true });
    res.send();
  }
}
