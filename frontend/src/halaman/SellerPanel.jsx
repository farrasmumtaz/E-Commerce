import React, { useState, useEffect } from "react";

export default function SellerPanel({ pindahHalaman }) {
  const [products, setProducts] = useState([]);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");

  const token = localStorage.getItem("token");

  // 🔥 LOAD PRODUK MILIK SELLER
  useEffect(() => {
    fetch("http://localhost:3000/products/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔥 TAMBAH PRODUK
  const tambahProduk = async () => {
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nama,
          harga: Number(harga),
          kategori: "Umum",
        }),
      });

      const data = await response.json();

      setProducts([...products, data]);
      setNama("");
      setHarga("");

    } catch (err) {
      console.error(err);
    }
  };

  const hapusProduk = async (id) => {
    try {
      await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(products.filter((p) => p.id !== id));

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="wadah">
      <h2>🛒 Seller Panel</h2>

      {/* 🔥 FORM TAMBAH */}
      <div className="kotak-ringkasan">
        <h3>Tambah Produk</h3>

        <input
          type="text"
          placeholder="Nama Produk"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />

        <input
          type="number"
          placeholder="Harga"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
        />

        <button onClick={tambahProduk}>
          Tambah Produk
        </button>
      </div>

      {/* 🔥 LIST PRODUK */}
      <div className="kotak-ringkasan">
        <h3>Produk Saya</h3>

        {products.length === 0 && <p>Belum ada produk</p>}

        {products.map((p) => (
          <div key={p.id} style={{ marginBottom: "10px" }}>
            <b>{p.nama}</b> - Rp {p.harga}

            <button
              style={{
                marginLeft: "10px",
                background: "red",
                color: "white",
              }}
              onClick={() => hapusProduk(p.id)}
            >
              Hapus
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => pindahHalaman("halamanUtama")}>
        Kembali
      </button>
    </div>
  );
}