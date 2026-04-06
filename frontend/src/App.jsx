import React, { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Daftar from "./halaman/Daftar";
import Login from "./halaman/Login";
import HalamanUtama from "./halaman/HalamanUtama";
import DetailProduk from "./components/DetailProduk";
import Keranjang from "./halaman/Keranjang";
import Pembayaran from "./halaman/Pembayaran";
import Berhasil from "./components/Berhasil";
import Profil from "./halaman/Profil";
import AdminPanel from "./halaman/adminPanel";
import SellerPanel from "./halaman/SellerPanel";

export default function App() {
  const [halamanSaatIni, aturHalamanSaatIni] = useState("daftar");
  const [keranjang, aturKeranjang] = useState([]);
  const [produkId, setProdukId] = useState(null);
  const [pesanan, aturPesanan] = useState([]);
  const [pengguna, aturPengguna] = useState({
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
    role: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:3000/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => aturKeranjang(data))
      .catch((err) => console.error(err));
  }, []);

  const pindahHalaman = (halaman, id = null) => {
    aturHalamanSaatIni(halaman);
    if (id) setProdukId(id);
  };

  const tambahKeKeranjang = async (produk) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(produk),
    });
    const data = await response.json();
    aturKeranjang(data);
  };

  const ubahJumlah = async (id, jumlah) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/cart/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ jumlah }),
    });
    const data = await response.json();
    aturKeranjang(data);
  };

  const hapusDariKeranjang = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/cart/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    aturKeranjang(data);
  };

  return (
    <>
      <Navbar
        pindahHalaman={pindahHalaman}
        jumlahKeranjang={keranjang.length}
        halamanSaatIni={halamanSaatIni}
        pengguna={pengguna}
      />

      {halamanSaatIni === "daftar" && (
        <Daftar pindahHalaman={pindahHalaman} aturPengguna={aturPengguna} />
      )}
      {halamanSaatIni === "login" && (
        <Login
          pindahHalaman={pindahHalaman}
          aturPengguna={aturPengguna}
          aturKeranjang={aturKeranjang}
          aturPesanan={aturPesanan}
        />
      )}
      {halamanSaatIni === "halamanUtama" && (
        <HalamanUtama
          pindahHalaman={pindahHalaman}
          tambahKeKeranjang={tambahKeKeranjang}
          keranjang={keranjang}
          pesanan={pesanan}
          aturPesanan={aturPesanan}
        />
      )}
      {halamanSaatIni === "keranjang" && (
        <Keranjang
          keranjang={keranjang}
          pindahHalaman={pindahHalaman}
          ubahJumlah={ubahJumlah}
          hapusDariKeranjang={hapusDariKeranjang}
        />
      )}
      {halamanSaatIni === "pembayaran" && (
        <Pembayaran
          keranjang={keranjang}
          pindahHalaman={pindahHalaman}
          aturKeranjang={aturKeranjang}
          pengguna={pengguna}
        />
      )}
      {halamanSaatIni === "berhasil" && (
        <Berhasil pindahHalaman={pindahHalaman} />
      )}
      {halamanSaatIni === "profil" && (
        <Profil
          pindahHalaman={pindahHalaman}
          pesanan={pesanan}
          pengguna={pengguna}
          aturPengguna={aturPengguna}
          aturKeranjang={aturKeranjang}
          aturPesanan={aturPesanan}
        />
      )}
      {halamanSaatIni === "detailProduk" && (
        <DetailProduk
          produkId={produkId}
          pindahHalaman={pindahHalaman}
          tambahKeKeranjang={tambahKeKeranjang}
        />
      )}
      {halamanSaatIni === "admin" && (
        <AdminPanel pindahHalaman={pindahHalaman} />
      )}
      {halamanSaatIni === "seller" && (
        <SellerPanel pindahHalaman={pindahHalaman} />
      )}
    </>
  );
}