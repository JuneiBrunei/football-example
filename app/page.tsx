"use client";

/**
 * FC TEMPLATE — premium football club landing page (IT default, EN toggle)
 * Palette: yellow + violet. Decor: pitch lines, balls, mowing bands, dots, hatching.
 * Next.js 14/15 (App Router) + Tailwind CSS. No other dependencies.
 *
 * CUSTOMISE IN ~5 MINUTES:
 *  - COLORS / BRAND  → object CLUB
 *  - TEXTS           → objects it / en (same structure; keep both in sync)
 *  - Photos / video  → search for "MEDIA SLOT"
 *  - Fonts           → load via next/font (suggested: Barlow Condensed 800 + Inter)
 */

import { useEffect, useState, type CSSProperties } from "react";

/* ───────────────────────── 1. BRAND & COLORS ───────────────────────── */
const CLUB = {
  name: "FC Northbridge",
  short: "NB",
  founded: 1894,
  stadium: "Northbridge Arena",
  bg: "#12082A", // deep violet-black
  surface: "#1D0F42", // raised panels
  accent: "#FFD60A", // yellow — buttons, key actions (black text on top)
  pop: "#FFD60A", // yellow accents on dark
  gold: "#FFC93C", // sponsor status
  violet: "#7C3AED", // brand violet
  soft: "#B79CFF", // light violet for lines / secondary text
  paper: "#F6F3FF", // light sponsor section
  fontDisplay: "'Barlow Condensed','Oswald','Arial Narrow',Impact,sans-serif",
  fontBody: "Inter,system-ui,-apple-system,'Segoe UI',sans-serif",
  matchDate: "2026-10-18T20:45:00",
  titleSponsor: { name: "AEROLINE", since: 2019 },
  premium: ["VOLTA BANK", "KRONOS", "NEXA", "ORBIS"],
  official: ["MERIDIAN", "FORGE", "LUMEN", "ATLAS", "PRIMA", "ZENITH", "HALCYON", "VERTEX"],
  contacts: { press: "press@club.example", commercial: "partners@club.example" },
};

/* ───────────────────────── 2. COPY (EN is the master shape) ───────────────────────── */
const en = {
  locale: "en-GB",
  headline: ["We don't just support.", "We win together."],
  lead: "Over a century on the same touchline. Pick your stand and become part of a story that is written every matchday.",
  nav: [["Fixtures", "#match"], ["Club", "#club"], ["Tickets", "#match"], ["Academy", "#news"], ["Partners", "#partners"]],
  since: "Since",
  buy: "Buy tickets",
  forSponsors: "For sponsors",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  ctaTickets: "Get tickets for the next match",
  ctaApp: "Download the club app",
  stats: [["14", "league titles"], ["38,200", "stadium capacity"], ["96%", "average attendance"], ["1.2M", "followers worldwide"]],
  league: "Premier Division · Matchday 12",
  home: "Northbridge",
  away: "Riverside United",
  at: "at",
  units: ["days", "hrs", "min", "sec"],
  ticketsFrom: "Tickets from £25",
  seasonNote: "Or get a season ticket and save up to 30%",
  manifesto: "We don’t sell emotion. We hand it out, one ticket at a time.",
  values: [
    ["Tradition", "We wear the colours our grandparents wore. Every season continues the same conversation."],
    ["The Stand", "The twelfth man is real. He sings for ninety minutes and never leaves at 0-2."],
    ["Victory", "We don’t ask for sympathy. We come for the result and chase it to the final whistle."],
  ],
  partnersTitle: "Club partners",
  titleSince: "Title partner since",
  titlePitch: "Official title partner of the club. Your brand on the match kit, across the stadium and in every digital channel.",
  facts: [["5", "seasons together"], ["60M", "brand impressions per season"], ["+31%", "brand awareness uplift"]],
  premiumLabel: "Premium partners",
  officialLabel: "Official partners",
  joinTitle: "Put your brand in front of millions of fans",
  reach: [["1.2M", "social media followers"], ["38,200", "fans in the stadium"], ["8.4M", "monthly video views"], ["62%", "audience aged 18–34"]],
  sent: "Request sent. Our commercial team will reply within 24 hours.",
  fCompany: "Company", fCompanyPh: "Brand name",
  fEmail: "Work email",
  fInterest: "What are you interested in?",
  interests: ["Official club partnership", "Stadium advertising", "Digital activations", "Corporate boxes and hospitality"],
  join: "Become a club partner",
  mediaKit: "Download the media kit (PDF)",
  newsTitle: "News and video",
  allStories: "All stories",
  news: [
    ["Interview", "Captain on the derby: “We’re ready for every minute”", "12:40 watch", "14 Oct"],
    ["Club", "Season ticket sales open for the second half of the season", "3 min read", "13 Oct"],
    ["Academy", "U-17s reach the national cup final", "4 min read", "11 Oct"],
  ],
  finalCta: "A season ticket is a seat in history",
  season: "Get a season ticket",
  press: "Press office",
  commercial: "Commercial department",
  legal: "Legal",
  legalLinks: ["Privacy policy", "Ticket terms", "Stadium code of conduct"],
  rights: "All rights reserved.",
};

const it: typeof en = {
  locale: "it-IT",
  headline: ["Qui non si tifa.", "Si vince insieme."],
  lead: "Oltre un secolo sulla stessa linea di fondo. Scegli la tua curva ed entra in una storia che si scrive a ogni giornata.",
  nav: [["Partite", "#match"], ["Il Club", "#club"], ["Biglietti", "#match"], ["Settore giovanile", "#news"], ["Partner", "#partners"]],
  since: "Dal",
  buy: "Acquista biglietti",
  forSponsors: "Per gli sponsor",
  menuOpen: "Apri il menu",
  menuClose: "Chiudi il menu",
  ctaTickets: "Biglietti per la prossima partita",
  ctaApp: "Scarica l’app del club",
  stats: [["14", "titoli vinti"], ["38.200", "posti allo stadio"], ["96%", "presenza media"], ["1,2 Mln", "tifosi nel mondo"]],
  league: "Serie A · 12ª giornata",
  home: "Northbridge",
  away: "Riverside United",
  at: "ore",
  units: ["giorni", "ore", "min", "sec"],
  ticketsFrom: "Biglietti da 25 €",
  seasonNote: "Oppure scegli l’abbonamento e risparmia fino al 30%",
  manifesto: "Non vendiamo emozioni. Le consegniamo, un biglietto alla volta.",
  values: [
    ["Tradizione", "Indossiamo i colori dei nostri nonni. Ogni stagione continua lo stesso discorso."],
    ["La Curva", "Il dodicesimo uomo esiste. Canta per novanta minuti e non se ne va sullo 0-2."],
    ["Vittoria", "Non chiediamo comprensione. Veniamo a prenderci il risultato, fino al triplice fischio."],
  ],
  partnersTitle: "I partner del club",
  titleSince: "Title partner dal",
  titlePitch: "Title partner ufficiale del club. Il tuo brand sulla maglia, in tutto lo stadio e su ogni canale digitale.",
  facts: [["5", "stagioni insieme"], ["60 Mln", "contatti a stagione"], ["+31%", "notorietà del brand"]],
  premiumLabel: "Premium partner",
  officialLabel: "Partner ufficiali",
  joinTitle: "Porta il tuo brand davanti a milioni di tifosi",
  reach: [["1,2 Mln", "follower sui social"], ["38.200", "tifosi allo stadio"], ["8,4 Mln", "visualizzazioni video al mese"], ["62%", "pubblico tra 18 e 34 anni"]],
  sent: "Richiesta inviata. Il nostro ufficio commerciale ti risponderà entro 24 ore.",
  fCompany: "Azienda", fCompanyPh: "Nome del brand",
  fEmail: "Email aziendale",
  fInterest: "Cosa ti interessa?",
  interests: ["Partnership ufficiale con il club", "Pubblicità allo stadio", "Attivazioni digitali", "Skybox e hospitality"],
  join: "Diventa partner del club",
  mediaKit: "Scarica il media kit (PDF)",
  newsTitle: "News e video",
  allStories: "Tutte le notizie",
  news: [
    ["Intervista", "Il capitano sul derby: «Siamo pronti per ogni minuto»", "12:40 video", "14 ott"],
    ["Club", "Aperta la vendita degli abbonamenti per il girone di ritorno", "3 min di lettura", "13 ott"],
    ["Settore giovanile", "L’Under 17 in finale di Coppa Italia di categoria", "4 min di lettura", "11 ott"],
  ],
  finalCta: "Un abbonamento è un posto nella storia",
  season: "Abbonati ora",
  press: "Ufficio stampa",
  commercial: "Ufficio commerciale",
  legal: "Informazioni legali",
  legalLinks: ["Informativa privacy", "Condizioni di vendita biglietti", "Regolamento d’uso dello stadio"],
  rights: "Tutti i diritti riservati.",
};
const COPY = { it, en };
type Lang = keyof typeof COPY;

const theme = {
  "--bg": CLUB.bg, "--surface": CLUB.surface, "--accent": CLUB.accent,
  "--pop": CLUB.pop, "--gold": CLUB.gold, "--paper": CLUB.paper,
  "--violet": CLUB.violet, "--soft": CLUB.soft,
  fontFamily: CLUB.fontBody,
} as CSSProperties;
const display: CSSProperties = { fontFamily: CLUB.fontDisplay };

/* ───────────────────────── 3. ICONS (inline SVG) ───────────────────────── */
const PATHS: Record<string, string> = {
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M6 6l12 12M18 6L6 18",
  arrow: "M7 17L17 7M8 7h9v9",
  download: "M12 4v11m0 0l-4-4m4 4l4-4M5 20h14",
  ticket: "M3 7v3a2 2 0 0 1 0 4v3h18v-3a2 2 0 0 1 0-4V7zM14 7v10",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",
  mail: "M3 6h18v12H3zM3 7l9 7 9-7",
  trophy: "M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v2a3 3 0 0 0 3 3M16 6h4v2a3 3 0 0 1-3 3M12 13v4M8 21h8M9 17h6",
  users: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M17 11a3 3 0 1 0 0-5M21 20a5 5 0 0 0-4-4.9",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM17.5 6.5h.01",
  youtube: "M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3zM10 9l5 3-5 3z",
  x: "M4 4h4l12 16h-4zM20 4l-6.5 7M4 20l6.5-7",
  tiktok: "M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.4 2.5 2 4 5 4.2",
  facebook: "M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z",
};
function Icon({ name, size = 18 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}

/* ───────────────────────── 3b. FOOTBALL DECOR & PATTERNS ───────────────────────── */
function Ball({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      <circle cx="50" cy="50" r="48" />
      <path d="M50 33l16 12-6 19H40l-6-19z" />
      <path d="M50 33V3M66 45l30-9M60 64l18 26M40 64L22 90M34 45L4 36" />
      <path d="M96 36l-4 14M78 90l-14 6M22 90l14 6M4 36l4 14M50 3l-16 5M50 3l16 5" />
    </svg>
  );
}
function Pitch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1050 680" preserveAspectRatio="xMidYMid slice" className={className} fill="none" stroke="currentColor" strokeWidth={3} aria-hidden="true">
      <rect x="20" y="20" width="1010" height="640" />
      <path d="M525 20v640" />
      <circle cx="525" cy="340" r="91" />
      <circle cx="525" cy="340" r="5" fill="currentColor" />
      <rect x="20" y="138" width="165" height="404" />
      <rect x="20" y="248" width="55" height="184" />
      <rect x="865" y="138" width="165" height="404" />
      <rect x="975" y="248" width="55" height="184" />
    </svg>
  );
}
// Patterns: mowing bands (pitch stripes), dots, diagonal hatching — no checks.
const bands: CSSProperties = { backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 96px, transparent 96px 192px)" };
const dots: CSSProperties = { backgroundImage: "radial-gradient(rgba(183,156,255,0.35) 1.5px, transparent 1.8px)", backgroundSize: "22px 22px" };
const hatch = (c: string, w = 2, gap = 18): CSSProperties => ({ backgroundImage: `repeating-linear-gradient(135deg, ${c} 0 ${w}px, transparent ${w}px ${gap}px)` });

/* ───────────────────────── 4. HOOKS & SMALL PARTS ───────────────────────── */
function useCountdown(iso: string) {
  const [t, setT] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setT(Math.max(0, new Date(iso).getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);
  if (t === null) return ["--", "--", "--", "--"];
  const p = (n: number) => String(n).padStart(2, "0");
  return [p(Math.floor(t / 864e5)), p(Math.floor(t / 36e5) % 24), p(Math.floor(t / 6e4) % 60), p(Math.floor(t / 1e3) % 60)];
}

function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex border border-white/20 text-xs font-bold" role="group" aria-label="Language">
      {(["it", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`h-9 w-10 transition ${lang === l ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/* ───────────────────────── 5. PAGE ───────────────────────── */
export default function Page() {
  const [lang, setLang] = useState<Lang>("it");
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const cd = useCountdown(CLUB.matchDate);
  const t = COPY[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const btnPrimary =
    "inline-flex items-center justify-center gap-2 bg-[var(--accent)] px-6 py-4 text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
  const btnGhost =
    "inline-flex items-center justify-center gap-2 border border-white/25 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
  const matchDay = new Date(CLUB.matchDate).toLocaleDateString(t.locale, { weekday: "long", day: "numeric", month: "long" });

  return (
    <div style={theme} className="min-h-screen bg-[var(--bg)] pb-20 text-white antialiased lg:pb-0 selection:bg-[var(--accent)] selection:text-black">
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--bg)]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#" className="flex items-center gap-3" aria-label={CLUB.name}>
            {/* MEDIA SLOT: club crest (SVG) */}
            <span className="grid h-9 w-9 place-items-center bg-[var(--accent)] text-sm font-black text-black" style={display}>
              {CLUB.short}
            </span>
            <span className="text-xl font-extrabold uppercase leading-none tracking-wide" style={display}>{CLUB.name}</span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {t.nav.map(([l, h]) => (
              <a key={l} href={h} className="text-sm font-medium text-white/70 transition hover:text-white">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <LangSwitch lang={lang} setLang={setLang} />
            <a href="#partners" className="hidden px-2 py-2 text-sm font-semibold text-[var(--gold)] hover:underline lg:block">{t.forSponsors}</a>
            <a href="#match" className={btnPrimary + " hidden !py-2.5 lg:inline-flex"}>
              <Icon name="ticket" size={16} /> {t.buy}
            </a>
            <button className="grid h-11 w-11 place-items-center lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? t.menuClose : t.menuOpen} aria-expanded={open}>
              <Icon name={open ? "close" : "menu"} size={24} />
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-white/10 bg-[var(--bg)] px-4 pb-6 pt-2 lg:hidden">
            {t.nav.map(([l, h]) => (
              <a key={l} href={h} onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 text-2xl font-extrabold uppercase" style={display}>{l}</a>
            ))}
            <div className="mt-5 grid gap-3">
              <a href="#match" onClick={() => setOpen(false)} className={btnPrimary}><Icon name="ticket" size={16} /> {t.buy}</a>
              <a href="#partners" onClick={() => setOpen(false)} className={btnGhost}>{t.forSponsors}</a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ── HERO ── */}
        <section className="relative isolate overflow-hidden">
          {/* MEDIA SLOT: hero background — <video autoPlay muted loop playsInline poster="/hero.jpg"> or next/image fill */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_15%,rgba(124,58,237,0.5),transparent_55%),radial-gradient(ellipse_at_5%_95%,rgba(255,214,10,0.12),transparent_45%),linear-gradient(180deg,#2a1160,var(--bg))]" />
          <div className="absolute inset-0 -z-10" style={bands} />
          <Ball className="pointer-events-none absolute -right-32 top-8 -z-10 h-[30rem] w-[30rem] rotate-12 text-[var(--soft)] opacity-25 md:right-0 md:h-[42rem] md:w-[42rem]" />
          <Ball className="pointer-events-none absolute -left-10 bottom-24 -z-10 hidden h-40 w-40 -rotate-12 text-[var(--accent)] opacity-30 md:block" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
          <div className="mx-auto max-w-7xl px-4 pb-12 pt-14 sm:px-6 md:pb-20 md:pt-24">
            <p className="mb-5 text-sm text-white/60">{t.since} {CLUB.founded} · {CLUB.stadium}</p>
            <h1 className="max-w-5xl text-[3.4rem] font-black uppercase leading-[0.88] tracking-tight sm:text-8xl lg:text-[9rem]" style={display}>
              {t.headline[0]}
              <br />
              <span className="text-white/45">{t.headline[1]}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">{t.lead}</p>
            <div className="mt-8 grid gap-3 sm:flex">
              <a href="#match" className={btnPrimary}><Icon name="ticket" /> {t.ctaTickets}</a>
              <a href="#" className={btnGhost}><Icon name="download" /> {t.ctaApp}</a>
            </div>
            <dl className="mt-12 grid grid-cols-2 border-l border-t border-white/15 md:mt-20 md:grid-cols-4">
              {t.stats.map(([n, l]) => (
                <div key={l} className="flex flex-col-reverse border-b border-r border-white/15 p-4 sm:p-6">
                  <dt className="text-xs text-white/55 sm:text-sm">{l}</dt>
                  <dd className="text-4xl font-black leading-none sm:text-6xl" style={display}>{n}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── NEXT MATCH ── */}
        <section id="match" className="relative isolate scroll-mt-16 overflow-hidden border-y border-white/10 bg-[var(--surface)]">
          <Pitch className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-[var(--soft)] opacity-[0.14]" />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="flex items-center gap-2 text-sm text-white/60">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--pop)]" />
                {t.league}
              </p>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-5 text-4xl font-black uppercase leading-none sm:text-7xl" style={display}>
                <span>{t.home}</span>
                <span className="text-xl text-[var(--pop)] sm:text-3xl">vs</span>
                <span className="text-white/50">{t.away}</span>
              </div>
              <div className="mt-5 flex flex-col gap-2 text-white/70 sm:flex-row sm:gap-6">
                <span className="flex items-center gap-2"><Icon name="calendar" size={16} />{matchDay}, {t.at} {CLUB.matchDate.slice(11, 16)}</span>
                <span className="flex items-center gap-2"><Icon name="pin" size={16} />{CLUB.stadium}</span>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-4 gap-2">
                {t.units.map((u, i) => (
                  <div key={u} className="border border-white/15 py-3 text-center">
                    <div className="text-4xl font-black tabular-nums sm:text-5xl" style={display}>{cd[i]}</div>
                    <div className="text-xs text-white/50">{u}</div>
                  </div>
                ))}
              </div>
              <a href="#" className={btnPrimary + " mt-3 w-full"}>{t.ticketsFrom} <Icon name="arrow" /></a>
              <p className="mt-3 text-center text-sm text-white/50">{t.seasonNote}</p>
            </div>
          </div>
        </section>

        {/* ── MANIFESTO ── */}
        <section id="club" className="relative mx-auto max-w-7xl scroll-mt-16 overflow-hidden px-4 py-16 sm:px-6 md:py-28">
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]" style={dots} />
          <Ball className="pointer-events-none absolute -bottom-10 right-4 h-44 w-44 rotate-6 text-[var(--soft)] opacity-20 md:h-64 md:w-64" />
          <h2 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] sm:text-7xl" style={display}>{t.manifesto}</h2>
          <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-3">
            {t.values.map(([h, d], i) => (
              <article key={h} className="bg-[var(--bg)] py-6 md:p-8 md:first:pl-0">
                <span className="mb-4 grid h-11 w-11 place-items-center border border-[var(--soft)]/40 text-[var(--soft)]"><Icon name={["shield", "users", "trophy"][i]} size={22} /></span>
                <h3 className="text-3xl font-extrabold uppercase text-[var(--pop)]" style={display}>{h}</h3>
                <p className="mt-3 leading-relaxed text-white/65">{d}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── SPONSORS ── */}
        <section id="partners" className="relative scroll-mt-16 bg-[var(--paper)] text-[var(--bg)]">
          <div className="pointer-events-none absolute inset-0" style={hatch("rgba(124,58,237,0.07)")} />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
            <h2 className="text-4xl font-black uppercase leading-none sm:text-6xl" style={display}>{t.partnersTitle}</h2>

            {/* Title sponsor */}
            <div className="mt-10 grid overflow-hidden bg-[var(--bg)] text-white lg:grid-cols-[1.2fr_1fr]">
              <div className="relative overflow-hidden p-6 sm:p-10 md:p-14">
                <div className="absolute inset-x-0 top-0 h-1 bg-[var(--gold)]" />
                <Ball className="pointer-events-none absolute -bottom-16 -right-12 h-64 w-64 rotate-12 text-[var(--soft)] opacity-20" />
                <p className="text-sm font-semibold text-[var(--gold)]">{t.titleSince} {CLUB.titleSponsor.since}</p>
                {/* MEDIA SLOT: title sponsor logo (white SVG) */}
                <div className="my-8 text-5xl font-black tracking-[0.12em] sm:text-8xl" style={display}>{CLUB.titleSponsor.name}</div>
                <p className="max-w-md leading-relaxed text-white/65">{t.titlePitch}</p>
              </div>
              <dl className="grid grid-cols-3 border-t border-white/10 lg:grid-cols-1 lg:border-l lg:border-t-0">
                {t.facts.map(([n, l]) => (
                  <div key={l} className="border-r border-white/10 p-4 last:border-r-0 sm:p-8 lg:flex lg:items-baseline lg:gap-4 lg:border-b lg:border-r-0 lg:last:border-b-0">
                    <dd className="text-3xl font-black text-[var(--gold)] sm:text-5xl" style={display}>{n}</dd>
                    <dt className="text-xs text-white/60 sm:text-sm">{l}</dt>
                  </div>
                ))}
              </dl>
            </div>

            {/* Partner grids */}
            {([[t.premiumLabel, CLUB.premium, true], [t.officialLabel, CLUB.official, false]] as [string, string[], boolean][]).map(([label, list, big]) => (
              <div key={label} className="mt-10">
                <h3 className="mb-3 text-sm font-bold">{label}</h3>
                <ul className="grid grid-cols-2 gap-px bg-black/15 md:grid-cols-4">
                  {list.map((p) => (
                    <li
                      key={p}
                      className={`grid place-items-center bg-[var(--paper)] text-center font-black tracking-[0.14em] text-black/45 transition hover:bg-white hover:text-black ${big ? "h-28 text-xl sm:h-36 sm:text-2xl" : "h-20 text-sm sm:h-24 sm:text-base"}`}
                      style={display}
                    >
                      {/* MEDIA SLOT: monochrome partner logo */}
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Become a partner */}
            <div className="mt-14 grid gap-8 border-t-2 border-[var(--violet)] pt-10 lg:grid-cols-2">
              <div>
                <h3 className="text-4xl font-black uppercase leading-[0.95] sm:text-6xl" style={display}>{t.joinTitle}</h3>
                <dl className="mt-8 grid grid-cols-2 gap-6">
                  {t.reach.map(([n, l]) => (
                    <div key={l} className="flex flex-col-reverse">
                      <dt className="text-sm text-black/60">{l}</dt>
                      <dd className="text-4xl font-black" style={display}>{n}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              {sent ? (
                <div className="grid place-items-center bg-[var(--bg)] p-10 text-center text-white">
                  <p className="text-2xl font-extrabold uppercase" style={display}>{t.sent}</p>
                </div>
              ) : (
                <div className="grid gap-3 bg-[var(--bg)] p-5 text-white sm:p-8">
                  {/* Connect to your API / Server Action: fetch('/api/lead') */}
                  <label className="grid gap-1 text-sm">{t.fCompany}
                    <input className="h-12 border border-white/20 bg-transparent px-3 outline-none focus:border-[var(--gold)]" placeholder={t.fCompanyPh} />
                  </label>
                  <label className="grid gap-1 text-sm">{t.fEmail}
                    <input type="email" className="h-12 border border-white/20 bg-transparent px-3 outline-none focus:border-[var(--gold)]" placeholder="name@company.com" />
                  </label>
                  <label className="grid gap-1 text-sm">{t.fInterest}
                    <select className="h-12 border border-white/20 bg-[var(--bg)] px-3 outline-none focus:border-[var(--gold)]">
                      {t.interests.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </label>
                  <button onClick={() => setSent(true)} className="mt-2 inline-flex items-center justify-center gap-2 bg-[var(--gold)] px-6 py-4 text-sm font-bold uppercase text-black transition hover:brightness-110">
                    {t.join} <Icon name="arrow" />
                  </button>
                  <a href="#" className="text-center text-sm text-white/60 underline underline-offset-4 hover:text-white">{t.mediaKit}</a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── NEWS / MEDIA ── */}
        <section id="news" className="scroll-mt-16 mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-4xl font-black uppercase leading-none sm:text-6xl" style={display}>{t.newsTitle}</h2>
            <a href="#" className="hidden text-sm font-semibold text-[var(--pop)] hover:underline sm:block">{t.allStories}</a>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {t.news.map(([tag, title, meta, date], i) => (
              <a key={i} href="#" className={`group flex flex-col border border-white/10 transition hover:border-white/40 ${i === 0 ? "md:col-span-3 md:grid md:grid-cols-[1.5fr_1fr]" : ""}`}>
                {/* MEDIA SLOT: thumbnail (next/image) */}
                <div className={`relative grid place-items-center bg-gradient-to-br from-[#1b2548] to-[var(--surface)] ${i === 0 ? "aspect-video md:aspect-auto md:min-h-[320px]" : "aspect-video"}`}>
                  {i === 0 && (
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--accent)] text-black transition group-hover:scale-110">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between gap-6 p-5 sm:p-7">
                  <div>
                    <p className="text-sm text-[var(--pop)]">{tag}</p>
                    <h3 className={`mt-2 font-extrabold uppercase leading-[0.98] ${i === 0 ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"}`} style={display}>{title}</h3>
                  </div>
                  <p className="text-sm text-white/50">{date} · {meta}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="relative overflow-hidden bg-[var(--accent)] text-black">
          <div className="pointer-events-none absolute inset-0" style={hatch("rgba(18,8,42,0.12)", 3, 20)} />
          <Ball className="pointer-events-none absolute -right-10 -top-16 h-72 w-72 rotate-12 text-[var(--bg)] opacity-20 md:right-20" />
          <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between md:py-16">
            <p className="max-w-3xl text-4xl font-black uppercase leading-[0.95] sm:text-6xl" style={display}>{t.finalCta}</p>
            <a href="#match" className="inline-flex items-center justify-center gap-2 bg-[var(--bg)] px-8 py-5 text-sm font-bold uppercase text-white transition hover:bg-[var(--surface)]">
              {t.season} <Icon name="arrow" />
            </a>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="relative overflow-hidden border-t border-white/10">
        <Pitch className="pointer-events-none absolute inset-0 h-full w-full text-[var(--soft)] opacity-[0.08]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="text-3xl font-black uppercase" style={display}>{CLUB.name}</p>
            <div className="mt-4 flex gap-2">
              {[["Instagram", "instagram"], ["YouTube", "youtube"], ["X", "x"], ["TikTok", "tiktok"], ["Facebook", "facebook"]].map(([label, ic]) => (
                <a key={label} href="#" aria-label={label} className="grid h-11 w-11 place-items-center border border-white/20 transition hover:border-[var(--pop)] hover:bg-[var(--pop)] hover:text-black">
                  <Icon name={ic} size={20} />
                </a>
              ))}
            </div>
          </div>
          <div className="text-sm">
            <p className="mb-3 flex items-center gap-2 font-bold"><Icon name="mail" size={16} />{t.press}</p>
            <a className="text-white/60 hover:text-white" href={`mailto:${CLUB.contacts.press}`}>{CLUB.contacts.press}</a>
          </div>
          <div className="text-sm">
            <p className="mb-3 flex items-center gap-2 font-bold"><Icon name="mail" size={16} />{t.commercial}</p>
            <a className="text-white/60 hover:text-white" href={`mailto:${CLUB.contacts.commercial}`}>{CLUB.contacts.commercial}</a>
          </div>
          <div className="grid content-start gap-2 text-sm text-white/60">
            <p className="mb-1 font-bold text-white">{t.legal}</p>
            {t.legalLinks.map((l) => <a key={l} href="#" className="hover:text-white">{l}</a>)}
          </div>
        </div>
        <p className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/40">
          © {new Date().getFullYear()} {CLUB.name}. {t.rights}
        </p>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[var(--bg)]/95 p-3 backdrop-blur lg:hidden">
        <a href="#match" className={btnPrimary + " w-full"}><Icon name="ticket" size={16} /> {t.buy}</a>
      </div>
    </div>
  );
}