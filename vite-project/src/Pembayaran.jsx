import React from 'react';

export default function Pembayaran({ keranjang, pindahHalaman, aturKeranjang, aturPesanan, pengguna }) {
  const subtotal = keranjang.reduce((jumlah, item) => jumlah + (item.harga * item.kuantitas), 0);
  const pajak = subtotal * 0.1;
  const totalAkhir = subtotal + pajak;

  // Tambahkan parameter (e) dan e.preventDefault() agar halaman tidak reload saat disubmit
  const tanganiPembayaran = (e) => {
    e.preventDefault(); 
    
    const pesananBaru = {
      id: "ORD-" + Math.floor(Math.random() * 100000),
      tanggal: new Date().toLocaleDateString('id-ID'),
      items: keranjang,
      total: totalAkhir,
      status: "Diproses"
    };
    aturPesanan(pesananLama => [pesananBaru, ...pesananLama]);
    aturKeranjang([]); 
    pindahHalaman('berhasil');
  };

  return (
    <div className="wadah">
      <h2>Pembayaran</h2>
      {/* Mengubah div menjadi form agar fungsi "required" bisa berjalan */}
      <form className="tata-letak-baris" onSubmit={tanganiPembayaran}>
        
        <div className="kolom-2 kotak-ringkasan">
          <h3>Informasi Pengiriman</h3>
          
          <div className="grup-formulir jarak-atas-sedikit">
            <label>NAMA LENGKAP</label>
            <input type="text" defaultValue={`${pengguna.namaDepan} ${pengguna.namaBelakang}`.trim()} required />
          </div>
          
          {/* Tambahan Kolom Nomor Telepon */}
          <div className="grup-formulir">
            <label>NOMOR TELEPON</label>
            <input type="tel" defaultValue={pengguna.telepon} required />
          </div>
          
          <div className="grup-formulir">
            <label>ALAMAT PENGIRIMAN</label>
            <input type="text" defaultValue={pengguna.alamat} required />
          </div>
        </div>

        <div className="kolom-1 kotak-ringkasan">
          <h3>Ringkasan Pesanan</h3>
          <div className="baris-ringkasan jarak-atas-sedikit"><span>Subtotal:</span> <b>Rp {subtotal.toFixed(2)}</b></div>
          <div className="baris-ringkasan"><span>Pajak (10%):</span> <b>Rp {pajak.toFixed(2)}</b></div>
          <hr className="garis-pembatas"/>
          <div className="total-ringkasan"><span>Total:</span> <b className="harga-total-ringkasan">Rp {totalAkhir.toFixed(2)}</b></div>
          
          {/* Ubah jadi type="submit" */}
          <button type="submit" className="tombol-utama">Bayar Sekarang</button>
        </div>
        
      </form>
    </div>
  );
}
