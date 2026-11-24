import { useState, useEffect, type ReactNode } from "react";
import KinetraAIChat from "./KinetraAIChat";

const WA_NUMBER = "628983680129";
const WA_BASE_URL = `https://wa.me/${WA_NUMBER}`;
const WA_LINK = `${WA_BASE_URL}?text=Halo%20Kinetra%2C%20saya%20ingin%20konsultasi%20website.`;
const CURRENT_YEAR = new Date().getFullYear();

type IconName =
  | "arrow"
  | "bolt"
  | "check"
  | "chevron"
  | "close"
  | "code"
  | "external"
  | "globe"
  | "instagram"
  | "linkedin"
  | "map"
  | "menu"
  | "message"
  | "refresh"
  | "spark"
  | "star"
  | "whatsapp"
  | "smartphone"
  | "monitor"
  | "calculator"
  | "help"
  | "plus"
  | "minus"
  | "shield"
  | "clock"
  | "send"
  | "eye";

function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="m5 12 14 0m-5-5 5 5-5 5" />,
    bolt: <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    code: <path d="m8 9-4 3 4 3m8-6 4 3-4 3m-2-9-4 12" />,
    external: <path d="M15 5h4v4m0-4-8 8m6-1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h6" />,
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3.4 3 14.6 0 18M12 3c-3 3.4-3 14.6 0 18" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
    linkedin: (
      <>
        <path d="M6 9v10M6 5v.01M10 19v-6a4 4 0 0 1 8 0v6M10 9v10" />
      </>
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
        <path d="M9 3v15m6-12v15" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    message: (
      <>
        <path d="M20 15a4 4 0 0 1-4 4H8l-5 3 1.5-5A8 8 0 1 1 20 15Z" />
        <path d="M8 11h8M8 15h5" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 7v5h-5M4 17v-5h5" />
        <path d="M6.1 9a7 7 0 0 1 11.8-2L20 12M4 12l2.1 5a7 7 0 0 0 11.8-2" />
      </>
    ),
    spark: (
      <path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Zm7 13 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
    ),
    star: <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.9-5.4 2.9 1-6-4.3-4.2 6-.9L12 3Z" />,
    whatsapp: (
      <>
        <path d="M20 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.2A8.5 8.5 0 1 1 20 11.5Z" />
        <path d="M8.5 8.2c.5 3 2.2 4.7 5.2 5.5" />
      </>
    ),
    smartphone: (
      <>
        <rect width="14" height="20" x="5" y="2" rx="3" />
        <path d="M12 18h.01" />
      </>
    ),
    monitor: (
      <>
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <path d="M12 17v4M8 21h8" />
      </>
    ),
    calculator: (
      <>
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <path d="M8 6h8M16 14v4M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
      </>
    ),
    plus: <path d="M5 12h14M12 5v14" />,
    minus: <path d="M5 12h14" />,
    shield: <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
    send: <path d="m22 2-7 20-4-9-9-4ZM22 2 11 13" />,
    eye: (
      <>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

const HERO_TYPING_PHRASES = [
  "Siap dalam 3 hari.",
  "Buat undangan digital Jogja.",
  "Jasa pembuatan web kilat.",
  "Banjir order WhatsApp.",
  "Muncul di Google Maps.",
  "Desain mobile-first & cepat.",
  "Mulai Rp 149rb/bulan.",
];

function useTypewriter(
  phrases: string[],
  typingSpeed = 75,
  deletingSpeed = 40,
  pauseDuration = 2200,
) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState(phrases[0] || "");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentPhrase = phrases[phraseIndex % phrases.length];

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 250);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  const nextPhrase = () => {
    setIsDeleting(false);
    const nextIdx = (phraseIndex + 1) % phrases.length;
    setPhraseIndex(nextIdx);
    setDisplayText(phrases[nextIdx]);
  };

  return { displayText, phraseIndex, nextPhrase };
}

const navLinks = [
  ["Layanan", "#layanan"],
  ["Katalog Template", "#template"],
  ["Portofolio", "#portofolio"],
  ["Harga & Kalkulator", "#harga"],
  ["Kemitraan", "#kemitraan"],
  ["FAQ", "#faq"],
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#"
      className="inline-flex shrink-0 items-center"
      aria-label="Kinetra — kembali ke beranda"
    >
      <img
        src={light ? "/brand/02-logo-web-horizontal-reversed.svg" : "/brand/01-logo-web-horizontal.svg"}
        alt="Kinetra"
        className="h-9 w-auto sm:h-10"
      />
    </a>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-left"}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-5 text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.045em] text-[#0b1d35]">
        {title}
      </h2>
      <p className="mt-5 text-[16px] leading-7 text-[#627087] sm:text-[17px]">{description}</p>
    </div>
  );
}

function HeroVisual({ onShowToast }: { onShowToast?: (msg: string) => void }) {
  const [activeTab, setActiveTab] = useState<"analytics" | "mobile" | "maps">("analytics");
  const [selectedBar, setSelectedBar] = useState<number>(7);
  const [notifIndex, setNotifIndex] = useState<number>(0);
  const [phoneTab, setPhoneTab] = useState<"home" | "layanan" | "booking">("home");
  const [isNotifPaused, setIsNotifPaused] = useState(false);

  const notifications = [
    {
      title: "Pesanan Masuk via WA",
      sub: "Paket Hampers Lebaran · 2 mnt lalu",
      tone: "green",
      iconClass: "fa-brands fa-whatsapp text-emerald-500",
    },
    {
      title: "Review Bintang 5",
      sub: "Google Maps · 'Pelayanan ramah & cepat!'",
      tone: "yellow",
      iconClass: "fa-solid fa-star text-amber-400",
    },
    {
      title: "Website Siap Online",
      sub: "Setup domain & SSL selesai 100%",
      tone: "blue",
      iconClass: "fa-solid fa-circle-check text-blue-500",
    },
  ];

  // Auto-cycle notification every 4.5 seconds unless paused
  useEffect(() => {
    if (isNotifPaused) return;
    const interval = setInterval(() => {
      setNotifIndex((prev) => (prev + 1) % notifications.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isNotifPaused, notifications.length]);

  const barData = [
    { day: "Sen", value: 45, visits: "620", leads: 8 },
    { day: "Sel", value: 60, visits: "890", leads: 14 },
    { day: "Rab", value: 52, visits: "740", leads: 11 },
    { day: "Kam", value: 78, visits: "1.120", leads: 19 },
    { day: "Jum", value: 68, visits: "950", leads: 16 },
    { day: "Sab", value: 92, visits: "1.450", leads: 26 },
    { day: "Min", value: 85, visits: "1.280", leads: 22 },
    { day: "Hari Ini", value: 100, visits: "1.620", leads: 31 },
  ];

  const handleCopyOfficeAddress = () => {
    const address = "Kinetra Digital Hub, Jl. Kaliurang KM 9, DI Yogyakarta";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(address);
    }
    if (onShowToast) {
      onShowToast("Alamat kantor Kinetra disalin ke clipboard!");
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-[570px] lg:ml-auto">
      <div className="absolute -right-12 -top-14 size-52 rounded-full bg-cyan-300/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-12 left-4 size-48 rounded-full bg-blue-500/20 blur-3xl" />

      {/* Main Interactive Card */}
      <div className="relative rounded-[28px] border border-white/80 bg-white/90 p-3.5 shadow-[0_30px_80px_rgba(23,58,107,.18)] backdrop-blur transition-all duration-300 hover:shadow-[0_35px_90px_rgba(8,112,232,.18)]">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e5edf6] bg-white px-3.5 py-2.5 rounded-t-[20px]">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff7a7a] transition-transform hover:scale-125 cursor-pointer" />
            <span className="size-2.5 rounded-full bg-[#ffc85e] transition-transform hover:scale-125 cursor-pointer" />
            <span className="size-2.5 rounded-full bg-[#4bd3a4] transition-transform hover:scale-125 cursor-pointer" />
            <span className="ml-2 text-[10px] font-bold text-slate-400">kinetra.web.id</span>
          </div>
          {/* Tab Switcher */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 text-[11px] font-bold text-[#14253b] shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab("analytics")}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                activeTab === "analytics"
                  ? "bg-white text-[#0870e8] shadow-sm font-extrabold"
                  : "text-slate-500 hover:text-blue-600"
              }`}
            >
              <i className="fa-solid fa-chart-simple mr-1.5 text-[10px]" />
              Analytics
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("mobile")}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                activeTab === "mobile"
                  ? "bg-white text-[#0870e8] shadow-sm font-extrabold"
                  : "text-slate-500 hover:text-blue-600"
              }`}
            >
              <i className="fa-solid fa-mobile-screen mr-1.5 text-[10px]" />
              Live Mobile
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("maps")}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                activeTab === "maps"
                  ? "bg-white text-[#0870e8] shadow-sm font-extrabold"
                  : "text-slate-500 hover:text-blue-600"
              }`}
            >
              <i className="fa-solid fa-map-location-dot mr-1.5 text-[10px]" />
              Google Maps
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="overflow-hidden rounded-b-[20px] border-x border-b border-[#dfe9f5] bg-[#f8fbff] p-4 sm:p-5">
          {activeTab === "analytics" && (
            <div className="animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    Performa Website Bulan Ini
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#0b1d35]">8.650</span>
                    <span className="inline-flex items-center text-xs font-bold text-[#0fac8d] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Icon name="arrow" className="size-3 -rotate-45" /> +42% pengunjung
                    </span>
                  </div>
                </div>
                <span className="grid size-9 place-items-center rounded-xl bg-blue-50 p-1 text-[#0870e8] shadow-sm">
                  <img src="/brand/03-icon-favicon.svg" alt="" className="size-full" />
                </span>
              </div>

              {/* 3 Metric cards */}
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                <div className="rounded-xl border border-[#e1eaf5] bg-white p-2.5 transition-all hover:border-blue-300 hover:shadow-sm">
                  <div className="text-[10px] font-semibold text-slate-400">Pesan WA</div>
                  <div className="mt-0.5 text-base font-extrabold text-[#0b1d35]">
                    {142 + barData[selectedBar].leads}
                  </div>
                  <div className="text-[9px] font-bold text-[#0fac8d]">
                    +{barData[selectedBar].leads} hari ini
                  </div>
                </div>
                <div className="rounded-xl border border-[#e1eaf5] bg-white p-2.5 transition-all hover:border-blue-300 hover:shadow-sm">
                  <div className="text-[10px] font-semibold text-slate-400">Google Rating</div>
                  <div className="mt-0.5 text-base font-extrabold text-[#0b1d35] flex items-center gap-1.5">
                    <span>4.9</span>
                    <i className="fa-solid fa-star text-amber-400 text-xs" />
                  </div>
                  <div className="text-[9px] font-bold text-blue-600">128 ulasan</div>
                </div>
                <div className="rounded-xl border border-[#e1eaf5] bg-white p-2.5 transition-all hover:border-blue-300 hover:shadow-sm">
                  <div className="text-[10px] font-semibold text-slate-400">Speed Score</div>
                  <div className="mt-0.5 text-base font-extrabold text-[#0fac8d]">99/100</div>
                  <div className="text-[9px] font-bold text-slate-400">Mobile Fast</div>
                </div>
              </div>

              {/* Interactive Bar Chart */}
              <div className="mt-4 rounded-xl border border-[#e1eaf5] bg-white p-3.5">
                <div className="mb-2 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#14253b] flex items-center gap-1.5">
                    <span>Traffic {barData[selectedBar].day}:</span>
                    <span className="rounded-md bg-blue-50 px-2 py-0.5 font-black text-[#0870e8]">
                      {barData[selectedBar].visits} kunjungan
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold">
                      ({barData[selectedBar].leads} leads)
                    </span>
                  </span>
                  <span className="text-[10px] text-slate-400 hidden sm:inline">
                    Pilih bar untuk simulasi 👆
                  </span>
                </div>

                <div className="flex h-24 items-end gap-2 pt-3">
                  {barData.map((b, i) => (
                    <button
                      key={b.day}
                      type="button"
                      onClick={() => setSelectedBar(i)}
                      className="group flex-1 flex flex-col items-center h-full justify-end focus:outline-none transition-transform hover:-translate-y-0.5 relative"
                    >
                      {selectedBar === i && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap rounded bg-slate-900 px-1.5 py-0.5 text-[8px] font-black text-white shadow">
                          {b.visits}
                        </div>
                      )}
                      <div
                        className={`w-full rounded-t transition-all duration-200 ${
                          selectedBar === i
                            ? "bg-gradient-to-t from-[#ff6b00] to-[#ffa500] shadow-md shadow-orange-300/50 scale-x-105"
                            : "bg-gradient-to-t from-[#0b64e8] to-[#18bfff] opacity-65 group-hover:opacity-100"
                        }`}
                        style={{ height: `${b.value}%` }}
                      />
                      <span
                        className={`mt-1.5 text-[8px] font-bold transition-colors ${
                          selectedBar === i ? "text-[#ff6b00] font-black" : "text-slate-400"
                        }`}
                      >
                        {b.day}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "mobile" && (
            <div className="animate-in fade-in duration-200 mx-auto max-w-[280px] rounded-[26px] border-[5px] border-[#13233a] bg-white p-2.5 shadow-2xl">
              {/* Phone Status Bar */}
              <div className="flex justify-between items-center px-2 py-1 text-[9px] font-bold text-slate-400">
                <span>09:41</span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <i className="fa-solid fa-signal text-[8px]" />
                  <i className="fa-solid fa-wifi text-[8px]" />
                  <i className="fa-solid fa-battery-full text-[9px]" />
                </span>
              </div>

              {/* Interactive Phone Sub-Tabs */}
              <div className="mt-1 flex rounded-lg bg-slate-100 p-0.5 text-[9px] font-bold text-slate-600">
                <button
                  type="button"
                  onClick={() => setPhoneTab("home")}
                  className={`flex-1 rounded-md py-1 transition ${
                    phoneTab === "home" ? "bg-white text-blue-600 shadow-sm font-extrabold" : ""
                  }`}
                >
                  Beranda
                </button>
                <button
                  type="button"
                  onClick={() => setPhoneTab("layanan")}
                  className={`flex-1 rounded-md py-1 transition ${
                    phoneTab === "layanan" ? "bg-white text-blue-600 shadow-sm font-extrabold" : ""
                  }`}
                >
                  Layanan
                </button>
                <button
                  type="button"
                  onClick={() => setPhoneTab("booking")}
                  className={`flex-1 rounded-md py-1 transition ${
                    phoneTab === "booking" ? "bg-white text-blue-600 shadow-sm font-extrabold" : ""
                  }`}
                >
                  Booking WA
                </button>
              </div>

              {/* Phone Screen Views */}
              {phoneTab === "home" && (
                <div className="mt-2 animate-in fade-in duration-150">
                  <div className="rounded-xl bg-gradient-to-r from-[#0F2F7A] to-[#0870e8] p-3 text-white shadow-sm">
                    <div className="text-[9px] font-extrabold uppercase tracking-widest text-cyan-200">
                      Klinik Medika Pratama
                    </div>
                    <div className="mt-1 text-xs font-black leading-snug">
                      Layanan Kesehatan Ramah & Terpercaya di Kota Anda
                    </div>
                  </div>
                  <div className="mt-2 space-y-1.5 px-0.5">
                    <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 text-[10px] font-bold text-slate-700 border border-slate-100">
                      <span className="grid size-5 place-items-center rounded bg-emerald-100 text-emerald-600 shrink-0">
                        <i className="fa-solid fa-clock text-[10px]" />
                      </span>
                      <span>Buka Setiap Hari (08.00 - 21.00)</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 text-[10px] font-bold text-slate-700 border border-slate-100">
                      <span className="grid size-5 place-items-center rounded bg-blue-100 text-blue-600 shrink-0">
                        <i className="fa-solid fa-user-doctor text-[10px]" />
                      </span>
                      <span>Dokter Spesialis & Umum Siap</span>
                    </div>
                  </div>
                </div>
              )}

              {phoneTab === "layanan" && (
                <div className="mt-2 space-y-1.5 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-2 text-[10px]">
                    <div>
                      <div className="font-bold text-slate-900">Pemeriksaan Dokter</div>
                      <div className="text-[8px] text-slate-500">Konsultasi dokter umum</div>
                    </div>
                    <span className="font-black text-blue-600">Rp 50rb</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-2 text-[10px]">
                    <div>
                      <div className="font-bold text-slate-900">Cek Lab Lengkap</div>
                      <div className="text-[8px] text-slate-500">Gula darah, kolesterol, asam urat</div>
                    </div>
                    <span className="font-black text-blue-600">Rp 75rb</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-2 text-[10px]">
                    <div>
                      <div className="font-bold text-slate-900">Poli Gigi & Scaling</div>
                      <div className="text-[8px] text-slate-500">Pembersihan karang gigi</div>
                    </div>
                    <span className="font-black text-blue-600">Rp 150rb</span>
                  </div>
                </div>
              )}

              {phoneTab === "booking" && (
                <div className="mt-2 p-2 rounded-xl border border-slate-100 bg-slate-50 text-[10px] space-y-2 animate-in fade-in duration-150">
                  <div className="font-extrabold text-slate-800">Form Janji Temu Cepat:</div>
                  <div className="rounded-md bg-white border border-slate-200 px-2 py-1 text-slate-600 text-[9px]">
                    Poli: Dokter Umum
                  </div>
                  <div className="rounded-md bg-white border border-slate-200 px-2 py-1 text-slate-600 text-[9px]">
                    Jadwal: Hari Ini, Pukul 14:00 WIB
                  </div>
                  <div className="text-[9px] text-emerald-600 font-bold flex items-center gap-1">
                    <i className="fa-solid fa-check text-[9px]" /> Slot konsultasi tersedia
                  </div>
                </div>
              )}

              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2 text-center text-[11px] font-black text-white shadow-md shadow-emerald-300/40 transition hover:bg-[#1ebe5d] active:scale-95"
              >
                <Icon name="whatsapp" className="size-3.5" />
                Daftar via WhatsApp Sekarang
              </a>
            </div>
          )}

          {activeTab === "maps" && (
            <div className="animate-in fade-in duration-200 rounded-xl border border-[#dfe7f0] bg-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-blue-700">
                    <Icon name="check" className="size-3 text-blue-600" /> Terverifikasi Google Business
                  </div>
                  <h4 className="mt-1.5 text-base font-extrabold text-[#0b1d35]">
                    Kinetra Digital Hub
                  </h4>
                  <p className="text-[11px] text-slate-500">Agensi Pembuatan Website & Digital Marketing</p>
                </div>
                <span className="grid size-10 place-items-center rounded-xl bg-amber-50 text-amber-500 shadow-sm">
                  <Icon name="star" className="size-5 fill-amber-400 text-amber-400" />
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs font-bold text-[#14253b]">
                <span className="text-amber-500 font-black">4.9</span>
                <span className="flex text-amber-400 gap-0.5 text-[10px]">
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                </span>
                <span className="text-slate-400 font-normal">(148 Ulasan Pelanggan)</span>
              </div>

              {/* Interactive Reviews pill preview */}
              <div className="mt-3 rounded-lg bg-slate-50 border border-slate-100 p-2.5 text-[11px] text-slate-600">
                <span className="font-bold text-slate-800 block mb-0.5">💬 Ulasan Teratas:</span>
                "Pembuatan web cepat banget, 3 hari kelar dan langsung banyak yang tanya di WhatsApp!"
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={handleCopyOfficeAddress}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 font-bold text-slate-700 transition hover:bg-slate-100 hover:border-slate-300 active:scale-95"
                >
                  <i className="fa-solid fa-copy text-slate-500 text-xs" /> Salin Alamat
                </button>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-[#0F2F7A] py-2 font-bold text-white transition hover:bg-[#0870e8] active:scale-95"
                >
                  <Icon name="whatsapp" className="size-3.5" /> Kontak Langsung
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Rotating Floating Notification with Pause on Hover */}
      <div
        onMouseEnter={() => setIsNotifPaused(true)}
        onMouseLeave={() => setIsNotifPaused(false)}
        className="absolute -bottom-8 -left-3 sm:-left-8"
      >
        <button
          type="button"
          onClick={() => setNotifIndex((prev) => (prev + 1) % notifications.length)}
          className="flex items-center gap-3 rounded-2xl border border-white bg-white/95 p-3.5 pr-6 shadow-[0_18px_45px_rgba(25,65,115,.16)] transition-all hover:scale-105 active:scale-95 text-left group"
          title="Klik untuk ganti notifikasi"
        >
          <span className="relative grid size-10 place-items-center rounded-xl bg-[#eaf8f5] text-[#0fac8d] transition-colors group-hover:bg-[#d8f4ee]">
            <span className="absolute -top-1 -right-1 size-3 rounded-full bg-emerald-500 animate-ping" />
            <i className={`${notifications[notifIndex].iconClass} text-base`} />
          </span>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#122742]">
              <span>{notifications[notifIndex].title}</span>
              <span className="text-[9px] text-[#0870e8] underline group-hover:text-blue-700">
                ({notifIndex + 1}/{notifications.length})
              </span>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              {notifications[notifIndex].sub}
            </div>
          </div>
        </button>
      </div>

      {/* Floating Badge Right with subtle bounce */}
      <div className="absolute -right-2 top-14 hidden items-center gap-2 rounded-xl border border-white bg-white/95 px-3.5 py-2.5 shadow-[0_16px_38px_rgba(25,65,115,.14)] sm:flex animate-float">
        <span className="grid size-8 place-items-center rounded-lg bg-blue-50 text-blue-600">
          <Icon name="globe" className="size-4" />
        </span>
        <div>
          <div className="text-[10px] font-semibold text-slate-400">Garansi Layanan</div>
          <div className="text-xs font-bold text-[#122742]">Online 24/7 & Cepat</div>
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    icon: "bolt" as IconName,
    number: "01",
    title: "Website Praktis & Cepat",
    body: "Website profesional yang langsung siap dipakai. Mulai dari desain, domain, hingga online — semua kami urus.",
    tone: "blue",
    perks: ["Mobile First", "Hosting Cloud Cepat", "Domain .com/.id"],
  },
  {
    icon: "map" as IconName,
    number: "02",
    title: "Google Maps & SEO Lokal",
    body: "Bisnis lebih mudah ditemukan pelanggan terdekat lewat profil Google yang optimal dan strategi SEO lokal.",
    tone: "cyan",
    perks: ["Verifikasi Profil", "Keyword Lokal", "Optimasi Review"],
  },
  {
    icon: "refresh" as IconName,
    number: "03",
    title: "Perawatan & Update Bulanan",
    body: "Konten selalu segar, performa tetap cepat, dan keamanan terjaga tanpa perlu repot mengurus teknis.",
    tone: "violet",
    perks: ["Backup Rutin", "Update Menu/Harga", "Support WhatsApp"],
  },
];

type TemplateItem = {
  category: string;
  themeGroup: "Semua" | "Kesehatan" | "Properti" | "Kuliner" | "Jasa";
  title: string;
  slug: string;
  demoUrl: string;
  body: string;
  image: string;
  accent: string;
  theme: string;
  features: string[];
};

const templateData: TemplateItem[] = [
  {
    category: "Klinik & Layanan",
    themeGroup: "Kesehatan",
    title: "Medika Care",
    slug: "medika-care",
    demoUrl: "/templates/medika-care/index.html",
    body: "Tampil terpercaya dengan jadwal dokter, daftar layanan, dan booking WhatsApp.",
    image:
      "https://images.unsplash.com/photo-1627924827560-4445cca96254?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900",
    accent: "#1674e9",
    theme: "Kesehatan",
    features: ["Jadwal Dokter", "Tombol Booking WA", "Daftar Tarif & BPJS", "Peta Lokasi Faskes"],
  },
  {
    category: "Kos & Rental Wisata",
    themeGroup: "Properti",
    title: "Ruang Singgah",
    slug: "ruang-singgah",
    demoUrl: "/templates/ruang-singgah/index.html",
    body: "Tampilkan fasilitas, galeri unit, lokasi, dan cek ketersediaan dalam satu halaman.",
    image:
      "https://images.unsplash.com/photo-1731484059864-eb462a17bd6a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900",
    accent: "#0a8c80",
    theme: "Properti",
    features: ["Galeri Foto Kamar", "Daftar Fasilitas", "Cek Ketersediaan Kamar", "Rute Google Maps"],
  },
  {
    category: "Katalog Produk & Katering",
    themeGroup: "Kuliner",
    title: "Dapur Rasa",
    slug: "dapur-rasa",
    demoUrl: "/templates/dapur-rasa/index.html",
    body: "Katalog menu cantik yang memudahkan pelanggan memilih lalu pesan via WhatsApp.",
    image:
      "https://images.unsplash.com/photo-1622572771591-6ca7813cc39d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900",
    accent: "#e77332",
    theme: "Kuliner",
    features: ["Katalog Menu Foto", "Pilihan Paket Prasmanan", "Order WhatsApp Otomatis", "Testimoni Pelanggan"],
  },
  {
    category: "Bengkel & Detailing",
    themeGroup: "Jasa",
    title: "AutoPro Detailing",
    slug: "autopro-detailing",
    demoUrl: "/templates/autopro-detailing/index.html",
    body: "Booking jadwal cuci mobil, paket coating keramik, dan servis berkala tanpa antre lama.",
    image:
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900",
    accent: "#0F2F7A",
    theme: "Otomotif",
    features: ["Paket Coating & Servis", "Booking Slot Jam", "Katalog Hasil Pengerjaan", "Peta Bengkel"],
  },
  {
    category: "Salon & Wedding Organizer",
    themeGroup: "Jasa",
    title: "Vona Bridal & Studio",
    slug: "vona-bridal",
    demoUrl: "/templates/vona-bridal/index.html",
    body: "Koleksi gaun pengantin, portofolio rias artistik, serta pricelist paket pernikahan.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900",
    accent: "#9333ea",
    theme: "Kecantikan",
    features: ["Portofolio High-Res", "Buku Tamu Online", "Pricelist Unduh PDF", "Konsultasi Vendor WA"],
  },
];

function TemplateMockup({ item }: { item: TemplateItem }) {
  return (
    <div className="relative h-[250px] overflow-hidden bg-[#eaf0f6] p-6 pb-0">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(circle at 70% 20%, ${item.accent}32, transparent 48%)`,
        }}
      />
      <div className="absolute left-[9%] top-7 w-[82%] rounded-t-xl border-[5px] border-b-0 border-[#17273d] bg-[#17273d] p-1 shadow-2xl">
        <div className="relative h-[190px] overflow-hidden rounded-t-md bg-white">
          <img
            src={item.image}
            alt=""
            className="absolute right-0 top-0 h-full w-[52%] object-cover"
          />
          <div className="absolute inset-y-0 left-0 w-[57%] bg-white p-4">
            <div className="flex items-center gap-1.5">
              <span className="size-3 rounded" style={{ background: item.accent }} />
              <span className="h-1.5 w-9 rounded bg-slate-700" />
            </div>
            <span
              className="mt-9 block h-2 w-14 rounded"
              style={{ background: `${item.accent}45` }}
            />
            <span className="mt-2.5 block h-3 w-full rounded bg-slate-800" />
            <span className="mt-1.5 block h-3 w-3/4 rounded bg-slate-800" />
            <span className="mt-3 block h-1.5 w-5/6 rounded bg-slate-200" />
            <span className="mt-1.5 block h-1.5 w-3/4 rounded bg-slate-200" />
            <span className="mt-4 block h-6 w-16 rounded-md" style={{ background: item.accent }} />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-[5%] h-3 w-[90%] rounded-b-xl bg-[#2c405a] shadow-xl" />
      <div className="absolute bottom-3 right-5 w-[64px] rounded-[11px] border-[4px] border-[#14253b] bg-white p-1 shadow-xl">
        <div className="h-[112px] overflow-hidden rounded-[5px]">
          <img src={item.image} alt="" className="h-[48%] w-full object-cover" />
          <div className="p-1.5">
            <span className="block h-1.5 w-8 rounded bg-slate-800" />
            <span className="mt-1.5 block h-1 w-full rounded bg-slate-200" />
            <span className="mt-1 block h-1 w-4/5 rounded bg-slate-200" />
            <span className="mt-2 block h-3 w-6 rounded" style={{ background: item.accent }} />
          </div>
        </div>
      </div>
    </div>
  );
}

const projects = [
  {
    badge: "Web App & Ticketing",
    title: "Teman Tix Platform",
    url: "https://temantix.com/",
    description:
      "Platform e-ticketing konser & festival musik dengan pencarian event, checkout instan, e-ticket digital otomatis, dan integrasi payment gateway.",
    result: "50rb+ Pengguna & Transaksi Instan",
    color: "#d97706",
    content: (
      <div className="group relative h-full w-full overflow-hidden bg-[#0c0d12]">
        <img
          src="/portfolio/temantix.jpg"
          alt="Teman Tix - Platform Tiket Event"
          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12]/95 via-[#0c0d12]/25 to-transparent" />
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 backdrop-blur border border-amber-500/40 px-2.5 py-1 text-[10px] font-bold text-amber-300">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            temantix.com
          </span>
          <span className="rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 text-[9px] font-extrabold uppercase">
            Live Production
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-[#f59e0b] px-1.5 py-0.5 text-[10px] font-black text-slate-950">
                Teman
              </span>
              <span className="text-white font-black text-xs">Tix</span>
            </div>
            <div className="text-slate-300 text-[10px] mt-0.5">
              Sumunar Fest &amp; Event Favorit
            </div>
          </div>
          <span className="rounded-lg bg-amber-500 text-slate-950 font-black text-[9px] px-2 py-1 shadow">
            Beli Tiket
          </span>
        </div>
      </div>
    ),
  },
  {
    badge: "Manufaktur",
    title: "Nusa Furni Catalog",
    description:
      "Website showcase furnitur ekspor dengan katalog spesifikasi interaktif dan jalur pemesanan WhatsApp langsung ke tim sales.",
    result: "Inquiry produk naik 2,4x",
    color: "#b77c45",
    content: (
      <div className="relative h-full overflow-hidden bg-[#e8dfd3]">
        <img
          src="https://images.unsplash.com/photo-1664764730743-e57c49a0a6f0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900"
          alt="Suasana ruang kerja untuk proyek katalog furnitur"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#13233a]/30" />
        <div className="absolute inset-x-6 top-5 flex justify-between text-[9px] font-bold text-white">
          <span>NUSAFURNI</span>
          <span>Collections · About · Contact</span>
        </div>
        <div className="absolute bottom-6 left-6 text-white">
          <div className="text-2xl font-semibold">Crafted for living.</div>
          <div className="mt-2 h-0.5 w-10 bg-white" />
        </div>
      </div>
    ),
  },
  {
    badge: "Organisasi",
    title: "Jogja Creative Hub",
    description:
      "Ruang kolaborasi dan direktori kreator dengan kalender agenda kegiatan serta sistem pendaftaran workshop online.",
    result: "1.200+ member terhubung",
    color: "#0b91a6",
    content: (
      <div className="h-full bg-[#daf2f2] p-6">
        <div className="h-full overflow-hidden rounded-xl bg-white shadow-xl">
          <div className="flex h-9 items-center justify-between px-3 text-[7px] font-bold text-[#164154]">
            <span>
              JOGJA<span className="text-teal-500">HUB</span>
            </span>
            <span>Program · Agenda · Member</span>
          </div>
          <div className="relative h-[calc(100%-36px)] bg-gradient-to-br from-[#0d5968] to-[#18a496] p-5 text-white">
            <div className="max-w-44 text-[8px] uppercase tracking-[.15em] text-cyan-200">
              Grow together
            </div>
            <div className="mt-2 max-w-48 text-2xl font-black leading-tight">
              Ruang kolaborasi untuk kreator Jogja.
            </div>
            <div className="mt-4 inline-block rounded-full bg-cyan-300 px-3 py-1.5 text-[7px] font-bold text-slate-900">
              Gabung komunitas
            </div>
            <div className="absolute -bottom-10 -right-5 size-36 rounded-full border-[22px] border-cyan-300/20" />
          </div>
        </div>
      </div>
    ),
  },
];

const packages = [
  {
    name: "Starter",
    description: "Solusi cepat dan hemat untuk bisnis yang baru mulai hadir secara online.",
    price: "149",
    rawPrice: 149000,
    features: [
      "1 halaman website profesional",
      "Gratis domain & cloud server",
      "Integrasi tombol WhatsApp langsung",
      "Gratis biaya setup awal (Rp 0)",
      "Garansi & maintenance teknis",
    ],
  },
  {
    name: "Growth",
    description: "Paket paling laris untuk bisnis lokal yang ingin mendominasi Google Maps & WhatsApp.",
    price: "299",
    rawPrice: 299000,
    popular: true,
    features: [
      "Hingga 5 halaman website bisnis",
      "Optimasi & verifikasi Google Maps",
      "Gratis domain .com resmi & server",
      "Gratis biaya setup awal (Rp 0)",
      "Revisi berkala & update konten",
    ],
  },
  {
    name: "Pro",
    description: "Solusi custom untuk bisnis berkembang dengan kebutuhan katalog produk atau reservasi.",
    price: "549",
    rawPrice: 549000,
    features: [
      "Katalog produk / sistem booking",
      "Kelola penuh Google Maps & SEO lokal",
      "Gratis domain .com & cloud hosting",
      "Gratis biaya setup awal (Rp 0)",
      "Prioritas support & update berkala",
    ],
  },
];

interface FaqItem {
  question: string;
  answer: string;
  category: "Semua" | "Biaya & Paket" | "Pengerjaan" | "Fitur & Server" | "Kemitraan";
}

const faqs: FaqItem[] = [
  {
    category: "Pengerjaan",
    question: "Berapa lama proses pembuatan website dari awal sampai online?",
    answer:
      "Untuk Paket Starter dan Growth rata-rata siap dalam 3–5 hari kerja setelah data usaha Anda (nama bisnis, foto, dan nomor kontak) kami terima. Untuk website custom kompleks (Paket Pro), pengerjaan memakan waktu sekitar 7–10 hari kerja.",
  },
  {
    category: "Fitur & Server",
    question: "Apakah saya harus menyiapkan foto dan teks tulisan sendiri?",
    answer:
      "Tidak perlu khawatir! Jika Anda belum memiliki materi lengkap, tim Kinetra siap membantu menyusun copywriting (teks promosi yang persuasif) dan menyediakan kurasi foto profesional yang sesuai dengan sektor usaha Anda.",
  },
  {
    category: "Biaya & Paket",
    question: "Apakah biaya paket sudah termasuk domain dan hosting?",
    answer:
      "Ya, seluruh paket Kinetra sudah ALL-IN! Sudah termasuk domain resmi (.com / .id / .my.id), cloud hosting berkecepatan tinggi, sertifikat keamanan SSL gratis, serta integrasi tombol WhatsApp tanpa biaya tersembunyi.",
  },
  {
    category: "Fitur & Server",
    question: "Bagaimana jika nanti saya mau ganti nomor WhatsApp, foto, atau harga?",
    answer:
      "Kami membuat struktur website yang sangat fleksibel. Untuk paket Growth dan Pro, Anda mendapatkan layanan garansi maintenance bulanan di mana tim kami yang akan melakukan revisi dan update konten tersebut untuk Anda secara gratis.",
  },
  {
    category: "Fitur & Server",
    question: "Apakah website ini nyaman dibuka di layar HP dan tidak lemot?",
    answer:
      "100% Mobile-First! Lebih dari 80% calon pembeli Anda akan membuka website dari ponsel. Seluruh website yang kami buat dioptimasi agar memuat sangat cepat (kurang dari 2 detik) dan responsif di semua ukuran layar.",
  },
  {
    category: "Fitur & Server",
    question: "Apakah Kinetra juga menerima pembuatan Web Application atau sistem kustom?",
    answer:
      "Tentu saja! Di luar paket website standar, kami berpengalaman membangun Web Application kustom seperti Dashboard Admin, Sistem Kasir/POS, Portal Pelanggan & Karyawan, Sistem Booking Kompleks, hingga integrasi database dan Payment Gateway. Hubungi kami untuk konsultasi spesifikasi teknis bisnis Anda.",
  },
  {
    category: "Kemitraan",
    question: "Bagaimana cara kerja program kemitraan pembuatan undangan digital & website?",
    answer:
      "Program kemitraan Kinetra terbuka untuk Wedding Organizer (WO), Event Organizer (EO), fotografer, percetakan, dan agensi kreatif. Tersedia sistem komisi menarik hingga 30% maupun sistem white-label (memakai nama brand Anda). Seluruh urusan teknis dan pengerjaan ditangani penuh oleh tim Kinetra.",
  },
  {
    category: "Fitur & Server",
    question: "Apakah Kinetra melayani jasa pembuatan web & buat undangan digital di Jogja dan seluruh Indonesia?",
    answer:
      "Tentu saja! Kinetra melayani jasa pembuatan web profesional, landing page bisnis, dan jasa buat undangan digital di Daerah Istimewa Yogyakarta (Jogja) serta melayani pesanan dari seluruh kota di Indonesia secara online dengan proses cepat dan revisi fleksibel.",
  },
];

interface CalcPackageItem {
  id: string;
  name: string;
  popular?: boolean;
  price: number;
  subtext: string;
}

const calcPackages: CalcPackageItem[] = [
  {
    id: "starter",
    name: "Starter",
    price: 149000,
    subtext: "Landing Page 1 Halaman + Integrasi WA",
  },
  {
    id: "growth",
    name: "Growth",
    popular: true,
    price: 299000,
    subtext: "Hingga 5 Halaman + Optimasi Google Maps",
  },
  {
    id: "pro",
    name: "Pro",
    price: 549000,
    subtext: "Katalog/Booking + Kelola Gmaps & SEO",
  },
];

interface CalcAddonItem {
  id: string;
  title: string;
  desc: string;
  price: number;
  isMonthly: boolean;
}

const calcAddons: CalcAddonItem[] = [
  {
    id: "upgrade_domain",
    title: "Upgrade Domain .com (untuk Starter)",
    desc: "Domain internasional .com 1 tahun (Otomatis gratis di Growth & Pro)",
    price: 150000,
    isMonthly: false,
  },
  {
    id: "gmaps_verify",
    title: "Optimasi & Verifikasi Google Maps",
    desc: "Setup & verifikasi profil bisnis agar muncul di Google terdekat",
    price: 100000,
    isMonthly: false,
  },
  {
    id: "copywriting",
    title: "Paket Copywriting & Penataan Foto",
    desc: "Penulisan teks penawaran persuasif & kurasi gambar produk",
    price: 150000,
    isMonthly: false,
  },
  {
    id: "seo_articles",
    title: "Paket 4 Artikel SEO Lokal/bln",
    desc: "Artikel optimasi berkala untuk menaikkan peringkat Google",
    price: 199000,
    isMonthly: true,
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll Progress, Active Nav Spy, and Back to Top
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Global Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 400);

      const sectionIds = ["layanan", "template", "portofolio", "harga", "kemitraan", "faq"];
      const current = sectionIds.find((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) {
        setActiveSection(`#${current}`);
      } else if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typewriter Hero Animation
  const { displayText: typedHeroText, nextPhrase: handleNextHeroPhrase } =
    useTypewriter(HERO_TYPING_PHRASES);

  // Template Filter, Search & Modal State
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [templateSearch, setTemplateSearch] = useState<string>("");
  const [modalTemplate, setModalTemplate] = useState<TemplateItem | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [iframeKey, setIframeKey] = useState<number>(0);

  // Pricing Billing Cycle (Monthly vs Annually with 20% discount)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  // Pricing Calculator State
  const [calcPackage, setCalcPackage] = useState<number>(1); // default Growth
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    "gmaps_verify",
  ]);

  // Reseller Simulator State
  const [resellerClients, setResellerClients] = useState<number>(5);
  const [resellerType, setResellerType] = useState<"website" | "undangan">("website");

  // FAQ Search & Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState<string>("");
  const [faqCategory, setFaqCategory] = useState<string>("Semua");

  const currentCalcPkg = calcPackages[calcPackage];
  const isDomainUpgradeFree = currentCalcPkg.id !== "starter" || billingCycle === "annually";

  // Base price with discount if annual
  const packageBasePrice =
    billingCycle === "annually"
      ? Math.round(currentCalcPkg.price * 0.8)
      : currentCalcPkg.price;

  const toggleAddon = (id: string) => {
    // Domain upgrade gratis dan disabled jika memilih Growth atau Pro
    if (id === "upgrade_domain" && isDomainUpgradeFree) return;
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Hitung total biaya bulanan (Paket Dasar + Add-on Bulanan)
  const monthlyAddonsCost = selectedAddons.reduce((sum, addonId) => {
    const item = calcAddons.find((a) => a.id === addonId);
    return sum + (item && item.isMonthly ? item.price : 0);
  }, 0);
  const totalBiayaBulanan = packageBasePrice + monthlyAddonsCost;

  // Hitung total add-on sekali bayar (Upgrade domain gratis untuk Growth & Pro atau Tahunan)
  const onetimeAddonsCost = selectedAddons.reduce((sum, addonId) => {
    const item = calcAddons.find((a) => a.id === addonId);
    if (!item || item.isMonthly) return sum;
    if (item.id === "upgrade_domain" && isDomainUpgradeFree) return sum;
    return sum + item.price;
  }, 0);

  // Rumus: Total Pembayaran Awal
  // Jika tahunan: totalBiayaBulanan * 12 + onetimeAddonsCost
  // Jika bulanan: totalBiayaBulanan * 3 + onetimeAddonsCost (Penetrasi 3 Bulan Pertama)
  const totalPembayaranAwal =
    billingCycle === "annually"
      ? totalBiayaBulanan * 12 + onetimeAddonsCost
      : totalBiayaBulanan * 3 + onetimeAddonsCost;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const filteredTemplates = templateData.filter((t) => {
    const matchesCategory =
      activeCategory === "Semua" ? true : t.themeGroup === activeCategory;
    const q = templateSearch.trim().toLowerCase();
    const matchesSearch =
      q === ""
        ? true
        : t.title.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.body.toLowerCase().includes(q) ||
          t.features.some((f) => f.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const categoryCounts: Record<string, number> = {
    Semua: templateData.length,
    Kesehatan: templateData.filter((t) => t.themeGroup === "Kesehatan").length,
    Properti: templateData.filter((t) => t.themeGroup === "Properti").length,
    Kuliner: templateData.filter((t) => t.themeGroup === "Kuliner").length,
    Jasa: templateData.filter((t) => t.themeGroup === "Jasa").length,
  };

  const filteredFaqs = faqs.filter((f) => {
    const matchesCat =
      faqCategory === "Semua" ? true : f.category === faqCategory;
    const q = faqSearch.trim().toLowerCase();
    const matchesQuery =
      q === ""
        ? true
        : f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const handleSectorFilter = (category: string, label: string) => {
    setActiveCategory(category);
    setTemplateSearch("");
    showToast(`Menampilkan rekomendasi template untuk: ${label}`);
    document.getElementById("template")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopyQuotation = () => {
    const chosenAddons = selectedAddons
      .map((id) => {
        const a = calcAddons.find((item) => item.id === id);
        if (!a) return null;
        if (a.id === "upgrade_domain" && isDomainUpgradeFree) {
          return `• ${a.title}: GRATIS (Termasuk di Paket ${currentCalcPkg.name})`;
        }
        return `• ${a.title}: ${formatRupiah(a.price)}${a.isMonthly ? " / bln" : " (sekali bayar)"}`;
      })
      .filter(Boolean)
      .join("\n");

    const text = [
      "=== SIMULASI INVESTASI WEBSITE KINETRA ===",
      `* Paket Pilihan: Paket ${currentCalcPkg.name} (${formatRupiah(packageBasePrice)} / bln)`,
      `* Periode Tagihan: ${billingCycle === "annually" ? "Tahunan (Hemat 20% + Gratis Domain .com)" : "Bulanan (Promo 3 Bulan Pertama)"}`,
      chosenAddons ? `* Fitur Tambahan:\n${chosenAddons}` : "* Fitur Tambahan: Standar Paket",
      "------------------------------------------",
      `• Total Pembayaran Awal: ${formatRupiah(totalPembayaranAwal)} (${billingCycle === "annually" ? "12 Bulan Penuh" : "3 Bulan Pertama"})`,
      `• Tagihan Berikutnya: ${formatRupiah(totalBiayaBulanan)} / bln`,
      "Gratis Biaya Setup (Rp 0) · Domain + Cloud Hosting Termasuk",
      "Konsultasi WhatsApp: " + WA_LINK,
    ].join("\n");

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    showToast("Rincian simulasi berhasil disalin ke clipboard! Siap dibagikan.");
  };

  const buildWaCalculatorUrl = () => {
    const chosenAddonLines = selectedAddons
      .map((id) => {
        const a = calcAddons.find((item) => item.id === id);
        if (!a) return null;
        if (a.id === "upgrade_domain" && isDomainUpgradeFree) {
          return `• ${a.title}: GRATIS (Termasuk di Paket ${currentCalcPkg.name})`;
        }
        return `• ${a.title}: ${formatRupiah(a.price)}${a.isMonthly ? " / bln" : " (sekali bayar)"}`;
      })
      .filter(Boolean)
      .join("\n");

    const extraDomainLine =
      isDomainUpgradeFree && !selectedAddons.includes("upgrade_domain")
        ? `\n• Domain .com Resmi: GRATIS (Termasuk di Paket ${currentCalcPkg.name})`
        : "";

    const fullAddonsText = (chosenAddonLines + extraDomainLine).trim();

    const lines = [
      "Halo Kinetra, saya ingin Kunci Promo & Konsultasi Paket Website Berlangganan:",
      `* Paket Pilihan: Paket ${currentCalcPkg.name} (${formatRupiah(packageBasePrice)} / bln)`,
      `* Opsi Siklus: ${billingCycle === "annually" ? "Tahunan (Diskon 20%)" : "Bulanan"}`,
      fullAddonsText ? `* Fitur Tambahan:\n${fullAddonsText}` : "* Fitur Tambahan: Standar Paket",
      "Rincian Pembayaran:",
      `• Total Pembayaran Awal: ${formatRupiah(totalPembayaranAwal)} (${billingCycle === "annually" ? "1 Tahun Penuh" : "3 Bulan Pertama"})`,
      `• Tagihan Berikutnya: ${formatRupiah(totalBiayaBulanan)} / bln`,
      "",
      "Mohon info ketersediaan slot promo dan proses pengerjaannya. Terima kasih!",
    ];

    return `${WA_BASE_URL}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#0b1d35]">
      {/* Realtime Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#0870e8] via-[#00d2ff] to-[#ff6b00] z-[60] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Top Navigation */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-sm py-0"
            : "border-b border-slate-200/50 bg-white/80 backdrop-blur-md py-1"
        }`}
      >
        <div className="page-width flex h-[72px] sm:h-[76px] items-center justify-between">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigasi utama">
            {navLinks.map(([label, href]) => {
              const isActive = activeSection === href;
              return (
                <a
                  key={href}
                  href={href}
                  className={`text-[13px] font-bold transition-all relative py-1.5 ${
                    isActive
                      ? "text-[#0868e8]"
                      : "text-[#46566c] hover:text-[#0868e8]"
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0868e8] rounded-full animate-in fade-in" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            {/* Online Status Badge */}
            <div className="hidden xl:flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 text-[11px] font-bold text-emerald-700">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Tim Standby WhatsApp</span>
            </div>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn-primary btn-shine !min-h-10 !px-5 !text-[13px]"
            >
              <Icon name="whatsapp" className="size-4" />
              Konsultasi Gratis
            </a>
          </div>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-700 lg:hidden hover:bg-slate-50 transition"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
        {menuOpen && (
          <nav
            className="border-t border-slate-100 bg-white px-5 py-5 shadow-2xl lg:hidden animate-in slide-in-from-top-2 duration-200"
            aria-label="Navigasi mobile"
          >
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`block border-b border-slate-100 py-3.5 text-sm font-semibold transition ${
                  activeSection === href ? "text-[#0870e8] font-bold" : "text-slate-700"
                }`}
              >
                {label}
              </a>
            ))}
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-primary btn-shine mt-5 w-full">
              Konsultasi Gratis via WA
            </a>
          </nav>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero-grid relative overflow-hidden bg-[#f8fbff] pb-28 pt-36 sm:pt-44 lg:pb-36">
          <div className="page-width relative z-10 grid items-center gap-20 lg:grid-cols-[1.03fr_.97fr] lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white px-3.5 py-2 text-[11px] font-bold uppercase tracking-[.13em] text-[#0967db] shadow-sm">
                <Icon name="spark" className="size-4 text-cyan-500" />
                Jasa Pembuatan Web &amp; Undangan Digital · Jogja &amp; Seluruh Indonesia
              </div>
              <h1 className="mt-7 max-w-[760px] text-[clamp(2.7rem,5.5vw,5rem)] font-black leading-[1.04] tracking-[-0.06em] text-[#0b1d35]">
                Website bisnis, <span className="text-gradient">terima beres.</span>
                <br />
                <span
                  onClick={handleNextHeroPhrase}
                  title="Klik untuk ganti kata"
                  className="inline-flex items-center min-h-[1.12em] flex-wrap text-[#0875ef] cursor-pointer group select-none"
                >
                  <span className="group-hover:opacity-90 transition-opacity">
                    {typedHeroText}
                  </span>
                  <span className="inline-block w-[3px] sm:w-[5px] h-[0.8em] bg-[#0875ef] ml-1.5 animate-pulse align-middle" />
                </span>
              </h1>
              <p className="mt-7 max-w-[610px] text-[17px] leading-8 text-[#5d6d83] sm:text-[18px]">
                Solusi jasa pembuatan web profesional &amp; buat undangan digital interaktif di Jogja dan seluruh Indonesia. Terintegrasi Google Maps &amp; WhatsApp agar bisnis makin terpercaya dan banjir order.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-primary">
                  <Icon name="whatsapp" />
                  Konsultasi Gratis via WA
                  <Icon name="arrow" className="size-4" />
                </a>
                <a href="#kalkulator" className="btn-secondary">
                  <Icon name="calculator" className="size-4 text-[#0870e8]" />
                  Simulasi Estimasi Biaya
                </a>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[12px] font-semibold text-[#66758a]">
                {["Tanpa biaya tersembunyi", "Bisa revisi desain", "Support teknis setelah online"].map(
                  (text) => (
                    <span key={text} className="flex items-center gap-2">
                      <span className="grid size-5 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                        <Icon name="check" className="size-3" />
                      </span>
                      {text}
                    </span>
                  ),
                )}
              </div>
            </div>
            <HeroVisual onShowToast={showToast} />
          </div>
        </section>

        {/* TRUST BADGE STRIP WITH INTERACTIVE CATEGORY QUICK-JUMP */}
        <section className="border-y border-[#e8eef5] bg-white py-6">
          <div className="page-width flex flex-col items-center justify-between gap-5 md:flex-row">
            <p className="text-center text-xs font-bold uppercase tracking-[.18em] text-slate-400 md:text-left flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-blue-500 animate-pulse" />
              Cocok untuk aneka sektor bisnis lokal:
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-sm font-extrabold text-[#526278]">
              {[
                { label: "Toko & Retail", icon: "fa-solid fa-shop text-blue-500", cat: "Semua" },
                { label: "Klinik & Faskes", icon: "fa-solid fa-stethoscope text-emerald-500", cat: "Kesehatan" },
                { label: "Villa & Homestay", icon: "fa-solid fa-hotel text-teal-500", cat: "Properti" },
                { label: "Cafe & Kuliner", icon: "fa-solid fa-mug-hot text-amber-500", cat: "Kuliner" },
                { label: "Jasa & Kontraktor", icon: "fa-solid fa-wrench text-indigo-500", cat: "Jasa" },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleSectorFilter(item.cat, item.label)}
                  className="group flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3.5 py-1.5 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50/70 hover:text-blue-600 hover:scale-105 active:scale-95 shadow-xs"
                  title={`Klik untuk lihat rekomendasi desain ${item.label}`}
                >
                  <i className={`${item.icon} text-xs transition-transform group-hover:scale-110`} />
                  <span className="text-xs sm:text-sm">{item.label}</span>
                  <i className="fa-solid fa-arrow-right text-[10px] text-blue-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* LAYANAN UTAMA */}
        <section id="layanan" className="scroll-mt-20 py-24 sm:py-32">
          <div className="page-width">
            <SectionHeader
              eyebrow="Layanan Utama"
              title="Semua yang bisnis Anda butuhkan untuk tampil digital"
              description="Tak perlu pusing urusan teknis server atau desain rumit. Kami siapkan fondasi digital yang rapi, cepat, dan siap menghasilkan omset."
            />
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="service-card group relative overflow-hidden rounded-[24px] border border-[#e4ebf4] bg-white p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-blue-300 hover:shadow-[0_25px_60px_rgba(8,112,232,.12)]"
                >
                  <div>
                    <span className="absolute right-7 top-7 text-5xl font-black tracking-[-.08em] text-[#eef3f8] group-hover:text-blue-100/70 transition-colors">
                      {service.number}
                    </span>
                    <div className={`service-icon service-icon-${service.tone} transition-transform group-hover:scale-110`}>
                      <Icon name={service.icon} className="size-6" />
                    </div>
                    <h3 className="mt-7 max-w-[260px] text-[21px] font-extrabold leading-snug tracking-[-.025em] group-hover:text-[#0870e8] transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-6 text-[#68778b]">{service.body}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.perks.map((p) => (
                        <span
                          key={p}
                          className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-700"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={`${WA_LINK}%20Saya%20tertarik%20konsultasi%20layanan%20${encodeURIComponent(service.title)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-2 text-[13px] font-bold text-[#0767e8]"
                  >
                    Pelajari layanan{" "}
                    <Icon
                      name="arrow"
                      className="size-4 transition-transform group-hover:translate-x-1.5"
                    />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* KATALOG TEMPLATE DENGAN FILTER, LIVE SEARCH & INTERACTIVE MODAL */}
        <section id="template" className="scroll-mt-16 bg-[#f4f8fc] py-24 sm:py-32">
          <div className="page-width">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end border-b border-slate-200/70 pb-8">
              <SectionHeader
                align="left"
                eyebrow="Katalog Template"
                title="Pilih desain, kami sesuaikan untuk brand Anda"
                description="Mulai lebih cepat dari template yang sudah terbukti efektif, lalu kami personalisasi warna, logo, foto produk, dan identitas bisnis Anda."
              />

              {/* Live Search & Category Controls */}
              <div className="flex flex-col gap-3 w-full lg:w-auto">
                {/* Search Bar */}
                <div className="relative w-full lg:w-80">
                  <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="text"
                    value={templateSearch}
                    onChange={(e) => setTemplateSearch(e.target.value)}
                    placeholder="Cari template (klinik, cafe, kos, bengkel)..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-xs font-semibold text-slate-800 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                  {templateSearch && (
                    <button
                      type="button"
                      onClick={() => setTemplateSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Category Filter Pills with Item Count Badges */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {(["Semua", "Kesehatan", "Properti", "Kuliner", "Jasa"] as const).map((cat) => {
                    const isSelected = activeCategory === cat;
                    const count = categoryCounts[cat] || 0;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveCategory(cat)}
                        className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-[#0875ef] text-white shadow-md shadow-blue-200 scale-105"
                            : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
                        }`}
                      >
                        <span>{cat}</span>
                        <span
                          className={`rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
                            isSelected ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Template Grid or Empty State */}
            {filteredTemplates.length === 0 ? (
              <div className="mt-14 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <i className="fa-solid fa-folder-open text-4xl text-slate-300" />
                <h4 className="mt-4 text-lg font-bold text-slate-800">Tidak ada template yang cocok</h4>
                <p className="mt-1.5 text-xs text-slate-500 max-w-md mx-auto">
                  Tidak ditemukan template dengan kata kunci "{templateSearch}". Coba kata kunci lain atau reset filter kategori.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setTemplateSearch("");
                    setActiveCategory("Semua");
                  }}
                  className="btn-secondary !min-h-10 !px-4 !text-xs mt-5"
                >
                  Reset Pencarian &amp; Filter
                </button>
              </div>
            ) : (
              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((item) => (
                  <article
                    key={item.title}
                    className="group overflow-hidden rounded-[22px] border border-[#dfe8f1] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(26,56,96,.13)] hover:border-blue-300 flex flex-col justify-between"
                  >
                    <div>
                      <TemplateMockup item={item} />
                      <div className="p-6">
                        <div className="flex items-center justify-between gap-3">
                          <span className="rounded-full bg-[#edf5ff] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.11em] text-[#0967db]">
                            {item.category}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">{item.theme}</span>
                        </div>
                        <h3 className="mt-4 text-xl font-extrabold tracking-[-.02em] group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-[13px] leading-6 text-[#6b788b] min-h-[48px]">
                          {item.body}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {item.features.slice(0, 3).map((f) => (
                            <span
                              key={f}
                              className="rounded-md border border-slate-100 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-500 flex items-center gap-1"
                            >
                              <i className="fa-solid fa-check text-emerald-500 text-[9px]" />
                              <span>{f}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-6 pt-0 flex flex-col gap-2.5">
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={item.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-blue-50 text-[#0870e8] border border-blue-200 text-xs font-bold transition hover:bg-[#0870e8] hover:text-white active:scale-95"
                        >
                          <i className="fa-solid fa-arrow-up-right-from-square text-[11px]" />
                          Buka Demo
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewDevice("desktop");
                            setIframeKey((k) => k + 1);
                            setModalTemplate(item);
                          }}
                          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-[#dce5ef] text-xs font-bold text-slate-700 transition hover:border-blue-400 hover:text-blue-600 bg-white active:scale-95"
                        >
                          <Icon name="eye" className="size-3.5 text-blue-500" />
                          Preview Layar
                        </button>
                      </div>
                      <a
                        href={`${WA_BASE_URL}?text=Halo%20Kinetra%2C%20saya%20tertarik%20menggunakan%20Template%20${encodeURIComponent(item.title)}%20(${encodeURIComponent(item.category)}).`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-shine inline-flex min-h-10 items-center justify-center rounded-xl bg-[#0c203b] px-3 text-center text-xs font-bold text-white transition hover:bg-[#0967db]"
                      >
                        Pilih Template Ini via WA
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
          </div>
        </section>

        {/* PORTOFOLIO */}
        <section id="portofolio" className="scroll-mt-16 py-24 sm:py-32">
          <div className="page-width">
            <SectionHeader
              eyebrow="Portofolio Kinetra"
              title="Proyek nyata, hasil yang terukur"
              description="Bukan hanya sekadar halaman indah. Setiap website kami desain dengan fokus meningkatkan konversi, mempermudah order WhatsApp, dan membangun citra profesional."
            />
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="portfolio-card overflow-hidden rounded-[22px] border border-[#e2e9f1] bg-white transition duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-[260px] overflow-hidden">{project.content}</div>
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span
                          className="inline-flex rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.1em]"
                          style={{ color: project.color, backgroundColor: `${project.color}15` }}
                        >
                          {project.badge}
                        </span>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300/80 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800 hover:bg-amber-100 transition shadow-xs"
                          >
                            <span>Buka temantix.com</span>
                            <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                          </a>
                        )}
                      </div>
                      <h3 className="mt-3.5 text-xl font-extrabold tracking-[-.025em] text-[#0b1d35]">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="mt-2 text-xs text-slate-500 leading-relaxed min-h-[36px]">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="flex items-center gap-2 border-t border-slate-100 pt-4 text-[12px] font-bold text-[#159a7f]">
                      <span className="grid size-5 place-items-center rounded-full bg-emerald-100 shrink-0">
                        <Icon name="arrow" className="size-3 -rotate-45" />
                      </span>
                      <span>{project.result}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HARGA TRANSPARAN & INTERACTIVE PRICING CALCULATOR */}
        <section id="harga" className="scroll-mt-16 bg-[#f6f9fc] py-24 sm:py-32">
          <div className="page-width">
            <SectionHeader
              eyebrow="Harga Transparan"
              title="Pilih paket sesuai tahap bisnis Anda"
              description="Sekali bayar, langsung punya website profesional. Tanpa biaya kejutan dan tanpa proses yang berbelit."
            />

            {/* Standard Package Cards */}
            <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
              {packages.map((item, idx) => (
                <article
                  key={item.name}
                  className={`relative flex flex-col rounded-[24px] bg-white p-7 sm:p-8 transition-all ${
                    item.popular
                      ? "border-2 border-[#0875ef] shadow-[0_24px_60px_rgba(8,105,232,.15)] lg:-translate-y-3"
                      : "border border-[#dfe7f0]"
                  }`}
                >
                  {item.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#0875ef] px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[.13em] text-white shadow-lg">
                      Paling Banyak Dipilih
                    </span>
                  )}
                  <span className="text-xs font-extrabold uppercase tracking-[.14em] text-[#0870e8]">
                    Paket {item.name}
                  </span>
                  <p className="mt-4 min-h-12 text-[13px] leading-6 text-[#69778a]">
                    {item.description}
                  </p>
                  <div className="mt-7 flex items-end gap-1 border-b border-slate-100 pb-5">
                    <span className="mb-1.5 text-sm font-bold text-slate-500">Rp</span>
                    <span className="text-5xl font-black tracking-[-.06em] text-[#0b1d35]">
                      {item.price}
                    </span>
                    <span className="mb-1.5 text-sm font-bold text-slate-500">rb / bln</span>
                  </div>
                  <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Pembayaran awal per 3 bulan · Gratis Setup
                  </div>
                  <ul className="mt-7 flex-1 space-y-4">
                    {item.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-3 text-[13px] font-medium text-[#526278]"
                      >
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#e8f7f3] text-[#08a381]">
                          <Icon name="check" className="size-3" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-2">
                    <a
                      href={`${WA_LINK}%20Saya%20tertarik%20Paket%20${item.name}.`}
                      target="_blank"
                      rel="noreferrer"
                      className={`min-h-12 rounded-xl px-5 text-center text-[13px] font-bold leading-[48px] transition ${
                        item.popular
                          ? "bg-[#0875ef] text-white shadow-lg shadow-blue-200 hover:bg-[#075dcb]"
                          : "border border-[#ced9e6] text-[#122741] hover:border-blue-400 hover:text-blue-600"
                      }`}
                    >
                      Pesan Paket {item.name}
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setCalcPackage(idx);
                        document.getElementById("kalkulator")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-center text-xs font-semibold text-slate-400 hover:text-[#0870e8] py-1"
                    >
                      Kustomisasi di Kalkulator ↓
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Custom Web App & Enterprise Solutions Card */}
            <div className="mt-8 rounded-3xl border border-blue-900/40 bg-gradient-to-r from-[#0b1d35] via-[#102a4e] to-[#0a336c] p-7 sm:p-9 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 border border-cyan-400/40 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-cyan-300">
                  <i className="fa-solid fa-code text-cyan-300 text-xs" />
                  Paket Custom &amp; Web Application
                </div>
                <h3 className="mt-3.5 text-2xl sm:text-3xl font-black text-white leading-tight">
                  Punya Kebutuhan Sistem Khusus atau Web Application?
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Selain website profil &amp; landing page, tim Kinetra berpengalaman membangun aplikasi web custom: Dashboard Admin, Sistem Kasir/POS, Portal Karyawan &amp; Pelanggan, Sistem Reservasi Kustom, hingga SaaS terintegrasi dengan Payment Gateway (QRIS, VA Bank) &amp; Notifikasi WhatsApp Otomatis.
                </p>
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <i className="fa-solid fa-database text-cyan-400 text-xs" />
                    <span>Database &amp; API Kustom</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <i className="fa-solid fa-users-gear text-cyan-400 text-xs" />
                    <span>Multi-Role Management</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <i className="fa-solid fa-credit-card text-cyan-400 text-xs" />
                    <span>Payment &amp; Notif WA</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <i className="fa-solid fa-shield-halved text-cyan-400 text-xs" />
                    <span>Garansi &amp; Maintenance</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
                <a
                  href={`${WA_BASE_URL}?text=Halo%20Kinetra%2C%20saya%20ingin%20konsultasi%20pembuatan%20Web%20Application%20%2F%20Sistem%20Custom%20untuk%20kebutuhan%20bisnis%20saya.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black px-6 py-3 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition text-center"
                >
                  <i className="fa-brands fa-whatsapp text-base" />
                  Konsultasikan Web App Anda
                </a>
                <span className="text-[11px] text-center text-slate-400">
                  Estimasi transparan &amp; NDA terjamin
                </span>
              </div>
            </div>

            {/* INTERACTIVE PRICING CALCULATOR */}
            <div
              id="kalkulator"
              className="mt-20 scroll-mt-24 rounded-[30px] border border-[#e1eaf5] bg-white p-6 sm:p-10 shadow-[0_20px_50px_rgba(20,50,90,.06)]"
            >
              {/* Calculator Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-8">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1 text-xs font-bold text-[#0870e8]">
                    <Icon name="calculator" className="size-4" />
                    Kalkulator Interaktif
                  </div>
                  <h3 className="mt-3 text-2xl font-black text-[#0b1d35] sm:text-3xl">
                    Simulasi Kebutuhan & Estimasi Biaya
                  </h3>
                  <p className="mt-2 text-sm text-[#5d6d83] max-w-xl">
                    Hitung estimasi investasi website bisnis Anda dengan strategi penetrasi berlangganan hemat tanpa biaya setup.
                  </p>
                </div>

                {/* Badge Status Kanan Atas */}
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-5 py-3 text-emerald-800 text-xs font-bold shrink-0 self-start lg:self-center flex items-center gap-2 shadow-sm">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  Gratis Biaya Setup &amp; Sudah Termasuk Domain + Server
                </div>
              </div>

              <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
                {/* Step 1 & 2 Inputs */}
                <div className="space-y-8">
                  {/* Langkah 1: Base Package */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">
                        Langkah 1: Pilih Paket Dasar Website
                      </label>
                      <span className="text-xs font-semibold text-[#0870e8]">
                        Paket Berlangganan (No Setup Fee)
                      </span>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {calcPackages.map((pkg, idx) => {
                        const isSelected = calcPackage === idx;
                        return (
                          <button
                            key={pkg.id}
                            type="button"
                            onClick={() => setCalcPackage(idx)}
                            className={`relative text-left p-4 rounded-2xl border-2 transition ${
                              isSelected
                                ? "border-[#0875ef] bg-blue-50/50 shadow-sm"
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                          >
                            {pkg.popular && (
                              <span className="absolute -top-2.5 right-3 rounded-full bg-[#ff6b00] text-white text-[9px] font-black px-2.5 py-0.5 uppercase tracking-wider shadow-sm">
                                Paling Laris
                              </span>
                            )}
                            <div className="flex justify-between items-center">
                              <span className="font-extrabold text-sm text-[#0b1d35]">{pkg.name}</span>
                              {isSelected && (
                                <span className="size-4 rounded-full bg-[#0875ef] grid place-items-center text-white text-[9px]">
                                  <i className="fa-solid fa-check" />
                                </span>
                              )}
                            </div>

                            <div className="mt-2.5">
                              <div className="text-base font-black text-[#0875ef]">
                                {formatRupiah(pkg.price)}
                                <span className="text-[11px] font-bold text-slate-500"> / bln</span>
                              </div>
                            </div>

                            <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500 leading-snug">
                              {pkg.subtext}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Langkah 2: Fitur & Layanan Tambahan */}
                  <div>
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-3">
                      Langkah 2: Fitur & Layanan Tambahan (Opsional)
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {calcAddons.map((addon) => {
                        const isDomain = addon.id === "upgrade_domain";
                        const isFreeDomain = isDomain && isDomainUpgradeFree;
                        const isChecked = isFreeDomain || selectedAddons.includes(addon.id);

                        return (
                          <div
                            key={addon.id}
                            onClick={() => {
                              if (!isFreeDomain) {
                                toggleAddon(addon.id);
                              }
                            }}
                            className={`p-4 rounded-2xl border transition flex items-start justify-between gap-3 ${
                              isFreeDomain
                                ? "border-emerald-300 bg-emerald-50/50 cursor-default opacity-90"
                                : isChecked
                                ? "cursor-pointer border-emerald-500 bg-emerald-50/40 shadow-sm"
                                : "cursor-pointer border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                          >
                            <div className="flex-1">
                              <div className="text-xs font-bold text-[#0b1d35] flex items-center gap-1.5 flex-wrap">
                                <span>{addon.title}</span>
                                {addon.isMonthly && (
                                  <span className="rounded bg-blue-100 text-blue-700 text-[9px] font-black px-1.5 py-0.5">
                                    Bulanan
                                  </span>
                                )}
                                {isFreeDomain && (
                                  <span className="rounded bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.5">
                                    Gratis di Paket {currentCalcPkg.name}
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                                {isFreeDomain
                                  ? "Domain .com internasional gratis sudah termasuk di paket ini."
                                  : addon.desc}
                              </div>
                              <div className="text-xs font-extrabold text-[#0fac8d] mt-2">
                                {isFreeDomain ? (
                                  <span className="text-emerald-600 font-black">Termasuk Gratis (Rp 0)</span>
                                ) : (
                                  <>
                                    + {formatRupiah(addon.price)}
                                    {addon.isMonthly ? " / bln" : " (sekali bayar)"}
                                  </>
                                )}
                              </div>
                            </div>
                            <span
                              className={`size-5 rounded-md border grid place-items-center shrink-0 mt-0.5 ${
                                isFreeDomain
                                  ? "bg-emerald-600 border-emerald-600 text-white text-xs"
                                  : isChecked
                                  ? "bg-emerald-600 border-emerald-600 text-white text-xs"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {isChecked && <i className="fa-solid fa-check text-[10px]" />}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Kartu Ringkasan Estimasi di Sebelah Kanan */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-b from-[#f8fbff] to-white p-6 sm:p-7 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="text-xs font-extrabold uppercase tracking-widest text-[#0870e8]">
                        Ringkasan Estimasi
                      </div>
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-700">
                        Gratis Setup (Rp 0)
                      </span>
                    </div>

                    {/* Breakdown List */}
                    <div className="mt-4 space-y-2.5 border-b border-slate-100 pb-5 text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-[#0b1d35]">Paket {currentCalcPkg.name}</span>
                          <div className="text-[10px] text-slate-400">
                            Langganan bulanan
                          </div>
                        </div>
                        <div className="text-right font-bold text-[#0b1d35]">
                          {formatRupiah(currentCalcPkg.price)} / bln
                        </div>
                      </div>

                      {/* Addons breakdown */}
                      {selectedAddons.map((id) => {
                        const addon = calcAddons.find((a) => a.id === id);
                        if (!addon) return null;
                        const isDomain = addon.id === "upgrade_domain";
                        const isFreeDomain = isDomain && isDomainUpgradeFree;

                        return (
                          <div key={id} className="flex justify-between items-start pt-1 text-slate-600">
                            <span className="pr-2">
                              + {addon.title}
                              <span className="ml-1 text-[10px] text-slate-400">
                                {isFreeDomain
                                  ? "(termasuk gratis)"
                                  : addon.isMonthly
                                  ? "(bulanan)"
                                  : "(sekali bayar)"}
                              </span>
                            </span>
                            <span className="font-semibold text-slate-800 shrink-0">
                              {isFreeDomain ? (
                                <span className="text-emerald-600 font-bold">Rp 0</span>
                              ) : (
                                <>
                                  {formatRupiah(addon.price)}
                                  {addon.isMonthly ? "/bln" : ""}
                                </>
                              )}
                            </span>
                          </div>
                        );
                      })}

                      {isDomainUpgradeFree && !selectedAddons.includes("upgrade_domain") && (
                        <div className="flex justify-between items-start pt-1 text-slate-600">
                          <span className="pr-2">
                            + Domain .com Internasional
                            <span className="ml-1 text-[10px] text-emerald-600 font-bold">
                              (gratis di paket ini)
                            </span>
                          </span>
                          <span className="font-bold text-emerald-600 shrink-0">
                            Rp 0
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Prominent Totals Display */}
                    <div className="mt-5 rounded-2xl bg-blue-50/80 p-5 border border-blue-100">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                        Total Pembayaran Awal (3 Bulan Pertama):
                      </div>

                      {/* Angka besar utama berwarna biru */}
                      <div className="text-3xl sm:text-4xl font-black text-[#0875ef] tracking-tight">
                        {formatRupiah(totalPembayaranAwal)}
                      </div>

                      {/* Sub-keterangan: Bulan ke-4 dan seterusnya */}
                      <p className="mt-2 text-xs font-semibold text-slate-600 border-t border-blue-200/60 pt-2.5">
                        Bulan ke-4 dan seterusnya cukup bayar{" "}
                        <span className="font-black text-[#0b1d35]">
                          {formatRupiah(totalBiayaBulanan)}/bln
                        </span>
                      </p>

                      <div className="mt-3.5 flex items-center gap-2 text-[11px] font-bold text-[#0fac8d] border-t border-blue-100/60 pt-2.5">
                        <Icon name="clock" className="size-3.5" />
                        Estimasi Pengerjaan: 3 - 5 Hari Kerja · Setup Rp 0
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <a
                      href={buildWaCalculatorUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary w-full shadow-lg !min-h-12 !text-xs sm:!text-sm"
                    >
                      <Icon name="whatsapp" />
                      Kunci Promo &amp; Konsultasi via WA
                    </a>
                    <p className="mt-2.5 text-center text-[10px] text-slate-400">
                      Gratis konsultasi &amp; kunci slot promo penetrasi hari ini.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KEMITRAAN & JASA UNDANGAN DIGITAL */}
        <section
          id="kemitraan"
          className="scroll-mt-16 bg-gradient-to-b from-white via-[#f6f9fc] to-white py-24 sm:py-32 border-t border-slate-100"
        >
          <div className="page-width">
            <SectionHeader
              eyebrow="Layanan Spesial & Kemitraan Jogja & Nasional"
              title="Jasa Pembuatan Undangan Digital Jogja & Seluruh Indonesia"
              description="Solusi jasa buat undangan digital online elegan untuk pernikahan dan event di Yogyakarta (Jogja) maupun seluruh Indonesia, lengkap dengan program kemitraan vendor WO & EO."
            />

            {/* 2-Column Split: Undangan Digital & Program Kemitraan */}
            <div className="mt-14 grid gap-8 lg:grid-cols-2 items-stretch">
              {/* Pillar 1: Jasa Pembuatan Undangan Digital */}
              <div className="relative rounded-[28px] border border-pink-100 bg-white p-7 sm:p-9 shadow-[0_20px_50px_rgba(244,114,182,.08)] flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-pink-100/70 to-transparent rounded-bl-full pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-50 border border-pink-200 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-pink-700">
                      <i className="fa-solid fa-heart text-pink-500 text-xs" />
                      Undangan Online Interaktif
                    </span>
                    <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Aktif Selamanya
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">
                    Buat Undangan Digital Elegan di Jogja &amp; Seluruh Indonesia
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Jasa buat undangan digital online untuk calon pengantin dan panitia acara di Jogja serta seluruh pelosok Indonesia. Sebarkan kabar bahagia ke ribuan keluarga dan teman tanpa repot dan tanpa batas biaya cetak fisik. Tampilan responsif di semua ponsel dengan visual sinematik, musik latar romantis, dan navigasi Google Maps akurat.
                  </p>

                  {/* Feature highlights grid */}
                  <div className="mt-6 grid gap-2.5 sm:grid-cols-2 text-xs text-slate-700">
                    <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                      <span className="grid size-6 place-items-center rounded-lg bg-pink-100 text-pink-600 shrink-0">
                        <i className="fa-solid fa-envelope-open-text text-xs" />
                      </span>
                      <div>
                        <strong className="block text-slate-900 font-bold">RSVP &amp; Buku Tamu</strong>
                        <span className="text-[11px] text-slate-500">Konfirmasi kehadiran via WA otomatis</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                      <span className="grid size-6 place-items-center rounded-lg bg-pink-100 text-pink-600 shrink-0">
                        <i className="fa-solid fa-gift text-xs" />
                      </span>
                      <div>
                        <strong className="block text-slate-900 font-bold">Amplop Digital &amp; QRIS</strong>
                        <span className="text-[11px] text-slate-500">Kirim kado cashless ke rekening/e-wallet</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                      <span className="grid size-6 place-items-center rounded-lg bg-pink-100 text-pink-600 shrink-0">
                        <i className="fa-solid fa-stopwatch text-xs" />
                      </span>
                      <div>
                        <strong className="block text-slate-900 font-bold">Countdown Timer Acara</strong>
                        <span className="text-[11px] text-slate-500">Pengingat kalender otomatis hari H</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                      <span className="grid size-6 place-items-center rounded-lg bg-pink-100 text-pink-600 shrink-0">
                        <i className="fa-solid fa-map-location-dot text-xs" />
                      </span>
                      <div>
                        <strong className="block text-slate-900 font-bold">Peta Lokasi Google Maps</strong>
                        <span className="text-[11px] text-slate-500">Petunjuk rute akurat tanpa tersesat</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                      <span className="grid size-6 place-items-center rounded-lg bg-pink-100 text-pink-600 shrink-0">
                        <i className="fa-solid fa-images text-xs" />
                      </span>
                      <div>
                        <strong className="block text-slate-900 font-bold">Galeri Foto &amp; Video</strong>
                        <span className="text-[11px] text-slate-500">Album prewedding sinematik tajam</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                      <span className="grid size-6 place-items-center rounded-lg bg-pink-100 text-pink-600 shrink-0">
                        <i className="fa-solid fa-id-badge text-xs" />
                      </span>
                      <div>
                        <strong className="block text-slate-900 font-bold">Nama Tamu Tak Terbatas</strong>
                        <span className="text-[11px] text-slate-500">Bebas ganti ribuan nama penerima</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Investasi Mulai Dari</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">Rp 99.000</span>
                      <span className="text-xs font-semibold text-slate-400">/ undangan acara</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                    <a
                      href="/templates/undangan-digital/index.html"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-pink-200 bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold px-4 py-2.5 text-xs transition text-center"
                    >
                      <i className="fa-solid fa-eye text-xs text-pink-600" />
                      Lihat Demo
                    </a>
                    <a
                      href={`${WA_BASE_URL}?text=Halo%20Kinetra%2C%20saya%20ingin%20pesan%20Jasa%20Pembuatan%20Undangan%20Digital%20untuk%20acara%20saya.`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold px-5 py-2.5 text-xs shadow-md shadow-pink-500/20 transition text-center"
                    >
                      <i className="fa-brands fa-whatsapp text-sm" />
                      Pesan Undangan Digital
                    </a>
                  </div>
                </div>
              </div>

              {/* Pillar 2: Program Kemitraan & Reseller */}
              <div className="relative rounded-[28px] border border-blue-100 bg-white p-7 sm:p-9 shadow-[0_20px_50px_rgba(8,112,232,.08)] flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-blue-100/70 to-transparent rounded-bl-full pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-blue-700">
                      <i className="fa-solid fa-handshake text-blue-600 text-xs" />
                      Program Kemitraan Resmi
                    </span>
                    <span className="text-[11px] font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      Komisi s/d 30%
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">
                    Bermitra dengan Kinetra, Tambah Penghasilan Bisnis Anda
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Khusus untuk <strong>Wedding Organizer (WO), Event Organizer (EO), Fotografer, MUA, Percetakan, Desainer, dan Agensi</strong> di seluruh Indonesia. Hadirkan nilai tambah layanan website &amp; undangan digital berkualitas ke klien Anda tanpa perlu merekrut tim programmer.
                  </p>

                  {/* Partnership benefits list */}
                  <div className="mt-6 space-y-3 text-xs text-slate-700">
                    <div className="flex items-start gap-3 rounded-2xl bg-slate-50/80 p-3.5 border border-slate-100">
                      <span className="grid size-8 place-items-center rounded-xl bg-blue-100 text-[#0870e8] shrink-0 font-bold">
                        <i className="fa-solid fa-hand-holding-dollar text-sm" />
                      </span>
                      <div>
                        <strong className="block text-slate-900 font-bold text-xs sm:text-sm">Margin Keuntungan Menguntungkan</strong>
                        <span className="text-slate-500 leading-relaxed">Dapatkan komisi bagi hasil hingga 30% atau bebas tentukan harga jual sendiri ke klien Anda.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl bg-slate-50/80 p-3.5 border border-slate-100">
                      <span className="grid size-8 place-items-center rounded-xl bg-indigo-100 text-indigo-600 shrink-0 font-bold">
                        <i className="fa-solid fa-user-shield text-sm" />
                      </span>
                      <div>
                        <strong className="block text-slate-900 font-bold text-xs sm:text-sm">100% White-Label (Brand Anda Sendiri)</strong>
                        <span className="text-slate-500 leading-relaxed">Kami bekerja di balik layar secara profesional. Hubungan klien tetap menjadi aset berharga bisnis Anda.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl bg-slate-50/80 p-3.5 border border-slate-100">
                      <span className="grid size-8 place-items-center rounded-xl bg-emerald-100 text-emerald-600 shrink-0 font-bold">
                        <i className="fa-solid fa-bolt text-sm" />
                      </span>
                      <div>
                        <strong className="block text-slate-900 font-bold text-xs sm:text-sm">Pengerjaan Kilat &amp; Dukungan Teknis Penuh</strong>
                        <span className="text-slate-500 leading-relaxed">Antrean pengerjaan prioritas 24-48 jam. Urusan koding, domain, hosting, dan maintenance ditangani 100% oleh Kinetra.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500">
                    <span className="font-bold text-slate-800 block">Tanpa Biaya Pendaftaran</span>
                    <span>Langsung aktif &amp; dapat materi promosi</span>
                  </div>

                  <a
                    href={`${WA_BASE_URL}?text=Halo%20Kinetra%2C%20saya%20tertarik%20mendaftar%20sebagai%20Mitra%20Reseller%20%2F%20Partner%20jasa%20website%20dan%20undangan%20digital.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0875ef] hover:bg-[#065cc0] text-white font-bold px-5 py-2.5 text-xs shadow-md shadow-blue-500/20 transition text-center"
                  >
                    <i className="fa-solid fa-handshake text-sm" />
                    Daftar Kemitraan via WA
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section id="faq" className="scroll-mt-16 py-24 sm:py-32 bg-white">
          <div className="page-width">
            <SectionHeader
              eyebrow="Tanya Jawab"
              title="Pertanyaan yang Sering Diajukan"
              description="Punya pertanyaan seputar proses pengerjaan, biaya, atau materi website? Temukan jawabannya di sini."
            />

            <div className="mt-14 max-w-3xl mx-auto space-y-3.5">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-2xl border border-slate-200 transition bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition hover:bg-slate-50/80"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-base font-bold text-[#0b1d35] pr-4">
                        {faq.question}
                      </span>
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-full border transition-transform duration-200 ${
                          isOpen
                            ? "bg-[#0875ef] text-white border-[#0875ef] rotate-180"
                            : "bg-slate-50 text-slate-500 border-slate-200"
                        }`}
                      >
                        <Icon name="chevron" className="size-4" />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-6 sm:px-6 pt-1 text-sm leading-relaxed text-[#5d6d83] border-t border-slate-100 bg-[#fbfcfe]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA PANEL */}
        <section className="bg-[#f6f9fc] pb-24 sm:pb-32">
          <div className="page-width">
            <div className="cta-panel relative overflow-hidden rounded-[30px] bg-[#0F2F7A] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
              <div className="relative z-10 mx-auto max-w-3xl">
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.18em] text-[#ffb27a]">
                  <Icon name="spark" className="size-4" /> Mulai dari sekarang
                </span>
                <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.08] tracking-[-.045em]">
                  Siap bikin bisnis Anda terlihat lebih profesional?
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-slate-300">
                  Ceritakan kebutuhan Anda. Konsultasi pertama gratis, tanpa komitmen, dan langsung
                  berbicara dengan tim developer kami.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 text-sm font-extrabold text-white shadow-[0_15px_40px_rgba(255,107,0,.28)] transition hover:-translate-y-0.5 hover:bg-[#e85f00] w-full sm:w-auto"
                  >
                    <Icon name="whatsapp" />
                    Konsultasi Gratis via WhatsApp
                    <Icon name="arrow" className="size-4" />
                  </a>
                  <a
                    href="#kalkulator"
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/20 w-full sm:w-auto"
                  >
                    <Icon name="calculator" className="size-4" />
                    Hitung Estimasi Biaya
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0F2F7A] text-white">
        <div className="page-width grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_.7fr_.8fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Partner digital terpercaya untuk UMKM dan bisnis modern di Indonesia. Tampil profesional,
              mudah ditemukan di Google, dan siap banjir pesanan.
            </p>
            <div className="mt-6 flex gap-2.5">
              {[
                ["instagram", "Instagram", "https://www.instagram.com/kinetra.labs/"],
                ["linkedin", "LinkedIn", "https://linkedin.com"],
                ["globe", "Website", "https://kinetra.id"],
              ].map(([icon, label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-xl border border-white/10 text-slate-400 transition hover:border-cyan-400/50 hover:text-cyan-300"
                >
                  <Icon name={icon as IconName} className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold">Navigasi</h3>
            <div className="mt-5 space-y-3.5">
              {navLinks.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="block text-sm text-slate-400 transition hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold">Paket &amp; Layanan</h3>
            <div className="mt-5 space-y-3.5 text-sm text-slate-400">
              <a href="#harga" className="block hover:text-white transition">Paket Website Berlangganan</a>
              <a href="#harga" className="block hover:text-white transition">Web App &amp; Custom System</a>
              <a href="#kemitraan" className="block hover:text-white transition">Jasa Undangan Digital</a>
              <a href="#kemitraan" className="block hover:text-white transition">Program Kemitraan Vendor</a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold">Kontak Kami</h3>
            <div className="mt-5 space-y-3 text-sm text-slate-400">
              <p>Yogyakarta & Seluruh Indonesia</p>
              <p>Email: halo@kinetra.id</p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-bold text-white hover:text-[#ffb27a] transition"
              >
                <Icon name="whatsapp" className="size-4 text-emerald-400" />
                WhatsApp: +62 812-3456-7890
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/8 py-6 text-center text-xs text-slate-500">
          © {CURRENT_YEAR} Kinetra Digital. All rights reserved.
        </div>
      </footer>

      {/* TEMPLATE DETAIL PREVIEW MODAL */}
      {modalTemplate && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm"
          onClick={() => setModalTemplate(null)}
        >
          <div
            className="relative w-full max-w-5xl rounded-[28px] bg-white shadow-2xl overflow-hidden flex flex-col max-h-[94vh] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-slate-100 bg-slate-50/80">
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 uppercase tracking-wider">
                  {modalTemplate.category}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {modalTemplate.title}
                </h3>
              </div>

              {/* Device Mode Switcher */}
              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-xl bg-slate-200/80 p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("desktop")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition text-xs ${
                      previewDevice === "desktop"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <i className="fa-solid fa-laptop text-xs" />
                    <span className="hidden sm:inline">Layar Komputer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("mobile")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition text-xs ${
                      previewDevice === "mobile"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <i className="fa-solid fa-mobile-screen text-xs" />
                    <span className="hidden sm:inline">Layar Ponsel</span>
                  </button>
                </div>

                <a
                  href={modalTemplate.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200 transition"
                >
                  <span>Buka Tab Baru</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                </a>

                <button
                  type="button"
                  onClick={() => setModalTemplate(null)}
                  className="grid size-8 place-items-center rounded-xl bg-slate-200/60 text-slate-700 hover:bg-slate-300 transition"
                  aria-label="Tutup preview"
                >
                  <Icon name="close" className="size-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: Interactive Live Iframe */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100 flex items-center justify-center min-h-[440px]">
              {previewDevice === "desktop" ? (
                <div className="w-full h-[520px] rounded-2xl overflow-hidden border border-slate-300 shadow-lg bg-white relative">
                  <div className="h-7 bg-slate-200/90 border-b border-slate-300 px-3 flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-rose-400"></span>
                    <span className="size-2.5 rounded-full bg-amber-400"></span>
                    <span className="size-2.5 rounded-full bg-emerald-400"></span>
                    <span className="ml-2 text-[11px] text-slate-500 font-mono bg-white px-3 py-0.5 rounded-md border border-slate-200 truncate max-w-sm">
                      https://kinetra.id{modalTemplate.demoUrl}
                    </span>
                  </div>
                  <iframe
                    src={modalTemplate.demoUrl}
                    className="w-full h-[calc(100%-28px)] bg-white border-0"
                    title={`Live Demo ${modalTemplate.title}`}
                  />
                </div>
              ) : (
                <div className="w-[360px] h-[550px] rounded-[38px] border-[8px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden relative flex flex-col">
                  {/* Phone Speaker Notch */}
                  <div className="h-5 bg-slate-900 flex justify-center items-center shrink-0">
                    <div className="w-16 h-2.5 bg-slate-800 rounded-full"></div>
                  </div>
                  <iframe
                    src={modalTemplate.demoUrl}
                    className="w-full flex-1 bg-white border-0"
                    title={`Mobile Demo ${modalTemplate.title}`}
                  />
                  {/* Home Bar Indicator */}
                  <div className="h-3.5 bg-slate-900 flex justify-center items-center shrink-0">
                    <div className="w-24 h-1 bg-slate-700 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 bg-white border-t border-slate-100">
              <div className="flex flex-wrap gap-1.5 max-w-md">
                {modalTemplate.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-md border border-slate-100 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600 flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-check text-emerald-600 text-[10px]" />
                    <span>{f}</span>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`${WA_BASE_URL}?text=Halo%20Kinetra%2C%20saya%20ingin%20memakai%20template%20${encodeURIComponent(modalTemplate.title)}%20untuk%20website%20usaha%20saya.`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary flex-1 sm:flex-initial !min-h-11 !text-xs sm:!text-sm shadow-md"
                >
                  <Icon name="whatsapp" />
                  Gunakan Template Ini (WA)
                </a>
                <button
                  type="button"
                  onClick={() => setModalTemplate(null)}
                  className="btn-secondary !min-h-11 !text-xs sm:!text-sm"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE AI CHAT ASSISTANT WIDGET */}
      <KinetraAIChat />
    </div>
  );
}
