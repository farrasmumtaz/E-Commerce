import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtService } from '@nestjs/jwt';
import { Headers, Param } from '@nestjs/common';

interface JwtPayload {
  userId: number;
  role: string;
  email: string;
}

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private jwtService: JwtService,
  ) {}

  getUser(auth: string): JwtPayload {
    if (!auth) throw new Error('Token tidak ada');
    const token = auth.replace('Bearer ', '');
    return this.jwtService.decode(token) as JwtPayload;
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('my')
  getMy(@Headers('authorization') auth: string) {
    const user = this.getUser(auth);
    return this.productsService.findByUser(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: any, @Headers('authorization') auth: string) {
    const user = this.getUser(auth);

    if (user.role !== 'admin' && user.role !== 'seller') {
      throw new Error('Tidak punya akses');
    }

    return this.productsService.create(body, user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
    @Headers('authorization') auth: string,
  ) {
    const user = this.getUser(auth);
    return this.productsService.update(
      Number(id),
      body,
      user.userId,
      user.role,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('authorization') auth: string) {
    const user = this.getUser(auth);
    return this.productsService.remove(Number(id), user.userId, user.role);
  }
}
