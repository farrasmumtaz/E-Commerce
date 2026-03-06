import React, { useState } from 'react';
import './app.css';

import Navbar from './Navbar';
import Daftar from './Daftar';
import Login from './Login';
import HalamanUtama from './HalamanUtama';
import DetailProduk from './DetailProduk';
import Keranjang from './Keranjang';
import Pembayaran from './Pembayaran';
import Berhasil from './Berhasil';
import Profil from './Profil';

export default function App() {
  const [halamanSaatIni, aturHalamanSaatIni] = useState('daftar');
  const [keranjang, aturKeranjang] = useState([]);
  const [produkTerpilih, aturProdukTerpilih] = useState(null);
  const [pesanan, aturPesanan] = useState([]);
  const [pengguna, aturPengguna] = useState({
    namaDepan: '', namaBelakang: '', email: '', telepon: '', alamat: ''
  });

  const pindahHalaman = (halaman, produk = null) => {
    aturHalamanSaatIni(halaman);
    if (produk) aturProdukTerpilih(produk);
    window.scrollTo(0, 0);
  };

  const tambahKeKeranjang = (produk) => {
    if (!keranjang.find(item => item.id === produk.id)) {
      aturKeranjang([...keranjang, { ...produk, kuantitas: 1 }]);
    }
  };

  const ubahJumlah = (id, jumlah) => {
    aturKeranjang(keranjang.map(item => {
      if (item.id === id) {
        const jumlahBaru = item.kuantitas + jumlah;
        return { ...item, kuantitas: jumlahBaru > 0 ? jumlahBaru : 1 };
      }
      return item;
    }));
  };

  const hapusDariKeranjang = (id) => {
    aturKeranjang(keranjang.filter(item => item.id !== id));
  };

  return (
    <>
      <Navbar pindahHalaman={pindahHalaman} jumlahKeranjang={keranjang.length} halamanSaatIni={halamanSaatIni} pengguna={pengguna} />
      
      {halamanSaatIni === 'daftar' && <Daftar pindahHalaman={pindahHalaman} aturPengguna={aturPengguna} />}
      {halamanSaatIni === 'login' && <Login pindahHalaman={pindahHalaman} />}
      {halamanSaatIni === 'halamanUtama' && <HalamanUtama pindahHalaman={pindahHalaman} tambahKeKeranjang={tambahKeKeranjang} keranjang={keranjang} pesanan={pesanan} />}
      {halamanSaatIni === 'detailProduk' && <DetailProduk produk={produkTerpilih} pindahHalaman={pindahHalaman} tambahKeKeranjang={tambahKeKeranjang} />}
      {halamanSaatIni === 'keranjang' && <Keranjang keranjang={keranjang} pindahHalaman={pindahHalaman} ubahJumlah={ubahJumlah} hapusDariKeranjang={hapusDariKeranjang} />}
      {halamanSaatIni === 'pembayaran' && <Pembayaran keranjang={keranjang} pindahHalaman={pindahHalaman} aturKeranjang={aturKeranjang} aturPesanan={aturPesanan} pengguna={pengguna} />}
      {halamanSaatIni === 'berhasil' && <Berhasil pindahHalaman={pindahHalaman} />}
      {halamanSaatIni === 'profil' && <Profil pindahHalaman={pindahHalaman} pesanan={pesanan} pengguna={pengguna} aturPengguna={aturPengguna} />}
    </>
  );
}