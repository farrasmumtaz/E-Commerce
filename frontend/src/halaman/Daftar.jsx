import React, { useState } from "react";

export default function Daftar({ pindahHalaman, aturPengguna }) {
  const [dataFormulir, aturDataFormulir] = useState({
    nama: "",
    email: "",
    password: "",
    role: "user",
  });

  const tanganiDaftar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: dataFormulir.nama,
          email: dataFormulir.email,
          password: dataFormulir.password,
          role: dataFormulir.role,
        }),
      });

      const data = await response.json();
      console.log("Register:", data);

      aturPengguna({
        nama: dataFormulir.nama,
        email: dataFormulir.email,
        telepon: "",
        alamat: "",
        role: dataFormulir.role,
      });

      pindahHalaman("login");
    } catch (err) {
      console.error("Error register:", err);
    }
  };

  return (
    <div className="wadah-autentikasi">
      <div className="kartu-autentikasi">
        <h2>Buat Akun</h2>
        <form onSubmit={tanganiDaftar}>
          <div className="grup-formulir">
            <label>ROLE</label>
            <select
              onChange={(e) =>
                aturDataFormulir({ ...dataFormulir, role: e.target.value })
              }
            >
              <option value="user">User</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <div className="grup-formulir">
            <label>NAMA</label>
            <input
              type="text"
              required
              onChange={(e) =>
                aturDataFormulir({ ...dataFormulir, nama: e.target.value })
              }
            />
          </div>

          <div className="grup-formulir">
            <label>EMAIL</label>
            <input
              type="email"
              required
              onChange={(e) =>
                aturDataFormulir({ ...dataFormulir, email: e.target.value })
              }
            />
          </div>

          <div className="grup-formulir">
            <label>KATA SANDI</label>
            <input
              type="password"
              required
              onChange={(e) =>
                aturDataFormulir({ ...dataFormulir, password: e.target.value })
              }
            />
          </div>

          <button type="submit" className="tombol-utama">
            Daftar
          </button>
        </form>

        <p className="tautan-autentikasi" onClick={() => pindahHalaman("login")}>
          Sudah punya akun? <b>Masuk</b>
        </p>
      </div>
    </div>
  );
}