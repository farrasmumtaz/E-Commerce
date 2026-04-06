import React, { useState } from "react";

export default function Login({ pindahHalaman, aturPengguna, aturKeranjang, aturPesanan }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const tanganiLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (!data.user) {
        alert("Login gagal!");
        return;
      }

      localStorage.setItem("token", data.token);

      aturPengguna({
        nama: data.user.nama || "",
        email: data.user.email,
        telepon: data.user.telepon || "",
        alamat: data.user.alamat || "",
        role: data.user.role,
      });

      aturKeranjang([]);
      aturPesanan([]);

      const cartRes = await fetch("http://localhost:3000/cart", {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const cartData = await cartRes.json();
      aturKeranjang(cartData);

      pindahHalaman("halamanUtama");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="wadah-autentikasi">
      <div className="kartu-autentikasi">
        <h2>Selamat Datang Kembali</h2>
        <form onSubmit={tanganiLogin}>
          <div className="grup-formulir">
            <label>EMAIL</label>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grup-formulir">
            <label>KATA SANDI</label>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="tombol-utama">
            Masuk
          </button>
        </form>
        <p className="tautan-autentikasi" onClick={() => pindahHalaman("daftar")}>
          Belum punya akun? <b>Daftar</b>
        </p>
      </div>
    </div>
  );
}