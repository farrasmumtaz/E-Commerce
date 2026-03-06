import React from 'react';
import { dataProduk } from './produk';

export default function HalamanUtama({ pindahHalaman, tambahKeKeranjang, keranjang, pesanan }) {
  const adaDiKeranjang = (id) => keranjang.some(item => item.id === id);

  return (
    <div>
      <div className="spanduk-beranda">
        <h1>Selamat Datang di TOKO</h1>
      </div>
      <div className="wadah tanpa-jarak-atas">
        {pesanan && pesanan.length > 0 && (
          <div className="bagian-riwayat-pesanan">
            <h2>Pesanan Terakhir Anda</h2>
            <div className="kisi-riwayat-pesanan">
              {pesanan.slice(0, 3).map(order => (
                <div key={order.id} className="kartu-pesanan" onClick={() => pindahHalaman('profil')}>
                  <div className="header-pesanan">
                    <span className="id-pesanan">{order.id}</span>
                    <span className="status-pesanan">{order.status}</span>
                  </div>
                  <p className="meta-pesanan">{order.items.length} produk • <b>RP {order.total.toFixed(2)}</b></p>
                  <p className="tanggal-pesanan">{order.tanggal}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2>Rekomendasi Untuk Anda</h2>
        <div className="kisi-produk">
          {dataProduk.map(produk => (
            <div key={produk.id} className="kartu-produk">
              <div className="kotak-gambar-produk" onClick={() => pindahHalaman('detailProduk', produk)}>{produk.gambar}</div>
              <h3>{produk.nama}</h3>
              <p className="kategori-produk">{produk.kategori}</p>
              <div className="harga-produk">Rp {produk.harga}</div>
              
              {adaDiKeranjang(produk.id) ? (
                <button className="tombol-sukses">🛒 Ditambahkan</button>
              ) : (
                <button className="tombol-utama" onClick={() => tambahKeKeranjang(produk)}>🛒 Masukkan Keranjang</button>
              )}
              <button className="tombol-garis" onClick={() => pindahHalaman('detailProduk', produk)}>Lihat Detail</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}