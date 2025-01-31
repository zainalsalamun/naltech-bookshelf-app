📚 Bookshelf App

Bookshelf App adalah aplikasi berbasis web yang memungkinkan pengguna untuk menambahkan, menyimpan, dan menghapus daftar buku yang ingin dibaca atau sudah dibaca. Aplikasi ini dibuat menggunakan HTML, CSS, dan JavaScript dengan fitur manipulasi DOM, event handling, dan penyimpanan data menggunakan localStorage.

🚀 Fitur Utama

Menambahkan Buku: Pengguna dapat memasukkan judul buku, penulis, tahun terbit, dan menandai apakah buku sudah dibaca atau belum.

Menyimpan Data di localStorage: Data buku tetap tersimpan meskipun halaman direfresh atau browser ditutup.

Menghapus Buku: Buku yang tidak diperlukan lagi dapat dihapus dari daftar.

Indikator Buku Dibaca: Buku yang sudah dibaca akan ditandai dengan warna latar belakang yang berbeda.

📁 Struktur Folder

bookshelf-app/
│
├── index.html       # Halaman utama aplikasi
├── style.css        # Styling tampilan aplikasi
├── script.js        # Logika aplikasi (Manipulasi DOM, Event, Storage)
└── README.md        # Dokumentasi aplikasi

📌 Cara Menjalankan Aplikasi

1️⃣ Menjalankan Secara Lokal

Download atau clone repository ini

git clone https://github.com/zainalsalamun/naltech-bookshelf-app
cd bookshelf-app

Buka file index.html di browser

Bisa langsung klik dua kali file index.html

Atau gunakan Live Server di VSCode untuk menjalankan lebih optimal.

2️⃣ Deploy ke GitHub Pages

Inisialisasi Git dan push ke GitHub

git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/zainalsalamun/naltech-bookshelf-app
git push -u origin master

Aktifkan GitHub Pages

Buka Settings → Pages di repository GitHub Anda.

Pilih Branch: master/main → Save.

Aplikasi akan tersedia di https://github.com/zainalsalamun/naltech-bookshelf-app

🛠 Teknologi yang Digunakan

HTML → Struktur tampilan aplikasi

CSS → Styling tampilan dengan efek visual yang lebih baik

JavaScript → Logika aplikasi untuk manipulasi DOM dan penyimpanan data di localStorage

📝 Cara Menggunakan Aplikasi

Masukkan informasi buku di form:

Judul Buku

Penulis Buku

Tahun Terbit

Centang "Already Read" jika buku sudah dibaca

Klik tombol "Add Book" untuk menambahkan ke daftar.

Daftar buku akan ditampilkan di Reading List.

Klik tombol "Delete" untuk menghapus buku dari daftar.

Data tetap tersimpan di localStorage meskipun halaman direfresh.

🎯 Kesimpulan

✅ Form input lengkap (judul, penulis, tahun, status baca)✅ Penyimpanan data dengan localStorage✅ Event handling untuk menambah & menghapus buku✅ Deploy mudah ke GitHub Pages

Aplikasi ini sangat cocok untuk latihan manipulasi DOM, event handling, dan penggunaan Web Storage. Jika ada pertanyaan atau saran, silakan buka issue atau pull request di repository ini. 🚀

