import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'farras_hebat',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
