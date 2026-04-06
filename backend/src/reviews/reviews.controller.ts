import { Controller, Post, Body, Get, Param, Headers } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtService } from '@nestjs/jwt';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private reviewsService: ReviewsService,
    private jwtService: JwtService,
  ) {}

  // 🔐 ambil user
  getUserFromToken(auth: string) {
    const token = auth?.replace('Bearer ', '');
    return this.jwtService.decode(token) as any;
  }

  // 🔥 CREATE REVIEW
  @Post()
  create(@Body() body: any, @Headers('authorization') auth: string) {
    const user = this.getUserFromToken(auth);
    return this.reviewsService.create(user.userId, body);
  }

  // 🔥 GET REVIEW PER PRODUK
  @Get(':productId')
  getByProduct(@Param('productId') productId: string) {
    return this.reviewsService.findByProduct(Number(productId));
  }
}
