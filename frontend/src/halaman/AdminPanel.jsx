import React, { useState, useEffect } from "react";

export default function AdminPanel({ pindahHalaman }) {
  const [namaProduk, setNamaProduk] = useState("");
  const [harga, setHarga] = useState("");
  const [products, setProducts] = useState([]);

  // 🔥 LOAD PRODUK SAAT MASUK ADMIN
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔥 TAMBAH PRODUK
  const tambahProduk = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nama: namaProduk,
          harga: Number(harga),
          kategori: "Umum",
        }),
      });

      const data = await response.json();

      console.log("Produk baru:", data);

      // 🔥 update UI langsung
      setProducts([...products, data]);

      setNamaProduk("");
      setHarga("");

      alert("Produk berhasil ditambahkan!");
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 DELETE PRODUK
  const hapusProduk = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${id}`,
        {
          method: "DELETE",
        }
      );

      await response.json();

      console.log("Produk dihapus:", id);

      // 🔥 update UI (hapus dari state)
      setProducts(products.filter((p) => p.id !== id));

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="wadah">
      <h2>Admin Panel</h2>

      {/* 🔥 FORM TAMBAH */}
      <div className="kotak-ringkasan">
        <h3>Tambah Produk</h3>

        <input
          type="text"
          placeholder="Nama Produk"
          value={namaProduk}
          onChange={(e) => setNamaProduk(e.target.value)}
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
        <h3>Daftar Produk</h3>

        {products.map((product) => (
          <div key={product.id} style={{ marginBottom: "10px" }}>
            <b>{product.nama}</b> - Rp {product.harga}

            <button
              style={{ marginLeft: "10px", background: "red", color: "white" }}
              onClick={() => hapusProduk(product.id)}
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