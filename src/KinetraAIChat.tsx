import { useState, useRef, useEffect } from "react";

export interface ChatAction {
  label: string;
  icon?: string;
  href?: string;
  onClick?: () => void;
  isExternal?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  actions?: ChatAction[];
  timestamp: string;
}

const WA_PHONE = "628983680129";
const WA_BASE = `https://wa.me/${WA_PHONE}`;

function getCurrentTime(): string {
  const now = new Date();
  return now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export default function KinetraAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const initialMessages: ChatMessage[] = [
    {
      id: "m-1",
      sender: "ai",
      text: "Halo! Saya Asisten AI Kinetra. Saya siap membantu Anda seputar paket website berlangganan, estimasi biaya, fitur Web App, hingga jasa undangan digital. Ada yang ingin Anda tanyakan?",
      timestamp: getCurrentTime(),
      actions: [
        {
          label: "Berapa Biaya Paket Website?",
          icon: "fa-solid fa-tags",
          onClick: () => handleSendUserMessage("Berapa biaya paket website?"),
        },
        {
          label: "Bisa Buat Web App / POS Kasir?",
          icon: "fa-solid fa-code",
          onClick: () => handleSendUserMessage("Bisa buat Web App atau sistem kasir/POS?"),
        },
        {
          label: "Jasa Undangan Digital (Rp 99rb)",
          icon: "fa-solid fa-envelope-open-text",
          onClick: () => handleSendUserMessage("Tolong jelaskan jasa undangan digital"),
        },
        {
          label: "Berapa Lama Pengerjaannya?",
          icon: "fa-solid fa-clock",
          onClick: () => handleSendUserMessage("Berapa lama waktu pengerjaan website?"),
        },
      ],
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleOpenToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setHasUnread(false);
      }
      return next;
    });
  };

  const resetChat = () => {
    setMessages(initialMessages);
    setIsTyping(false);
  };

  const getAiResponse = (userText: string): { reply: string; actions?: ChatAction[] } => {
    const q = userText.toLowerCase();

    // 1. Biaya / Harga / Paket / Langganan / Kalkulator
    if (
      q.includes("harga") ||
      q.includes("biaya") ||
      q.includes("paket") ||
      q.includes("langganan") ||
      q.includes("tarif") ||
      q.includes("promo") ||
      q.includes("bayar") ||
      q.includes("kalkulator")
    ) {
      return {
        reply:
          "Kinetra menerapkan strategi berlangganan hemat tanpa biaya setup (Gratis Biaya Setup!). Pembayaran awal mencakup 3 bulan pertama:\n\n" +
          "1. Starter: Rp 149.000 / bln (Landing Page 1 Halaman + WA + Domain + Server)\n" +
          "2. Growth (Paling Laris): Rp 299.000 / bln (Hingga 5 Halaman + Kelola Gmaps + Domain .com)\n" +
          "3. Pro: Rp 549.000 / bln (Katalog/Booking + SEO Lokal + Gmaps Penuh)\n\n" +
          "Bulan ke-4 dan seterusnya cukup membayar tagihan bulanan standar. Anda juga bisa mencoba simulasi di kalkulator interaktif kami!",
        actions: [
          {
            label: "Hitung di Kalkulator Biaya",
            icon: "fa-solid fa-calculator",
            href: "#kalkulator",
          },
          {
            label: "Lihat Rincian Kartu Harga",
            icon: "fa-solid fa-list-check",
            href: "#harga",
          },
          {
            label: "Konsultasi Promo via WA",
            icon: "fa-brands fa-whatsapp",
            href: `${WA_BASE}?text=Halo%20Kinetra%2C%20saya%20ingin%20tanya%20detail%20promo%20paket%20website%20berlangganan.`,
            isExternal: true,
          },
        ],
      };
    }

    // 2. Durasi / Waktu / Berapa lama / Kapan jadi
    if (
      q.includes("berapa lama") ||
      q.includes("durasi") ||
      q.includes("waktu") ||
      q.includes("kapan jadi") ||
      q.includes("kapan siap") ||
      q.includes("hari") ||
      q.includes("cepat")
    ) {
      return {
        reply:
          "Website standar di Kinetra siap online dalam 3 hari kerja setelah materi (logo, foto produk, informasi usaha) kami terima!\n\n" +
          "Prosesnya mencakup penyusunan copywriting persuasif, desain mobile-first, integrasi Google Maps & tombol WhatsApp, serta setup server & domain SSL.",
        actions: [
          {
            label: "Pesan Website Siap 3 Hari",
            icon: "fa-brands fa-whatsapp",
            href: `${WA_BASE}?text=Halo%20Kinetra%2C%20saya%20butuh%20website%20bisnis%20yang%20bisa%20siap%20dalam%203%20hari.`,
            isExternal: true,
          },
        ],
      };
    }

    // 3. Web Application / Sistem Kustom / Kasir / POS / Dashboard
    if (
      q.includes("web app") ||
      q.includes("aplikasi") ||
      q.includes("kustom") ||
      q.includes("custom") ||
      q.includes("kasir") ||
      q.includes("pos") ||
      q.includes("dashboard") ||
      q.includes("database") ||
      q.includes("portal") ||
      q.includes("saas") ||
      q.includes("sistem")
    ) {
      return {
        reply:
          "Ya, Kinetra berpengalaman membangun Web Application dan Sistem Kustom di luar website standar! Kami dapat mengembangkan:\n\n" +
          "• Dashboard Admin & Analitik Penjualan\n" +
          "• Sistem Kasir / Point of Sale (POS) Cloud\n" +
          "• Portal Pelanggan & Karyawan (Multi-Role)\n" +
          "• Sistem Reservasi / Booking Online Kompleks\n" +
          "• Integrasi Payment Gateway (QRIS, VA Bank) & Notifikasi WA Otomatis\n\n" +
          "Salah satu portofolio Web Application nyata kami: Teman Tix (https://temantix.com) — platform e-ticketing konser & event dengan 50rb+ pengguna aktif!",
        actions: [
          {
            label: "Buka Teman Tix (temantix.com)",
            icon: "fa-solid fa-arrow-up-right-from-square",
            href: "https://temantix.com/",
            isExternal: true,
          },
          {
            label: "Konsultasikan Web App via WA",
            icon: "fa-brands fa-whatsapp",
            href: `${WA_BASE}?text=Halo%20Kinetra%2C%20saya%20ingin%20konsultasi%20pembuatan%20Web%20App%20%2F%20Sistem%20Kustom.`,
            isExternal: true,
          },
          {
            label: "Lihat Info Web App di Halaman",
            icon: "fa-solid fa-arrow-down",
            href: "#harga",
          },
        ],
      };
    }

    // 4. Undangan Digital / Wedding / Nikah
    if (
      q.includes("undangan") ||
      q.includes("wedding") ||
      q.includes("nikah") ||
      q.includes("manten") ||
      q.includes("resepsi") ||
      q.includes("akad")
    ) {
      return {
        reply:
          "Kinetra menyediakan Jasa Pembuatan Undangan Digital Interaktif mulai Rp 99.000 dengan status Aktif Selamanya!\n\n" +
          "Fitur lengkap yang Anda dapatkan:\n" +
          "• Generator Nama Tamu Tanpa Batas (?to=Nama+Tamu)\n" +
          "• RSVP & Buku Tamu otomatis terkirim ke WhatsApp\n" +
          "• Amplop Digital Cashless (Salin nomor rekening BCA/Mandiri/QRIS)\n" +
          "• Countdown Timer Acara & Simpan ke Google Calendar\n" +
          "• Petunjuk Rute Lokasi Google Maps Akurat\n" +
          "• Galeri Foto/Video Prewedding & Musik Latar Romantis\n\n" +
          "Anda bisa mencoba live demonya sekarang!",
        actions: [
          {
            label: "Lihat Live Demo Undangan",
            icon: "fa-solid fa-eye",
            href: "/templates/undangan-digital/index.html",
            isExternal: true,
          },
          {
            label: "Pesan Undangan Digital via WA",
            icon: "fa-brands fa-whatsapp",
            href: `${WA_BASE}?text=Halo%20Kinetra%2C%20saya%20ingin%20pesan%20Jasa%20Undangan%20Digital.`,
            isExternal: true,
          },
        ],
      };
    }

    // 5. Kemitraan / Reseller / Vendor / WO / Kerjasama
    if (
      q.includes("mitra") ||
      q.includes("kemitraan") ||
      q.includes("reseller") ||
      q.includes("partner") ||
      q.includes("vendor") ||
      q.includes("wo") ||
      q.includes("eo") ||
      q.includes("kerjasama")
    ) {
      return {
        reply:
          "Program Kemitraan Kinetra terbuka bagi Wedding Organizer, Event Organizer, Fotografer, MUA, Percetakan, dan Agensi Kreatif!\n\n" +
          "Keuntungan menjadi mitra:\n" +
          "• Margin komisi menarik hingga 30% atau bebas tentukan harga jual sendiri\n" +
          "• 100% White-Label (menggunakan identitas brand Anda ke klien)\n" +
          "• Antrean pengerjaan prioritas 24-48 jam\n" +
          "• Dukungan teknis penuh (coding, server, maintenance diurus Kinetra)\n" +
          "• Tanpa biaya pendaftaran sama sekali!",
        actions: [
          {
            label: "Daftar Mitra via WA",
            icon: "fa-solid fa-handshake",
            href: `${WA_BASE}?text=Halo%20Kinetra%2C%20saya%20tertarik%20mendaftar%20Program%20Kemitraan%20%2F%20Reseller.`,
            isExternal: true,
          },
          {
            label: "Pelajari Bagian Kemitraan",
            icon: "fa-solid fa-arrow-down",
            href: "#kemitraan",
          },
        ],
      };
    }

    // 6. Template / Desain / Contoh / Katalog
    if (
      q.includes("template") ||
      q.includes("desain") ||
      q.includes("contoh") ||
      q.includes("katalog") ||
      q.includes("portofolio") ||
      q.includes("lihat")
    ) {
      return {
        reply:
          "Kami memiliki portofolio proyek live serta katalog template siap pakai:\n\n" +
          "Portofolio Live Web Application:\n" +
          "• Teman Tix (https://temantix.com) - Platform e-ticketing konser & event (50rb+ pengguna)\n\n" +
          "Katalog Template Siap Pakai:\n" +
          "• Medika Care (Klinik & Faskes 24 Jam)\n" +
          "• Ruang Singgah (Kos, Penginapan & Properti)\n" +
          "• Dapur Rasa (Kuliner & Katering Acara)\n" +
          "• AutoPro Detailing (Bengkel & Perawatan Mobil)\n" +
          "• Vona Bridal (Gaun Pengantin & Studio MUA)\n" +
          "• The Wedding of Arya & Nabila (Undangan Digital Interaktif)",
        actions: [
          {
            label: "Kunjungi temantix.com",
            icon: "fa-solid fa-arrow-up-right-from-square",
            href: "https://temantix.com/",
            isExternal: true,
          },
          {
            label: "Jelajahi Katalog Template",
            icon: "fa-solid fa-layer-group",
            href: "#template",
          },
          {
            label: "Buka Direktori Live Demo",
            icon: "fa-solid fa-arrow-up-right-from-square",
            href: "/templates/index.html",
            isExternal: true,
          },
        ],
      };
    }

    // 7. Domain / Hosting / Server / Maintenance
    if (
      q.includes("domain") ||
      q.includes("hosting") ||
      q.includes("server") ||
      q.includes("maintenance") ||
      q.includes("perawatan") ||
      q.includes("revisi")
    ) {
      return {
        reply:
          "Tenang, seluruh paket berlangganan Kinetra adalah solusi 'Terima Beres'!\n\n" +
          "• Domain resmi (.com atau domain bisnis) dan Cloud Hosting berkecepatan tinggi sudah termasuk.\n" +
          "• Keamanan SSL HTTPS otomatis aktif.\n" +
          "• Backup berkala dan monitoring uptime 24/7.\n" +
          "• Bantuan update konten berkala dan revisi desain tanpa biaya tambahan selama masa langganan aktif.",
        actions: [
          {
            label: "Konsultasi Teknis via WA",
            icon: "fa-brands fa-whatsapp",
            href: `${WA_BASE}?text=Halo%20Kinetra%2C%20saya%20mau%20tanya%20seputar%20domain%20dan%20hosting.`,
            isExternal: true,
          },
        ],
      };
    }

    // 8. Cara pesan / Order / Alur
    if (
      q.includes("cara") ||
      q.includes("pesan") ||
      q.includes("order") ||
      q.includes("mulai") ||
      q.includes("langkah") ||
      q.includes("alur")
    ) {
      return {
        reply:
          "Cara memesan website di Kinetra sangat praktis dan anti ribet:\n\n" +
          "1. Hubungi tim kami via WhatsApp atau pilih paket di kalkulator.\n" +
          "2. Kirimkan materi dasar (nama usaha, logo, kontak WA, foto produk/layanan).\n" +
          "3. Tim kami mengerjakan website dalam 3 hari kerja.\n" +
          "4. Anda melakukan review dan revisi jika dibutuhkan.\n" +
          "5. Website resmi tayang online dan siap menerima pelanggan!",
        actions: [
          {
            label: "Mulai Pemesanan via WA",
            icon: "fa-brands fa-whatsapp",
            href: `${WA_BASE}?text=Halo%20Kinetra%2C%20saya%20mau%20mulai%20pesan%20website%20untuk%20usaha%20saya.`,
            isExternal: true,
          },
          {
            label: "Cek Simulasi Biaya Dulu",
            icon: "fa-solid fa-calculator",
            href: "#kalkulator",
          },
        ],
      };
    }

    // 9. Rekomendasi berdasarkan jenis bisnis
    if (
      q.includes("toko") ||
      q.includes("warung") ||
      q.includes("kafe") ||
      q.includes("kuliner") ||
      q.includes("klinik") ||
      q.includes("bengkel") ||
      q.includes("rekomendasi")
    ) {
      return {
        reply:
          "Untuk sebagian besar bisnis lokal (Toko, Klinik, Kuliner, Bengkel, dan Jasa), kami merekomendasikan Paket Growth (Rp 299.000 / bln) yang paling laris!\n\n" +
          "Mengapa? Karena di paket ini bisnis Anda langsung mendapatkan hingga 5 halaman profil lengkap, domain .com resmi, dan optimasi Google Maps agar mudah ditemukan calon pembeli di sekitar lokasi Anda.",
        actions: [
          {
            label: "Pilih Paket Growth via WA",
            icon: "fa-brands fa-whatsapp",
            href: `${WA_BASE}?text=Halo%20Kinetra%2C%20saya%20tertarik%20mengambil%20Paket%20Growth%20untuk%20usaha%20saya.`,
            isExternal: true,
          },
          {
            label: "Bandingkan Semua Paket",
            icon: "fa-solid fa-table-list",
            href: "#harga",
          },
        ],
      };
    }

    // 10. Fallback umum
    return {
      reply:
        "Terima kasih atas pertanyaannya! Tim Kinetra siap membantu mengembangkan kehadiran digital bisnis Anda, mulai dari Landing Page cepat, Company Profile SEO lokal, Web Application kustom, hingga Undangan Digital interaktif.\n\n" +
        "Ada bagian spesifik yang ingin Anda diskusikan atau langsung tersambung dengan konsultan kami via WhatsApp?",
      actions: [
        {
          label: "Chat Langsung via WhatsApp",
          icon: "fa-brands fa-whatsapp",
          href: `${WA_BASE}?text=${encodeURIComponent(
            `Halo Kinetra, saya ingin konsultasi terkait: ${userText}`
          )}`,
          isExternal: true,
        },
        {
          label: "Hitung Estimasi Biaya",
          icon: "fa-solid fa-calculator",
          href: "#kalkulator",
        },
        {
          label: "Lihat Katalog Template",
          icon: "fa-solid fa-layer-group",
          href: "#template",
        },
      ],
    };
  };

  const handleSendUserMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAiResponse(text);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: response.reply,
        actions: response.actions,
        timestamp: getCurrentTime(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="mb-3 w-[330px] sm:w-[390px] h-[540px] max-h-[82vh] rounded-3xl bg-white shadow-[0_24px_60px_rgba(10,37,88,.24)] border border-slate-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* HEADER */}
          <div className="bg-gradient-to-r from-[#0b2558] via-[#09357e] to-[#0875ef] p-4 text-white flex items-center justify-between shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative size-10 rounded-2xl bg-white/10 backdrop-blur border border-white/20 grid place-items-center text-cyan-300 shadow-inner">
                <i className="fa-solid fa-wand-magic-sparkles text-lg" />
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-400 border-2 border-[#0b2558]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black leading-tight text-white">Kinetra AI</span>
                  <span className="rounded-md bg-cyan-400/20 px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-cyan-200 border border-cyan-400/30">
                    Smart 24/7
                  </span>
                </div>
                <div className="text-[11px] text-slate-200 flex items-center gap-1.5 mt-0.5">
                  <span className="inline-block size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Siap Menjawab &amp; Solusi Cepat</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                title="Mulai Ulang Percakapan"
                className="grid size-8 place-items-center rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition"
              >
                <i className="fa-solid fa-rotate-right text-xs" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Tutup Chat"
                className="grid size-8 place-items-center rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>
          </div>

          {/* MESSAGE LIST */}
          <div className="flex-1 overflow-y-auto p-4 bg-[#f8fbff] space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Bubble */}
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-[#0875ef] text-white rounded-tr-xs"
                      : "bg-white text-slate-800 rounded-tl-xs border border-slate-200/80"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Action Buttons inside AI response */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[95%]">
                    {msg.actions.map((act) => {
                      if (act.href) {
                        return (
                          <a
                            key={act.label}
                            href={act.href}
                            target={act.isExternal ? "_blank" : undefined}
                            rel={act.isExternal ? "noreferrer" : undefined}
                            onClick={() => {
                              if (!act.isExternal && act.href?.startsWith("#")) {
                                setIsOpen(false);
                              }
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-white px-3 py-1.5 text-[11px] font-bold text-[#0870e8] hover:bg-blue-50 transition shadow-xs"
                          >
                            {act.icon && <i className={`${act.icon} text-[11px]`} />}
                            <span>{act.label}</span>
                          </a>
                        );
                      }

                      return (
                        <button
                          key={act.label}
                          type="button"
                          onClick={act.onClick}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 hover:border-blue-300 hover:bg-blue-50/70 hover:text-blue-700 transition shadow-xs text-left"
                        >
                          {act.icon && <i className={`${act.icon} text-slate-400 text-[10px]`} />}
                          <span>{act.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Timestamp */}
                <span className="mt-1 text-[10px] text-slate-400 px-1 font-medium">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* TYPING INDICATOR */}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="rounded-2xl rounded-tl-xs bg-white px-3.5 py-2.5 border border-slate-200 shadow-sm text-slate-400 flex items-center gap-1.5">
                  <i className="fa-solid fa-wand-magic-sparkles text-xs text-cyan-500 animate-pulse" />
                  <span className="text-[11px] font-medium text-slate-500">Kinetra AI sedang mengetik</span>
                  <span className="inline-flex gap-1 ml-1">
                    <span className="size-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="size-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="size-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* WHATSAPP HUMAN ESCALATION BANNER */}
          <div className="bg-slate-100/90 border-t border-slate-200/70 px-3.5 py-2 flex items-center justify-between text-[11px] shrink-0">
            <span className="text-slate-600 font-medium">Ingin bicara dengan konsultan manusia?</span>
            <a
              href={`${WA_BASE}?text=Halo%20Kinetra%2C%20saya%20ingin%20berbicara%20langsung%20dengan%20tim%20konsultan.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-bold text-emerald-600 hover:text-emerald-700 transition"
            >
              <i className="fa-brands fa-whatsapp text-xs" />
              <span>Chat Tim WA</span>
            </a>
          </div>

          {/* INPUT FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendUserMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Ketik pertanyaan (cth: berapa biaya?)..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#0875ef] focus:outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="grid size-9 place-items-center rounded-xl bg-[#0875ef] text-white hover:bg-blue-600 disabled:opacity-40 disabled:hover:bg-[#0875ef] transition shadow-md shadow-blue-500/20 shrink-0"
              aria-label="Kirim pesan"
            >
              <i className="fa-solid fa-paper-plane text-xs" />
            </button>
          </form>
        </div>
      )}

      {/* FLOATING TRIGGER BUTTON */}
      <button
        type="button"
        onClick={handleOpenToggle}
        className="group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#0b2558] via-[#09357e] to-[#0875ef] px-4 py-3 text-white shadow-[0_12px_32px_rgba(8,117,239,.38)] transition-all hover:scale-105 hover:shadow-[0_16px_40px_rgba(8,117,239,.5)] border border-white/20"
        aria-label="Buka Asisten AI Kinetra"
      >
        <span className="relative grid size-6 place-items-center">
          <i className="fa-solid fa-wand-magic-sparkles text-cyan-300 text-lg group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 size-2 rounded-full bg-emerald-400 animate-ping" />
        </span>
        <span className="text-xs font-black tracking-wide hidden sm:inline text-white">
          Tanya AI Kinetra
        </span>
        {hasUnread && !isOpen && (
          <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-rose-500 text-[10px] font-black text-white shadow-md animate-pulse">
            1
          </span>
        )}
      </button>
    </div>
  );
}
