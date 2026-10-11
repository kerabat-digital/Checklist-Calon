import { TaarufQuestionItem } from '../types';

export const QUESTIONS_DATA: TaarufQuestionItem[] = [
  // 1. Niat & Tujuan Pernikahan (4 soalan)
  {
    id: 'q-1',
    questionNumber: 1,
    category: 'niat',
    categoryLabel: 'Niat & Tujuan Pernikahan',
    question: 'Apa tujuan paling mendasar Anda ingin menikah, dan visi rumah tangga seperti apa yang ingin Anda bangun 10 tahun ke depan?',
    purpose: 'Menguji apakah pernikahannya berlandaskan ibadah yang matang atau hanya dorongan biologis, gengsi sosial, atau desakan keluarga.',
    greenFlagAnswer: 'Menjelaskan visi konkret tentang sakinah, mawaddah, mendidik generasi saleh, serta peran saling melengkapi dengan tenang dan realistis.',
    redFlagAnswer: 'Jawaban klise dan terburu-buru seperti: "Biar ada yang ngurus makanan saya", "Biar nggak kesepian lagi", atau sekadar "Karena sudah saatnya".',
    proTip: 'Perhatikan apakah dia antusias membicarakan nilai ibadah atau malah cepat-cepat mengarahkan topik ke candaan seksual.'
  },
  {
    id: 'q-2',
    questionNumber: 2,
    category: 'niat',
    categoryLabel: 'Niat & Tujuan Pernikahan',
    question: 'Jika suatu hari nanti cinta dan ketertarikan fisik memudar oleh usia atau sakit, nilai apa yang akan mempertahankan komitmen Anda?',
    purpose: 'Melihat pemahamannya tentang cinta berbasis komitmen moral (rahmah dan amanah), bukan sekadar gairah sesaat.',
    greenFlagAnswer: 'Menyadari bahwa pernikahan adalah perjanjian agung (mitsaqan ghalidha) yang dijaga dengan rasa takut kepada Allah dan komitmen menjaga kehormatan istri.',
    redFlagAnswer: 'Merasa heran dengan pertanyaan ini, atau menjawab enteng: "Kalau sudah nggak cocok ya tinggal cari yang lain".',
    proTip: 'Amati kontak matanya. Pria yang setia memiliki tatapan teguh dan tidak mengalihkan pandangan saat ditanya soal komitmen jangka panjang.'
  },
  {
    id: 'q-3',
    questionNumber: 3,
    category: 'niat',
    categoryLabel: 'Niat & Tujuan Pernikahan',
    question: 'Bagaimana peran kepemimpinan suami (Qawwamah) yang ideal menurut Anda dalam praktik kehidupan modern sehari-hari?',
    purpose: 'Mengetahui apakah dia memandang kepemimpinan sebagai hak mendominasi atau sebagai amanah melayani dan melindungi.',
    greenFlagAnswer: 'Memahami qawwamah sebagai pengayom, pelindung, pendengar musyawarah, dan penyedia nafkah utama, bukan diktator yang tak boleh dibantah.',
    redFlagAnswer: 'Menganggap suami adalah raja mutlak di mana istri wajib patuh buta 100% tanpa boleh mengemukakan pendapat apa pun.',
    proTip: 'Cermati apakah dia menggunakan dalil agama untuk membenarkan ego pribadinya atau mengutipnya dengan kerendahan hati.'
  },
  {
    id: 'q-4',
    questionNumber: 4,
    category: 'niat',
    categoryLabel: 'Niat & Tujuan Pernikahan',
    question: 'Apa hal yang paling Anda takuti terjadi dalam rumah tangga, dan bagaimana rencana Anda untuk mencegahnya?',
    purpose: 'Menguji kedewasaan refleksi diri dan apakah dia memiliki strategi mitigasi krisis.',
    greenFlagAnswer: 'Menyebutkan hilangnya keberkahan, kemarahan yang tidak terkontrol, atau pengabaian hak anak/istri, lalu menawarkan solusi komunikasi rutin.',
    redFlagAnswer: 'Menjawab merasa tidak takut sama sekali karena merasa dirinya selalu benar dan mampu mengendalikan segalanya.',
    proTip: 'Pria yang bijak mengakui kelemahan dirinya dan selalu memohon perlindungan kepada Allah.'
  },

  // 2. Finansial & Nafkah Sehari-hari (5 soalan)
  {
    id: 'q-5',
    questionNumber: 5,
    category: 'finansial',
    categoryLabel: 'Finansial & Nafkah',
    question: 'Bagaimana pembagian anggaran yang Anda rencanakan antara kebutuhan operasional rumah tangga, tabungan masa depan, dan nafkah pribadi istri?',
    purpose: 'Memastikan calon mengerti perbedaan mendasar antara uang belanja dapur dengan hak nafkah pribadi istri.',
    greenFlagAnswer: 'Memiliki gambaran pos anggaran yang jelas dan menegaskan bahwa istri berhak menerima uang nafkah pribadi di luar uang belanja dapur.',
    redFlagAnswer: 'Menganggap uang belanja dapur sudah mencakup semua kebutuhan istri, atau menuntut istri bekerja untuk menanggung separuh biaya hidup.',
    proTip: 'Pria yang bertanggung jawab tidak akan risih atau malu membicarakan angka pengeluaran secara transparan.'
  },
  {
    id: 'q-6',
    questionNumber: 6,
    category: 'finansial',
    categoryLabel: 'Finansial & Nafkah',
    question: 'Apakah saat ini Anda memiliki kewajiban cicilan, pinjaman bank, kartu kredit, atau hutang pribadi yang sedang berjalan?',
    purpose: 'Mencegah Anda terjebak dalam krisis finansial tersembunyi atau jeratan pinjol pasca menikah.',
    greenFlagAnswer: 'Menjawab dengan jujur dan lugas, menyebutkan rincian nominal dan sisa tenor cicilan tanpa ada yang disembunyikan.',
    redFlagAnswer: 'Menghindar, tersinggung, atau berkata: "Itu urusan privasi saya, nanti setelah menikah juga kamu tahu sendiri".',
    proTip: 'Jika dia gugup atau mengubah topik pembicaraan dengan cepat, lakukan verifikasi mendalam.'
  },
  {
    id: 'q-7',
    questionNumber: 7,
    category: 'finansial',
    categoryLabel: 'Finansial & Nafkah',
    question: 'Jika istri memiliki penghasilan sendiri, bagaimana pandangan Anda mengenai status uang dan aset pribadi istri tersebut?',
    purpose: 'Menegakkan hukum syariat bahwa penghasilan dan harta istri adalah milik mutlak istri.',
    greenFlagAnswer: 'Menegaskan bahwa uang istri adalah hak penuh istri; jika istri membantu rumah tangga, itu terhitung sedekah sukarela tanpa paksaan.',
    redFlagAnswer: 'Mengharuskan uang istri diserahkan ke suami atau menghitung gaji istri untuk mengurangi kewajiban nafkah pokoknya.',
    proTip: 'Waspadai pria yang terlalu antusias menanyakan jumlah gaji atau warisan yang Anda miliki.'
  },
  {
    id: 'q-8',
    questionNumber: 8,
    category: 'finansial',
    categoryLabel: 'Finansial & Nafkah',
    question: 'Bagaimana rencana penyediaan tempat tinggal kita setelah menikah: mengontrak mandiri, membeli rumah, atau tinggal bersama keluarga?',
    purpose: 'Menguji komitmen memandirikan rumah tangga dan melindungi privasi psikologis istri.',
    greenFlagAnswer: 'Berkomitmen menyediakan tempat tinggal mandiri terpisah dari orang tua, walau harus mulai dari kontrak rumah sederhana.',
    redFlagAnswer: 'Memaksa untuk wajib tinggal di rumah orang tuanya selamanya dengan alasan kepraktisan tanpa peduli batasan privasi istri.',
    proTip: 'Keberanian berpisah atap dari orang tua adalah indikator kematangan mental seorang kepala keluarga.'
  },
  {
    id: 'q-9',
    questionNumber: 9,
    category: 'finansial',
    categoryLabel: 'Finansial & Nafkah',
    question: 'Apa langkah finansial darurat yang akan Anda ambil jika salah satu dari kita mengalami krisis ekonomi atau kehilangan pekerjaan?',
    purpose: 'Mengetahui kesiapan dana darurat, daya tahan mental dalam krisis, dan etos kerja.',
    greenFlagAnswer: 'Memiliki dana cadangan darurat dan kesiapan bekerja apa pun yang halal tanpa gengsi tinggi.',
    redFlagAnswer: 'Pasrah total tanpa rencana, atau mengandalkan bantuan orang tua dan pinjaman ke pihak lain.',
    proTip: 'Pria tangguh tidak gengsi banting tulang saat roda kehidupan sedang berada di bawah.'
  },

  // 3. Kemarahan, Konflik & Regulasi Emosi (5 soalan)
  {
    id: 'q-10',
    questionNumber: 10,
    category: 'emosi',
    categoryLabel: 'Kemarahan & Regulasi Emosi',
    question: 'Ketika Anda sedang sangat marah atau kecewa kepada pasangan, apa respons spontan yang biasa keluar dari diri Anda?',
    purpose: 'Mendeteksi potensi kekerasan verbal, fisik, atau penelantaran emosional (silent treatment).',
    greenFlagAnswer: 'Mengambil jeda berwudhu, menenangkan diri sejenak, lalu mengajak berdialog kepala dingin setelah emosi mereda.',
    redFlagAnswer: 'Membanting barang, mendiamkan berhari-hari, melontarkan kata kasar, atau langsung keluar membanting pintu.',
    proTip: 'Tanyakan contoh konkret saat ia terakhir kali marah besar kepada teman atau anggota keluarganya.'
  },
  {
    id: 'q-11',
    questionNumber: 11,
    category: 'emosi',
    categoryLabel: 'Kemarahan & Regulasi Emosi',
    question: 'Bagaimana aturan main kita berdua jika terjadi perselisihan sengit: apakah boleh pisah ranjang atau saling mendiamkan?',
    purpose: 'Menetapkan batasan sehat resolusi konflik sebelum pernikahan dimulai.',
    greenFlagAnswer: 'Sepakat tidak tidur terpisah, tidak mendiamkan lebih dari 1x24 jam, dan pantang membawa masalah ranjang ke media sosial.',
    redFlagAnswer: 'Menganggap wajar mendiamkan pasangan sampai pasangan bertekuk lutut memohon maaf.',
    proTip: 'Silent treatment berkepanjangan adalah salah satu bentuk racun terbesar dalam pernikahan modern.'
  },
  {
    id: 'q-12',
    questionNumber: 12,
    category: 'emosi',
    categoryLabel: 'Kemarahan & Regulasi Emosi',
    question: 'Jika kita berdua menyadari bahwa sebuah kesalahan terjadi karena kelalaian Anda, apakah sulit bagi Anda untuk berinisiatif meminta maaf?',
    purpose: 'Mengukur tingkat ego maskulin beracun (toxic ego) vs akuntabilitas sejati.',
    greenFlagAnswer: 'Menyatakan bahwa meminta maaf kepada istri demi kebaikan rumah tangga bukan kelemahan, melainkan kewajiban moral ksatria.',
    redFlagAnswer: 'Membela diri dengan dalih: "Seorang suami tidak pantas minta maaf duluan karena akan menurunkan wibawa kepemimpinan".',
    proTip: 'Pria yang rendah hati di hadapan kebenaran adalah permata yang sangat berharga.'
  },
  {
    id: 'q-13',
    questionNumber: 13,
    category: 'emosi',
    categoryLabel: 'Kemarahan & Regulasi Emosi',
    question: 'Bagaimana cara Anda menanggapi kritik atau masukan dari istri yang mungkin terdengar kurang berkenan di telinga Anda?',
    purpose: 'Menguji apakah dia anti-kritik atau terbuka terhadap komunikasi yang membangun.',
    greenFlagAnswer: 'Mendengarkan esensinya terlebih dahulu, memisahkan nada bicara dari fakta, dan mendiskusikan solusinya secara rasional.',
    redFlagAnswer: 'Langsung tersulut emosi, menyerang balik kekurangan istri, atau menganggap istri tidak tahu diri.',
    proTip: 'Coba berikan kritik kecil saat makan (misal: merekomendasikan pilihan menu lain) dan amati perubahan mimik wajahnya.'
  },
  {
    id: 'q-14',
    questionNumber: 14,
    category: 'emosi',
    categoryLabel: 'Kemarahan & Regulasi Emosi',
    question: 'Apakah Anda pernah merasa perlu meluapkan kemarahan secara fisik pada benda atau dinding saat sedang frustrasi?',
    purpose: 'Deteksi dini potensi tindak kekerasan dalam rumah tangga (KDRT).',
    greenFlagAnswer: 'Menolak keras segala bentuk kekerasan fisik dan memilih berolahraga, beribadah, atau menenangkan diri.',
    redFlagAnswer: 'Mengakui sering memukul tembok, membanting piring, atau berkata: "Itu hal wajar kalau saya dipancing emosinya".',
    proTip: 'Kekerasan terhadap benda adalah langkah awal menuju kekerasan terhadap manusia. Jangan kompromi!'
  },

  // 4. Anak & Ibu Tunggal / Single Mom (5 soalan)
  {
    id: 'q-15',
    questionNumber: 15,
    category: 'anak',
    categoryLabel: 'Anak & Ibu Tunggal',
    question: 'Bagaimana perasaan jujur Anda terhadap kehadiran anak saya, dan bagaimana Anda memposisikan diri di mata anak tersebut?',
    purpose: 'Memastikan calon tidak melihat anak sambung sebagai beban atau penghalang cinta.',
    greenFlagAnswer: 'Menyadari bahwa menikahi ibu tunggal adalah satu paket utuh dengan anak, berkomitmen menjadi sahabat, pelindung, dan teladan yang sabar.',
    redFlagAnswer: 'Menjawab canggung: "Ya kita lihat saja nanti", atau menyarankan agar anak lebih banyak diurus oleh kakek-neneknya.',
    proTip: 'Perhatikan apakah dia tersenyum tulus saat Anda memperlihatkan foto atau menceritakan tingkah laku anak Anda.'
  },
  {
    id: 'q-16',
    questionNumber: 16,
    category: 'anak',
    categoryLabel: 'Anak & Ibu Tunggal',
    question: 'Bagaimana komitmen Anda terkait biaya pendidikan, kesehatan, dan nafkah harian untuk anak bawaan ini?',
    purpose: 'Menghindari sengketa nafkah anak di masa depan.',
    greenFlagAnswer: 'Menyatakan kesiapan menafkahi anak sambung dengan ikhlas lillahi ta’ala sebagai ladang pahala jariyah yang besar.',
    redFlagAnswer: 'Bersikeras bahwa nafkah anak 100% harus tetap ditanggung mantan suami atau dibiayai dari gaji ibu sendiri.',
    proTip: 'Pria yang berjiwa besar memperlakukan anak yatim atau anak sambung dengan penuh kemuliaan.'
  },
  {
    id: 'q-17',
    questionNumber: 17,
    category: 'anak',
    categoryLabel: 'Anak & Ibu Tunggal',
    question: 'Bagaimana batasan disiplin yang akan Anda terapkan: apakah Anda sepakat tidak menggunakan hukuman fisik pada anak saya?',
    purpose: 'Melindungi anak dari potensi kekerasan orang tua tiri.',
    greenFlagAnswer: 'Sepakat bahwa pendisiplinan dilakukan dengan komunikasi positif, teladan, dan musyawarah bersama ibu tanpa kekerasan fisik.',
    redFlagAnswer: 'Menuntut hak bebas memukul atau mendisiplinkan anak dengan keras demi "membentuk mental".',
    proTip: 'Perlindungan anak adalah garis merah mutlak yang tidak boleh ditawar demi cinta pada pria mana pun.'
  },
  {
    id: 'q-18',
    questionNumber: 18,
    category: 'anak',
    categoryLabel: 'Anak & Ibu Tunggal',
    question: 'Jika kelak kita dikaruniai anak kandung bersama, bagaimana komitmen Anda agar tidak menganaktirikan anak yang pertama?',
    purpose: 'Mencegah diskriminasi kasih sayang dan ketidakadilan perlakuan dalam keluarga gabungan (blended family).',
    greenFlagAnswer: 'Menegaskan bahwa semua anak di rumah adalah amanah yang sama haknya atas cinta, fasilitas, dan kasih sayang.',
    redFlagAnswer: 'Menjawab enteng bahwa wajar jika anak kandung sendiri lebih diprioritaskan dibandingkan anak bawaan.',
    proTip: 'Pria yang adil memiliki rasa welas asih alami kepada setiap anak kecil.'
  },
  {
    id: 'q-19',
    questionNumber: 19,
    category: 'anak',
    categoryLabel: 'Anak & Ibu Tunggal',
    question: 'Bagaimana sikap Anda terhadap kehadiran mantan suami saya yang masih memiliki hak silaturahmi menengok anaknya?',
    purpose: 'Menguji kematangan mental mengelola komunikasi co-parenting tanpa rasa cemburu buta.',
    greenFlagAnswer: 'Menghormati hak silaturahmi ayah kandung terhadap anak dengan batasan adab syar’i yang jelas dan terkoordinasi terbuka.',
    redFlagAnswer: 'Melarang anak bertemu ayah kandungnya sama sekali karena cemburu buta atau menuntut putus hubungan total.',
    proTip: 'Pria yang percaya diri tidak akan merasa terancam oleh masa lalu yang sudah selesai secara hukum.'
  },

  // 5. Masa Lalu, Kejujuran & Transparansi (3 soalan)
  {
    id: 'q-20',
    questionNumber: 20,
    category: 'masalalu',
    categoryLabel: 'Masa Lalu & Transparansi',
    question: 'Apakah Anda bersedia menunjukkan dokumen resmi status hukum kependudukan Anda (KTP, Akta Cerai/Kematian, dsb) secara terbuka?',
    purpose: 'Mencegah kasus pemalsuan status pernikahan, poliandri/poligami liar tanpa izin, atau status gantung.',
    greenFlagAnswer: 'Menyambut dengan kesiapan penuh dan sukarela memperlihatkan dokumen resmi negara sebagai bukti keseriusan.',
    redFlagAnswer: 'Beralasan dokumen hilang, menolak dengan dalih tidak percaya, atau meminta nikah siri di bawah tangan.',
    proTip: 'Pria yang bersih tidak pernah takut dengan verifikasi dokumen resmi.'
  },
  {
    id: 'q-21',
    questionNumber: 21,
    category: 'masalalu',
    categoryLabel: 'Masa Lalu & Transparansi',
    question: 'Apa pelajaran hidup terbesar yang Anda petik dari kegagalan hubungan atau pernikahan Anda di masa lalu?',
    purpose: 'Menilai apakah dia memiliki kesadaran diri (self-awareness) atau gemar playing victim.',
    greenFlagAnswer: 'Menceritakan evaluasi introspektif tentang kekurangan dirinya sendiri dan komitmen menjadi pribadi yang lebih bijak.',
    redFlagAnswer: 'Menyalahkan 100% mantan pasangan dengan kata-kata caci maki keji seolah dirinya adalah malaikat suci tanpa noda.',
    proTip: 'Cara seorang pria menceritakan mantan pasangannya adalah cara dia akan menceritakan Anda jika kelak berkonflik.'
  },
  {
    id: 'q-22',
    questionNumber: 22,
    category: 'masalalu',
    categoryLabel: 'Masa Lalu & Transparansi',
    question: 'Apakah ada trauma masa lalu, penyakit fisik kronis, atau kebiasaan buruk yang saat ini masih sedang Anda perjuangkan untuk sembuh?',
    purpose: 'Membangun transparansi kesehatan mental dan fisik demi saling tolong-menolong secara jujur.',
    greenFlagAnswer: 'Berani terbuka dengan kerentanan dirinya dan menceritakan ikhtiar medis/spiritual yang sedang ia jalani.',
    redFlagAnswer: 'Mengaku sempurna tanpa kelemahan sama sekali, atau menutup-nutupi riwayat ketergantungan zat/game/judi.',
    proTip: 'Kejujuran mengakui kekurangan jauh lebih aman daripada kepalsuan citra yang sempurna.'
  },

  // 6. Wali, Keluarga & Batasan Privasi (4 soalan)
  {
    id: 'q-23',
    questionNumber: 23,
    category: 'wali',
    categoryLabel: 'Wali & Pengaruh Keluarga',
    question: 'Kapan Anda siap bersilaturahmi dan memohon izin secara resmi kepada ayah/wali nasab saya?',
    purpose: 'Menguji keberanian moral dan komitmen ta’aruf yang terhormat sesuai syariat Islam.',
    greenFlagAnswer: 'Menyepakati jadwal segera dalam hitungan minggu dan mempersiapkan diri dengan adab terbaik.',
    redFlagAnswer: 'Menghindar, menunda hingga berbulan-bulan, atau mengajak hubungan berpacaran tanpa kejelasan arah menuju wali.',
    proTip: 'Laki-laki yang sungguh berniat menikahi Anda tidak akan membiarkan Anda menunggu tanpa kepastian menghadap wali.'
  },
  {
    id: 'q-24',
    questionNumber: 24,
    category: 'wali',
    categoryLabel: 'Wali & Pengaruh Keluarga',
    question: 'Bagaimana tanggapan kedua orang tua dan keluarga besar Anda saat Anda menyampaikan niat untuk meminang saya?',
    purpose: 'Memastikan tidak ada penolakan tersembunyi dari keluarga calon yang berpotensi menjadi konflik mertua.',
    greenFlagAnswer: 'Menjelaskan bahwa orang tuanya telah diberitahu, mendoakan, dan siap menyambut silaturahmi keluarga.',
    redFlagAnswer: 'Mengaku belum cerita sama sekali kepada orang tuanya padahal sudah mengajak bicara pernikahan berbulan-bulan.',
    proTip: 'Restu keluarga adalah benteng doa bagi ketenteraman rumah tangga.'
  },
  {
    id: 'q-25',
    questionNumber: 25,
    category: 'wali',
    categoryLabel: 'Wali & Pengaruh Keluarga',
    question: 'Jika suatu saat ada campur tangan dari orang tua atau saudara kandung yang mencampuri urusan dapur rumah tangga kita, bagaimana sikap Anda?',
    purpose: 'Menguji batasan privasi rumah tangga (healthy boundaries) dan kemandirian bersikap.',
    greenFlagAnswer: 'Tetap berbakti dan santun kepada orang tua, namun tegas menjaga rahasia dan otonomi keputusan rumah tangga bersama istri.',
    redFlagAnswer: 'Pasrah dan membiarkan keluarganya mengendalikan seluruh keputusan rumah tangga, bahkan memihak keluarga secara membabi buta.',
    proTip: 'Pria yang belum mampu memutus ketergantungan keputusan dari ibunya (anak mami) rawan menciptakan luka batin bagi istri.'
  },
  {
    id: 'q-26',
    questionNumber: 26,
    category: 'wali',
    categoryLabel: 'Wali & Pengaruh Keluarga',
    question: 'Apakah Anda bersedia menjaga rahasia aib dan perselisihan kecil rumah tangga kita agar tidak diceritakan kepada keluarga atau media sosial?',
    purpose: 'Menjaga kehormatan suami-istri sebagai pakaian bagi satu sama lain (hunna libasun lakum).',
    greenFlagAnswer: 'Berkomitmen mengunci masalah hanya di dalam kamar dan menyelesaikannya berdua tanpa membeberkannya ke luar.',
    redFlagAnswer: 'Terbiasa curhat masalah pribadi kepada teman lawan jenis atau membuat status sindiran di media sosial.',
    proTip: 'Pria yang amanah adalah penyimpan rahasia istri yang paling rapat.'
  },

  // 7. Karier Istri & Hak Aktualisasi Diri (4 soalan)
  {
    id: 'q-27',
    questionNumber: 27,
    category: 'karier',
    categoryLabel: 'Karier Istri & Aktualisasi Diri',
    question: 'Bagaimana pandangan Anda terhadap profesi, karier, atau bisnis yang saat ini sedang saya tekuni setelah kita menikah nanti?',
    purpose: 'Menyelaraskan ekspektasi peran istri dan mencegah tuntutan sepihak yang mengejutkan.',
    greenFlagAnswer: 'Mendukung karier istri selama adab pergaulan terjaga dan kewajiban utama keluarga tidak terbengkalai, dengan komunikasi yang fleksibel.',
    redFlagAnswer: 'Menuntut istri wajib berhenti total dari segala aktivitas pekerjaan tanpa kompromi finansial yang jelas.',
    proTip: 'Diskusikan hal ini di awal agar tidak ada penyesalan melepaskan mimpi atau kemandirian.'
  },
  {
    id: 'q-28',
    questionNumber: 28,
    category: 'karier',
    categoryLabel: 'Karier Istri & Aktualisasi Diri',
    question: 'Bagaimana pembagian tugas domestik rumah tangga jika kita berdua sama-sama bekerja di luar rumah?',
    purpose: 'Melihat apakah dia memiliki teladan Rasulullah SAW yang terbiasa membantu pekerjaan rumah tangga keluarga.',
    greenFlagAnswer: 'Siap saling membantu pekerjaan mencuci piring, menyapu, atau mengurus rumah tanpa merasa derajat kelelakiannya jatuh.',
    redFlagAnswer: 'Menganggap tugas domestik adalah urusan wanita 100%, sementara pria hanya duduk menonton televisi setelah pulang kerja.',
    proTip: 'Rasulullah SAW menjahit bajunya sendiri dan membantu urusan rumah tangga keluarganya.'
  },
  {
    id: 'q-29',
    questionNumber: 29,
    category: 'karier',
    categoryLabel: 'Karier Istri & Aktualisasi Diri',
    question: 'Apakah Anda mengizinkan saya untuk tetap menuntut ilmu (kuliah/kursus/kajian) dan bersilaturahmi dengan sahabat wanita saya?',
    purpose: 'Mencegah isolasi sosial yang merupakan ciri khas pasangan berkarakter narsistik dan manipulatif.',
    greenFlagAnswer: 'Sangat mendukung peningkatan kualitas intelektual dan spiritual istri, serta menjaga silaturahmi yang sehat.',
    redFlagAnswer: 'Melarang istri keluar rumah atau menuntut memutuskan hubungan dengan sahabat-sahabat baiknya.',
    proTip: 'Pria yang berjiwa kerdil takut istrinya bertambah pintar; pria yang berjiwa besar bangga istrinya cerdas.'
  },
  {
    id: 'q-30',
    questionNumber: 30,
    category: 'karier',
    categoryLabel: 'Karier Istri & Aktualisasi Diri',
    question: 'Bagaimana jika suatu saat karier atau penghasilan saya melesat lebih tinggi daripada penghasilan Anda: apakah Anda merasa terancam?',
    purpose: 'Menguji kematangan ego maskulin terhadap keberhasilan istri.',
    greenFlagAnswer: 'Bersyukur, bangga atas rezeki Allah, dan tetap menjalankan kewajiban nafkah sesuai batas kemampuan maksimal dirinya.',
    redFlagAnswer: 'Merasa minder, marah, menuntut istri menurunkan kinerja, atau meminta bagian dari penghasilan tersebut secara paksa.',
    proTip: 'Kebahagiaan melihat istri berprestasi adalah tanda cinta yang tulus dan jauh dari rasa dengki.'
  },

  // 8. Kesehatan & Gaya Hidup (2 soalan)
  {
    id: 'q-31',
    questionNumber: 31,
    category: 'kesehatan',
    categoryLabel: 'Kesehatan & Gaya Hidup',
    question: 'Apakah Anda bersedia melakukan tes kesehatan pranikah (Pre-marital medical check-up) secara terbuka bersama-sama?',
    purpose: 'Memastikan transparansi status kesehatan medis (penyakit menular, talasemia, kesuburan, dsb) demi keturunan yang sehat.',
    greenFlagAnswer: 'Menyambut baik dengan antusias demi kebaikan bersama dan kesehatan masa depan anak-anak keturunan.',
    redFlagAnswer: 'Menolak keras, merasa curiga, atau menuduh Anda tidak mempercayai dirinya secara personal.',
    proTip: 'Tes kesehatan pranikah adalah ikhtiar sains modern yang sangat dianjurkan dalam fikih demi kemaslahatan umat.'
  },
  {
    id: 'q-32',
    questionNumber: 32,
    category: 'kesehatan',
    categoryLabel: 'Kesehatan & Gaya Hidup',
    question: 'Bagaimana kebiasaan hidup sehari-hari Anda terkait merokok, begadang, pola makan, atau waktu luang di akhir pekan?',
    purpose: 'Mengetahui kecocokan ritme biologis harian dan komitmen menjaga kesehatan tubuh sebagai amanah Allah.',
    greenFlagAnswer: 'Menceritakan kebiasaan hidupnya secara jujur, berusaha menjaga pola sehat, dan menghormati hak udara bersih bagi keluarga.',
    redFlagAnswer: 'Merokok sembarangan di dekat anak-anak, kecanduan game online hingga subuh, atau tidak peduli kebersihan pribadi.',
    proTip: 'Perhatikan kebersihan kuku, aroma tubuh, dan kerapian pakaian saat pertama kali bertemu.'
  }
];
