import { Request } from 'express';
import { User } from 'src/users/user.model';

export interface IGetUserAuthInfoRequest extends Request {
  user: User;
}
