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

  // 🔥 REGISTER USER
  createUser(data: any) {
    const user = {
      id: this.users.length + 1,
      email: data.email,
      password: data.password,
      role: data.role || 'user', // default user
    };

    this.users.push(user);
    return user;
  }

  // 🔥 CARI USER
  findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  // 🔥 (OPSIONAL) GET ALL USERS
  findAll() {
    return this.users;
  }
}
