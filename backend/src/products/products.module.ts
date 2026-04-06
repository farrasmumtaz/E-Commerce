import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';

@Module({
  imports: [JwtModule.register({ secret: 'rahasia_kamu' })],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
