import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async deleteUser(id: string): Promise<number> {
    return await this.userModel.destroy({ where: { id }, cascade: true });
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.userModel.findOne({ where: { id } });
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ where: { username } });
  }
}
