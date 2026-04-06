import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewsService {
  private reviews: any[] = [];

  // 🔥 TAMBAH REVIEW
  create(userId: number, data: any) {
    const review = {
      id: this.reviews.length + 1,
      userId,
      productId: data.productId,
      rating: data.rating,
      komentar: data.komentar,
      tanggal: new Date().toLocaleDateString(),
    };

    this.reviews.push(review);
    return review;
  }

  // 🔥 GET REVIEW BY PRODUCT
  findByProduct(productId: number) {
    return this.reviews.filter((r) => r.productId === productId);
  }
}
