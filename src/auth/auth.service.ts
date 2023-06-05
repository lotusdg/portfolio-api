import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/auth.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  async validateUserById(userId: string): Promise<User | null> {
    const user = await this.usersService.findUserById(+userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.validateUserByEmailAndPassword(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: IJwtPayload = {
      userId: user.id.toString(),
      username: user.username,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  private async validateUserByEmailAndPassword(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersService.findUserByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
