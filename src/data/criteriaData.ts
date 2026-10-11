import { Criterion } from '../types';

export const CRITERIA_DATA: Criterion[] = [
  // 1. Sahsiah & Agama (7 kriteria)
  {
    id: 'sahsiah-1',
    category: 'sahsiah',
    categoryTitle: 'Sahsiah & Agama',
    title: 'Konsistensi Ibadah di Awal Waktu & Berjamaah',
    description: 'Menilai kesungguhan menjaga salat bukan hanya saat sedang berdua atau ingin memberi kesan baik, melainkan sebagai prioritas hidup mandiri.',
    actionEvidencePrompt: 'Perhatikan saat sedang bepergian atau berbincang melewati waktu azan. Apakah dia berinisiatif mencari masjid/mushala tanpa perlu diingatkan, atau justru menunda salat hingga mepet waktu?'
  },
  {
    id: 'sahsiah-2',
    category: 'sahsiah',
    categoryTitle: 'Sahsiah & Agama',
    title: 'Adab Terhadap Pelayan & Orang Bawah',
    description: 'Karakter sejati seorang pria terlihat jelas dari cara dia memperlakukan orang yang tidak memiliki keuntungan jabatan atau kuasa atas dirinya.',
    actionEvidencePrompt: 'Amati saat makan di restoran atau menghadapi kasir yang salah mencatat pesanan. Apakah dia tetap santun, mengucapkan terima kasih, atau bersikap kasar, meremehkan, dan memaki?'
  },
  {
    id: 'sahsiah-3',
    category: 'sahsiah',
    categoryTitle: 'Sahsiah & Agama',
    title: 'Kejujuran dalam Hal-hal Kecil',
    description: 'Pria yang terbiasa berbohong untuk hal sepele (white lies) biasanya akan menutupi kesalahan besar dengan dusta yang lebih rumit.',
    actionEvidencePrompt: 'Perhatikan alasannya saat terlambat hadir atau membatalkan janji. Apakah alasannya konsisten dan masuk akal, atau dia mengubah cerita saat ditanya detailnya?'
  },
  {
    id: 'sahsiah-4',
    category: 'sahsiah',
    categoryTitle: 'Sahsiah & Agama',
    title: 'Penjagaan Pandangan & Menjaga Kehormatan',
    description: 'Menjaga maruah diri dan menghormati wanita tanpa bersikap genit atau jelalatan saat berada di ruang publik maupun di media sosial.',
    actionEvidencePrompt: 'Perhatikan arah pandangannya di tempat umum dan akun-akun yang dia ikuti/beri tanda suka di media sosial. Apakah dia menunjukkan respek atau mencari stimulasi visual berlebihan?'
  },
  {
    id: 'sahsiah-5',
    category: 'sahsiah',
    categoryTitle: 'Sahsiah & Agama',
    title: 'Konsistensi Perkataan vs Perbuatan (Integritas)',
    description: 'Pria berprinsip selalu menepati janji sekecil apa pun yang pernah diucapkannya tanpa perlu terus-menerus ditagih.',
    actionEvidencePrompt: 'Catat janji yang pernah ia buat (misal: menelepon jam tertentu, mengirim informasi, membantu hal kecil). Apakah ia melaksanakannya sesuai janji atau selalu banyak dalih lupa?'
  },
  {
    id: 'sahsiah-6',
    category: 'sahsiah',
    categoryTitle: 'Sahsiah & Agama',
    title: 'Rasa Takut Berbuat Zalim (Wara & Hati Nurani)',
    description: 'Memiliki kompas moral yang kuat, takut memakan hak orang lain, dan tidak membenarkan kecurangan dengan alasan situasi terjepit.',
    actionEvidencePrompt: 'Dengarkan cara dia menceritakan urusan bisnis, pekerjaan, atau kebiasaan berlalu lintas. Apakah dia bangga saat berhasil melanggar aturan atau mengambil keuntungan dari kelemahan orang lain?'
  },
  {
    id: 'sahsiah-7',
    category: 'sahsiah',
    categoryTitle: 'Sahsiah & Agama',
    title: 'Ketulusan Menerima Nasihat & Koreksi',
    description: 'Pria yang dewasa tidak merasa jatuh harga dirinya saat diberi masukan yang benar, serta tidak bersikap angkuh merasa selalu paling benar.',
    actionEvidencePrompt: 'Sampaikan saran kecil dengan sopan (misal: rute jalan alternatif atau pendapat berbeda mengenai topik umum). Apakah ia mendengarkan secara terbuka atau langsung defensif dan menggurui?'
  },

  // 2. Pengurusan Kewangan (6 kriteria)
  {
    id: 'kewangan-1',
    category: 'kewangan',
    categoryTitle: 'Pengurusan Finansial',
    title: 'Keterbukaan Status Tanggungan & Hutang',
    description: 'Keberanian bersikap transparan mengenai kondisi finansial nyata, cicilan aktif, hutang produktif/konsumtif, dan komitmen nafkah.',
    actionEvidencePrompt: 'Saat membicarakan rencana masa depan, amati apakah dia terbuka menjelaskan beban cicilan/pinjaman atau bersikap misterius dan defensif saat topik keuangan dibahas.'
  },
  {
    id: 'kewangan-2',
    category: 'kewangan',
    categoryTitle: 'Pengurusan Finansial',
    title: 'Pola Belanja Kebutuhan vs Menjual Gengsi',
    description: 'Memiliki disiplin finansial hidup sesuai kemampuan nyata, bukan bergaya mewah dengan barang branded demi pujian sementara berutang kartu kredit.',
    actionEvidencePrompt: 'Perhatikan pilihan gaya hidupnya sehari-hari (gadget, mobil, pakaian, nongkrong). Apakah pengeluarannya realistis berbanding lurus dengan pendapatan dan tabungan amannya?'
  },
  {
    id: 'kewangan-3',
    category: 'kewangan',
    categoryTitle: 'Pengurusan Finansial',
    title: 'Rencana Tempat Tinggal Mandiri Pasca Menikah',
    description: 'Kesadaran penuh bahwa nafkah tempat tinggal yang aman dan berjarak sehat dari campur tangan pihak ketiga adalah hak dasar seorang istri.',
    actionEvidencePrompt: 'Tanyakan pandangannya tentang tempat tinggal setelah menikah. Apakah dia memiliki rencana realistis (kontrak mandiri/beli rumah) atau bersikeras tinggal bersama orang tuanya tanpa batas waktu?'
  },
  {
    id: 'kewangan-4',
    category: 'kewangan',
    categoryTitle: 'Pengurusan Finansial',
    title: 'Tidak Ada Kebiasaan Meminjam Uang pada Calon Istri',
    description: 'Pria yang menjaga harga diri dan berniat tulus tidak akan menjadikan wanita tempat bergantung secara finansial pada masa ta’aruf/perkenalan.',
    actionEvidencePrompt: 'Apakah dia pernah mengeluh kesulitan uang, meminjam uang, meminta bantuan pembayaran, atau memanfaatkan fasilitas Anda dengan dalih bisnis/kepepet? (PERINGATAN RED FLAG BESAR!)'
  },
  {
    id: 'kewangan-5',
    category: 'kewangan',
    categoryTitle: 'Pengurusan Finansial',
    title: 'Etos Kerja Nyata & Tanggung Jawab Nafkah',
    description: 'Bukan sekadar memiliki mimpi besar, melainkan bukti kerja keras setiap hari dan kegigihan mencari rezeki yang halal untuk keluarga.',
    actionEvidencePrompt: 'Amati rutinitas hariannya. Apakah dia memiliki sumber penghasilan yang jelas dan tekun, atau banyak menganggur dengan khayalan proyek triliunan tanpa eksekusi?'
  },
  {
    id: 'kewangan-6',
    category: 'kewangan',
    categoryTitle: 'Pengurusan Finansial',
    title: 'Kejelasan Pembagian Hak Keuangan Istri',
    description: 'Memahami perbedaan antara biaya operasional dapur rumah tangga dengan nafkah pribadi (uang saku khusus) untuk istri.',
    actionEvidencePrompt: 'Diskusikan konsep nafkah secara objektif. Apakah dia paham bahwa gaji istri adalah hak penuh istri dan tidak boleh dihitung sebagai pengganti kewajiban nafkah suami?'
  },

  // 3. Hubungan Keluarga & Ibu Bapa (6 kriteria)
  {
    id: 'keluarga-1',
    category: 'keluarga',
    categoryTitle: 'Hubungan Keluarga & Orang Tua',
    title: 'Bakti & Adab Terhadap Ibu Kandung',
    description: 'Cara seorang pria memperlakukan ibunya seringkali menjadi cerminan cara dia memperlakukan istrinya setelah rasa berbunga-bunga memudar.',
    actionEvidencePrompt: 'Perhatikan nada bicaranya saat ibunya menelepon. Apakah dia menjawab dengan sabar, penuh hormat, atau berbicara membentak, kesal, dan meremehkan?'
  },
  {
    id: 'keluarga-2',
    category: 'keluarga',
    categoryTitle: 'Hubungan Keluarga & Orang Tua',
    title: 'Batasan Tegas Campur Tangan Keluarga (Healthy Boundary)',
    description: 'Pria harus berbakti kepada orang tua, namun wajib mampu melindungi privasi rumah tangganya kelak agar tidak disetir pihak luar.',
    actionEvidencePrompt: 'Diskusikan skenario jika timbul perbedaan pendapat antara istri dan keluarganya. Apakah dia mampu bersikap adil dan menjadi penengah yang bijak, atau tipe anak mama (mommy’s boy) yang pasrah?'
  },
  {
    id: 'keluarga-3',
    category: 'keluarga',
    categoryTitle: 'Hubungan Keluarga & Orang Tua',
    title: 'Penerimaan Tulus Terhadap Anak Bawaan (Khusus Single Mom)',
    description: 'Menikahi ibu tunggal berarti menerima paket utuh dengan anaknya tanpa membeda-bedakan kasih sayang atau menganggap anak sebagai beban.',
    actionEvidencePrompt: 'Perhatikan interaksi spontannya dengan anak (atau saat membicarakan kebutuhan anak). Apakah dia tulus menyapa, sabar, atau terlihat canggung, dingin, dan enggan berdekatan?'
  },
  {
    id: 'keluarga-4',
    category: 'keluarga',
    categoryTitle: 'Hubungan Keluarga & Orang Tua',
    title: 'Kesiapan Menghadap & Menghormati Wali Sah',
    description: 'Pria yang jantan dan serius akan meminta izin secara terhormat kepada wali nasab wanita, bukan mengajak berpacaran sembunyi-sembunyi.',
    actionEvidencePrompt: 'Saat Anda meminta dia menemui wali atau keluarga Anda secara resmi, apakah dia menyambut dengan penuh hormat dan kesiapan, atau mencari-cari alasan untuk menunda?'
  },
  {
    id: 'keluarga-5',
    category: 'keluarga',
    categoryTitle: 'Hubungan Keluarga & Orang Tua',
    title: 'Penerimaan Keluarga Besarnya Terhadap Anda',
    description: 'Keluarga pihak pria menyambut kehadiran Anda dengan tangan terbuka dan tidak mempermasalahkan status sosial atau latar belakang masa lalu.',
    actionEvidencePrompt: 'Bagaimana respons keluarganya saat nama Anda diperkenalkan? Apakah ada kehangatan dan rasa hormat, atau terdapat perlakuan diskriminatif dan sinis?'
  },
  {
    id: 'keluarga-6',
    category: 'keluarga',
    categoryTitle: 'Hubungan Keluarga & Orang Tua',
    title: 'Sikap Adil Terhadap Mantan Pasangan & Anak Kandung (Jika Duda)',
    description: 'Jika calon adalah seorang duda, amati bagaimana tanggung jawab nafkah kepada anak-anaknya dan caranya membicarakan mantan istrinya.',
    actionEvidencePrompt: 'Apakah dia tetap menafkahi anak kandungnya secara rutin dan tidak menjelek-jelekkan mantan pasangannya secara membabi buta?'
  },

  // 4. Komunikasi & Emosi (6 kriteria)
  {
    id: 'komunikasi-1',
    category: 'komunikasi',
    categoryTitle: 'Komunikasi & Regulasi Emosi',
    title: 'Pengendalian Emosi Saat Marah & Kelelahan',
    description: 'Pria berkualitas diuji bukan saat hatinya senang, melainkan saat sedang lelah, lapar, terjebak macet, atau rencananya berantakan.',
    actionEvidencePrompt: 'Amati perilakunya saat terjebak macet parah atau menghadapi situasi menegangkan. Apakah dia memukul setir, melontarkan kata-kata kotor, atau mampu tetap tenang dan rasional?'
  },
  {
    id: 'komunikasi-2',
    category: 'komunikasi',
    categoryTitle: 'Komunikasi & Regulasi Emosi',
    title: 'Bebas dari Silent Treatment & Manipulasi Gaslighting',
    description: 'Mampu berkomunikasi dua arah untuk menyelesaikan masalah, bukan mendiamkan berhari-hari untuk menghukum mental pasangan.',
    actionEvidencePrompt: 'Saat ada kesalahpahaman kecil, apakah dia bersedia duduk bersama berdialog, atau dia mendadak menghilang, memutus kontak (silent treatment), dan membalikkan fakta seolah Anda yang bersalah?'
  },
  {
    id: 'komunikasi-3',
    category: 'komunikasi',
    categoryTitle: 'Komunikasi & Regulasi Emosi',
    title: 'Akuntabilitas: Keberanian Mengakui Kesalahan & Minta Maaf',
    description: 'Tanda kedewasaan tertinggi adalah kerendahan hati mengakui kelalaian sendiri tanpa menyalahkan takdir, orang lain, atau situasi.',
    actionEvidencePrompt: 'Ketika dia terbukti keliru atau lupa mengerjakan sesuatu, apakah kata maaf tulus keluar dari bibirnya, atau dia sibuk membuat dalih dan membela diri?'
  },
  {
    id: 'komunikasi-4',
    category: 'komunikasi',
    categoryTitle: 'Komunikasi & Regulasi Emosi',
    title: 'Tidak Ada Gejala Love-Bombing (Janji Manis Melampaui Batas)',
    description: 'Pria manipulatif sering menghujani hadiah berlebihan, pujian selangit, dan deklarasi cinta mati dalam waktu sangat singkat untuk mengaburkan akal sehat.',
    actionEvidencePrompt: 'Apakah dia menyatakan Anda adalah satu-satunya belahan jiwa dan memaksa buru-buru menikah dalam hitungan minggu sebelum benar-benar saling mengenal secara realistis?'
  },
  {
    id: 'komunikasi-5',
    category: 'komunikasi',
    categoryTitle: 'Komunikasi & Regulasi Emosi',
    title: 'Kemampuan Menjadi Pendengar yang Empatik',
    description: 'Pria yang matang menghargai perasaan wanita, mendengarkan tanpa memotong pembicaraan, dan tidak meremehkan kekhawatiran pasangan.',
    actionEvidencePrompt: 'Ceritakan satu keresahan atau beban pikiran yang Anda alami. Apakah dia mendengarkan dengan penuh perhatian, atau langsung memotong dan mengalihkan topik ke kehebatan dirinya?'
  },
  {
    id: 'komunikasi-6',
    category: 'komunikasi',
    categoryTitle: 'Komunikasi & Regulasi Emosi',
    title: 'Rasa Hormat Terhadap Batasan Diri (Personal Boundaries)',
    description: 'Menghargai waktu pribadi, prinsip syariat Anda dalam pergaulan, dan tidak memaksa kontak fisik sebelum akad nikah.',
    actionEvidencePrompt: 'Saat Anda menolak untuk pergi berdua larut malam atau membatasi komunikasi fisik demi menjaga batas syar’i, apakah dia menghormatinya atau justru merajuk dan menuduh Anda tidak sayang?'
  }
];
