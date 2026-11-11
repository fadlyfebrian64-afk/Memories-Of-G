/* ============================================================
   DATA KELAS G — edit file ini saja untuk mengganti isi web.
   Foto: taruh di folder img/ dengan nama sesuai di bawah.
   Siswa  : img/siswa/01.jpg ... 40.jpg
   Wali   : img/wali/wali-1.jpg ... wali-3.jpg
   Galeri : vii-1 ... vii-11, viii-1 ... viii-2, ix-1 ... ix-19
            (format .jpg, .jpeg, .png, .webp otomatis dikenali)
   Logo   : img/logo.svg (tampil di judul, navbar, dan tab browser)
   Musik  : audio/lagu-1.mp3 ... (jika tidak ada, web memutar
            melodi bawaan supaya pemutar tetap berfungsi)
   ============================================================ */

const NAMA = [
  "Akbar Choerul Azam","Almira Nirmania Ramadhani","Amira FitriKasari","Annisa Nur Fauziyyah","Artila Rafa Aprilia",
  "Azkani Fadlan","Azkha Alfarizki","Bagus Furqhon Ramdhani","Bima Wiratanaka","Elpa Azzahra",
  "Elsa Fahira","Enjellita Eryani","Ersya Aini Putri","Hilmi Fakhir Hamdani","Ihsan Kamil Prayudhi",
  "Kevin Hendrian","Marisa Oktaviani","Marsya Siti Aisyah","Maulida Nurul Fauziyah","Moch Arfi Setiawan Putra",
  "Moch Haikal Awalludin","Moch Ilham Arifin","Moch Fadhil Rivaldi","Moch Fadly Febrian","Moh Hafizh Saepudin",
  "Muh Nizam Wijaya","Muh Radit Saputra Andriansyah","Muh Rahamatulloh","Muh Raka Alfaraby Anwar","Nadia Anggraini",
  "Nursalsabila","Nurul Siti Nurhasanah","Putri Alifah Nurfauziah","Putri Syaidah","Ristan Tama Zibran",
  "Rival Septian Hardiansyah","Rizki Eko Saputro","Siti Aisyah Putri Rahayu","Siti Halimah","Ziyan Alfiansyah"
];
const KATA = [
  "Kelas ini bukan sekadar ruangan, tapi tempat kita belajar jadi manusia.",
  "Tawa kita hari itu masih terdengar sampai sekarang.",
  "Terima kasih sudah jadi alasan aku semangat berangkat sekolah.",
  "Bangku paling belakang, kenangan paling depan.",
  "Kita pernah salah dan ribut, tapi selalu pulang ke tempat yang sama.",
  "Hal kecil bersama kalian terasa paling besar.",
  "Jam kosong adalah hadiah terbaik yang pernah kita punya.",
  "Suatu hari kita akan rindu bisingnya kelas ini.",
  "Teman datang dan pergi, tapi kalian tinggal di ingatan.",
  "Nilai bisa dilupakan, cerita kita tidak.",
  "Pelan-pelan tumbuh, bareng-bareng utuh.",
  "Hari paling melelahkan pun terasa ringan kalau ada kalian.",
  "Kalau suatu saat lupa jalan, ingat saja jalan menuju Kelas G.",
  "Seragam boleh dilepas, persahabatan jangan.",
  "Di kelas ini aku belajar bahwa rumah bisa berupa orang.",
  "Kita tidak sempurna, tapi kita kompak.",
  "Setiap tawa di sini adalah tabungan untuk dikenang.",
  "Sampai jumpa bukan berarti selesai.",
  "Terima kasih sudah sabar menghadapi aku yang begini.",
  "Masa muda terbaik adalah yang dihabiskan bersama kalian.",
  "Jangan jadi asing ya, setelah semua ini.",
  "Ada empat puluh cerita, dan aku beruntung ada di dalamnya.",
  "Kantin, koridor, dan lapangan sudah tahu semua rahasia kita.",
  "Meskipun berbeda jalan tetapi kita tetap satu Tujuan.",
  "Satu kelas, seribu kenangan, tanpa penyesalan.",
  "Kelak, foto ini akan jadi hal paling berharga.",
  "Kita tumbuh di bangku yang sama, lalu terbang ke arah berbeda.",
  "Semoga kita semua sampai di tempat yang kita impikan.",
  "Dulu kita saling contek, sekarang saling mendoakan.",
  "Terima kasih untuk setiap pinjaman pulpen yang tak pernah kembali.",
  "Kalau rindu, buka foto ini dan tersenyumlah.",
  "Ruang kelas boleh sepi, kenangannya tetap ramai.",
  "Kita pernah kecil bersama, nanti kita besar bersama.",
  "Pelajaran paling berharga: tertawa bersama saat semuanya sulit.",
  "Tidak ada yang kebetulan, termasuk bertemu kalian.",
  "Aku bangga pernah jadi bagian dari Kelas G.",
  "Waktu terus berjalan, tapi bangku kita tetap di hati.",
  "Kita boleh berpisah jalan, tapi cerita ini tetap satu.",
  "Terima kasih sudah membuat hari biasa jadi luar biasa.",
  "Kelas G, tempat pulang paling hangat selama tiga tahun."
];
const KELAS = {
  nama: "Memories Of-G",
  sekolah: "SMPN 4 GARUT · Angkatan 2023–2026",
  mulai: "2023-07-17",           // tanggal hari pertama masuk
  frasa: [
    "Tiga tahun, satu rumah.",
    "Tertawa bersama, tumbuh bersama.",
    "Empat puluh cerita dalam satu kelas.",
    "Terima kasih sudah jadi bagian dari perjalanan ini."
  ],
  // Foto polaroid di beranda (disarankan 3-5 foto). cap = tulisan di bawah foto.
  // Boleh pakai foto mana saja, misalnya taruh di img/beranda/1.jpg, 2.jpg, dst.
  hero: [
    { foto:"img/galeri/vii-5.jpg",  cap:"First Photo" },
    { foto:"img/galeri/ix-19.jpg", cap:"Graduation" },
    { foto:"img/galeri/ix-3.jpg",   cap:"Foto seragam" },
    { foto:"img/galeri/ix-17.jpg",  cap:"SAGE" }
  ],
  wali: [
    { nama:"Pak Egi Megiana, S.Pd.", peran:"Wali Kelas VII",   mapel:"IPA", foto:"img/wali/wali-1.jpg.jpeg",
      pesan:"Kalian datang malu-malu, tapi pergi dengan keberanian. Bapak bangga." },
    { nama:"Pak Zenal Muttaqin, S.Pd.", peran:"Wali Kelas VIII",  mapel:"B.Sunda", foto:"img/wali/wali-2.jpg.jpeg",
      pesan:"Tidak semua soal punya jawaban cepat. Sama seperti hidup, sabar itu rumusnya." },
    { nama:"Bu Irma Pirmandani, S.Pd.", peran:"Wali Kelas IX", mapel:"B.Indonesia", foto:"img/wali/wali-3.jpg.jpeg",
      pesan:"Tumbuhlah ke mana pun kalian mau. Pintu kelas ini selalu terbuka." }
  ],
  siswa: NAMA.map((nama, i) => ({
  nama,
  kata: KATA[i],
  foto: `img/siswa/${String(i + 1).padStart(2, "0")}.jpg`
})),
  galeri: [
    { label:"Kelas VII",  kode:"vii",  momen:["Hari pertama","Fotbar bersama Bu Nita","Fotbar bersama Ibu PLP","Fotbar Bersama Bu PLP","Fotbar After Praktek Tari","Potret Tenda Cowok","Fotbar Cewe'G Di Perkemahan","Fotbar Terakhir Bersama Wakel 7","Fotbar Cewe'G Part 2","Potret Tenda Cewek","Potret Tenda Cowok Part 2"] },
    { label:"Kelas VIII", kode:"viii", momen:["Fotbar With Bu Yeni","Upacara Pertama Sebagai Aud"] },
    { label:"Kelas IX",   kode:"ix",   momen:["Fotbar Di Kolam Renang","Fotbar Pertama bersama Wakel 9","Fotbar Pertama bersama Wakel 9","Fotbar With Pa Erdy","Fotbar After Papasakan","Fotbar After Maulid Nabi","Fotbar After Praktek Tari","Upacara Terakhir","Fotbar After Ultah Wakel 9","Fotbar After Purna Ekskul","Bukberrrrr","Boyss G","Fotbar After Mainn","Girlss G","Fotbar After LCC","Fotbar After Foto Ijazah","Foto Kelas Terakhir...","Ketapang Sagee","Perpisahan..."] }
  ],
  linimasa: [
    { t:"Juli 2023",      j:"Hari pertama di Kelas G",  i:"42 orang asing duduk di satu ruangan kelas." },
    { t:"Agustus 2023",   j:"Perlombaan pertama kita",  i:"Pertama kalinya kita bertanding sebagai satu tim." },
    { t:"September 2023", j:"Camp pertama kita",        i:"Cerita pertama kita di luar ruang kelas." },
    { t:"2024",           j:"Study tour",               i:"Perjalanan yang membuat kita makin dekat." },
    { t:"April 2025",     j:"Pentas drama Bu Yeni",     i:"Kelas G tampil di atas panggung drama." },
    { t:"Januari 2026",   j:"Foto ijazah",              i:"Selembar foto untuk kenangan yang kita bawa pulang." },
    { t:"Mei 2026",       j:"Pentas seni budaya",       i:"Panggung terakhir kita sebagai satu kelas." },
    { t:"Mei 2026",       j:"Foto kelas dan foto angkatan terakhir", i:"Satu bingkai untuk tiga tahun yang panjang." },
    { t:"Juni 2026",      j:"Perpisahan",               i:"Berpisah jalan, tetap satu cerita." }
  ],
  lagu: [
    { judul:"Ini Abadi",  artis:"Perunggu",       file:"audio/lagu-1.mp3" },
    { judul:"What if I Call",       artis:"Alex Crichtown", file:"audio/lagu-2.mp3" },
    { judul:"Ribuan Memori",artis:"Lomba Sihir",       file:"audio/lagu-3.mp3" }
  ]
};