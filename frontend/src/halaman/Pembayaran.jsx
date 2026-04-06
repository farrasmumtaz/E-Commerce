import React, { useState, useEffect } from "react";

export default function Pembayaran({
  keranjang,
  pindahHalaman,
  aturKeranjang,
  pengguna,
}) {
  const [nomorTelepon, setNomorTelepon] = useState(pengguna.telepon || "");
  const [kota, setKota] = useState("jakarta");
  const [kurir, setKurir] = useState("JNE");
  const [ongkir, setOngkir] = useState(0);
  const [metodeBayar, setMetodeBayar] = useState("Transfer");

  // 🔥 HITUNG TOTAL
  const subtotal = keranjang.reduce(
    (jumlah, item) => jumlah + item.harga * item.kuantitas,
    0
  );

  const pajak = subtotal * 0.1;
  const totalAkhir = subtotal + pajak + ongkir;

  // 🔥 FETCH ONGKIR
  useEffect(() => {
    fetch(`http://localhost:3000/orders/ongkir?kota=${kota}&kurir=${kurir}`)
      .then((res) => res.json())
      .then((data) => setOngkir(data.ongkir))
      .catch((err) => console.error(err));
  }, [kota, kurir]);

  const tanganiPembayaran = async (e) => {
    e.preventDefault();

    if (!nomorTelepon) {
      alert("Mohon isi nomor telepon!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // 🔥 CREATE ORDER
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: keranjang,
          total: totalAkhir,
          kota,
          kurir,
          metodePembayaran: metodeBayar,
        }),
      });

      const data = await response.json();
      console.log("Order berhasil:", data);

      // 🔥 CLEAR CART
      await fetch("http://localhost:3000/cart", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      aturKeranjang([]);
      pindahHalaman("berhasil");

    } catch (error) {
      console.error("Error checkout:", error);
    }
  };

  return (
    <div className="wadah">
      <h2>Pembayaran</h2>

      <form onSubmit={tanganiPembayaran} className="tata-letak-baris">

        {/* FORM KIRI */}
        <div className="kolom-2 kotak-ringkasan">
          <h3>Informasi Pengiriman</h3>

          <div className="grup-formulir">
            <label>KOTA</label>
            <select value={kota} onChange={(e) => setKota(e.target.value)}>
              <option value="jakarta">Jakarta</option>
              <option value="bandung">Bandung</option>
              <option value="surabaya">Surabaya</option>
            </select>
          </div>

          <div className="grup-formulir">
            <label>KURIR</label>
            <select value={kurir} onChange={(e) => setKurir(e.target.value)}>
              <option value="JNE">JNE</option>
              <option value="JNT">J&T</option>
              <option value="SICEPAT">SiCepat</option>
            </select>
          </div>

          <div className="grup-formulir">
            <label>NOMOR TELEPON</label>
            <input
              type="tel"
              value={nomorTelepon}
              onChange={(e) => setNomorTelepon(e.target.value)}
              required
            />

            <div className="grup-formulir">
              <label>METODE PEMBAYARAN</label>
              <select
                value={metodeBayar}
                onChange={(e) => setMetodeBayar(e.target.value)}
              >
                <option value="Transfer">Transfer Bank</option>
                <option value="E-Wallet">E-Wallet</option>
                <option value="COD">COD</option>
              </select>
            </div>
          </div>
        </div>

        {/* RINGKASAN */}
        <div className="kolom-1 kotak-ringkasan">
          <h3>Ringkasan</h3>

          <p>Subtotal: Rp {subtotal.toLocaleString()}</p>
          <p>Pajak: Rp {pajak.toLocaleString()}</p>
          <p>Ongkir: Rp {ongkir.toLocaleString()}</p>

          <hr />

          <b>Total: Rp {totalAkhir.toLocaleString()}</b>

          <button type="submit">Bayar</button>
        </div>

      </form>
    </div>
  );
}