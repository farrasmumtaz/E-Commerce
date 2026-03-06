import React, { useState } from 'react';

export default function Daftar({ pindahHalaman, aturPengguna }) {
  const [dataFormulir, aturDataFormulir] = useState({ namaDepan: '', namaBelakang: '', email: '' });

  const tanganiDaftar = (e) => {
    e.preventDefault();
    aturPengguna({ ...dataFormulir, telepon: '', alamat: '' });
    pindahHalaman('login');
  };

  return (
    <div className="wadah-autentikasi">
      <div className="kartu-autentikasi">
        <h2>Buat Akun</h2>
        <form onSubmit={tanganiDaftar}>
          <div className="baris-formulir">
            <div className="grup-formulir kolom-1">
              <label>NAMA DEPAN</label>
              <input type="text" required onChange={(e) => aturDataFormulir({...dataFormulir, namaDepan: e.target.value})} />
            </div>
            <div className="grup-formulir kolom-1">
              <label>NAMA BELAKANG</label>
              <input type="text" required onChange={(e) => aturDataFormulir({...dataFormulir, namaBelakang: e.target.value})} />
            </div>
          </div>
          <div className="grup-formulir">
            <label>EMAIL</label>
            <input type="email" required onChange={(e) => aturDataFormulir({...dataFormulir, email: e.target.value})} />
          </div>
          <div className="grup-formulir">
            <label>KATA SANDI</label>
            <input type="password" required />
          </div>
          <button type="submit" className="tombol-utama">Daftar</button>
        </form>
        <p className="tautan-autentikasi" onClick={() => pindahHalaman('login')}>
          Sudah punya akun? <b>Masuk</b>
        </p>
      </div>
    </div>
  );
}