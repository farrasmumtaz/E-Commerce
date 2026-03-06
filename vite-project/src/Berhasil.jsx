import React from 'react';

export default function Berhasil({ pindahHalaman }) {
  return (
    <div className="wadah halaman-sukses">
      <h1 className="ikon-sukses">✓</h1>
      <h2>Pembayaran Berhasil!</h2>
      <button className="tombol-utama tombol-kembali" style={{ width: '200px', marginTop: '20px' }} onClick={() => pindahHalaman('halamanUtama')}>
        Kembali ke Beranda
      </button>
    </div>
  );
}