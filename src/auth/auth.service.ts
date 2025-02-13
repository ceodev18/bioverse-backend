import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user || user.password !== password) {
      throw new NotFoundException('Invalid credentials');
    }

    return { id: user.id, username: user.username, role: user.role };
  }
}
