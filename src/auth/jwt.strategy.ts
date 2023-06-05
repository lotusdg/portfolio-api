import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import jwtConfig from 'src/config/auth.config';
import { AuthService } from './auth.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: IJwtPayload): Promise<any> {
    const user = await this.authService.validateUserById(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
