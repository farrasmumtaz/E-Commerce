import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: 1,
      userId: 1,
      nama: 'Keyboard Mekanikal RGB',
      deskripsi: 'Keyboard gaming mekanikal',
      harga: 2250000,
      kategori: 'Elektronik',
      img: 'http://localhost:5173/assets/mec-keyboard.webp',
    },
    {
      id: 2,
      userId: 1,
      nama: 'Speaker Bluetooth Pro',
      deskripsi: 'Suara surround 360°',
      harga: 800000,
      kategori: 'Elektronik',
      img: 'http://localhost:5173/assets/speaker.jpg',
    },
    {
      id: 3,
      userId: 1,
      nama: 'Matras Yoga',
      deskripsi: 'Matras yoga untuk latihan',
      harga: 500000,
      kategori: 'Olahraga',
      img: 'http://localhost:5173/assets/matras-yoga.jpg',
    },
    {
      id: 4,
      userId: 1,
      nama: 'Sepatu Lari',
      deskripsi: 'Sepatu lari ringan dan nyaman',
      harga: 1100000,
      kategori: 'Olahraga',
      img: 'http://localhost:5173/assets/sepatu-lari.jpg',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new Error('Produk tidak ditemukan');
    return product;
  }

  findByUser(userId: number) {
    return this.products.filter((p) => p.userId === userId);
  }

  create(data: any, userId: number) {
    const newProduct = {
      id: this.products.length + 1,
      userId,
      ...data,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, data: any, userId: number, role: string) {
    const index = this.products.findIndex((p) => p.id === id);

    if (index === -1) return null;

    const product = this.products[index];

    if (role !== 'admin' && product.userId !== userId) {
      throw new Error('Tidak boleh edit produk orang lain');
    }

    this.products[index] = {
      ...product,
      ...data,
    };

    return this.products[index];
  }

  remove(id: number, userId: number, role: string) {
    const product = this.products.find((p) => p.id === id);

    if (!product) return null;

    if (role !== 'admin' && product.userId !== userId) {
      throw new Error('Tidak boleh hapus produk orang lain');
    }

    this.products = this.products.filter((p) => p.id !== id);

    return this.products;
  }
}
