import {
  Controller,
  Request,
  Param,
  Delete,
  Res,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IGetUserAuthInfoRequest } from 'src/types/interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUserById(
    @Param('id') id: string,
    @Res() res: Response,
    @Request() req: IGetUserAuthInfoRequest,
  ): Promise<Response<any, Record<string, any>>> {
    if (+id !== req.user.id) throw new ForbiddenException();
    await this.usersService.deleteUser(id);
    return res.status(204).send();
  }
}
