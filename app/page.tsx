"use client";

/**
 * UNITED MONTEFREDENTE — landing page (IT default, EN toggle)
 * Idea: a small village club in the hills south of Bologna. Calm, light, one big family.
 * The page is a family photo album: polaroids with yellow tape, a long table, hills and football lines.
 * Palette: milk white + soft dusty blue (crest) + a touch of kit yellow.
 * Next.js 14/15 (App Router) + Tailwind CSS. Plain <img> for photos (no image-optimizer dependency).
 *
 * FILES (in /public):
 *   crest.png             (transparent crest — delete any older logo file)
 *   photos/group.jpg      (celebration)
 *   photos/training.jpg   (warm-up)
 *   photos/shirt.jpg      (champions' shirt poster)
 * FONTS (app/layout.tsx, next/font/google): "Young Serif" (display) + "Figtree" (body)
 * Numbers, partner names, opponent and quotes are PLACEHOLDERS — replace with real club data.
 */

import { useEffect, useState, type CSSProperties } from "react";

/* ───────────────────────── 1. BRAND & COLORS ───────────────────────── */
const CLUB = {
  name: "United Montefredente",
  legalName: "A.S.D. United Montefredente",
  short: "UM",
  founded: 2003,
  stadium: "Campo sportivo di Montefredente", // placeholder
  logo: "/crest.png",
  photos: { group: "/photos/group.jpg", training: "/photos/training.jpg", shirt: "/photos/shirt.jpg" },
  // Covers for the news cards (same photos, different crops). Swap for real shots when you have them.
  newsCovers: [
    ["/photos/training.jpg", "object-center"],
    ["/photos/group.jpg", "object-[30%_50%]"],
    ["/photos/group.jpg", "object-[92%_50%]"],
  ],
  instagram: "#", // link to the club's Instagram (shirt orders by DM)
  bg: "#F5F9FD", // milk white with a hint of blue
  surface: "#E7F0F9", // mist
  ink: "#1E2E4D", // text
  blue: "#3F5F9A", // crest blue, softened
  sky: "#A9C6E6", // light blue
  night: "#1F3159", // evening blue for calm dark panels
  night2: "#2B4276",
  gold: "#CFC46A", // thin gold line of the crest
  kit: "#F1D54A", // yellow of the match kit — tape, stickers
  fontDisplay: "'Young Serif',Georgia,'Times New Roman',serif",
  fontBody: "Figtree,system-ui,-apple-system,'Segoe UI',sans-serif",
  matchDate: "2026-10-18T15:00:00",
  mainPartner: { name: "FORNO DEL BORGO", since: 2019 },
  friends: ["MACELLERIA ROSSI", "OFFICINA MONTI", "AGRITURISMO LA QUERCIA", "FARMACIA DEL CORSO"],
  supporters: ["BAR CENTRALE", "ALIMENTARI DA ANNA", "EDILE VALLE", "PIZZERIA I DUE PONTI", "TABACCHI LUPI", "PARRUCCHIERA LUCIA", "FERRAMENTA BIANCHI", "CAMPING PINETA"],
  // Support builder: x/y = position on the pitch (%), reach = people reached per home match, price = € per season
  matches: 14, // home matches per season
  placements: [
    { id: "shirt", x: 36, y: 42, reach: 180, price: 1200 },
    { id: "boards", x: 50, y: 7, reach: 120, price: 400 },
    { id: "third", x: 93, y: 50, reach: 90, price: 500 },
    { id: "kids", x: 72, y: 72, reach: 80, price: 350 },
    { id: "social", x: 50, y: 50, reach: 300, price: 250 },
    { id: "gate", x: 20, y: 93, reach: 140, price: 150 },
  ],
  contacts: { press: "segreteria@club.example", commercial: "amici@club.example" },
};

/* ───────────────────────── 2. COPY (EN is the master shape) ───────────────────────── */
const en = {
  locale: "en-GB",
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  headline: ["Small village.", "Big family."],
  lead: "Since 2003 we have played our Sundays in the hills south of Bologna. On the pitch, on the touchline, at the table afterwards: it is always the same team.",
  nav: [["Fixtures", "#match"], ["The club", "#club"], ["Champions", "#stagione"], ["Family", "#famiglia"], ["Support us", "#partners"]],
  since: "Since",
  buy: "Come on Sunday",
  forSponsors: "Support the club",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  ctaTickets: "Join us this Sunday",
  ctaApp: "Join the family",
  stats: [["2003", "founded"], ["Cat. 1", "our new league"], ["25/26", "the champions’ season"], ["3rd", "half, always at the table"]],
  groupCaption: "Champions, all together",
  stickerA: "Champions",
  stickerB: "25/26",
  league: "Prima Categoria, matchday 12",
  home: "Montefredente",
  away: "Valle Verde",
  at: "at",
  units: ["days", "hrs", "min", "sec"],
  ticketsFrom: "Free entry",
  seasonNote: "After the final whistle comes the third half. There is a seat for you too.",
  manifesto: "We are not just a club. We are one long table.",
  values: [
    ["The village", "Everyone knows everyone by name. Whoever steps onto the pitch does it for the street where they grew up."],
    ["The dragon", "A dragon lives on our crest. It roars very little and watches over a great deal."],
    ["No hurry", "We play, we chat, we stay. Time here is taken in full, never rushed."],
  ],
  stageTitle: "Champions 2025/26. Now, Prima Categoria.",
  stageLead: "A season of Sundays that ended with everyone on the grass, in light-blue shirts, shouting at the hills.",
  trainCaption: "Sunday warm-up, among the trees",
  trainAlt: "The squad warming up on the pitch, surrounded by trees",
  groupAlt: "The squad and staff celebrating the title in light-blue shirts",
  shirtAlt: "Poster of the champions’ shirt, front and back",
  shirtTitle: "The champions’ shirt",
  shirtText: "Limited edition for the whole family: the crest on the front, the whole squad and staff on the back.",
  shirtCta: "Write to us on Instagram",
  familyTitle: "Who sits at our table",
  familyLead: "Players, coaches, grandparents, volunteers, kids. Nobody here is a stranger.",
  family: [
    ["The squad", "Lads from around here who go back to work on Monday and pull on the shirt on Sunday."],
    ["Coaches and staff", "Whoever trains, whoever washes the kit, whoever fills in the team sheet."],
    ["The supporters", "From the wooden bench to the railing: the same faces, the same voices."],
    ["The volunteers", "The grill, the bar, the lines on the pitch. All of it stands on friendly hands."],
    ["The little ones", "Ball in hand, scarf around the neck. The future of the club has scraped knees."],
    ["The third half", "Handshakes, a laid table, a meal together. The opponents are invited too."],
  ],
  partnersTitle: "Friends of the club",
  partnersLead: "Local businesses that believe in us. Their names are on our shirts and their people are at our table.",
  titleSince: "Main partner since",
  titlePitch: "The local business that has walked beside us the longest, on the match kit and at every home Sunday.",
  facts: [["5", "seasons together"], ["14", "home Sundays a season"], ["1", "big family"]],
  premiumLabel: "Friends of the club",
  officialLabel: "Supporters",
  joinTitle: "Come into the family",
  joinLead: "Want to join as a member, lend a hand, or just say hello? Leave your details and we will find you a seat.",
  reach: [["14", "home matches a season"], ["120", "members and friends"], ["20+", "volunteers"], ["1", "long table"]],
  builderTitle: "Lend a hand, your way",
  builderLead: "Each option is a real spot at our ground, marked on the map. Pick what you would like to support and your total updates as you go. Every contribution goes to the pitch, the away trips and the third half.",
  steps: ["Pick what to support", "Check your contribution", "Send your request"],
  placements: [
    ["Shirt front", "Your name on the match shirt, on every photo and every Sunday."],
    ["Pitch-side boards", "Boards along the touchline, seen by everyone who comes to watch."],
    ["The third half", "You host the meal after the match, for both teams."],
    ["Kids’ kit", "Your name on the kit of the youngest players."],
    ["Social and newsletter", "A thank-you in our posts and in the weekly match-day newsletter."],
    ["Gate and noticeboard", "A spot at the entrance and on the club noticeboard."],
  ],
  seenPre: "Seen by about",
  seenPost: "people at every home match",
  perSeason: "per season",
  mapLabel: "Where your name appears at our ground",
  mapHint: "Tap a number on the pitch or pick from the list.",
  add: "Add",
  added: "Added",
  summaryTitle: "Your contribution",
  total: "Total",
  bundle: "Bundle discount",
  bundleHint: "Choose 3 options and save 8%, choose 5 and save 15%.",
  perSundayA: "About",
  perSundayB: "per home Sunday",
  emptyPkg: "Choose at least one option to see your contribution.",
  requestPkg: "Request this package",
  yourPkg: "Your package",
  disclaimer: "Illustrative figures. Replace them with the club’s real ones.",
  sent: "Thank you! We will reply within a couple of days. Meanwhile, there is a seat for you on Sunday.",
  fName: "Name", fNamePh: "First and last name",
  fEmail: "Email",
  fInterest: "What would you like to do?",
  interests: ["Become a member", "Volunteer", "Support as a local business", "Ask for more information"],
  join: "Send",
  mediaKit: "Download the club presentation (PDF)",
  newsTitle: "From the club",
  allStories: "All news",
  news: [
    ["Interview", "The captain: “We play for the people at the railing”", "12:40 video", "14 Oct"],
    ["Family", "Sunday’s third half: lasagne and tortellini for everyone", "3 min read", "13 Oct"],
    ["Little ones", "The youngest walk out with the team: photos and smiles", "4 min read", "11 Oct"],
  ],
  finalCta: "Your seat at the table is already set",
  season: "Become a member",
  press: "Secretary’s office",
  commercial: "Friends and supporters",
  legal: "Legal",
  legalLinks: ["Privacy policy", "Membership terms", "Ground rules"],
  rights: "All rights reserved.",
};

const it: typeof en = {
  locale: "it-IT",
  days: ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"],
  months: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
  headline: ["Piccolo paese.", "Grande famiglia."],
  lead: "Dal 2003 giochiamo le nostre domeniche sulle colline a sud di Bologna. In campo, a bordo campo, a tavola dopo la partita: siamo sempre la stessa squadra.",
  nav: [["Partite", "#match"], ["Il club", "#club"], ["I campioni", "#stagione"], ["La famiglia", "#famiglia"], ["Sostienici", "#partners"]],
  since: "Dal",
  buy: "Vieni domenica",
  forSponsors: "Sostieni il club",
  menuOpen: "Apri il menu",
  menuClose: "Chiudi il menu",
  ctaTickets: "Vieni a trovarci domenica",
  ctaApp: "Entra in famiglia",
  stats: [["2003", "fondazione"], ["Cat. 1", "il nostro nuovo campionato"], ["25/26", "la stagione dei campioni"], ["3°", "tempo, sempre a tavola"]],
  groupCaption: "Campioni, tutti insieme",
  stickerA: "Campioni",
  stickerB: "25/26",
  league: "Prima Categoria, 12ª giornata",
  home: "Montefredente",
  away: "Valle Verde",
  at: "ore",
  units: ["giorni", "ore", "min", "sec"],
  ticketsFrom: "Ingresso libero",
  seasonNote: "Dopo il fischio finale c’è il terzo tempo. Un posto c’è anche per te.",
  manifesto: "Non siamo solo una società. Siamo una lunga tavolata.",
  values: [
    ["Il paese", "Ci si conosce tutti per nome. Chi scende in campo lo fa per la strada dove è cresciuto."],
    ["Il drago", "Sullo stemma vive un drago. Ruggisce pochissimo e veglia su moltissimo."],
    ["Senza fretta", "Si gioca, si chiacchiera, si resta. Qui il tempo si prende tutto intero."],
  ],
  stageTitle: "Campioni 2025/26. Adesso, Prima Categoria.",
  stageLead: "Una stagione di domeniche finita con tutti sull’erba, in maglia azzurra, a gridare verso le colline.",
  trainCaption: "Il riscaldamento della domenica, tra gli alberi",
  trainAlt: "La squadra che si riscalda in campo, circondata dagli alberi",
  groupAlt: "Squadra e staff che festeggiano il titolo in maglia azzurra",
  shirtAlt: "Locandina della maglia dei campioni, fronte e retro",
  shirtTitle: "La maglia dei campioni",
  shirtText: "Edizione limitata per tutta la famiglia: lo stemma davanti, la rosa e lo staff dietro.",
  shirtCta: "Scrivici su Instagram",
  familyTitle: "Chi siede alla nostra tavola",
  familyLead: "Giocatori, mister, nonni, volontari, bambini. Qui nessuno è un estraneo.",
  family: [
    ["La squadra", "Ragazzi del posto che il lunedì tornano al lavoro e la domenica indossano la maglia."],
    ["Mister e staff", "Chi allena, chi lava le divise, chi compila la distinta."],
    ["I tifosi", "Dalla panchina di legno alla ringhiera: sempre le stesse facce, sempre le stesse voci."],
    ["I volontari", "La griglia, il bar, le righe del campo. Tutto si regge su mani amiche."],
    ["I più piccoli", "Pallone in mano, sciarpa al collo. Il futuro del club ha le ginocchia sbucciate."],
    ["Il terzo tempo", "Una stretta di mano, la tavola apparecchiata, un pasto insieme. Gli avversari sono invitati."],
  ],
  partnersTitle: "Gli amici del club",
  partnersLead: "Attività del territorio che credono in noi. Il loro nome è sulle nostre maglie e la loro gente è alla nostra tavola.",
  titleSince: "Main partner dal",
  titlePitch: "L’attività del paese che ci accompagna da più stagioni, sulla divisa e in ogni domenica in casa.",
  facts: [["5", "stagioni insieme"], ["14", "domeniche in casa a stagione"], ["1", "grande famiglia"]],
  premiumLabel: "Amici del club",
  officialLabel: "Sostenitori",
  joinTitle: "Entra in famiglia",
  joinLead: "Vuoi iscriverti come socio, dare una mano o solo salutarci? Lascia i tuoi dati e ti troviamo un posto.",
  reach: [["14", "partite in casa a stagione"], ["120", "soci e amici"], ["20+", "volontari"], ["1", "lunga tavolata"]],
  builderTitle: "Dai una mano, a modo tuo",
  builderLead: "Ogni opzione è un punto reale del nostro campo, segnato sulla mappa. Scegli cosa vuoi sostenere e il totale si aggiorna subito. Ogni contributo va al campo, alle trasferte e al terzo tempo.",
  steps: ["Scegli cosa sostenere", "Controlla il contributo", "Invia la richiesta"],
  placements: [
    ["Fronte maglia", "Il tuo nome sulla maglia da gara, in ogni foto e in ogni domenica."],
    ["Cartelloni a bordo campo", "Cartelloni lungo la linea laterale, visti da tutti quelli che vengono a vederci."],
    ["Il terzo tempo", "Offri il pasto dopo la partita, per entrambe le squadre."],
    ["Divisa dei più piccoli", "Il tuo nome sulla divisa dei giocatori più giovani."],
    ["Social e newsletter", "Un grazie nei nostri post e nella newsletter settimanale di giornata."],
    ["Ingresso e bacheca", "Un posto all’ingresso e sulla bacheca del club."],
  ],
  seenPre: "Visto da circa",
  seenPost: "persone a ogni partita in casa",
  perSeason: "a stagione",
  mapLabel: "Dove compare il tuo nome al nostro campo",
  mapHint: "Tocca un numero sul campo o scegli dalla lista.",
  add: "Aggiungi",
  added: "Aggiunto",
  summaryTitle: "Il tuo contributo",
  total: "Totale",
  bundle: "Sconto pacchetto",
  bundleHint: "Scegli 3 opzioni e risparmi l’8%, scegline 5 e risparmi il 15%.",
  perSundayA: "Circa",
  perSundayB: "a ogni domenica in casa",
  emptyPkg: "Scegli almeno un’opzione per vedere il tuo contributo.",
  requestPkg: "Richiedi questo pacchetto",
  yourPkg: "Il tuo pacchetto",
  disclaimer: "Cifre illustrative. Sostituiscile con quelle reali del club.",
  sent: "Grazie! Ti risponderemo entro un paio di giorni. Intanto, domenica c’è un posto per te.",
  fName: "Nome", fNamePh: "Nome e cognome",
  fEmail: "Email",
  fInterest: "Cosa ti piacerebbe fare?",
  interests: ["Diventare socio", "Fare il volontario", "Sostenere come attività locale", "Chiedere maggiori informazioni"],
  join: "Invia",
  mediaKit: "Scarica la presentazione del club (PDF)",
  newsTitle: "Dal club",
  allStories: "Tutte le notizie",
  news: [
    ["Intervista", "Il capitano: «Giochiamo per quelli che stanno alla ringhiera»", "12:40 video", "14 ott"],
    ["Famiglia", "Il terzo tempo di domenica: lasagne e tortellini per tutti", "3 min di lettura", "13 ott"],
    ["I più piccoli", "I più giovani entrano in campo con la squadra: foto e sorrisi", "4 min di lettura", "11 ott"],
  ],
  finalCta: "Il tuo posto a tavola è già apparecchiato",
  season: "Diventa socio",
  press: "Segreteria",
  commercial: "Amici e sostenitori",
  legal: "Informazioni legali",
  legalLinks: ["Informativa privacy", "Condizioni di tesseramento", "Regolamento del campo"],
  rights: "Tutti i diritti riservati.",
};
const COPY = { it, en };
type Lang = keyof typeof COPY;

const theme = {
  "--bg": CLUB.bg, "--surface": CLUB.surface, "--ink": CLUB.ink,
  "--ink2": "rgba(30,46,77,0.76)", "--ink3": "rgba(30,46,77,0.62)", "--line": "rgba(30,46,77,0.14)",
  "--glass": "rgba(245,249,253,0.92)",
  "--blue": CLUB.blue, "--sky": CLUB.sky, "--night": CLUB.night, "--night2": CLUB.night2, "--gold": CLUB.gold, "--kit": CLUB.kit,
  "--on": "#FFFFFF", "--on2": "rgba(255,255,255,0.78)", "--on3": "rgba(255,255,255,0.62)", "--lineOn": "rgba(255,255,255,0.18)",
  fontFamily: CLUB.fontBody,
} as CSSProperties;
const display: CSSProperties = { fontFamily: CLUB.fontDisplay, fontWeight: 400 };

/* ───────────────────────── 3. ICONS (inline SVG) ───────────────────────── */
const PATHS: Record<string, string> = {
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M6 6l12 12M18 6L6 18",
  download: "M12 4v11m0 0l-4-4m4 4l4-4M5 20h14",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",
  mail: "M3 6h18v12H3zM3 7l9 7 9-7",
  users: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M17 11a3 3 0 1 0 0-5M21 20a5 5 0 0 0-4-4.9",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  home: "M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6",
  heart: "M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z",
  bowl: "M4 11h16a8 8 0 0 1-16 0zM8 4c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3M16 4c0 1.5 1 1.5 1 3",
  sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19",
  smile: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8.5 14a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01",
  clipboard: "M9 4h6v3H9zM6 5h3M15 5h3v16H6V5zM9 12h6M9 16h4",
  instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM17.5 6.5h.01",
  youtube: "M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3zM10 9l5 3-5 3z",
  x: "M4 4h4l12 16h-4zM20 4l-6.5 7M4 20l6.5-7",
  tiktok: "M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.4 2.5 2 4 5 4.2",
  facebook: "M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z",
};
function Icon({ name, size = 18 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
// Corner of the pitch: touchline, goal line, corner arc and flag. Drawn for the bottom-left corner; rotate/flip with classes.
function Corner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-hidden="true">
      <path d="M10 150H160M10 150V10" />
      <path d="M10 90A60 60 0 0 1 70 150" />
      <path d="M22 150V92" />
      <path d="M22 92l28 9-28 9z" fill="currentColor" />
    </svg>
  );
}
// A dotted pass through the air that ends in a ball
function Trajectory({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 200" className={className} fill="none" aria-hidden="true">
      <path d="M10 190C150 40 330 20 570 126" stroke="currentColor" strokeWidth="2.5" strokeDasharray="2 10" strokeLinecap="round" />
      <g stroke="currentColor" strokeWidth="2.5">
        <circle cx="584" cy="132" r="16" fill="#F5F9FD" />
        <path d="M584 123l8 6-3 9h-10l-3-9z" fill="currentColor" />
      </g>
    </svg>
  );
}
// Red cross on white from the crest
function Cross({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <rect x="0.5" y="0.5" width="15" height="15" rx="2" fill="#fff" stroke="rgba(30,46,77,0.25)" />
      <path d="M8 2.5v11M2.5 8h11" stroke="#C8322B" strokeWidth="2.6" />
    </svg>
  );
}
// Green–white–red thread, as at the base of the crest
function Tricolore({ className = "" }: { className?: string }) {
  return (
    <span className={`flex h-1 ${className}`} aria-hidden="true">
      <i className="flex-1 bg-[#3C8D5F]" />
      <i className="flex-1 bg-white" />
      <i className="flex-1 bg-[#C8322B]" />
    </span>
  );
}
function Hills({ className = "", variant = 0 }: { className?: string; variant?: 0 | 1 }) {
  const d = variant === 0
    ? "M0 150C140 90 280 100 420 140s300 80 470 20 340-60 550 10V240H0z"
    : "M0 190C200 130 360 150 560 190s380 20 520-30 260-20 360 10V240H0z";
  return (
    <svg viewBox="0 0 1440 240" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d={d} fill="currentColor" />
    </svg>
  );
}
// Patterns
const scales = (hex: string, o = 0.1): CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24'%3E%3Cpath d='M0 12a16 12 0 0 1 32 0M-16 24a16 12 0 0 1 32 0M16 24a16 12 0 0 1 32 0' fill='none' stroke='%23${hex}' stroke-opacity='${o}' stroke-width='1.5'/%3E%3C/svg%3E")`,
});
const balls = (hex: string, o = 0.12): CSSProperties => ({
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='84' height='84'%3E%3Cg fill='none' stroke='%23${hex}' stroke-opacity='${o}' stroke-width='1.4' stroke-linejoin='round'%3E%3Ccircle cx='42' cy='42' r='15'/%3E%3Cpath d='M42 34l8 6-3 9h-10l-3-9z'/%3E%3C/g%3E%3C/svg%3E")`,
});
const bands = (rgb: string, a: number): CSSProperties => ({
  backgroundImage: `repeating-linear-gradient(90deg, rgba(${rgb},${a}) 0 96px, transparent 96px 192px)`,
});
// Goal net: diamond mesh
const net = (rgb: string, a: number): CSSProperties => ({
  backgroundImage: `repeating-linear-gradient(45deg, rgba(${rgb},${a}) 0 1px, transparent 1px 14px), repeating-linear-gradient(-45deg, rgba(${rgb},${a}) 0 1px, transparent 1px 14px)`,
});

// A photo as a polaroid pinned with yellow tape — the page reads as the family album
function Polaroid({
  src, alt, caption, ratio = "aspect-[4/3]", className = "", sizes, priority = false,
}: { src: string; alt: string; caption: string; ratio?: string; className?: string; sizes: string; priority?: boolean }) {
  return (
    <figure className={`relative bg-white p-2.5 pb-3 shadow-[0_22px_36px_-20px_rgba(31,49,89,0.6)] sm:p-3 ${className}`}>
      <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2" style={{ background: "rgba(241,213,74,0.82)" }} />
      <div className={`relative w-full overflow-hidden bg-[var(--surface)] ${ratio}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} sizes={sizes} loading={priority ? "eager" : "lazy"} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <figcaption className="px-1 pt-3 text-center text-base text-[var(--ink2)]" style={display}>{caption}</figcaption>
    </figure>
  );
}

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
    <div className="flex overflow-hidden rounded-full border border-[var(--line)] text-xs font-semibold" role="group" aria-label="Language">
      {(["it", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`h-9 w-10 transition ${lang === l ? "bg-[var(--ink)] text-white" : "text-[var(--ink3)] hover:text-[var(--ink)]"}`}
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
  const [picked, setPicked] = useState<string[]>(["shirt", "boards"]);
  const [active, setActive] = useState("shirt");
  const toggle = (id: string) => {
    setActive(id);
    setPicked((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  };
  const idx = (id: string) => CLUB.placements.findIndex((x) => x.id === id);
  const sel = CLUB.placements.filter((x) => picked.includes(x.id));
  const disc = sel.length >= 5 ? 0.15 : sel.length >= 3 ? 0.08 : 0;
  const base = sel.reduce((a, x) => a + x.price, 0);
  const cost = base * (1 - disc);
  const saved = base - cost;
  const perMatch = cost / CLUB.matches;
  // Deterministic formatting (no Intl/ICU) so server and client render identical text
  const isIt = lang === "it";
  const group = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, isIt ? "." : ",");
  const nf = { format: (n: number) => group(n) };
  const eur = { format: (n: number) => (isIt ? `${group(n)} €` : `€${group(n)}`) };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]";
  const btnPrimary = `inline-flex items-center justify-center gap-2 rounded-full bg-[var(--blue)] px-7 py-3.5 text-sm font-semibold text-white transition hover:brightness-110 ${focus}`;
  const btnGhost = `inline-flex items-center justify-center gap-2 rounded-full border border-[var(--blue)] px-7 py-3.5 text-sm font-semibold text-[var(--blue)] transition hover:bg-[var(--blue)] hover:text-white ${focus}`;
  const btnLight = `inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[var(--night)] transition hover:bg-[var(--sky)] ${focus}`;
  const md = new Date(CLUB.matchDate);
  const matchDay = `${t.days[md.getDay()]} ${md.getDate()} ${t.months[md.getMonth()]}`;

  return (
    <div style={theme} className="min-h-screen overflow-x-clip bg-[var(--bg)] pb-20 text-[var(--ink)] antialiased xl:pb-0 selection:bg-[var(--sky)] selection:text-[var(--ink)]">
      {/* One slow, quiet motion: clouds drifting over the hills */}
      <style>{`
        @keyframes drift { from { transform: translateX(-30vw); } to { transform: translateX(130vw); } }
        .drift { animation: drift 120s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .drift { animation: none; } }
      `}</style>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--glass)] backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#" className="flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label={CLUB.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={CLUB.logo} alt="" width={34} height={48} className="h-9 w-auto shrink-0 sm:h-10" />
            <span className="truncate text-base leading-none sm:text-xl" style={display}>{CLUB.name}</span>
          </a>
          <nav className="hidden items-center gap-7 xl:flex" aria-label="Main">
            {t.nav.map(([l, h]) => (
              <a key={l} href={h} className="text-sm font-medium text-[var(--ink2)] transition hover:text-[var(--ink)]">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <LangSwitch lang={lang} setLang={setLang} />
            <a href="#match" className={btnPrimary + " hidden !py-2.5 xl:inline-flex"}>
              <Icon name="calendar" size={16} /> {t.buy}
            </a>
            <button className="grid h-11 w-11 shrink-0 place-items-center xl:hidden" onClick={() => setOpen(!open)} aria-label={open ? t.menuClose : t.menuOpen} aria-expanded={open}>
              <Icon name={open ? "close" : "menu"} size={24} />
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-[var(--line)] bg-[var(--bg)] px-4 pb-6 pt-2 xl:hidden">
            {t.nav.map(([l, h]) => (
              <a key={l} href={h} onClick={() => setOpen(false)} className="block border-b border-[var(--line)] py-4 text-2xl" style={display}>{l}</a>
            ))}
            <div className="mt-5 grid gap-3">
              <a href="#match" onClick={() => setOpen(false)} className={btnPrimary}><Icon name="calendar" size={16} /> {t.buy}</a>
              <a href="#partners" onClick={() => setOpen(false)} className={btnGhost}>{t.forSponsors}</a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ── HERO ── */}
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#D7E6F5_0%,#EDF4FB_55%,var(--bg)_100%)]" />
          {/* mowing bands + scales fade out downwards */}
          <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,black,transparent_85%)]" style={bands("63,95,154", 0.07)} />
          <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,black,transparent_60%)]" style={scales("3F5F9A", 0.07)} />
          <div className="absolute right-[10%] top-14 -z-10 h-44 w-44 rounded-full bg-[var(--gold)] opacity-30 blur-2xl" />
          <div className="drift absolute left-0 top-28 -z-10 h-8 w-44 rounded-full bg-white opacity-80 blur-md" />
          <div className="drift absolute left-0 top-52 -z-10 h-6 w-32 rounded-full bg-white opacity-60 blur-md [animation-delay:-60s]" />
          <Trajectory className="pointer-events-none absolute bottom-20 left-0 -z-10 hidden h-44 w-[44rem] text-[var(--blue)] opacity-40 lg:block" />
          <Hills variant={1} className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-44 w-full text-[var(--sky)] opacity-50 md:h-56" />
          <Hills variant={0} className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 w-full text-[var(--bg)] md:h-44" />

          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 md:pb-28 md:pt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
            <div>
              <p className="mb-5 flex items-center gap-2 text-sm text-[var(--ink2)]">
                <Cross size={16} /> {t.since} {CLUB.founded}, {CLUB.stadium}
              </p>
              <h1 className="max-w-3xl text-[clamp(2.1rem,9.5vw,3.4rem)] leading-[1] tracking-tight sm:text-7xl lg:text-[5.5rem]" style={display}>
                {t.headline[0]}
                <br />
                <span className="ml-[0.4em] sm:ml-[0.7em]">{t.headline[1]}</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-[var(--ink2)] sm:text-lg">{t.lead}</p>
              <div className="mt-8 grid gap-3 sm:flex">
                <a href="#match" className={btnPrimary}><Icon name="calendar" /> {t.ctaTickets}</a>
                <a href="#lead" className={btnGhost}><Icon name="heart" /> {t.ctaApp}</a>
              </div>
              <dl className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--line)] pt-5 md:mt-16">
                {t.stats.map(([n, l]) => (
                  <div key={l} className="flex flex-row-reverse items-baseline justify-end gap-2">
                    <dt className="text-sm text-[var(--ink2)]">{l}</dt>
                    <dd className="text-2xl" style={display}>{n}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* The family album: the champions' photo, the crest, a yellow sticker */}
            <div className="relative mx-auto w-full max-w-xl pt-6 lg:mx-0">
              <Ball className="pointer-events-none absolute -right-20 -top-20 -z-10 h-80 w-80 rotate-12 text-[var(--blue)] opacity-[0.13]" />
              <Polaroid
                src={CLUB.photos.group}
                alt={t.groupAlt}
                caption={t.groupCaption}
                className="rotate-2"
                sizes="(min-width: 1024px) 42vw, 92vw"
                priority
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLUB.logo} alt={CLUB.name} width={84} height={120} className="absolute -left-3 -top-8 h-28 w-auto -rotate-6 drop-shadow-[0_10px_14px_rgba(31,49,89,0.3)] sm:-left-8 sm:h-32" />
              <div className="absolute -bottom-7 right-1 grid h-24 w-24 rotate-6 place-items-center rounded-full bg-[var(--kit)] text-center leading-none text-[var(--ink)] shadow-[0_10px_20px_-10px_rgba(31,49,89,0.6)] sm:-right-4 sm:h-28 sm:w-28" style={display}>
                <span>
                  <span className="block text-base sm:text-lg">{t.stickerA}</span>
                  <span className="mt-1 block text-2xl sm:text-3xl">{t.stickerB}</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── NEXT MATCH ── */}
        <section id="match" className="relative isolate scroll-mt-16 overflow-hidden bg-[var(--surface)]">
          <Pitch className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-[var(--blue)] opacity-[0.12]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2 [mask-image:linear-gradient(90deg,transparent,black)]" style={net("63,95,154", 0.2)} />
          <Corner className="pointer-events-none absolute bottom-0 left-0 -z-10 h-40 w-40 text-[var(--blue)] opacity-30" />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-sm text-[var(--ink2)]">{t.league}</p>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-5 text-4xl leading-none sm:text-6xl" style={display}>
                <span>{t.home}</span>
                <span className="rounded-full bg-[var(--kit)] px-3 py-1 text-xl sm:text-2xl">vs</span>
                <span className="text-[var(--ink3)]">{t.away}</span>
              </div>
              <div className="mt-5 flex flex-col gap-2 text-[var(--ink2)] sm:flex-row sm:gap-6">
                <span className="flex items-center gap-2"><Icon name="calendar" size={16} />{matchDay}, {t.at} {CLUB.matchDate.slice(11, 16)}</span>
                <span className="flex items-center gap-2"><Icon name="pin" size={16} />{CLUB.stadium}</span>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-4 gap-2">
                {t.units.map((u, i) => (
                  <div key={u} className="rounded-xl bg-white py-3 text-center shadow-[0_1px_0_var(--line)]">
                    <div className="text-4xl tabular-nums sm:text-5xl" style={display}>{cd[i]}</div>
                    <div className="text-xs text-[var(--ink3)]">{u}</div>
                  </div>
                ))}
              </div>
              <a href="#" className={btnPrimary + " mt-3 w-full"}>{t.ticketsFrom}</a>
              <p className="mt-3 text-center text-sm text-[var(--ink2)]">{t.seasonNote}</p>
            </div>
          </div>
        </section>

        {/* ── MANIFESTO ── */}
        <section id="club" className="relative isolate mx-auto max-w-7xl scroll-mt-16 overflow-hidden px-4 py-16 sm:px-6 md:py-28">
          <div className="pointer-events-none absolute right-0 top-0 -z-10 h-80 w-80 [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]" style={scales("3F5F9A", 0.16)} />
          <Ball className="pointer-events-none absolute -bottom-10 -right-6 -z-10 h-56 w-56 rotate-6 text-[var(--blue)] opacity-[0.12] md:h-72 md:w-72" />
          <h2 className="relative max-w-4xl text-4xl leading-[1.05] sm:text-6xl" style={display}>{t.manifesto}</h2>
          <div className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
            {t.values.map(([h, d], i) => (
              <article key={h} className={i === 1 ? "md:mt-10" : i === 2 ? "md:mt-20" : ""}>
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-[var(--surface)] text-[var(--blue)]"><Icon name={["home", "shield", "sun"][i]} size={22} /></span>
                <h3 className="text-2xl text-[var(--blue)]" style={display}>{h}</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-[var(--ink2)]">{d}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── CHAMPIONS 2025/26 ── */}
        <section id="stagione" className="relative isolate scroll-mt-16 overflow-hidden bg-[var(--surface)]">
          <div className="absolute inset-0 -z-10" style={bands("63,95,154", 0.05)} />
          <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,black,transparent_70%)]" style={balls("3F5F9A", 0.14)} />
          <Corner className="pointer-events-none absolute right-0 top-0 -z-10 h-44 w-44 rotate-180 text-[var(--blue)] opacity-30" />
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
            <h2 className="max-w-3xl text-4xl leading-[1.05] sm:text-6xl" style={display}>{t.stageTitle}</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--ink2)]">{t.stageLead}</p>
            <div className="mt-16 grid items-start gap-14 md:grid-cols-[1.25fr_1fr] md:gap-10">
              <Polaroid
                src={CLUB.photos.training}
                alt={t.trainAlt}
                caption={t.trainCaption}
                ratio="aspect-square"
                className="-rotate-2"
                sizes="(min-width: 768px) 55vw, 92vw"
              />
              <div className="relative md:mt-10">
                <div className="relative rotate-1 overflow-hidden rounded-xl bg-white p-2 shadow-[0_22px_36px_-20px_rgba(31,49,89,0.6)]">
                  <span aria-hidden="true" className="absolute -top-0 left-1/2 z-10 h-6 w-24 -translate-x-1/2 -rotate-2" style={{ background: "rgba(241,213,74,0.82)" }} />
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={CLUB.photos.shirt} alt={t.shirtAlt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                </div>
                <h3 className="mt-8 text-2xl" style={display}>{t.shirtTitle}</h3>
                <p className="mt-2 max-w-sm leading-relaxed text-[var(--ink2)]">{t.shirtText}</p>
                <a href={CLUB.instagram} className={btnPrimary + " mt-5"}><Icon name="instagram" size={18} /> {t.shirtCta}</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAMILY: THE LONG TABLE ── */}
        <section id="famiglia" className="relative isolate scroll-mt-16 overflow-hidden bg-[var(--night)] text-[var(--on)]">
          <div className="absolute inset-0 -z-10" style={scales("FFFFFF", 0.07)} />
          <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-2/3 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" style={net("255,255,255", 0.12)} />
          <Ball className="pointer-events-none absolute -bottom-16 -left-10 -z-10 h-72 w-72 -rotate-12 text-white opacity-[0.07]" />
          <Hills variant={0} className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 w-full rotate-180 text-[var(--surface)]" />
          <div className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 md:pb-28 md:pt-32">
            <h2 className="max-w-3xl text-4xl leading-[1.05] sm:text-6xl" style={display}>{t.familyTitle}</h2>
            <p className="mt-4 max-w-xl text-lg text-[var(--on2)]">{t.familyLead}</p>
            {/* The table: plates are the people who sit around it */}
            <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
              {t.family.map(([h, d], i) => {
                const last = i === t.family.length - 1;
                return (
                  <article key={h} className={`text-center ${i % 2 ? "lg:mt-10" : ""}`}>
                    <div
                      className={`mx-auto grid h-28 w-28 place-items-center rounded-full sm:h-32 sm:w-32 ${last ? "bg-[var(--kit)] text-[var(--night)]" : "bg-white text-[var(--blue)]"}`}
                      style={{ boxShadow: last ? "inset 0 0 0 7px rgba(255,255,255,0.35), 0 14px 24px -14px rgba(0,0,0,0.6)" : "inset 0 0 0 7px #E7F0F9, inset 0 0 0 8px rgba(30,46,77,0.14), 0 14px 24px -14px rgba(0,0,0,0.6)" }}
                    >
                      <Icon name={["users", "clipboard", "heart", "home", "smile", "bowl"][i]} size={34} />
                    </div>
                    <h3 className="mt-5 text-xl" style={display}>{h}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--on2)]">{d}</p>
                  </article>
                );
              })}
            </div>
          </div>
          <Tricolore className="w-full" />
        </section>

        {/* ── FRIENDS OF THE CLUB / SUPPORT ── */}
        <section id="partners" className="relative isolate scroll-mt-16 overflow-hidden bg-[var(--surface)]">
          <div className="pointer-events-none absolute inset-0 -z-10" style={scales("3F5F9A", 0.07)} />
          <Pitch className="pointer-events-none absolute -left-1/4 top-1/3 -z-10 h-[40rem] w-[60rem] rotate-6 text-[var(--blue)] opacity-[0.07]" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
            <h2 className="text-4xl leading-none sm:text-6xl" style={display}>{t.partnersTitle}</h2>
            <p className="mt-4 max-w-2xl text-[var(--ink2)]">{t.partnersLead}</p>

            {/* Main partner */}
            <div className="mt-10 grid overflow-hidden rounded-2xl bg-[var(--night)] text-[var(--on)] lg:grid-cols-[1.2fr_1fr]">
              <div className="relative overflow-hidden p-6 sm:p-10 md:p-14">
                <div className="absolute inset-x-0 top-0 h-1 bg-[var(--gold)]" />
                <Ball className="pointer-events-none absolute -bottom-16 -right-10 h-60 w-60 rotate-12 text-white opacity-[0.07]" />
                <p className="relative text-sm font-semibold text-[var(--gold)]">{t.titleSince} {CLUB.mainPartner.since}</p>
                {/* MEDIA SLOT: main partner logo (white SVG) */}
                <div className="relative my-8 text-4xl tracking-[0.08em] sm:text-6xl" style={display}>{CLUB.mainPartner.name}</div>
                <p className="relative max-w-md leading-relaxed text-[var(--on2)]">{t.titlePitch}</p>
              </div>
              <dl className="grid grid-cols-3 border-t border-[var(--lineOn)] lg:grid-cols-1 lg:border-l lg:border-t-0">
                {t.facts.map(([n, l]) => (
                  <div key={l} className="border-r border-[var(--lineOn)] p-4 last:border-r-0 sm:p-8 lg:flex lg:items-baseline lg:gap-4 lg:border-b lg:border-r-0 lg:last:border-b-0">
                    <dd className="text-3xl text-[var(--gold)] sm:text-4xl" style={display}>{n}</dd>
                    <dt className="text-xs text-[var(--on2)] sm:text-sm">{l}</dt>
                  </div>
                ))}
              </dl>
            </div>

            {/* Partner grids */}
            {([[t.premiumLabel, CLUB.friends, true], [t.officialLabel, CLUB.supporters, false]] as [string, string[], boolean][]).map(([label, list, big]) => (
              <div key={label} className="mt-10">
                <h3 className="mb-3 text-lg" style={display}>{label}</h3>
                <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[var(--line)] md:grid-cols-4">
                  {list.map((p) => (
                    <li
                      key={p}
                      className={`grid place-items-center bg-[var(--bg)] px-2 text-center tracking-[0.08em] text-[var(--ink3)] transition hover:bg-white hover:text-[var(--ink)] ${big ? "h-28 text-lg sm:h-32 sm:text-xl" : "h-20 text-sm sm:h-24 sm:text-base"}`}
                      style={display}
                    >
                      {/* MEDIA SLOT: monochrome partner logo */}
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Support builder: a map of real spots + a plain list + a receipt */}
            <div className="mt-16">
              <h3 className="text-4xl leading-[1.05] sm:text-5xl" style={display}>{t.builderTitle}</h3>
              <p className="mt-3 max-w-2xl text-[var(--ink2)]">{t.builderLead}</p>
              <ol className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--ink2)]">
                {t.steps.map((st, i) => (
                  <li key={st} className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--blue)] text-xs font-bold text-white">{i + 1}</span>
                    {st}
                  </li>
                ))}
              </ol>

              <div className="mt-8 grid gap-8 rounded-2xl bg-[var(--night)] p-4 text-[var(--on)] sm:p-6 lg:grid-cols-[1fr_1.05fr] lg:gap-x-8">
                {/* Map of the ground */}
                <div className="lg:col-start-1 lg:row-start-1">
                  <p className="mb-3 text-sm text-[var(--on2)]">{t.mapLabel}</p>
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-[var(--night2)]" style={bands("255,255,255", 0.05)}>
                    <Pitch className="absolute inset-0 h-full w-full text-[var(--sky)] opacity-50" />
                    {CLUB.placements.map((p, i) => {
                      const on = picked.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          onClick={() => toggle(p.id)}
                          onMouseEnter={() => setActive(p.id)}
                          aria-pressed={on}
                          aria-label={t.placements[i][0]}
                          style={{ left: `${p.x}%`, top: `${p.y}%` }}
                          className="group absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                        >
                          {on && <span className="absolute h-8 w-8 animate-ping rounded-full bg-white/40" />}
                          <span className={`relative grid h-7 w-7 place-items-center rounded-full border-2 text-sm font-bold transition ${on ? "border-white bg-white text-[var(--night)]" : "border-[var(--sky)] bg-[var(--night)] text-white group-hover:border-white"} ${active === p.id ? "scale-125" : ""}`}>
                            {on ? "✓" : i + 1}
                          </span>
                          {active === p.id && (
                            <span className={`pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--night)] shadow ${p.x > 60 ? "right-full mr-1" : "left-full ml-1"}`}>
                              {t.placements[i][0]}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-xs text-[var(--on3)]">{t.mapHint}</p>
                </div>

                {/* Options */}
                <ul className="grid gap-3 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                  {CLUB.placements.map((p, i) => {
                    const on = picked.includes(p.id);
                    return (
                      <li key={p.id}>
                        <button
                          onClick={() => toggle(p.id)}
                          onMouseEnter={() => setActive(p.id)}
                          onFocus={() => setActive(p.id)}
                          aria-pressed={on}
                          className={`grid w-full grid-cols-[2rem_1fr] gap-x-4 gap-y-3 rounded-xl border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:grid-cols-[2rem_1fr_auto] ${on ? "border-white bg-white/10" : "border-[var(--lineOn)] hover:border-white/60"} ${active === p.id ? "ring-1 ring-[var(--sky)]" : ""}`}
                        >
                          <span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold ${on ? "bg-white text-[var(--night)]" : "bg-white/10"}`}>{on ? "✓" : i + 1}</span>
                          <span className="min-w-0">
                            <span className="block text-lg leading-snug" style={display}>{t.placements[i][0]}</span>
                            <span className="mt-1 block text-sm leading-relaxed text-[var(--on2)]">{t.placements[i][1]}</span>
                            <span className="mt-2 block text-xs text-[var(--on3)]">{t.seenPre} {nf.format(p.reach)} {t.seenPost}</span>
                          </span>
                          <span className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:block sm:text-right">
                            <span>
                              <span className="block text-2xl leading-none text-[var(--gold)]" style={display}>{eur.format(p.price)}</span>
                              <span className="mt-1 block text-xs text-[var(--on3)]">{t.perSeason}</span>
                            </span>
                            <span className={`inline-block rounded-full px-4 py-1.5 text-xs font-semibold sm:mt-3 ${on ? "bg-white text-[var(--night)]" : "border border-[var(--lineOn)] text-white"}`}>{on ? t.added : t.add}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* Receipt */}
                <div className="rounded-xl border border-[var(--lineOn)] p-5 sm:p-6 lg:col-start-1 lg:row-start-2 lg:self-start">
                  <h4 className="text-2xl" style={display}>{t.summaryTitle}</h4>
                  {sel.length === 0 ? (
                    <p className="mt-3 text-[var(--on2)]">{t.emptyPkg}</p>
                  ) : (
                    <>
                      <ul className="mt-4 text-sm">
                        {sel.map((x) => (
                          <li key={x.id} className="flex justify-between gap-4 border-b border-[var(--lineOn)] py-2">
                            <span className="text-[var(--on2)]">{t.placements[idx(x.id)][0]}</span>
                            <span className="tabular-nums">{eur.format(x.price)}</span>
                          </li>
                        ))}
                        {disc > 0 && (
                          <li className="flex justify-between gap-4 border-b border-[var(--lineOn)] py-2 text-[var(--sky)]">
                            <span>{t.bundle} −{Math.round(disc * 100)}%</span>
                            <span className="tabular-nums">−{eur.format(saved)}</span>
                          </li>
                        )}
                      </ul>
                      <div className="mt-4 flex items-baseline justify-between gap-4">
                        <span className="text-sm text-[var(--on2)]">{t.total}</span>
                        <span className="text-5xl tabular-nums leading-none text-[var(--gold)]" style={display}>{eur.format(cost)}</span>
                      </div>
                      <p className="mt-2 text-right text-sm text-[var(--on3)]">{t.perSundayA} {eur.format(perMatch)} {t.perSundayB}</p>
                    </>
                  )}
                  <p className="mt-4 text-sm text-[var(--on2)]">{t.bundleHint}</p>
                  {sel.length > 0 && <a href="#lead" className={btnLight + " mt-5 w-full"}>{t.requestPkg}</a>}
                </div>
              </div>
              <p className="mt-3 text-xs text-[var(--ink3)]">{t.disclaimer}</p>
            </div>
          </div>
        </section>

        {/* ── JOIN THE FAMILY ── */}
        <section id="lead" className="relative isolate scroll-mt-16 overflow-hidden">
          <Ball className="pointer-events-none absolute -bottom-20 -left-16 -z-10 h-80 w-80 -rotate-12 text-[var(--blue)] opacity-[0.1]" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl leading-[1.05] sm:text-6xl" style={display}>{t.joinTitle}</h2>
              <p className="mt-4 max-w-md leading-relaxed text-[var(--ink2)]">{t.joinLead}</p>
              <dl className="mt-8 grid grid-cols-2 gap-6">
                {t.reach.map(([n, l]) => (
                  <div key={l} className="flex flex-col-reverse">
                    <dt className="text-sm text-[var(--ink2)]">{l}</dt>
                    <dd className="text-4xl text-[var(--blue)]" style={display}>{n}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {sent ? (
              <div className="grid place-items-center rounded-2xl bg-[var(--surface)] p-10 text-center">
                <p className="max-w-sm text-2xl leading-snug" style={display}>{t.sent}</p>
              </div>
            ) : (
              <div className="grid gap-3 rounded-2xl bg-[var(--surface)] p-5 sm:p-8">
                {/* Connect to your API / Server Action: fetch('/api/lead') */}
                {sel.length > 0 && (
                  <p className="rounded-xl border border-[var(--line)] bg-white p-3 text-sm text-[var(--ink2)]">
                    <span className="font-bold text-[var(--blue)]">{t.yourPkg}:</span> {sel.map((x) => t.placements[idx(x.id)][0]).join(", ")}, {eur.format(cost)}
                  </p>
                )}
                <label className="grid gap-1 text-sm font-medium">{t.fName}
                  <input className="h-12 rounded-xl border border-[var(--line)] bg-white px-3 font-normal outline-none focus:border-[var(--blue)]" placeholder={t.fNamePh} />
                </label>
                <label className="grid gap-1 text-sm font-medium">{t.fEmail}
                  <input type="email" className="h-12 rounded-xl border border-[var(--line)] bg-white px-3 font-normal outline-none focus:border-[var(--blue)]" placeholder="nome@email.it" />
                </label>
                <label className="grid gap-1 text-sm font-medium">{t.fInterest}
                  <select className="h-12 rounded-xl border border-[var(--line)] bg-white px-3 font-normal outline-none focus:border-[var(--blue)]">
                    {t.interests.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </label>
                <button onClick={() => setSent(true)} className={btnPrimary + " mt-2"}>{t.join}</button>
                <a href="#" className="inline-flex items-center justify-center gap-2 text-center text-sm text-[var(--ink2)] underline underline-offset-4 hover:text-[var(--ink)]"><Icon name="download" size={16} />{t.mediaKit}</a>
              </div>
            )}
          </div>
        </section>

        {/* ── NEWS / MEDIA ── */}
        <section id="news" className="mx-auto max-w-7xl scroll-mt-16 px-4 pb-16 sm:px-6 md:pb-24">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-4xl leading-none sm:text-5xl" style={display}>{t.newsTitle}</h2>
            <a href="#" className="hidden text-sm font-semibold text-[var(--blue)] hover:underline sm:block">{t.allStories}</a>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {t.news.map(([tag, title, meta, date], i) => (
              <a key={i} href="#" className={`group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_var(--line)] transition hover:shadow-[0_0_0_1px_var(--blue)] ${i === 0 ? "md:col-span-3 md:grid md:grid-cols-[1.5fr_1fr]" : ""}`}>
                {/* MEDIA SLOT: cover photo */}
                <div className={`relative grid place-items-center overflow-hidden bg-[var(--surface)] ${i === 0 ? "aspect-video md:aspect-auto md:min-h-[340px]" : "aspect-video"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={CLUB.newsCovers[i][0]} alt="" loading="lazy" decoding="async" className={`absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 ${CLUB.newsCovers[i][1]}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(31,49,89,0.4)] via-transparent to-transparent" />
                  {i === 0 && (
                    <span className="relative grid h-16 w-16 place-items-center rounded-full bg-white/90 text-[var(--blue)] shadow-lg transition group-hover:scale-110">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between gap-6 p-5 sm:p-7">
                  <div>
                    <p className="text-sm font-semibold text-[var(--blue)]">{tag}</p>
                    <h3 className={`mt-2 leading-[1.1] ${i === 0 ? "text-3xl sm:text-4xl" : "text-2xl"}`} style={display}>{title}</h3>
                  </div>
                  <p className="flex gap-3 text-sm text-[var(--ink3)]"><span>{date}</span><span>{meta}</span></p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="relative isolate overflow-hidden bg-[var(--blue)] text-white">
          <div className="absolute inset-0 -z-10" style={balls("FFFFFF", 0.16)} />
          <Ball className="pointer-events-none absolute -right-10 -top-16 -z-10 h-72 w-72 rotate-12 text-white opacity-20 md:right-20" />
          <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between md:py-20">
            <p className="max-w-3xl text-4xl leading-[1.05] sm:text-5xl" style={display}>{t.finalCta}</p>
            <a href="#lead" className={btnLight + " !px-9 !py-4"}>{t.season}</a>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="relative isolate overflow-hidden bg-[var(--night)] text-[var(--on)]">
        <Pitch className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-white opacity-[0.05]" />
        <Tricolore className="w-full" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLUB.logo} alt="" width={40} height={56} className="h-14 w-auto" />
              <p className="text-2xl" style={display}>{CLUB.name}</p>
            </div>
            <div className="mt-5 flex gap-2">
              {[["Instagram", "instagram"], ["YouTube", "youtube"], ["X", "x"], ["TikTok", "tiktok"], ["Facebook", "facebook"]].map(([label, ic]) => (
                <a key={label} href="#" aria-label={label} className="grid h-11 w-11 place-items-center rounded-full border border-[var(--lineOn)] transition hover:border-white hover:bg-white hover:text-[var(--night)]">
                  <Icon name={ic} size={20} />
                </a>
              ))}
            </div>
          </div>
          <div className="text-sm">
            <p className="mb-3 flex items-center gap-2 font-bold"><Icon name="mail" size={16} />{t.press}</p>
            <a className="text-[var(--on2)] hover:text-white" href={`mailto:${CLUB.contacts.press}`}>{CLUB.contacts.press}</a>
          </div>
          <div className="text-sm">
            <p className="mb-3 flex items-center gap-2 font-bold"><Icon name="mail" size={16} />{t.commercial}</p>
            <a className="text-[var(--on2)] hover:text-white" href={`mailto:${CLUB.contacts.commercial}`}>{CLUB.contacts.commercial}</a>
          </div>
          <div className="grid content-start gap-2 text-sm text-[var(--on2)]">
            <p className="mb-1 font-bold text-white">{t.legal}</p>
            {t.legalLinks.map((l) => <a key={l} href="#" className="hover:text-white">{l}</a>)}
          </div>
        </div>
        <p className="relative border-t border-[var(--lineOn)] px-4 py-5 text-center text-xs text-[var(--on3)]">
          © {new Date().getFullYear()} {CLUB.legalName}. {t.rights}
        </p>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[var(--glass)] p-3 backdrop-blur xl:hidden">
        <a href="#match" className={btnPrimary + " w-full"}><Icon name="calendar" size={16} /> {t.buy}</a>
      </div>
    </div>
  );
}