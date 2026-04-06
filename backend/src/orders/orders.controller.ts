import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Headers,
  Param,
  Patch,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtService } from '@nestjs/jwt';

@Controller('orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    private jwtService: JwtService,
  ) {}

  // 🔐 AMBIL USER DARI TOKEN (FIXED)
  getUserFromToken(auth: string) {
    if (!auth) {
      throw new Error('Token tidak ada');
    }

    const token = auth.replace('Bearer ', '');
    const decoded = this.jwtService.decode(token) as any;

    if (!decoded) {
      throw new Error('Token invalid');
    }

    return decoded;
  }

  // 🔥 CREATE ORDER
  @Post()
  create(@Body() body: any, @Headers('authorization') auth: string) {
    const user = this.getUserFromToken(auth);
    return this.ordersService.createOrder(user.userId, body);
  }

  // 🔥 GET ORDER USER (FIXED)
  @Get()
  getAll(@Headers('authorization') auth: string) {
    const user = this.getUserFromToken(auth);
    return this.ordersService.getOrders(user.userId);
  }

  // 🔥 ONGKIR API
  @Get('ongkir')
  getOngkir(@Query('kota') kota: string, @Query('kurir') kurir: string) {
    return {
      ongkir: this.ordersService.hitungOngkir(kota, kurir),
    };
  }

  // 🔥 TRACKING
  @Patch(':id/status')
  updateStatus(@Param('id') id: string) {
    return this.ordersService.updateStatus(id);
  }
}
