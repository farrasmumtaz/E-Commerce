import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { Patch } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Headers } from '@nestjs/common';

@Controller('cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private jwtService: JwtService,
  ) {}

  getUserIdFromToken(authHeader: string): number {
    if (!authHeader) {
      throw new Error('Token tidak ada');
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = this.jwtService.decode(token) as any;

    return decoded.userId;
  }

  @Get()
  getCart(@Headers('authorization') auth: string) {
    const userId = this.getUserIdFromToken(auth);
    return this.cartService.getCart(userId);
  }

  @Post()
  addToCart(@Body() product: any, @Headers('authorization') auth: string) {
    const userId = this.getUserIdFromToken(auth);
    return this.cartService.addToCart(userId, product);
  }

  @Post('product')
  createProduct(@Headers('authorization') auth: string) {
    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.decode(token) as any;

    if (decoded.role !== 'admin') {
      throw new Error('Hanya admin yang boleh');
    }

    return { message: 'Produk baru dibuat!' };
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('authorization') auth: string) {
    const userId = this.getUserIdFromToken(auth);
    return this.cartService.removeFromCart(userId, Number(id));
  }

  @Delete()
  clearCart(@Headers('authorization') auth: string) {
    const userId = this.getUserIdFromToken(auth);
    return this.cartService.clearCart(userId);
  }
  @Patch(':id')
  updateQuantity(
    @Param('id') id: string,
    @Body() body: { jumlah: number },
    @Headers('authorization') auth: string,
  ) {
    const userId = this.getUserIdFromToken(auth);
    return this.cartService.updateQuantity(userId, Number(id), body.jumlah);
  }
}
