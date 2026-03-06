import React, { useState } from 'react';

export default function Profil({ pindahHalaman, pesanan, pengguna, aturPengguna }) {
  const [dataFormulir, aturDataFormulir] = useState(pengguna);
  const [tersimpan, aturTersimpan] = useState(false);

  const tanganiSimpan = (e) => {
    e.preventDefault();
    aturPengguna(dataFormulir);
    aturTersimpan(true);
    setTimeout(() => aturTersimpan(false), 3000);
  };

  return (
    <div className="wadah">
      <h2>Dasbor Profil</h2>
      <div className="tata-letak-baris">
        <div className="kolom-1 kotak-ringkasan">
          <div className="ikon-profil">👤</div>
          <h3 className="teks-tengah">{pengguna.namaDepan} {pengguna.namaBelakang}</h3>
          <p className="email-profil">{pengguna.email}</p>
          <hr className="garis-pembatas"/>
          <h3>Informasi Pribadi</h3>
          {tersimpan && <p className="pesan-sukses">✓ Profil berhasil disimpan!</p>}
          <form onSubmit={tanganiSimpan} className="jarak-atas-sedikit">
            <div className="baris-formulir">
              <div className="grup-formulir kolom-1">
                <label>NAMA DEPAN</label>
                <input type="text" value={dataFormulir.namaDepan} onChange={(e) => aturDataFormulir({...dataFormulir, namaDepan: e.target.value})} required />
              </div>
              <div className="grup-formulir kolom-1">
                <label>NAMA BELAKANG</label>
                <input type="text" value={dataFormulir.namaBelakang} onChange={(e) => aturDataFormulir({...dataFormulir, namaBelakang: e.target.value})} required />
              </div>
            </div>
            <div className="grup-formulir">
              <label>NOMOR TELEPON</label>
              <input type="text" value={dataFormulir.telepon} onChange={(e) => aturDataFormulir({...dataFormulir, telepon: e.target.value})} />
            </div>
            <div className="grup-formulir">
              <label>ALAMAT</label>
              <input type="text" value={dataFormulir.alamat} onChange={(e) => aturDataFormulir({...dataFormulir, alamat: e.target.value})} />
            </div>
            <button type="submit" className="tombol-utama">Simpan Perubahan</button>
            <button type="button" className="tombol-garis tombol-bahaya" onClick={() => pindahHalaman('login')}>Keluar (Logout)</button>
          </form>
        </div>
        <div className="kolom-1-5">
          <h3>Riwayat Pesanan ({pesanan.length})</h3>
          {pesanan.length === 0 ? (
            <p className="daftar-pesanan-kosong">Anda belum memiliki pesanan.</p>
          ) : (
            <div className="jarak-atas-sedikit">
              {pesanan.map(order => (
                <div key={order.id} className="kartu-pesanan">
                  <div className="header-pesanan">
                    <span className="id-pesanan">{order.id}</span>
                    <span className="status-pesanan">{order.status}</span>
                  </div>
                  <p className="tanggal-pesanan">Dipesan pada: {order.tanggal}</p>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="baris-item-pesanan">
                      <span>{item.nama} ×{item.kuantitas}</span>
                      <span>Rp {(item.harga * item.kuantitas).toFixed(2)}</span>
                    </div>
                  ))}
                  <hr className="garis-putus"/>
                  <div className="baris-total-pesanan">
                    <span>Total</span>
                    <span>Rp {order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}