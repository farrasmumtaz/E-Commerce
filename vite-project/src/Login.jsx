import React from 'react';

export default function Login({ pindahHalaman }) {
  return (
    <div className="wadah-autentikasi">
      <div className="kartu-autentikasi">
        <h2>Selamat Datang Kembali</h2>
        <form onSubmit={(e) => { e.preventDefault(); pindahHalaman('halamanUtama'); }}>
          <div className="grup-formulir">
            <label>EMAIL</label>
            <input type="email" required />
          </div>
          <div className="grup-formulir">
            <label>KATA SANDI</label>
            <input type="password" required />
          </div>
          <button type="submit" className="tombol-utama">Masuk</button>
        </form>
        <p className="tautan-autentikasi" onClick={() => pindahHalaman('daftar')}>
          Belum punya akun? <b>Daftar</b>
        </p>
      </div>
    </div>
  );
}