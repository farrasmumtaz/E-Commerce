import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  private orders: any[] = [];

  hitungOngkir(kota: string, kurir: string): number {
    const base = 10000;

    const kotaMap: Record<string, number> = {
      jakarta: 10000,
      bandung: 15000,
      surabaya: 20000,
    };

    const kurirMap: Record<string, number> = {
      JNE: 5000,
      JNT: 7000,
      SICEPAT: 6000,
    };

    return (
      base + (kotaMap[kota?.toLowerCase()] || 12000) + (kurirMap[kurir] || 5000)
    );
  }

  createOrder(userId: number, data: any) {
    const ongkir = this.hitungOngkir(data.kota, data.kurir);

    const order = {
      id: 'ORD-' + Math.floor(Math.random() * 100000),
      userId,
      tanggal: new Date().toLocaleDateString(),
      items: data.items,
      total: data.total,
      ongkir,
      kurir: data.kurir,
      kota: data.kota,
      paymentMethod: data.paymentMethod,
      status: 'Diproses',
    };

    this.orders.unshift(order);
    return order;
  }

  // 🔥 GET ORDER PER USER
  getOrders(userId: number) {
    return this.orders.filter((o) => o.userId === userId);
  }

  // 🔥 TRACKING STATUS
  updateStatus(id: string) {
    const order = this.orders.find((o) => o.id === id);

    if (!order) return { message: 'Order tidak ditemukan' };

    if (order.status === 'Diproses') order.status = 'Dikirim';
    else if (order.status === 'Dikirim') order.status = 'Selesai';

    return order;
  }
}
