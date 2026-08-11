import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: any[] = [
    {
      id: 1,
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'admin',
    },
  ];

  createUser(data: any) {
    const user = {
      id: this.users.length + 1,
      email: data.email,
      password: data.password,
      role: data.role || 'user',
    };

    this.users.push(user);
    return user;
  }

  findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  findAll() {
    return this.users;
  }
}
