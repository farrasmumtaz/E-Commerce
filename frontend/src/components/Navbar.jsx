export default function Navbar({ pindahHalaman, jumlahKeranjang, pengguna }) {
  return (
    <nav className="navbar">
      <h2 onClick={() => pindahHalaman("halamanUtama")}>🛒 TOKO</h2>

      <div className="kanan-navbar">
        <button onClick={() => pindahHalaman("keranjang")}>
          🛒 ({jumlahKeranjang})
        </button>

        {pengguna.email ? (
          <>
            {/* ✅ Tambah tombol profil */}
            <button onClick={() => pindahHalaman("profil")}>
              👤 {pengguna.email}
            </button>

            {pengguna.role === "admin" && (
              <button onClick={() => pindahHalaman("admin")}>Admin Panel</button>
            )}
            {pengguna.role === "seller" && (
              <button onClick={() => pindahHalaman("seller")}>Seller Panel</button>
            )}
          </>
        ) : (
          <button onClick={() => pindahHalaman("login")}>Login</button>
        )}
      </div>
    </nav>
  );
}