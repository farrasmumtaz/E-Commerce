import React from 'react';

export default function Keranjang({ keranjang, pindahHalaman, ubahJumlah, hapusDariKeranjang }) {
  const totalHarga = keranjang.reduce((jumlah, item) => jumlah + (item.harga * item.kuantitas), 0);
  const totalBarang = keranjang.reduce((jumlah, item) => jumlah + item.kuantitas, 0);

  return (
    <div className="wadah">
      <h2>Keranjang Belanja</h2>
      <div className="tata-letak-baris">
        <div className="kolom-2">
          {keranjang.length === 0 ? (
            <div className="keranjang-kosong">
              <span className="ikon-keranjang-kosong">🛒</span>
              <p className="teks-keranjang-kosong">Keranjang Anda kosong.</p>
              <button className="tombol-utama tombol-lanjut-belanja" onClick={() => pindahHalaman('halamanUtama')}>
                Lanjut Belanja
              </button>
            </div>
          ) : (
            keranjang.map(item => (
              <div key={item.id} className="item-keranjang">
                <div className="info-item-keranjang">
                  <div className="gambar-item-keranjang">{item.gambar}</div>
                  <div>
                    <h3 className="judul-item-keranjang">{item.nama}</h3>
                    <p className="harga-item-keranjang">Rp {item.harga}</p>
                    <div className="kontrol-jumlah">
                      <div className="grup-tombol-jumlah">
                        <button className="tombol-jumlah" onClick={() => ubahJumlah(item.id, -1)}>-</button>
                        <span className="tampilan-jumlah">{item.kuantitas}</span>
                        <button className="tombol-jumlah" onClick={() => ubahJumlah(item.id, 1)}>+</button>
                      </div>
                      <span className="subtotal-keranjang">Subtotal: <b>Rp {(item.harga * item.kuantitas).toFixed(2)}</b></span>
                    </div>
                  </div>
                </div>
                <button className="tombol-hapus" onClick={() => hapusDariKeranjang(item.id)}>🗑️</button>
              </div>
            ))
          )}
        </div>
        <div className="kolom-1 kotak-ringkasan">
          <h3>Pesanan</h3>
          <hr className="garis-pembatas"/>
          <div className="baris-ringkasan">
            <span>Total Produk:</span>
            <b>{totalBarang}</b>
          </div>
          <div className="total-ringkasan">
            <span>Total Harga:</span>
            <b className="harga-total-ringkasan">Rp{totalHarga.toFixed(2)}</b>
          </div>
          <button className="tombol-utama" onClick={() => pindahHalaman('pembayaran')} disabled={keranjang.length === 0}>
            Lanjut Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}