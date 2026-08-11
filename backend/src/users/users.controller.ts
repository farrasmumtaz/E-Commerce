import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  register(@Body() body: any) {
    return this.usersService.createUser(body);
  }

  @Post('login')
  login(@Body() body: any) {
    const user = this.usersService.findByEmail(body.email);

    if (!user || user.password !== body.password) {
      return { message: 'Login gagal' };
    }

    const token = this.jwtService.sign({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      message: 'Login berhasil',
      token,
      user,
    };
  }
}
