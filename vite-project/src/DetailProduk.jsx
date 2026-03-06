import React from 'react';

export default function DetailProduk({ produk, pindahHalaman, tambahKeKeranjang }) {
  if (!produk) return null;
  return (
    <div className="wadah">
      <button className="tombol-garis tombol-kembali" onClick={() => pindahHalaman('halamanUtama')}>← Kembali</button>
      <div className="tata-letak-baris">
        <div className="kolom-1 kotak-gambar-detail">{produk.gambar}</div>
        <div className="kolom-1">
          <h2>{produk.nama}</h2>
          <p className="deskripsi-detail">{produk.deskripsi}</p>
          <h1 className="harga-detail">Rp {produk.harga}</h1>
          <button className="tombol-utama" onClick={() => { tambahKeKeranjang(produk); pindahHalaman('keranjang'); }}>
            🛒 Masukkan Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}