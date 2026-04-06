import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
  private carts: { [userId: number]: any[] } = {};

  getCart(userId: number) {
    return this.carts[userId] || [];
  }

  addToCart(userId: number, product: any) {
    if (!this.carts[userId]) {
      this.carts[userId] = [];
    }

    const cart = this.carts[userId];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.kuantitas += 1;
    } else {
      cart.push({ ...product, kuantitas: 1 });
    }

    return cart;
  }

  removeFromCart(userId: number, id: number) {
    this.carts[userId] = this.carts[userId].filter((item) => item.id !== id);
    return this.carts[userId];
  }

  updateQuantity(userId: number, id: number, jumlah: number) {
    const item = this.carts[userId]?.find((item) => item.id === id);

    if (item) {
      item.kuantitas += jumlah;

      if (item.kuantitas <= 0) {
        this.carts[userId] = this.carts[userId].filter((i) => i.id !== id);
      }
    }

    return this.carts[userId];
  }

  clearCart(userId: number) {
    this.carts[userId] = [];
    return [];
  }
}
