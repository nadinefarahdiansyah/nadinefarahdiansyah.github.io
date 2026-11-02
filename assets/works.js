/* ============================================================
   Content data — single source for the gallery (index.html)
   and the case-study pages (project.html#<id>).
   Images live in assets/works/<cat>/<slug>(-thumb).webp;
   tw/th are the thumbnail sizes (used for width/height attrs).
   ============================================================ */
(function () {
  'use strict';

  var IAC = 'ITS Astronomy Club';
  var YBP = 'YouthBiz Project 2025';

  var cats = {
    'social-media': { en: 'Social Media', id: 'Media Sosial' },
    'guidebook':    { en: 'Guidebook',    id: 'Guidebook' },
    'poster':       { en: 'Poster',       id: 'Poster' },
    'mascot':       { en: 'Mascot',       id: 'Maskot' },
    'twibbon':      { en: 'Twibbon',      id: 'Twibbon' },
    'presentation': { en: 'Presentation', id: 'Presentasi' },
    'certificate':  { en: 'Certificate',  id: 'Sertifikat' }
  };

  // [cat, slug, thumbW, thumbH, org, titleEn, titleId]
  var raw = [
    ['mascot', 'cat-waving', 552, 720, IAC, 'Cat mascot — waving pose', 'Maskot kucing — pose melambai'],
    ['social-media', 'infographics-competition-winners', 438, 720, IAC, 'Infographics Competition winners feed', 'Feed pemenang Infographics Competition'],
    ['guidebook', 'astrec-2024-guidebook', 503, 711, IAC, 'ASTREC 2024 guidebook cover', 'Sampul guidebook ASTREC 2024'],
    ['poster', 'trashney', 708, 500, 'Trashney', 'Trashney promotional poster', 'Poster promosi Trashney'],
    ['presentation', 'astrec-2024-grand-show', 720, 401, IAC, 'ASTREC 2024 Grand Show slide', 'Slide Grand Show ASTREC 2024'],
    ['twibbon', 'iac-aquireae-recruitment', 540, 675, IAC, 'IAC Aquireae open-recruitment twibbon', 'Twibbon open recruitment IAC Aquireae'],
    ['social-media', 'cabinet-gravity', 441, 720, IAC, 'Cabinet Gravity farewell feed', 'Feed perpisahan Kabinet Gravity'],
    ['guidebook', 'youthbiz-2025-guidebook', 504, 720, YBP, 'YouthBiz Project 2025 guidebook', 'Guidebook YouthBiz Project 2025'],
    ['mascot', 'aquireae-beluga', 654, 720, IAC, 'Aquireae the beluga mascot', 'Maskot beluga Aquireae'],
    ['poster', 'youthbiz-2025', 502, 720, YBP, 'YouthBiz Project 2025 poster', 'Poster YouthBiz Project 2025'],
    ['certificate', 'sponsor-relations-staff', 720, 507, IAC, 'Staff certificate — Sponsor & Relations', 'Sertifikat staf — Sponsor & Relations'],
    ['social-media', 'interstellar-meet-our-team', 442, 720, '', '“Interstellar” Meet Our Team feed', 'Feed “Interstellar” Meet Our Team'],
    ['presentation', 'youthbiz-2025-title', 720, 404, YBP, 'YouthBiz Project 2025 title slide', 'Slide judul YouthBiz Project 2025'],
    ['guidebook', 'photography-guidelines', 508, 712, IAC, 'Photography technical guidelines', 'Panduan teknis fotografi'],
    ['mascot', 'cat-surprised', 685, 720, IAC, 'Cat mascot — surprised expression', 'Maskot kucing — ekspresi terkejut'],
    ['poster', 'moon-infographic', 407, 580, '', 'Moon infographic poster', 'Poster infografis Bulan'],
    ['twibbon', 'youthbiz-2025', 576, 720, YBP, 'YouthBiz Project 2025 twibbon', 'Twibbon YouthBiz Project 2025'],
    ['social-media', 'iac-agenda', 409, 720, IAC, 'IAC Agenda story', 'Story Agenda IAC'],
    ['guidebook', 'infographics-guidelines', 502, 711, IAC, 'Infographics technical guidelines', 'Panduan teknis infografis'],
    ['presentation', 'youthbiz-golden-treasure', 697, 388, YBP, '“Golden Treasure” slide', 'Slide “Golden Treasure”'],
    ['certificate', 'judge', 720, 510, IAC, 'Judge certificate', 'Sertifikat juri'],
    ['mascot', 'cat-full-body', 631, 720, IAC, 'Cat mascot — full body', 'Maskot kucing — seluruh badan'],
    ['guidebook', 'youthbiz-2025-cover', 504, 720, YBP, 'YouthBiz Project 2025 cover', 'Sampul YouthBiz Project 2025'],
    ['poster', 'upgrade', 393, 559, '', '“Upgrade — Change Yourself, Not the Nature” poster', 'Poster “Upgrade — Change Yourself, Not the Nature”'],
    ['social-media', 'event-live-report', 409, 720, IAC, 'Event live-report story', 'Story live report acara'],
    ['presentation', 'competition-prizes', 720, 401, IAC, 'Competition prizes slide', 'Slide hadiah lomba'],
    ['guidebook', 'astrec-timeline', 502, 710, IAC, 'ASTREC timeline page', 'Halaman timeline ASTREC'],
    ['twibbon', 'im-ready', 540, 540, '', '“I’m Ready” twibbon', 'Twibbon “I’m Ready”'],
    ['mascot', 'cat-happy', 516, 471, IAC, 'Cat mascot — happy expression', 'Maskot kucing — ekspresi senang'],
    ['poster', 'fidi-jaya', 502, 720, '', 'Fidi Jaya poster', 'Poster Fidi Jaya'],
    ['guidebook', 'exploring-the-beauty-of-space', 500, 712, IAC, '“Exploring the Beauty of Space” page', 'Halaman “Exploring the Beauty of Space”'],
    ['presentation', 'inovasi-digital-intro', 596, 332, '', '“Get to know Digital Innovation” slide', 'Slide “Kenalan Yuk Sama Inovasi Digital!”'],
    ['certificate', 'appreciation', 632, 443, '', 'Certificate of appreciation', 'Sertifikat penghargaan'],
    ['social-media', 'astrec-live-report-template', 279, 504, IAC, 'ASTREC live-report template', 'Template live report ASTREC'],
    ['guidebook', 'youthbiz-timeline', 502, 720, YBP, 'YouthBiz timeline page', 'Halaman timeline YouthBiz'],
    ['presentation', 'certificate-prize', 695, 387, IAC, 'Prize & certificate slide', 'Slide hadiah & sertifikat'],
    ['guidebook', 'sponsorship-proposal', 433, 615, '', 'Sponsorship proposal cover', 'Sampul proposal sponsorship'],
    ['certificate', 'participant', 630, 445, '', 'Participant certificate', 'Sertifikat peserta'],
    ['presentation', 'thank-you', 596, 333, YBP, '“Thank You” closing slide', 'Slide penutup “Thank You”']
  ];

  // Transparent artwork reads better on a soft backdrop than edge-to-edge
  var transparent = { mascot: 1, twibbon: 1 };

  var works = raw.map(function (r) {
    var base = 'assets/works/' + r[0] + '/' + r[1];
    return {
      cat: r[0], slug: r[1], tw: r[2], th: r[3], org: r[4],
      title: { en: r[5], id: r[6] },
      thumb: base + '-thumb.webp', full: base + '.webp',
      contain: !!transparent[r[0]]
    };
  });

  var T = 'assets/case-studies/trashney/';
  function fig(file, en, id) { return { type: 'figure', src: T + file + '-thumb.webp', full: T + file + '.webp', cap: { en: en, id: id } }; }

  var cs = {
    trashney: {
      theme: 'green',
      art: T + 'cover-thumb.webp',
      kicker: { en: 'UI/UX Design Project · 2026', id: 'Proyek Desain UI/UX · 2026' },
      title: 'Trashney',
      tagline: {
        en: 'A recycling app that turns good intentions into a habit — through pickups, drop points and real rewards.',
        id: 'Aplikasi daur ulang yang mengubah niat baik menjadi kebiasaan — lewat pickup, drop point, dan reward nyata.'
      },
      meta: [
        [{ en: 'Role', id: 'Peran' }, { en: 'UI/UX Designer & Researcher', id: 'UI/UX Designer & Researcher' }],
        [{ en: 'Year', id: 'Tahun' }, '2026'],
        [{ en: 'Type', id: 'Jenis' }, { en: 'Mobile app prototype', id: 'Prototipe aplikasi mobile' }],
        [{ en: 'Method', id: 'Metode' }, { en: 'Design Thinking · 2 iterations', id: 'Design Thinking · 2 iterasi' }],
        [{ en: 'Tools', id: 'Tools' }, 'Figma · Maze']
      ],
      sections: [
        { h: { en: 'Overview', id: 'Ringkasan' }, blocks: [
          { type: 'p', text: {
            en: 'Trashney is a digital waste-management app designed to get more people recycling. It brings <strong>Pick Up</strong>, <strong>Drop Point</strong>, <strong>Reduce/Reuse (TrashSwap)</strong>, points & digital rewards and environmental education into one platform — connected to local partners in Surabaya such as BSIS and PDU Jambangan.',
            id: 'Trashney adalah aplikasi pengelolaan sampah digital yang dirancang agar lebih banyak orang mau mendaur ulang. Aplikasi ini menyatukan <strong>Pick Up</strong>, <strong>Drop Point</strong>, <strong>Reduce/Reuse (TrashSwap)</strong>, poin & reward digital, serta edukasi lingkungan dalam satu platform — terhubung dengan mitra lokal Surabaya seperti BSIS dan PDU Jambangan.'
          } },
          { type: 'stats', items: [
            { v: '85.8', k: { en: 'SUS score — “Excellent” (from 75.8)', id: 'Skor SUS — “Excellent” (dari 75,8)' } },
            { v: '18.7<small>%</small>', k: { en: 'Pick Up misclick rate (from 73.5%)', id: 'Misclick Pick Up (dari 73,5%)' } },
            { v: '9.6<small>/10</small>', k: { en: 'Average satisfaction (from 9.2)', id: 'Rata-rata kepuasan (dari 9,2)' } },
            { v: '16', k: { en: 'Usability-test participants', id: 'Partisipan uji usability' } }
          ] }
        ] },
        { h: { en: 'The challenge', id: 'Tantangannya' }, blocks: [
          { type: 'p', text: {
            en: 'Indonesia produces around <strong>68.5 million tonnes</strong> of waste a year, and only about 1% is recycled effectively. Interviews showed that people do want to sort and reuse their waste — but the process feels like a hassle, they don’t know where drop points are, and they get nothing back for the effort.',
            id: 'Indonesia menghasilkan sekitar <strong>68,5 juta ton</strong> sampah per tahun, dan hanya sekitar 1% yang didaur ulang secara efektif. Wawancara menunjukkan orang sebenarnya mau memilah dan memakai ulang sampahnya — tetapi prosesnya terasa ribet, mereka tidak tahu lokasi drop point, dan tidak mendapat apa pun dari usahanya.'
          } },
          { type: 'callout', text: {
            en: '<span class="q">Key insight:</span> the barrier isn’t low environmental awareness — it’s the lack of a system that turns the intention to recycle into real action.',
            id: '<span class="q">Insight kunci:</span> hambatannya bukan rendahnya kesadaran lingkungan — melainkan tidak adanya sistem yang mengubah niat daur ulang menjadi aksi nyata.'
          } },
          fig('key-insights', 'Key insights from the in-depth interviews', 'Insight kunci dari in-depth interview')
        ] },
        { h: { en: 'Research — empathize & define', id: 'Riset — empathize & define' }, blocks: [
          { type: 'ul', items: [
            { en: 'Literature study on waste management, 3R, gamification, digital waste banks and the circular economy.', id: 'Studi literatur tentang pengelolaan sampah, 3R, gamifikasi, bank sampah digital, dan ekonomi sirkular.' },
            { en: 'Three in-depth interviews, synthesized into an empathy map and an affinity diagram.', id: 'Tiga in-depth interview, disintesis menjadi empathy map dan affinity diagram.' },
            { en: 'Three personas — Leah, Cleo and Ethan — with a current-state journey map and POV statements.', id: 'Tiga persona — Leah, Cleo, dan Ethan — lengkap dengan current-state journey map dan POV statement.' },
            { en: '<strong>81%</strong> of participants said they would recycle if they received an incentive.', id: '<strong>81%</strong> partisipan bersedia mendaur ulang bila mendapat insentif.' }
          ] },
          { type: 'gallery', items: [
            fig('empathy-map', 'Empathy map', 'Empathy map'),
            fig('affinity-diagram', 'Affinity diagram', 'Affinity diagram'),
            fig('user-persona', 'User personas', 'User persona'),
            fig('journey-map', 'Current-state journey map', 'Current-state journey map'),
            fig('pov-statement', 'POV statements', 'POV statement'),
            fig('how-might-we', 'How Might We questions', 'Pertanyaan How Might We')
          ] }
        ] },
        { h: { en: 'Ideate', id: 'Ideate' }, blocks: [
          { type: 'p', text: {
            en: 'I framed three <strong>If–Then–Because</strong> hypotheses to test:',
            id: 'Saya merumuskan tiga hipotesis <strong>If–Then–Because</strong> untuk diuji:'
          } },
          { type: 'ul', items: [
            { en: 'Clear, real-time information on <em>where</em> and <em>how</em> to recycle makes it easier to start.', id: 'Informasi yang jelas dan real-time tentang <em>di mana</em> dan <em>bagaimana</em> mendaur ulang memudahkan orang memulai.' },
            { en: 'Scheduled pickups and drop points in one app raise participation.', id: 'Pickup terjadwal dan drop point dalam satu aplikasi meningkatkan partisipasi.' },
            { en: 'Real rewards plus gamification (badges, challenges, activity bonuses) keep people consistent.', id: 'Reward nyata ditambah gamifikasi (badge, challenge, bonus aktivitas) membuat orang konsisten.' }
          ] },
          { type: 'p', text: {
            en: 'A competitive audit of Octopus, MallSampah and BankSampah.id revealed two gaps: no multi-layer gamification and no integration with local partners. From a Crazy 8’s session I combined three concepts for the home screen: <strong>services first</strong>, a <strong>level & badge system</strong> and an <strong>interactive drop-point map</strong>.',
            id: 'Competitive audit terhadap Octopus, MallSampah, dan BankSampah.id menemukan dua celah: belum ada gamifikasi berlapis dan belum terintegrasi dengan mitra lokal. Dari sesi Crazy 8’s, saya menggabungkan tiga konsep untuk beranda: <strong>layanan sebagai prioritas</strong>, <strong>sistem level & badge</strong>, dan <strong>peta drop point interaktif</strong>.'
          } }
        ] },
        { h: { en: 'Design', id: 'Desain' }, blocks: [
          { type: 'p', text: {
            en: 'From a happy-path user flow and information architecture to low-fidelity wireframes, then a high-fidelity Figma prototype covering Home, Services, Rewards, Education and Account.',
            id: 'Dari user flow (happy path) dan arsitektur informasi ke wireframe low-fidelity, lalu prototipe high-fidelity di Figma yang mencakup Beranda, Layanan, Reward, Edukasi, dan Akun.'
          } },
          fig('user-flow', 'User flow — happy path', 'User flow — happy path'),
          { type: 'pair', items: [
            fig('information-architecture', 'Information architecture', 'Arsitektur informasi'),
            fig('wireframe-low-fi', 'Low-fidelity wireframes', 'Wireframe low-fidelity')
          ] },
          fig('hi-fi-services', 'High-fidelity screens — services', 'Layar high-fidelity — layanan'),
          { type: 'pair', items: [
            fig('hi-fi-onboarding', 'High-fidelity screens — onboarding', 'Layar high-fidelity — onboarding'),
            fig('hi-fi-rewards', 'High-fidelity screens — rewards', 'Layar high-fidelity — reward')
          ] }
        ] },
        { h: { en: 'Testing & iteration', id: 'Pengujian & iterasi' }, blocks: [
          { type: 'p', text: {
            en: 'I ran unmoderated prototype tests on <strong>Maze</strong> with 16 participants over two iterations, measuring success rate, misclick rate, completion time and SUS, then added a heuristic evaluation. Iteration 1 showed that people completed the Pick Up task (100% success) but misclicked <strong>73.5%</strong> of the time. Three changes went into iteration 2:',
            id: 'Saya menjalankan uji prototipe unmoderated di <strong>Maze</strong> dengan 16 partisipan dalam dua iterasi, mengukur success rate, misclick rate, durasi, dan SUS, lalu menambahkan heuristic evaluation. Iterasi 1 menunjukkan tugas Pick Up berhasil diselesaikan (100%), tetapi misclick-nya mencapai <strong>73,5%</strong>. Tiga perubahan masuk ke iterasi 2:'
          } },
          { type: 'ul', items: [
            { en: 'A clearer visual hierarchy on the Home screen.', id: 'Visual hierarchy yang lebih jelas di Beranda.' },
            { en: '“Call Center” relabelled as “Customer Service”.', id: 'Label “Call Center” diganti menjadi “Customer Service”.' },
            { en: 'Eco Point levels integrated with gamified badges.', id: 'Level Eco Point diintegrasikan dengan badge gamifikasi.' }
          ] }
        ] },
        { h: { en: 'Outcome', id: 'Hasil' }, blocks: [
          { type: 'p', text: {
            en: 'Iteration 2 scored <strong>85.8 on the SUS (Excellent)</strong>, up 10 points from 75.8 (Good). Pick Up misclicks dropped to 18.7%, Customer Service and reward redemption reached 100% success, and satisfaction rose from 9.2 to 9.6/10. The heuristic evaluation averaged a severity of 1.17 — minor to cosmetic, with no catastrophic issues.',
            id: 'Iterasi 2 mencapai <strong>skor SUS 85,8 (Excellent)</strong>, naik 10 poin dari 75,8 (Good). Misclick Pick Up turun ke 18,7%, Customer Service dan penukaran reward mencapai 100% keberhasilan, dan kepuasan naik dari 9,2 ke 9,6/10. Heuristic evaluation menghasilkan rata-rata severity 1,17 — minor hingga kosmetik, tanpa masalah katastrofik.'
          } },
          { type: 'callout', text: {
            en: '<span class="q">Next iteration:</span> error prevention, user control & freedom, and helping users recover from errors — the three heuristics that still need attention.',
            id: '<span class="q">Iterasi berikutnya:</span> error prevention, user control & freedom, dan membantu pengguna pulih dari error — tiga heuristik yang masih perlu perhatian.'
          } }
        ] }
      ]
    },

    mascot: {
      theme: 'cyan', art: 'assets/works/mascot/cat-waving-thumb.webp', artCard: false,
      kicker: { en: 'Character & Mascot Design', id: 'Desain Karakter & Maskot' },
      title: { en: 'IAC Mascots', id: 'Maskot IAC' },
      tagline: {
        en: 'An orange cat and Aquireae the beluga — mascots that give ITS Astronomy Club a friendly face.',
        id: 'Kucing oranye dan beluga Aquireae — maskot yang memberi wajah ramah untuk ITS Astronomy Club.'
      },
      org: IAC, tools: 'Adobe Illustrator · Medibang Paint Pro',
      body: {
        en: 'I designed the mascots for <strong>ITS Astronomy Club (IAC)</strong>: a curious orange cat wearing the club jacket, drawn in several poses and expressions, and <strong>Aquireae the beluga</strong>. The characters travel across IAC’s feeds, guidebooks, certificates and twibbons, so the club speaks with one consistent, friendly voice.',
        id: 'Saya mendesain maskot untuk <strong>ITS Astronomy Club (IAC)</strong>: kucing oranye penasaran yang memakai jaket klub, digambar dalam beberapa pose dan ekspresi, serta <strong>beluga Aquireae</strong>. Karakter ini hadir di feed, guidebook, sertifikat, dan twibbon IAC, sehingga klub tampil dengan suara yang konsisten dan ramah.'
      }
    },
    'social-media': {
      theme: 'violet', art: 'assets/works/social-media/infographics-competition-winners-thumb.webp', artCard: true,
      kicker: { en: 'Social Media Design', id: 'Desain Media Sosial' },
      title: { en: 'Social Media', id: 'Media Sosial' },
      tagline: {
        en: 'Instagram feeds, agendas and live-report stories that keep student communities in the loop.',
        id: 'Feed Instagram, agenda, dan story live report yang membuat komunitas mahasiswa selalu terinformasi.'
      },
      org: IAC + ' · HMSI ITS', tools: 'Canva · Adobe Illustrator · Figma',
      body: {
        en: 'As Head of Information Media at ITS Astronomy Club and a media staffer at HMSI, I designed feeds, agendas and live-report stories — often against event-day deadlines — while keeping each organization’s visual identity consistent across every post.',
        id: 'Sebagai Kepala Departemen Media Informasi ITS Astronomy Club dan staf media HMSI, saya mendesain feed, agenda, dan story live report — sering dengan tenggat di hari acara — sambil menjaga identitas visual tiap organisasi tetap konsisten di setiap unggahan.'
      }
    },
    guidebook: {
      theme: 'indigo', art: 'assets/works/guidebook/astrec-2024-guidebook-thumb.webp', artCard: true,
      kicker: { en: 'Editorial & Guidebook Design', id: 'Desain Editorial & Guidebook' },
      title: { en: 'Guidebooks', id: 'Guidebook' },
      tagline: {
        en: 'Multi-page guidebooks and technical guidelines that make competition rules easy to follow.',
        id: 'Guidebook dan panduan teknis multi-halaman yang membuat aturan lomba mudah diikuti.'
      },
      org: IAC + ' · ' + YBP, tools: 'Canva · Adobe Illustrator',
      body: {
        en: 'Guidebooks for <strong>ASTREC 2024</strong> (ITS Astronomy Club) and <strong>YouthBiz Project 2025</strong> — a national entrepreneurship competition for high-school and vocational students — plus technical guidelines for the photography and infographics categories. Each book carries the event’s illustrated world through its cover, timeline and rule pages.',
        id: 'Guidebook untuk <strong>ASTREC 2024</strong> (ITS Astronomy Club) dan <strong>YouthBiz Project 2025</strong> — kompetisi kewirausahaan nasional untuk siswa SMA/SMK — serta panduan teknis kategori fotografi dan infografis. Setiap buku membawa dunia ilustrasi acaranya dari sampul, timeline, hingga halaman aturan.'
      }
    },
    poster: {
      theme: 'pink', art: 'assets/works/poster/youthbiz-2025-thumb.webp', artCard: true,
      kicker: { en: 'Poster Design', id: 'Desain Poster' },
      title: { en: 'Posters', id: 'Poster' },
      tagline: {
        en: 'Event and campaign posters — from astronomy infographics to product launches.',
        id: 'Poster acara dan kampanye — dari infografis astronomi hingga peluncuran produk.'
      },
      org: { en: 'Various organizations', id: 'Berbagai organisasi' }, tools: 'Canva · Adobe Illustrator',
      body: {
        en: 'Posters built on my layered, colorful illustration style — cartoon characters, 3D touches and bold type — for student events, campaigns and my own Trashney project.',
        id: 'Poster dengan gaya ilustrasi berlapis dan penuh warna — karakter kartun, sentuhan 3D, dan tipografi tegas — untuk acara mahasiswa, kampanye, dan proyek Trashney saya sendiri.'
      }
    },
    presentation: {
      theme: 'indigo', art: 'assets/works/presentation/astrec-2024-grand-show-thumb.webp', artCard: true,
      kicker: { en: 'Presentation Design', id: 'Desain Presentasi' },
      title: { en: 'Presentations', id: 'Presentasi' },
      tagline: {
        en: 'Slide decks for grand shows, briefings and competition announcements.',
        id: 'Slide untuk grand show, briefing, dan pengumuman lomba.'
      },
      org: IAC + ' · ' + YBP, tools: 'Canva · Google Slides · PowerPoint',
      body: {
        en: 'Decks that carry an event’s theme onto the big screen — title slides, prize announcements and closing slides designed to be read from the back of the room.',
        id: 'Slide yang membawa tema acara ke layar besar — slide judul, pengumuman hadiah, dan slide penutup yang dirancang agar tetap terbaca dari barisan belakang.'
      }
    },
    twibbon: {
      theme: 'violet', art: 'assets/works/twibbon/iac-aquireae-recruitment-thumb.webp', artCard: false,
      kicker: { en: 'Twibbon Design', id: 'Desain Twibbon' },
      title: { en: 'Twibbons', id: 'Twibbon' },
      tagline: {
        en: 'Shareable profile frames that turn participants into promoters.',
        id: 'Bingkai foto yang bisa dibagikan — mengubah peserta menjadi promotor acara.'
      },
      org: IAC + ' · ' + YBP, tools: 'Canva · Adobe Illustrator',
      body: {
        en: 'Twibbons for open recruitment and competitions, designed to leave room for the participant’s photo while keeping the event branding instantly recognizable.',
        id: 'Twibbon untuk open recruitment dan lomba, dirancang agar tetap menyisakan ruang untuk foto peserta sekaligus membuat branding acara langsung dikenali.'
      }
    },
    certificate: {
      theme: 'gold', art: 'assets/works/certificate/judge-thumb.webp', artCard: true,
      kicker: { en: 'Certificate Design', id: 'Desain Sertifikat' },
      title: { en: 'Certificates', id: 'Sertifikat' },
      tagline: {
        en: 'Certificates for committees, judges and participants that match each event’s identity.',
        id: 'Sertifikat untuk panitia, juri, dan peserta yang selaras dengan identitas tiap acara.'
      },
      org: { en: 'Various organizations', id: 'Berbagai organisasi' }, tools: 'Canva · Adobe Illustrator',
      body: {
        en: 'Formal layouts that still feel like part of the event — the same palette, illustrations and mascots used across its feeds and guidebooks.',
        id: 'Tata letak formal yang tetap terasa bagian dari acara — dengan palet, ilustrasi, dan maskot yang sama seperti di feed dan guidebook-nya.'
      }
    }
  };

  var order = ['trashney', 'mascot', 'social-media', 'guidebook', 'poster', 'presentation', 'twibbon', 'certificate'];

  window.SITE = { cats: cats, works: works, cs: cs, order: order };
})();
