import React, { useState, useEffect } from "react";

export default function HalamanUtama({
  pindahHalaman,
  tambahKeKeranjang,
  keranjang,
  pesanan,
  aturPesanan,
}) {
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProduk(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:3000/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => aturPesanan(data))
      .catch((err) => console.error(err));
  }, [aturPesanan]);

  const adaDiKeranjang = (id) =>
    keranjang.some((item) => item.id === id);

  return (
    <div>
      <div className="spanduk-beranda">
        <h1>Selamat Datang di TOKO</h1>
      </div>

      <div className="wadah tanpa-jarak-atas">

        { }
        {pesanan && pesanan.length > 0 && (
          <div className="bagian-riwayat-pesanan">
            <h2>Pesanan Terakhir Anda</h2>
            <div className="kisi-riwayat-pesanan">
              {pesanan.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className="kartu-pesanan"
                  onClick={() => pindahHalaman("profil")}
                >
                  <div className="header-pesanan">
                    <span className="id-pesanan">{order.id}</span>
                    <span className="status-pesanan">{order.status}</span>
                  </div>
                  <p className="meta-pesanan">
                    {order.items.reduce((total, item) => total + item.kuantitas, 0)} produk•{" "}
                    <b>Rp {order.total}</b>
                  </p>
                  <p className="tanggal-pesanan">{order.tanggal}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        { }
        <h2>Rekomendasi Untuk Anda</h2>

        <div className="kisi-produk">
          {produk.map((produk) => (
            <div key={produk.id} className="kartu-produk">
              <div className="kotak-gambar-produk">
                <img
                  src={produk.img}
                  alt={produk.nama}
                  className="gambar-produk"
                />
              </div>

              <h3>{produk.nama}</h3>
              <p className="kategori-produk">{produk.kategori}</p>
              <div className="harga-produk">Rp {produk.harga}</div>

              {adaDiKeranjang(produk.id) ? (
                <button className="tombol-sukses">Ditambahkan</button>
              ) : (
                <button
                  className="tombol-utama"
                  onClick={() => tambahKeKeranjang(produk)}
                >
                  Masukkan Keranjang
                </button>
              )}

              <button
                className="tombol-garis"
                onClick={() => pindahHalaman("detailProduk", produk.id)}
              >
                Lihat Detail
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}