import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByLogin(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.login, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '600s' }),
    };
  }

  async refresh(data: any) {
    const { refreshToken } = data;
    if (!refreshToken) {
      return new ForbiddenException();
    }
    try {
      const res = this.jwtService.verify(refreshToken);
      if (Math.round(new Date().getTime() / 1000) - res.exp < 0) {
        const payload = { username: res.username, sub: res.sub };
        return {
          accessToken: this.jwtService.sign(payload),
          refreshToken: this.jwtService.sign(payload, { expiresIn: '600s' }),
        };
      } else {
        return new ForbiddenException();
      }
    } catch (err) {
      return new UnauthorizedException();
    }
  }
}
