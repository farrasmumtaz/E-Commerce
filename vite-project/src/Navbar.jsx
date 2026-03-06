import React from 'react';

export default function Navbar({ pindahHalaman, jumlahKeranjang, halamanSaatIni, pengguna }) {
  if (halamanSaatIni === 'login' || halamanSaatIni === 'daftar') return null;
  
  const ambilInisial = () => {
    if (!pengguna.namaDepan) return "U";
    return (pengguna.namaDepan.charAt(0) + (pengguna.namaBelakang ? pengguna.namaBelakang.charAt(0) : '')).toUpperCase();
  };

  return (
    <nav className="navigasi">
      <div className="merek-navigasi" onClick={() => pindahHalaman('halamanUtama')}>🛒 TOKO</div>
      <div className="aksi-navigasi">
        <button className="tombol-ikon" onClick={() => pindahHalaman('keranjang')}>
          🛒 {jumlahKeranjang > 0 && <span className="lencana-keranjang">({jumlahKeranjang})</span>}
        </button>
        <button className="tombol-profil" onClick={() => pindahHalaman('profil')}>
          {ambilInisial()}
        </button>
      </div>
    </nav>
  );
}