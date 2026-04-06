import React, { useEffect, useState } from "react";

export default function DetailProduk({
  produkId,
  pindahHalaman,
  tambahKeKeranjang,
}) {
  const [produk, setProduk] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [komentar, setKomentar] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${produkId}`)
      .then((res) => res.json())
      .then((data) => setProduk(data))
      .catch((err) => console.error(err));
  }, [produkId]);

  useEffect(() => {
    fetch(`http://localhost:3000/reviews/${produkId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }, [produkId]);

  const kirimReview = async () => {
    if (!komentar) {
      alert("Komentar tidak boleh kosong!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: produkId,
          rating,
          komentar,
        }),
      });

      const data = await response.json();

      setReviews((prev) => [data, ...prev]);
      setKomentar("");
      setRating(5);
    } catch (err) {
      console.error(err);
    }
  };

  if (!produk) return <p>Loading...</p>;

  return (
    <div className="wadah">
      <button
        className="tombol-kembali"
        onClick={() => pindahHalaman("halamanUtama")}
      >
        ← Kembali
      </button>

      <div className="detail-container">
        {}
        <div className="detail-gambar">
          <img src={produk.img || "/assets/default.png"} alt={produk.nama} />
        </div>

        {}
        <div className="detail-info">
          <h2>{produk.nama}</h2>
          <p className="kategori">{produk.kategori}</p>
          <p className="deskripsi">{produk.deskripsi}</p>
          <h1 className="harga">Rp {produk.harga}</h1>

          <button
            className="tombol-utama"
            onClick={() => tambahKeKeranjang(produk)}
          >
            🛒 Masukkan Keranjang
          </button>
        </div>
      </div>

      {}
      <div className="review-container">
        <h3>⭐ Review Produk</h3>

        {}
        <div className="review-form">
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>

          <textarea
            placeholder="Tulis komentar..."
            value={komentar}
            onChange={(e) => setKomentar(e.target.value)}
          />

          <button className="tombol-utama" onClick={kirimReview}>
            Kirim Review
          </button>
        </div>

        {}
        <div className="review-list">
          {reviews.length === 0 && <p>Belum ada review</p>}

          {reviews.map((r) => (
            <div key={r.id} className="review-item">
              <p>⭐ {"⭐".repeat(r.rating)}</p>
              <p>{r.komentar}</p>
              <small>{r.tanggal}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}