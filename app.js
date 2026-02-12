const { useState, useEffect, useRef, useCallback } = React;

/* ══════════════════════════════════════════════════════════════
   JINJA EXPLORER MARATHON — Full Website v2
   Config-driven • Mobile-first • 11 Routes • PRD v1.2 compliant
   ══════════════════════════════════════════════════════════════ */

/* ─── EDITABLE CONFIG ─── */
const SITE = {
  name: "Jinja Explorer Marathon",
  tagline: "Run the Royal Gateway. Explore the Adventure City.",
  story: "A destination marathon hosted in Jinja—gateway of Busoga and Uganda's adventure city—combining world-class race operations with tourism and culture.",
  date: "November 2026",
  dateShort: "Nov 2026",
  location: "Jinja City, Uganda",
  email: "info@jinjaexplorermarathon.com",
  phone: "+256 700 000 000",
  whatsapp: "+256700000000",
};

const FEES = [
  { category: "5K Fun Run", early: "UGX 30,000", regular: "UGX 50,000", intl: "$15" },
  { category: "10K", early: "UGX 60,000", regular: "UGX 80,000", intl: "$25" },
  { category: "Half Marathon 21K", early: "UGX 100,000", regular: "UGX 130,000", intl: "$40" },
  { category: "Full Marathon 42K", early: "UGX 150,000", regular: "UGX 200,000", intl: "$60" },
];

const START_TIMES = [
  { event: "Full Marathon (42K)", time: "06:00 AM", assembly: "05:15 AM" },
  { event: "Half Marathon (21K)", time: "06:30 AM", assembly: "05:45 AM" },
  { event: "10K", time: "07:00 AM", assembly: "06:30 AM" },
  { event: "5K Fun Run", time: "08:00 AM", assembly: "07:30 AM" },
];

const PILLARS = [
  { icon: "◈", title: "Belonging", desc: "A race for every runner—from first-timers to elites. Twegaite: Come Together.", color: "#C8963E" },
  { icon: "◆", title: "Pride", desc: "Celebrating Busoga heritage, the Kyabazinga's legacy, and Uganda's running culture.", color: "#C45B28" },
  { icon: "▣", title: "Legacy", desc: "Building a world-class annual race that drives lasting value for Jinja and Busoga.", color: "#1C2D4F" },
  { icon: "◎", title: "Adventure", desc: "Jinja is Uganda's adventure capital—rafting, bungee, wildlife, and the mighty Nile.", color: "#2E86AB" },
  { icon: "✦", title: "Stewardship", desc: "Eco-conscious operations, community reinvestment, and responsible tourism.", color: "#4A7C59" },
];

const INSTRUMENTS = [
  { id: "embaire", name: "Embaire", tag: "Protocol", desc: "The royal xylophone of Busoga — a signature cultural motif and ceremonial centrepiece with wooden keys over banana-stem resonators.", best: "Opening ceremony, start line fanfare", emoji: "🎶" },
  { id: "bigwala", name: "Bigwala", tag: "Protocol", desc: "Sacred gourd trumpets traditionally played during royal coronations and state processions of the Kyabazinga.", best: "Royal protocols, VIP arrivals", emoji: "📯" },
  { id: "drums", name: "Engalabi Drums", tag: "Hype", desc: "Powerful long drums with lizard-skin heads that drive energy, rhythm and unity at celebrations and gatherings.", best: "Km gate hype zones, finish line energy", emoji: "🥁" },
  { id: "shakers", name: "Ensaasi Shakers", tag: "Hype", desc: "Gourd shakers filled with seeds, adding rhythmic texture and enabling crowd participation in communal music.", best: "Crowd zones, cheer points", emoji: "🎵" },
  { id: "flute", name: "Endere Flute", tag: "Chill", desc: "A soft bamboo flute producing meditative, breathy melodies deeply tied to Busoga storytelling traditions.", best: "Cool-down zones, post-race relaxation", emoji: "🎼" },
  { id: "lyre", name: "Endongo Lyre", tag: "Story", desc: "A stringed bowl lyre used by griots, storytellers and poets to accompany oral histories and evening gatherings.", best: "Cultural expo, storytelling sessions", emoji: "🎻" },
];

const SPONSOR_TIERS = [
  { tier: "Title Partner", price: "Custom", perks: ["Full naming rights", "Start/finish branding", "All media & digital", "VIP hospitality (20 pax)", "Expo headline booth", "Bib & medal logo"] },
  { tier: "Gold Sponsor", price: "From $10,000", perks: ["Km gate branding (2 gates)", "Expo premium booth", "Bib logo placement", "Digital & social media", "VIP passes (10 pax)"] },
  { tier: "Silver Sponsor", price: "From $5,000", perks: ["Expo standard booth", "Digital media mentions", "Hydration station branding", "Event passes (5 pax)", "Website logo"] },
  { tier: "Community Partner", price: "In-kind / $1,000+", perks: ["Logo on website", "Social media mentions", "Tourism village presence", "Event passes (2 pax)"] },
];

const ITINERARIES = [
  { title: "Runner Weekend", emoji: "🏃", color: "#C8963E", highlights: ["Expo & bib collection Friday", "Race day Saturday — chase your PB", "Recovery brunch & Nile cruise Sunday"] },
  { title: "Family Weekend", emoji: "👨‍👩‍👧‍👦", color: "#4A7C59", highlights: ["Kids' fun run Saturday morning", "Cultural showcase & Busoga food market", "Source of the Nile boat trip Sunday"] },
  { title: "Adventure Weekend", emoji: "🌊", color: "#2E86AB", highlights: ["White-water rafting Friday", "Race day Saturday — run the Nile route", "Bungee jumping & quad biking Sunday"] },
];

const FAQS = [
  { q: "When and where is the race?", a: `The Jinja Explorer Marathon takes place in ${SITE.date} in Jinja City, Uganda — the adventure capital at the source of the Nile.` },
  { q: "What distances are available?", a: "We offer 5K Fun Run, 10K, Half Marathon (21K), and Full Marathon (42K) categories for all abilities." },
  { q: "How do I register?", a: "Click the Register button to access our form. Payment is via Mobile Money (MTN/Airtel), bank transfer, or international card." },
  { q: "Can I get a refund or transfer my entry?", a: "Entries are non-refundable but transferable to another runner up to 14 days before race day. A small transfer fee applies." },
  { q: "Is there a minimum age requirement?", a: "5K: 10+, 10K: 14+, 21K: 16+, 42K: 18+. Runners under 18 need guardian consent at registration." },
  { q: "What is included in my entry fee?", a: "Race bib with timing chip, finisher medal, official race t-shirt, hydration on course, medical support, post-race refreshments, and digital certificate." },
];

const COURSE_MARKERS = [
  { km: "KM 0", name: "Start — Main Street, Jinja", desc: "The race launches in the heart of Jinja City with a ceremonial Embaire fanfare and Bigwala trumpets." },
  { km: "KM 8", name: "Nile Bridge Crossing", desc: "Runners cross the iconic Nile bridge with panoramic views of Bujagali Falls and the river below." },
  { km: "KM 15", name: "Busoga Cultural Gate", desc: "A Bigwala trumpet zone marks the heritage stretch — Engalabi drums drive the pace forward." },
  { km: "KM 21", name: "Half Marathon Finish", desc: "Half marathon runners finish at the lakeside promenade with medal ceremony and refreshments." },
  { km: "KM 30", name: "Adventure Corridor", desc: "The route passes rafting launch points and riverside trails — cheering zones line the path." },
  { km: "KM 42", name: "Finish — Jinja Sports Ground", desc: "A roaring finish with drums, medals, photo wall, and the full celebration of Twegaite." },
];

const AID_STATIONS = [
  ["Station 1", "KM 5", "✓", "—", "First Aid"],
  ["Station 2", "KM 10", "✓", "✓", "First Aid"],
  ["Station 3", "KM 15", "✓", "✓", "Paramedic"],
  ["Station 4", "KM 20", "✓", "✓", "First Aid"],
  ["Station 5", "KM 25", "✓", "✓", "Paramedic"],
  ["Station 6", "KM 30", "✓", "✓", "First Aid"],
  ["Station 7", "KM 35", "✓", "✓", "Paramedic"],
  ["Station 8", "KM 40", "✓", "✓", "First Aid"],
];

const RACE_WEEK_SCHEDULE = [
  { day: "Thursday", events: ["Expo opens 9 AM – 6 PM", "Bib collection begins", "Welcome talk — Race Director", "Tourism Village opens"] },
  { day: "Friday", events: ["Expo continues 9 AM – 6 PM", "Shakeout run 7 AM (Nile promenade)", "Cultural showcase & Soundboard preview", "Pasta party 6 PM (Sports Ground)"] },
  { day: "Saturday — Race Day", events: ["Assembly from 5:15 AM", "42K gun: 6:00 AM", "21K gun: 6:30 AM", "10K gun: 7:00 AM", "5K gun: 8:00 AM", "Awards ceremony 12:00 PM"] },
  { day: "Sunday", events: ["Recovery yoga 7 AM", "Nile cruise (optional, bookable)", "Adventure activities", "Farewell brunch 11 AM"] },
];

/* SEO META per page */
const SEO = {
  "/": { title: "Jinja Explorer Marathon — Run the Royal Gateway", desc: "A destination marathon in Jinja, Uganda. 5K, 10K, Half & Full Marathon. Explore Busoga culture, Nile adventures & world-class race operations." },
  "/about": { title: "About — Jinja Explorer Marathon", desc: "Discover the story behind East Africa's most distinctive destination marathon, rooted in Busoga heritage and Jinja's adventure spirit." },
  "/register": { title: "Register — Jinja Explorer Marathon", desc: "Entry fees, start times, and registration for the Jinja Explorer Marathon. 5K from UGX 30,000." },
  "/course": { title: "Course & Route — Jinja Explorer Marathon", desc: "Explore the certified race course through Jinja City, across the Nile Bridge, and past Busoga cultural landmarks." },
  "/race-week": { title: "Race Week & Expo — Jinja Explorer Marathon", desc: "Expo details, bib collection, race week schedule, shakeout runs, cultural showcases, and race day checklist." },
  "/explore-jinja": { title: "Explore Jinja — Tourism & Itineraries", desc: "Plan your Explorer Weekend. Curated itineraries for runners, families, and adventure seekers in Uganda's adventure capital." },
  "/culture": { title: "Busoga Culture Soundboard — Jinja Explorer Marathon", desc: "Experience the instruments and sounds of Busoga. Play the Embaire, Bigwala, Engalabi and more. Twegaite: Come Together." },
  "/results": { title: "Results & Winners — Jinja Explorer Marathon", desc: "Race results, winner tables, and photo highlights from the Jinja Explorer Marathon." },
  "/sponsors": { title: "Sponsor — Jinja Explorer Marathon", desc: "Partnership packages for East Africa's premier destination marathon. Title, Gold, Silver & Community tiers." },
  "/media": { title: "Media Centre — Jinja Explorer Marathon", desc: "Press kit, press releases, photo gallery, and media resources for the Jinja Explorer Marathon." },
  "/contact": { title: "Contact — Jinja Explorer Marathon", desc: "Get in touch with the Jinja Explorer Marathon team. Email, WhatsApp, phone, and contact form." },
};

/* ─── PALETTE ─── */
const P = {
  bg: "#FAF7F2", bgDark: "#0D1520", primary: "#1C2D4F", primaryLight: "#2A4A7F",
  accent: "#C8963E", accentHover: "#B5842F", terracotta: "#C45B28", nileBlue: "#2E86AB",
  text: "#1A1A1A", textMid: "#444444", textLight: "#6B6B6B", white: "#FFFFFF",
  cream: "#F5F0E8", border: "#E2DDD5", borderLight: "#EDE9E2",
  navy: "#1C2D4F", navyDark: "#0F1A2E",
};

/* Logo path — update this if your logo file is hosted elsewhere */
const LOGO_SRC = "./jem-logo.png";

/* ─── ROUTES ─── */
const ROUTES = [
  { path: "/", label: "Home" }, { path: "/about", label: "About" },
  { path: "/register", label: "Entry" }, { path: "/course", label: "Course" },
  { path: "/race-week", label: "Race Week" }, { path: "/explore-jinja", label: "Explore Jinja" },
  { path: "/culture", label: "Culture" }, { path: "/results", label: "Results" },
  { path: "/sponsors", label: "Sponsors" }, { path: "/media", label: "Media" },
  { path: "/contact", label: "Contact" },
];

/* ─── ANALYTICS ─── */
const track = (name, data = {}) => {
  console.log(`[JEM] ${name}`, data);
  if (window.dataLayer) window.dataLayer.push({ event: name, ...data });
};

/* ═══ SHARED COMPONENTS ═══ */

function useOnScreen(ref, threshold = 0.12) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return vis;
}

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const vis = useOnScreen(ref);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`, ...style,
    }}>{children}</div>
  );
}

function Header({ currentPage, onNavigate }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header className="jem-header" role="banner" style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(13,21,32,0.97)" : "rgba(13,21,32,0.92)",
      backdropFilter: "blur(12px)", borderBottom: scrolled ? "1px solid rgba(200,150,62,0.15)" : "1px solid transparent",
      transition: "all 0.3s",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <button onClick={() => onNavigate("/")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: 0 }}>
          <img src={LOGO_SRC} alt="Jinja Explorer Marathon" style={{ height: 42, width: "auto", objectFit: "contain" }} />
          <span className="jem-header-name" style={{ fontFamily: "var(--ff-body)", fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: 2.5, textTransform: "uppercase" }}>Jinja Explorer Marathon</span>
        </button>
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div className="jem-desktop-nav">
            {ROUTES.filter(r => !["/media", "/contact", "/results"].includes(r.path)).map(r => (
              <button key={r.path} onClick={() => onNavigate(r.path)} style={{
                background: currentPage === r.path ? "rgba(200,150,62,0.12)" : "none",
                border: "none", cursor: "pointer", padding: "6px 11px", borderRadius: 6,
                color: currentPage === r.path ? P.accent : "rgba(255,255,255,0.6)",
                fontFamily: "var(--ff-body)", fontSize: 13, fontWeight: currentPage === r.path ? 600 : 400,
                transition: "all 0.2s",
              }}>{r.label}</button>
            ))}
          </div>
          <button onClick={() => { onNavigate("/register"); track("register_click"); }} style={{
            background: `linear-gradient(135deg, ${P.accent}, ${P.accentHover})`, color: P.bgDark,
            border: "none", padding: "8px 20px", borderRadius: 8,
            fontFamily: "var(--ff-body)", fontWeight: 700, fontSize: 13, cursor: "pointer",
          }}>Register</button>
          <button className="jem-mobile-toggle" onClick={() => setOpen(!open)} style={{
            background: "none", border: "none", color: P.white, fontSize: 22, cursor: "pointer", padding: "4px 8px",
          }}>{open ? "✕" : "☰"}</button>
        </nav>
      </div>
      <div style={{ maxHeight: open ? 600 : 0, overflow: "hidden", transition: "max-height 0.35s ease", background: "rgba(13,21,32,0.98)" }}>
        <div style={{ padding: "8px 24px 20px" }}>
          {ROUTES.map(r => (
            <button key={r.path} onClick={() => { onNavigate(r.path); setOpen(false); }} style={{
              display: "block", width: "100%", textAlign: "left",
              background: currentPage === r.path ? "rgba(200,150,62,0.1)" : "none",
              border: "none", color: currentPage === r.path ? P.accent : "rgba(255,255,255,0.7)",
              padding: "12px 14px", fontFamily: "var(--ff-body)", fontSize: 15,
              fontWeight: currentPage === r.path ? 600 : 400, cursor: "pointer", borderRadius: 8,
            }}>{r.label}</button>
          ))}
        </div>
      </div>
    </header>
  );
}

function Footer({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);
  return (
    <footer style={{ background: P.bgDark, color: "rgba(255,255,255,0.75)", padding: "72px 24px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="jem-footer-grid">
          <div>
            <img src={LOGO_SRC} alt="Jinja Explorer Marathon" style={{ height: 52, width: "auto", objectFit: "contain", marginBottom: 8 }} />
            <p style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.55, maxWidth: 260 }}>{SITE.tagline}</p>
          </div>
          <div>
            <div className="jem-footer-heading">Quick Links</div>
            {["/register", "/course", "/explore-jinja", "/culture", "/sponsors", "/contact"].map(p => {
              const r = ROUTES.find(x => x.path === p);
              return <button key={p} onClick={() => onNavigate(p)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.55)", cursor: "pointer", padding: "5px 0", fontSize: 14, fontFamily: "var(--ff-body)" }}>{r?.label}</button>;
            })}
          </div>
          <div>
            <div className="jem-footer-heading">Contact</div>
            <div style={{ fontSize: 14, lineHeight: 2.2, opacity: 0.55 }}>✉ {SITE.email}<br />☏ {SITE.phone}<br />⊕ Jinja City, Uganda</div>
          </div>
          <div>
            <div className="jem-footer-heading">Stay Updated</div>
            {subbed ? <p style={{ color: P.accent, fontSize: 14 }}>✓ Subscribed!</p> : (
              <div style={{ display: "flex", gap: 8 }}>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" style={{
                  flex: 1, padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.06)", color: P.white, fontSize: 14, fontFamily: "var(--ff-body)", outline: "none",
                }} />
                <button onClick={() => { if (email.includes("@")) { setSubbed(true); track("newsletter_signup"); } }} style={{
                  background: `linear-gradient(135deg, ${P.accent}, ${P.accentHover})`, color: P.bgDark,
                  border: "none", padding: "10px 18px", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer",
                }}>Join</button>
              </div>
            )}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 48, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, opacity: 0.35 }}>© 2026 Jinja Explorer Marathon. All rights reserved.</span>
          <span style={{ fontSize: 12, opacity: 0.35 }}>Celebrating Busoga Heritage · Twegaite</span>
        </div>
      </div>
    </footer>
  );
}

function Sec({ children, bg = P.bg, style = {}, id }) {
  return <section id={id} style={{ padding: "88px 24px", background: bg, ...style }}>{children}</section>;
}
function Con({ children, width = 1280, style = {} }) {
  return <div style={{ maxWidth: width, margin: "0 auto", ...style }}>{children}</div>;
}
function SL({ text }) {
  return <div style={{ fontFamily: "var(--ff-body)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: P.accent, marginBottom: 10 }}>{text}</div>;
}
function ST({ sub, title, light, align = "center" }) {
  return (
    <div style={{ marginBottom: 40, textAlign: align }}>
      {sub && <SL text={sub} />}
      <h2 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(28px, 4.5vw, 44px)", fontWeight: 700, color: light ? P.white : P.primary, margin: 0, lineHeight: 1.15 }}>{title}</h2>
    </div>
  );
}
function Card({ children, style = {}, hover = false, onClick }) {
  const [h, setH] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: P.white, borderRadius: 16, padding: 28, border: `1px solid ${P.borderLight}`,
      transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
      transform: hover && h ? "translateY(-6px)" : "none",
      boxShadow: hover && h ? "0 20px 60px rgba(27,67,50,0.12)" : "0 1px 4px rgba(0,0,0,0.03)",
      cursor: onClick ? "pointer" : "default", ...style,
    }}>{children}</div>
  );
}
function Btn({ label, onClick, variant = "primary", size = "md", full = false, icon }) {
  const isPri = variant === "primary";
  const isGhost = variant === "ghost";
  const pad = size === "lg" ? "15px 36px" : size === "sm" ? "8px 18px" : "11px 26px";
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center",
      width: full ? "100%" : "auto",
      background: isPri ? `linear-gradient(135deg, ${P.accent}, ${P.accentHover})` : isGhost ? "rgba(200,150,62,0.08)" : "transparent",
      color: isPri ? P.bgDark : P.accent,
      border: isPri || isGhost ? "none" : `2px solid ${P.accent}`,
      padding: pad, borderRadius: 10,
      fontFamily: "var(--ff-body)", fontWeight: 700, fontSize: size === "lg" ? 15 : size === "sm" ? 12 : 14,
      cursor: "pointer", transition: "all 0.25s",
    }}>{icon && <span>{icon}</span>}{label}</button>
  );
}
function DT({ headers, rows, compact }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: 14, border: `1px solid ${P.border}`, background: P.white }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--ff-body)", fontSize: compact ? 13 : 14 }}>
        <thead><tr style={{ background: P.primary }}>
          {headers.map((h, i) => <th key={i} style={{ padding: compact ? "10px 12px" : "13px 18px", textAlign: "left", color: P.white, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, whiteSpace: "nowrap" }}>{h}</th>)}
        </tr></thead>
        <tbody>{rows.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? P.white : P.cream }}>
            {row.map((cell, j) => <td key={j} style={{ padding: compact ? "10px 12px" : "13px 18px", color: P.text, borderBottom: `1px solid ${P.borderLight}` }}>{cell}</td>)}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
function FF({ label, type = "text", placeholder, value, onChange, options, required }) {
  const base = { width: "100%", padding: "13px 16px", borderRadius: 10, border: `1px solid ${P.border}`, fontFamily: "var(--ff-body)", fontSize: 14, background: P.white, color: P.text, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s, box-shadow 0.2s" };
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", marginBottom: 6, fontFamily: "var(--ff-body)", fontSize: 12, fontWeight: 600, color: P.textMid, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}{required && <span style={{ color: P.terracotta }}> *</span>}</label>
      {type === "textarea" ? <textarea rows={4} placeholder={placeholder} value={value} onChange={onChange} style={base} /> :
       type === "select" ? <select value={value} onChange={onChange} style={base}>{options.map(o => <option key={o} value={o}>{o}</option>)}</select> :
       <input type={type} placeholder={placeholder} value={value} onChange={onChange} style={base} />}
    </div>
  );
}
function Tag({ label, color = P.accent }) {
  return <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, background: `${color}18`, color }}>{label}</span>;
}
function Img({ text, height = 200, dark = false }) {
  return (
    <div style={{
      height, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
      background: dark ? `linear-gradient(150deg, ${P.bgDark}, ${P.primary})` : `linear-gradient(150deg, ${P.cream}, ${P.border})`,
      color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)", fontFamily: "var(--ff-body)", fontSize: 13, fontWeight: 600, textAlign: "center", padding: 24,
    }}>{text}</div>
  );
}
function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${P.border}` }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer",
        fontFamily: "var(--ff-body)", fontSize: 16, fontWeight: 600, color: P.primary, textAlign: "left", padding: "20px 0", gap: 16,
      }}>
        <span>{q}</span>
        <span style={{ fontSize: 18, color: P.accent, transform: open ? "rotate(45deg)" : "none", transition: "transform 0.3s", flexShrink: 0 }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 200 : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <p style={{ margin: "0 0 20px", fontSize: 14, lineHeight: 1.8, color: P.textLight }}>{a}</p>
      </div>
    </div>
  );
}

/* ═══ PAGES ═══ */

function HomePage({ nav }) {
  return (<div>
    {/* 1 Hero */}
    <section style={{ background: `linear-gradient(168deg, ${P.navyDark} 0%, #0a1225 40%, ${P.primary} 100%)`, padding: "108px 24px 88px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 25% 15%, rgba(200,150,62,0.06) 0%, transparent 50%)" }} />
      <div style={{ maxWidth: 780, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal><div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 5, color: P.accent, marginBottom: 24 }}>{SITE.date} · {SITE.location}</div></Reveal>
        <Reveal delay={0.1}><h1 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(40px, 8vw, 80px)", color: P.white, fontWeight: 800, lineHeight: 1.05, margin: "0 0 24px", letterSpacing: -1 }}>Jinja Explorer<br /><span style={{ color: P.accent }}>Marathon</span></h1></Reveal>
        <Reveal delay={0.2}><p style={{ fontSize: "clamp(16px, 2.2vw, 19px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: 40, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>{SITE.tagline}</p></Reveal>
        <Reveal delay={0.3}><div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn label="Register Now" onClick={() => { nav("/register"); track("register_click"); }} size="lg" />
          <Btn label="Explore Jinja" onClick={() => nav("/explore-jinja")} variant="outline" size="lg" />
          <Btn label="Become a Sponsor" onClick={() => nav("/sponsors")} variant="outline" size="lg" />
        </div></Reveal>
      </div>
    </section>

    {/* 2 Quick facts */}
    <section style={{ background: P.primary, padding: "18px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8 }}>
        {[{ v: "4", l: "Distances" }, { v: "06:00", l: "First Start" }, { v: SITE.dateShort, l: "Race Weekend" }, { v: "∞", l: "Adventure" }].map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 20px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.15)" : "none" }}>
            <span style={{ fontFamily: "var(--ff-display)", fontSize: 18, fontWeight: 700, color: P.accent }}>{f.v}</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 1 }}>{f.l}</span>
          </div>
        ))}
      </div>
    </section>

    {/* 3 Why Explorer */}
    <Sec><Con width={760}><Reveal><ST sub="Why Explorer?" title="More Than a Marathon" /></Reveal>
      <Reveal delay={0.1}><p style={{ fontSize: 17, lineHeight: 1.9, color: P.textLight, textAlign: "center" }}>The Jinja Explorer Marathon is a destination race weekend blending world-class race operations with the rich culture of Busoga and the adventure spirit of Jinja — Uganda's gateway city on the Nile. Whether chasing a PB, exploring a new destination, or connecting with heritage, this is your race.</p></Reveal>
    </Con></Sec>

    {/* 4 Pillars */}
    <Sec bg={P.cream}><Con><ST sub="Our Foundation" title="The Explorer Pillars" />
      <div className="jem-grid-5">{PILLARS.map((p, i) => (
        <Reveal key={p.title} delay={i * 0.07}><Card hover>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: `${p.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: p.color, fontWeight: 700, marginBottom: 14 }}>{p.icon}</div>
          <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 18, color: P.primary, marginBottom: 6 }}>{p.title}</h3>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: P.textLight, margin: 0 }}>{p.desc}</p>
        </Card></Reveal>
      ))}</div>
    </Con></Sec>

    {/* 5 Featured sections — Entry + Course + Race Week */}
    <Sec><Con><ST sub="At a Glance" title="Your Race Weekend" />
      <div className="jem-grid-3">
        <Reveal><Card hover onClick={() => nav("/register")} style={{ borderTop: `4px solid ${P.accent}` }}>
          <Tag label="Entry" /><h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20, color: P.primary, margin: "14px 0 10px" }}>Fees & Registration</h3>
          <p style={{ fontSize: 14, color: P.textLight, lineHeight: 1.7, marginBottom: 14 }}>5K from UGX 30,000 · 42K from UGX 150,000. Includes bib, chip, medal, t-shirt & hydration.</p>
          <span style={{ fontSize: 13, fontWeight: 700, color: P.accent }}>View fees & register →</span>
        </Card></Reveal>
        <Reveal delay={0.1}><Card hover onClick={() => nav("/course")} style={{ borderTop: `4px solid ${P.primaryLight}` }}>
          <Tag label="Course" color={P.primaryLight} /><h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20, color: P.primary, margin: "14px 0 10px" }}>Route & Explorer Markers</h3>
          <p style={{ fontSize: 14, color: P.textLight, lineHeight: 1.7, marginBottom: 14 }}>Cross the Nile Bridge, pass Busoga Cultural Gates, finish at Jinja Sports Ground. Aid every 5K.</p>
          <span style={{ fontSize: 13, fontWeight: 700, color: P.primaryLight }}>Explore the course →</span>
        </Card></Reveal>
        <Reveal delay={0.2}><Card hover onClick={() => nav("/race-week")} style={{ borderTop: `4px solid ${P.nileBlue}` }}>
          <Tag label="Race Week" color={P.nileBlue} /><h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20, color: P.primary, margin: "14px 0 10px" }}>Expo, Bib & Schedule</h3>
          <p style={{ fontSize: 14, color: P.textLight, lineHeight: 1.7, marginBottom: 14 }}>Thu–Fri expo, shakeout run, cultural showcase, pasta party. Bib collection with photo ID.</p>
          <span style={{ fontSize: 13, fontWeight: 700, color: P.nileBlue }}>See the schedule →</span>
        </Card></Reveal>
      </div>
    </Con></Sec>

    {/* Fees table */}
    <Sec bg={P.cream}><Con width={1000}><ST sub="Entry" title="Race Fees" />
      <Reveal><DT headers={["Category", "Early Bird", "Regular", "International"]} rows={FEES.map(f => [f.category, f.early, f.regular, f.intl])} /></Reveal>
      <div style={{ textAlign: "center", marginTop: 28 }}><Btn label="Register Now →" onClick={() => { nav("/register"); track("register_click"); }} /></div>
    </Con></Sec>

    {/* 6 Explore Jinja */}
    <Sec><Con><ST sub="Beyond the Finish Line" title="Explore Jinja" />
      <div className="jem-grid-3">{ITINERARIES.map((it, i) => (
        <Reveal key={it.title} delay={i * 0.1}><Card hover onClick={() => { nav("/explore-jinja"); track("itinerary_click", { itinerary: it.title }); }} style={{ borderLeft: `4px solid ${it.color}` }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>{it.emoji}</div>
          <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20, color: P.primary, marginBottom: 12 }}>{it.title}</h3>
          {it.highlights.map((h, j) => <div key={j} style={{ fontSize: 14, lineHeight: 1.9, color: P.textLight, paddingLeft: 18, position: "relative" }}><span style={{ position: "absolute", left: 0, color: it.color, fontWeight: 700 }}>→</span>{h}</div>)}
        </Card></Reveal>
      ))}</div>
    </Con></Sec>

    {/* 7 Culture teaser */}
    <Sec bg={`linear-gradient(168deg, ${P.bgDark}, ${P.primary})`}><Con width={1000}>
      <ST sub="The Sound of Busoga" title="Culture Soundboard" light />
      <Reveal><p style={{ textAlign: "center", color: "rgba(255,255,255,0.55)", fontSize: 16, lineHeight: 1.75, maxWidth: 540, margin: "0 auto 40px" }}>Experience the instruments that have defined Busoga culture for centuries — woven into every kilometre of this race.</p></Reveal>
      <div className="jem-grid-2" style={{ marginBottom: 36 }}>
        {INSTRUMENTS.slice(0, 2).map((inst, i) => (
          <Reveal key={inst.id} delay={i * 0.1}><div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 28, border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 14 }}>
              <div><span style={{ fontSize: 28, marginRight: 10 }}>{inst.emoji}</span><span style={{ fontFamily: "var(--ff-display)", fontSize: 22, color: P.white }}>{inst.name}</span></div>
              <Tag label={inst.tag} />
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", marginBottom: 18 }}>{inst.desc}</p>
            <button onClick={() => track("audio_play", { instrument: inst.name })} style={{
              background: "rgba(200,150,62,0.15)", border: "1px solid rgba(200,150,62,0.3)", color: P.accent,
              padding: "10px 24px", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 13,
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>▶ Play Sample</button>
          </div></Reveal>
        ))}
      </div>
      <div style={{ textAlign: "center" }}><Btn label="Explore Full Soundboard →" onClick={() => nav("/culture")} variant="outline" /></div>
    </Con></Sec>

    {/* 8 Sponsors */}
    <Sec><Con width={900} style={{ textAlign: "center" }}>
      <ST sub="Partners" title="Proudly Supported By" />
      <div style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap", marginBottom: 28 }}>
        {SPONSOR_TIERS.map(s => (<div key={s.tier} style={{ width: 140, height: 52, background: P.cream, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: P.textLight, fontWeight: 600, textTransform: "uppercase", border: `1px solid ${P.borderLight}` }}>{s.tier}</div>))}
      </div>
      <Btn label="Become a Sponsor" onClick={() => nav("/sponsors")} variant="ghost" />
    </Con></Sec>

    {/* 9 FAQ */}
    <Sec bg={P.cream}><Con width={760}>
      <ST sub="FAQ" title="Common Questions" />
      {FAQS.map((f, i) => <FAQ key={i} q={f.q} a={f.a} />)}
    </Con></Sec>

    {/* 10 Newsletter + Twegaite */}
    <Sec bg={`linear-gradient(168deg, ${P.primary}, ${P.primaryLight})`}><Con width={680} style={{ textAlign: "center" }}>
      <ST sub="Twegaite" title="Come Together" light />
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.75, marginBottom: 36, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}><em>Twegaite</em> means "Come Together" in Lusoga. Join the movement — volunteer, bring a friend, sponsor a runner, or spread the word.</p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        <Btn label="Make a Pledge" onClick={() => nav("/culture")} />
        <Btn label="Register Now" onClick={() => { nav("/register"); track("register_click"); }} variant="outline" />
      </div>
    </Con></Sec>
  </div>);
}

function AboutPage({ nav }) {
  return (<div>
    <Sec><Con width={760}><Reveal><ST sub="Our Story" title="About the Jinja Explorer Marathon" /></Reveal>
      <Reveal delay={0.1}><div style={{ fontSize: 16, lineHeight: 1.95, color: P.textLight }}>
        <p>Jinja City sits where Lake Victoria pours into the River Nile — a place of immense natural beauty, cultural significance, and adventurous energy. For the Basoga people, Jinja is the gateway to the Kingdom of Busoga, defined by rich musical traditions, warm hospitality, and deep-rooted pride.</p>
        <p style={{ marginTop: 20 }}>The Jinja Explorer Marathon was born from a simple idea: that a world-class race could be a vehicle for cultural celebration, responsible tourism, and community empowerment. Every kilometre tells a story — from the royal heritage of the Kyabazinga to the thundering rapids that draw adventurers worldwide.</p>
        <p style={{ marginTop: 20 }}>We are more than a race. We are a movement rooted in <strong style={{ color: P.primary }}>Twegaite</strong> — "Come Together." We invite runners, families, tourists, and partners to join us for a weekend that moves the body, mind, and spirit.</p>
      </div></Reveal>
    </Con></Sec>
    <Sec bg={P.cream}><Con><ST sub="Foundation" title="The Explorer Pillars" />
      <div className="jem-grid-5">{PILLARS.map((p, i) => (<Reveal key={p.title} delay={i * 0.07}><Card>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${p.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: p.color, fontWeight: 700, marginBottom: 12 }}>{p.icon}</div>
        <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 17, color: P.primary, marginBottom: 6 }}>{p.title}</h3>
        <p style={{ fontSize: 13, lineHeight: 1.65, color: P.textLight, margin: 0 }}>{p.desc}</p>
      </Card></Reveal>))}</div>
    </Con></Sec>
    <Sec><Con width={1000}><ST sub="Differentiation" title="Culture · Tourism · Operations" />
      <div className="jem-grid-3">{[
        { icon: "🎵", t: "Cultural Layer", d: "The only marathon in Africa with a dedicated Busoga Soundboard and cultural showcase woven into race day." },
        { icon: "🗺️", t: "Tourism Integration", d: "Curated itineraries turn race weekend into a full destination experience — adventure, food, heritage." },
        { icon: "⚙️", t: "Professional Operations", d: "Chip timing, certified course, medical support, IAAF-standard hydration and safety marshalling." },
      ].map((item, i) => (<Reveal key={item.t} delay={i * 0.1}><Card hover>
        <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
        <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 19, color: P.primary, marginBottom: 8 }}>{item.t}</h3>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: P.textLight, margin: 0 }}>{item.d}</p>
      </Card></Reveal>))}</div>
    </Con></Sec>
    <Sec bg={P.cream}><Con width={1000}><ST sub="Leadership" title="The Organising Team" />
      <div className="jem-grid-4">{["Race Director", "Operations Lead", "Culture & Community", "Tourism & Partnerships"].map((role, i) => (
        <Reveal key={role} delay={i * 0.07}><Card style={{ textAlign: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${P.cream}, ${P.border})`, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", color: P.textLight, fontSize: 11 }}>Photo</div>
          <div style={{ fontWeight: 700, fontSize: 14, color: P.primary, marginBottom: 2 }}>Name Placeholder</div>
          <div style={{ fontSize: 12, color: P.textLight }}>{role}</div>
        </Card></Reveal>
      ))}</div>
    </Con></Sec>
    <Sec><Con width={580} style={{ textAlign: "center" }}>
      <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 18, color: P.primary, marginBottom: 10 }}>Governance & Acknowledgements</h3>
      <p style={{ fontSize: 14, lineHeight: 1.75, color: P.textLight, marginBottom: 32 }}>Organised in partnership with local authorities, athletics bodies, and cultural custodians of the Busoga Kingdom.</p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        <Btn label="Register Now" onClick={() => { nav("/register"); track("register_click"); }} />
        <Btn label="Become a Sponsor" onClick={() => nav("/sponsors")} variant="outline" />
      </div>
    </Con></Sec>
  </div>);
}

function RegisterPage({ nav }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", category: "Half Marathon 21K", tshirt: "M" });
  const [done, setDone] = useState(false);
  const s = k => e => setForm({ ...form, [k]: e.target.value });
  return (<div>
    <Sec bg={P.bg} style={{ paddingBottom: 40 }}><Con width={1100}><ST sub="Entry" title="Register for the Jinja Explorer Marathon" />
      <div className="jem-grid-2" style={{ alignItems: "start" }}>
        <Reveal><h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20, color: P.primary, marginBottom: 16 }}>Race Fees</h3>
          <DT headers={["Category", "Early Bird", "Regular", "Int'l"]} rows={FEES.map(f => [f.category, f.early, f.regular, f.intl])} /></Reveal>
        <Reveal delay={0.1}><h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20, color: P.primary, marginBottom: 16 }}>Start Times</h3>
          <DT headers={["Event", "Gun Time", "Assembly"]} rows={START_TIMES.map(st => [st.event, st.time, st.assembly])} />
          <div style={{ marginTop: 20 }}><Btn label="Register Now ↓" onClick={() => document.getElementById("reg-form")?.scrollIntoView({ behavior: "smooth" })} size="lg" full /></div></Reveal>
      </div>
    </Con></Sec>

    <Sec bg={P.cream} style={{ paddingTop: 48, paddingBottom: 48 }}><Con width={900}><h3 style={{ fontFamily: "var(--ff-display)", fontSize: 22, color: P.primary, textAlign: "center", marginBottom: 24 }}>What's Included</h3>
      <div className="jem-grid-4">{["Race bib with timing chip", "Finisher medal", "Official race t-shirt", "On-course hydration & nutrition", "Medical & safety support", "Post-race refreshments", "Expo & cultural showcase access", "Digital finisher certificate"].map((item, i) => (
        <Reveal key={item} delay={i * 0.04}><div style={{ display: "flex", alignItems: "start", gap: 10, fontSize: 14, color: P.text }}><span style={{ color: P.accent, fontWeight: 700, fontSize: 16 }}>✓</span> {item}</div></Reveal>
      ))}</div>
    </Con></Sec>

    <Sec><Con width={680}><h3 style={{ fontFamily: "var(--ff-display)", fontSize: 22, color: P.primary, textAlign: "center", marginBottom: 32 }}>How Registration Works</h3>
      {[{ n: 1, t: "Complete the form", d: "Fill in your details and select race category below." },
        { n: 2, t: "Make payment", d: "Mobile Money (MTN/Airtel), bank transfer, or international card. Details sent after submission." },
        { n: 3, t: "Receive confirmation", d: "Confirmation email/SMS with registration number and payment receipt." },
        { n: 4, t: "Collect bib at Expo", d: "Present photo ID + confirmation to collect bib, t-shirt, and race pack." }
      ].map((st, i) => (
        <Reveal key={st.n} delay={i * 0.07}><div style={{ display: "flex", gap: 18, alignItems: "start", marginBottom: 20 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${P.accent}, ${P.accentHover})`, color: P.bgDark, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, flexShrink: 0, fontFamily: "var(--ff-display)" }}>{st.n}</div>
          <div><div style={{ fontWeight: 700, fontSize: 15, color: P.primary, marginBottom: 3 }}>{st.t}</div><div style={{ fontSize: 14, color: P.textLight, lineHeight: 1.6 }}>{st.d}</div></div>
        </div></Reveal>
      ))}
    </Con></Sec>

    <Sec bg={P.cream} id="reg-form"><Con width={560}><h3 style={{ fontFamily: "var(--ff-display)", fontSize: 22, color: P.primary, textAlign: "center", marginBottom: 28 }}>Registration Form</h3>
      {done ? (
        <Card style={{ textAlign: "center", padding: 48 }}><div style={{ fontSize: 48, marginBottom: 14 }}>🎉</div>
          <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 24, color: P.primary, marginBottom: 10 }}>Registration Received!</h3>
          <p style={{ color: P.textLight, fontSize: 15 }}>Payment instructions arriving via email shortly.</p></Card>
      ) : (
        <Card>
          <FF label="Full Name" placeholder="Your full name" value={form.name} onChange={s("name")} required />
          <FF label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={s("email")} required />
          <FF label="Phone (with country code)" placeholder="+256 700 000 000" value={form.phone} onChange={s("phone")} required />
          <FF label="Race Category" type="select" value={form.category} onChange={s("category")} options={["5K Fun Run", "10K", "Half Marathon 21K", "Full Marathon 42K"]} />
          <FF label="T-Shirt Size" type="select" value={form.tshirt} onChange={s("tshirt")} options={["XS", "S", "M", "L", "XL", "XXL"]} />
          <p style={{ fontSize: 12, color: P.textLight, marginBottom: 18 }}>Have a team/club discount code? Enter it in the confirmation email reply.</p>
          <Btn label="Submit Registration" onClick={() => { if (form.name && form.email) { setDone(true); track("register_click"); } }} full size="lg" />
          <p style={{ fontSize: 11, color: P.textLight, marginTop: 14, textAlign: "center", lineHeight: 1.6 }}>By registering you agree to race terms. Payment details sent upon submission.</p>
        </Card>
      )}
    </Con></Sec>

    <Sec><Con width={700}><h3 style={{ fontFamily: "var(--ff-display)", fontSize: 22, color: P.primary, textAlign: "center", marginBottom: 24 }}>Entry FAQs</h3>
      {FAQS.slice(2).map((f, i) => <FAQ key={i} q={f.q} a={f.a} />)}
    </Con></Sec>
  </div>);
}

function CoursePage() {
  return (<div>
    <Sec><Con width={1000}><ST sub="The Route" title="Course Map & Details" /><Reveal><Img text="📍 Interactive Course Map Embed — Coming Soon" height={380} dark /></Reveal>
      <div style={{ textAlign: "center", marginTop: 24 }}><Btn label="Download Route Guide (PDF)" onClick={() => track("proposal_download_click")} variant="outline" icon="📄" /></div></Con></Sec>
    <Sec bg={P.cream}><Con width={1000}><ST sub="Landmarks" title="Explorer Markers" />
      <div className="jem-grid-3">{COURSE_MARKERS.map((m, i) => (<Reveal key={m.km} delay={i * 0.06}><Card hover>
        <Tag label={m.km} color={P.primaryLight} /><h4 style={{ fontFamily: "var(--ff-display)", fontSize: 17, color: P.primary, margin: "12px 0 8px" }}>{m.name}</h4>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: P.textLight, margin: 0 }}>{m.desc}</p></Card></Reveal>))}</div></Con></Sec>
    <Sec><Con width={1000}><ST sub="Support" title="Aid Stations & Medical" /><Reveal><DT headers={["Station", "Location", "Water", "Electrolytes", "Medical"]} rows={AID_STATIONS} /></Reveal></Con></Sec>
    <Sec bg={P.cream}><Con width={760}><Reveal><ST sub="Logistics" title="Safety, Transport & Parking" /></Reveal>
      <Reveal delay={0.1}><p style={{ fontSize: 15, lineHeight: 1.85, color: P.textLight }}>The course is fully marshalled with police escort, road closures, and ambulance coverage. Spectators welcome at all Explorer Marker points. Parking available at the Expo site with free shuttle to the start line. Arrive at assembly points at least 30 minutes before gun time.</p></Reveal>
      <Reveal delay={0.2}><div style={{ marginTop: 28 }}>
        <h4 style={{ fontFamily: "var(--ff-display)", fontSize: 18, color: P.primary, marginBottom: 16 }}>Best Spectator Spots</h4>
        <div className="jem-grid-3">{[
          { spot: "KM 0 — Start Line", tip: "Arrive by 5:30 AM for the Embaire fanfare and ceremonial send-off. Standing areas along Main Street." },
          { spot: "KM 8 — Nile Bridge", tip: "Iconic photo opportunity. Both sides of the bridge open to spectators with great elevation views." },
          { spot: "KM 15 — Cultural Gate", tip: "The loudest cheer zone on the course. Drums, trumpets, and community energy at its peak." },
          { spot: "KM 21 — Half Finish", tip: "Catch half marathon finishers at the lakeside promenade. Food and refreshments nearby." },
          { spot: "KM 30 — Adventure Corridor", tip: "Shaded riverside viewing along the adventure section. Bring chairs and snacks." },
          { spot: "KM 42 — Finish Line", tip: "The main celebration zone at Jinja Sports Ground. Awards, music, and post-race village." },
        ].map((s, i) => (<Card key={s.spot} style={{ padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: P.primary, marginBottom: 4 }}>{s.spot}</div>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: P.textLight, margin: 0 }}>{s.tip}</p>
        </Card>))}</div>
      </div></Reveal></Con></Sec>
  </div>);
}

function RaceWeekPage() {
  return (<div>
    <Sec><Con width={900}><ST sub="Race Week" title="Expo, Bib Collection & Schedule" />
      <Reveal><Card style={{ marginBottom: 32, borderLeft: `4px solid ${P.accent}` }}><h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20, color: P.primary, marginBottom: 14 }}>Expo & Bib Collection</h3>
        <div style={{ fontSize: 15, lineHeight: 2, color: P.textMid }}><strong>📍 Location:</strong> Jinja Sports Ground<br /><strong>📅 Dates:</strong> Thu & Fri before race day, 9 AM – 6 PM<br /><strong>📋 Required:</strong> Photo ID + registration confirmation</div></Card></Reveal>
      <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20, color: P.primary, marginBottom: 20, textAlign: "center" }}>Bib Collection Steps</h3>
      <Con width={600}>{["Arrive at Expo with ID and confirmation.", "Proceed to Registration Desk — present documents.", "Receive bib, timing chip, t-shirt, and race pack.", "Visit sponsor booths, cultural exhibits, Tourism Village.", "Attend optional talks and shakeout runs (see schedule)."].map((st, i) => (
        <Reveal key={i} delay={i * 0.06}><div style={{ display: "flex", gap: 14, alignItems: "start", marginBottom: 16 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: P.accent, color: P.bgDark, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
          <p style={{ fontSize: 14, color: P.text, margin: 0, lineHeight: 1.65 }}>{st}</p></div></Reveal>
      ))}</Con></Con></Sec>
    <Sec bg={P.cream}><Con width={1100}><ST sub="Schedule" title="Race Week at a Glance" />
      <div className="jem-grid-4">{RACE_WEEK_SCHEDULE.map((d, i) => (<Reveal key={d.day} delay={i * 0.07}><Card>
        <h4 style={{ fontFamily: "var(--ff-display)", fontSize: 16, color: P.primary, marginBottom: 12 }}>{d.day}</h4>
        {d.events.map((e, j) => <div key={j} style={{ fontSize: 13, color: P.textLight, lineHeight: 2, paddingLeft: 14, position: "relative" }}><span style={{ position: "absolute", left: 0, color: P.accent, fontSize: 8, top: 8 }}>●</span>{e}</div>)}</Card></Reveal>))}</div></Con></Sec>
    <Sec><Con width={600}><ST sub="Prepare" title="Race Day Checklist" /><Reveal><Card>
      {["Race bib pinned to front of shirt", "Timing chip on shoe", "Running shoes & race outfit", "Sunscreen & cap/visor", "Vaseline / anti-chafe", "Energy gels or snacks", "Hydration plan", "Phone for tracking & photos", "Photo ID for security check", "Positive attitude 🏃‍♂️"].map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 9 ? `1px solid ${P.borderLight}` : "none", fontSize: 14, color: P.text }}><span style={{ color: P.accent, fontSize: 16 }}>☐</span> {item}</div>
      ))}</Card></Reveal></Con></Sec>
    <Sec bg={P.cream}><Con width={560} style={{ textAlign: "center" }}><h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20, color: P.primary, marginBottom: 12 }}>Need Help?</h3>
      <p style={{ fontSize: 14, color: P.textLight, marginBottom: 20 }}>Contact the Help Desk at Expo or reach us anytime.</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Btn label="💬 WhatsApp" onClick={() => window.open(`https://wa.me/${SITE.whatsapp}`, "_blank")} variant="ghost" />
        <Btn label="✉ Email Us" onClick={() => window.open(`mailto:${SITE.email}`)} variant="outline" /></div></Con></Sec>
  </div>);
}

function ExploreJinjaPage({ nav }) {
  return (<div>
    <section style={{ padding: "96px 24px 80px", textAlign: "center", background: `linear-gradient(168deg, ${P.navyDark}, ${P.primary})` }}><Con width={700}>
      <Reveal><SL text="Beyond the Finish Line" /></Reveal>
      <Reveal delay={0.1}><h1 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(32px, 5vw, 52px)", color: P.white, fontWeight: 800, lineHeight: 1.1, margin: "0 0 18px" }}>Plan Your Explorer Weekend</h1></Reveal>
      <Reveal delay={0.2}><p style={{ color: "rgba(255,255,255,0.6)", fontSize: 17, lineHeight: 1.7 }}>Turn your race into a full destination experience with curated itineraries.</p></Reveal>
    </Con></section>
    <Sec><Con><ST sub="Itineraries" title="Choose Your Weekend" />
      <div className="jem-grid-3">{ITINERARIES.map((it, i) => (<Reveal key={it.title} delay={i * 0.1}><Card hover style={{ borderTop: `4px solid ${it.color}` }}>
        <div style={{ fontSize: 48, marginBottom: 16, textAlign: "center" }}>{it.emoji}</div>
        <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 22, color: P.primary, textAlign: "center", marginBottom: 16 }}>{it.title}</h3>
        {it.highlights.map((h, j) => <div key={j} style={{ fontSize: 14, lineHeight: 2, color: P.textLight, paddingLeft: 22, position: "relative" }}><span style={{ position: "absolute", left: 0, color: it.color, fontWeight: 700 }}>{j + 1}.</span>{h}</div>)}</Card></Reveal>))}</div></Con></Sec>
    <Sec bg={P.cream}><Con><ST sub="Explorer Guides" title="Discover Jinja" />
      <div className="jem-grid-5">{[
        { e: "🌊", t: "Adventure", d: "Rafting, bungee, quad biking, kayaking, horseback riding." },
        { e: "🎵", t: "Culture", d: "Busoga heritage, craft markets, traditional music." },
        { e: "🍽️", t: "Food", d: "Local cuisine, lakeside dining, craft coffee, rolex." },
        { e: "🏨", t: "Stay", d: "Luxury lodges, boutique hotels, hostels, eco-camps." },
        { e: "🚗", t: "Transport", d: "Airport transfers, boda-bodas, car hire, shuttles." },
      ].map((g, i) => (<Reveal key={g.t} delay={i * 0.06}><Card hover><div style={{ fontSize: 28, marginBottom: 10 }}>{g.e}</div>
        <h4 style={{ fontFamily: "var(--ff-display)", fontSize: 16, color: P.primary, marginBottom: 6 }}>{g.t}</h4>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: P.textLight, margin: 0 }}>{g.d}</p></Card></Reveal>))}</div></Con></Sec>
    <Sec><Con width={900}><ST sub="Partners" title="Where to Stay & What to Do" />
      <div className="jem-grid-4">{["Nile River Lodge", "Jinja Backpackers", "Wildwaters Lodge", "Haven Jinja"].map(p => (
        <Card key={p} style={{ textAlign: "center", opacity: 0.7 }}><div style={{ width: 80, height: 40, background: P.cream, borderRadius: 6, margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: P.textLight }}>Logo</div>
          <div style={{ fontWeight: 600, fontSize: 14, color: P.primary }}>{p}</div><div style={{ fontSize: 11, color: P.textLight, marginTop: 2 }}>Details coming soon</div></Card>
      ))}</div>
      <div style={{ textAlign: "center", marginTop: 32, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        <Btn label="Register for the Race" onClick={() => { nav("/register"); track("register_click"); }} />
        <Btn label="Download Itinerary PDF" onClick={() => track("proposal_download_click")} variant="outline" icon="📄" /></div></Con></Sec>
  </div>);
}

function CulturePage() {
  const [filter, setFilter] = useState("All");
  const [pf, setPf] = useState({ email: "", phone: "", pledge: "Volunteer" });
  const [pledged, setPledged] = useState(false);
  const filtered = filter === "All" ? INSTRUMENTS : INSTRUMENTS.filter(i => i.tag === filter);
  const tc = { Protocol: P.primary, Hype: P.terracotta, Chill: P.nileBlue, Story: "#6B4C9A" };
  return (<div>
    <section style={{ padding: "96px 24px 80px", background: `linear-gradient(168deg, ${P.navyDark}, ${P.primary})`, textAlign: "center" }}><Con width={700}>
      <Reveal><SL text="A Signature Experience" /></Reveal>
      <Reveal delay={0.1}><h1 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(32px, 5vw, 52px)", color: P.white, fontWeight: 800, lineHeight: 1.1, margin: "0 0 18px" }}>The Explorer Sound of Busoga</h1></Reveal>
      <Reveal delay={0.2}><p style={{ color: "rgba(255,255,255,0.6)", fontSize: 17, lineHeight: 1.75 }}>From royal xylophones to sacred trumpets — these instruments define the soundtrack of our race and our culture.</p></Reveal>
    </Con></section>

    <Sec><Con width={1100}>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
        {["All", "Protocol", "Hype", "Chill", "Story"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "9px 22px", borderRadius: 24, border: "none", cursor: "pointer",
            background: filter === f ? P.primary : P.cream, color: filter === f ? P.white : P.textLight,
            fontWeight: 600, fontSize: 13, transition: "all 0.25s",
            boxShadow: filter === f ? "0 4px 16px rgba(27,67,50,0.2)" : "none",
          }}>{f}</button>
        ))}
      </div>
      <div className="jem-grid-2">{filtered.map((inst, i) => (
        <Reveal key={inst.id} delay={i * 0.06}><Card hover>
          <Img text={`${inst.emoji}  ${inst.name} — Photo`} height={180} />
          <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "start", gap: 8 }}>
            <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 22, color: P.primary, margin: 0 }}>{inst.name}</h3>
            <Tag label={inst.tag} color={tc[inst.tag]} /></div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: P.textLight, margin: "10px 0" }}>{inst.desc}</p>
          <p style={{ fontSize: 12, color: P.accent, fontWeight: 600, margin: "0 0 16px" }}>Best for: {inst.best}</p>
          <button onClick={() => track("audio_play", { instrument: inst.name })} style={{
            width: "100%", background: `linear-gradient(135deg, ${P.primary}, ${P.primaryLight})`, color: P.white,
            border: "none", padding: "13px", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 14,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          }}>▶ Play {inst.name}</button></Card></Reveal>
      ))}</div></Con></Sec>

    <Sec bg={P.cream}><Con width={640} style={{ textAlign: "center" }}><ST sub="Twegaite" title="Come Together" />
      <p style={{ fontSize: 16, lineHeight: 1.8, color: P.textLight, marginBottom: 36 }}><em>Twegaite</em> — "Come Together" in Lusoga. The heart of the Jinja Explorer Marathon. Make your pledge below.</p>
      {pledged ? (<Card style={{ padding: 48 }}><div style={{ fontSize: 48, marginBottom: 14 }}>🤝</div><h3 style={{ fontFamily: "var(--ff-display)", fontSize: 22, color: P.primary }}>Thank You!</h3><p style={{ color: P.textLight }}>Together, we run.</p></Card>
      ) : (<Card style={{ textAlign: "left" }}>
        <FF label="Email" type="email" placeholder="you@example.com" value={pf.email} onChange={e => setPf({ ...pf, email: e.target.value })} required />
        <FF label="Phone" placeholder="+256 700 000 000" value={pf.phone} onChange={e => setPf({ ...pf, phone: e.target.value })} />
        <FF label="Your Pledge" type="select" value={pf.pledge} onChange={e => setPf({ ...pf, pledge: e.target.value })} options={["Volunteer", "Bring a Friend", "Sponsor a Runner", "Donate"]} />
        <p style={{ fontSize: 11, color: P.textLight, margin: "0 0 18px", lineHeight: 1.5 }}>By submitting you consent to communications about JEM. Unsubscribe anytime.</p>
        <Btn label="Make My Pledge" onClick={() => { if (pf.email.includes("@")) { setPledged(true); track("twegaite_pledge"); } }} full size="lg" /></Card>)}</Con></Sec>

    <Sec style={{ paddingTop: 48, paddingBottom: 48 }}><Con width={700} style={{ textAlign: "center" }}>
      <h4 style={{ fontFamily: "var(--ff-display)", fontSize: 18, color: P.primary, marginBottom: 12 }}>Cultural Acknowledgements</h4>
      <p style={{ fontSize: 14, lineHeight: 1.8, color: P.textLight }}>We acknowledge the Busoga Kingdom, the Kyabazinga, and all cultural custodians. Content curated with recognized practitioners and presented with utmost respect.</p></Con></Sec>
  </div>);
}

function ResultsPage() {
  return (<Sec><Con width={700} style={{ textAlign: "center" }}><ST sub="Results" title="Race Results & Winners" />
    <Reveal><Card style={{ padding: 56 }}><div style={{ fontSize: 56, marginBottom: 18 }}>🏅</div>
      <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 24, color: P.primary, marginBottom: 12 }}>Results Coming Soon</h3>
      <p style={{ fontSize: 15, lineHeight: 1.75, color: P.textLight, maxWidth: 420, margin: "0 auto" }}>Results published after the inaugural race in {SITE.date}. Check back for winner tables, downloads, and photo highlights.</p></Card></Reveal>
    <div style={{ marginTop: 44 }}><h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20, color: P.primary, marginBottom: 20 }}>Post-Race Features:</h3>
      <div className="jem-grid-2" style={{ textAlign: "left" }}>{["Winners by category & gender", "Full results download (CSV/PDF)", "Photo highlights gallery", "Course records & statistics"].map((item, i) => (
        <Reveal key={item} delay={i * 0.06}><Card style={{ padding: 18, opacity: 0.6 }}><p style={{ fontSize: 14, color: P.textLight, margin: 0, display: "flex", gap: 8 }}><span>📋</span>{item}</p></Card></Reveal>
      ))}</div></div></Con></Sec>);
}

function SponsorsPage() {
  const [form, setForm] = useState({ name: "", org: "", email: "", phone: "", budget: "Select...", message: "" });
  const [sent, setSent] = useState(false);
  const s = k => e => setForm({ ...form, [k]: e.target.value });
  return (<div>
    <Sec><Con width={800} style={{ textAlign: "center" }}><ST sub="Partners" title="Sponsor the Jinja Explorer Marathon" />
      <p style={{ fontSize: 17, lineHeight: 1.85, color: P.textLight, maxWidth: 560, margin: "0 auto" }}>Align your brand with East Africa's most distinctive destination marathon. Reach runners, tourists, cultural enthusiasts, and media.</p></Con></Sec>
    <Sec bg={P.cream} style={{ paddingTop: 0 }}><Con>
      <div className="jem-grid-4">{SPONSOR_TIERS.map((t, i) => (<Reveal key={t.tier} delay={i * 0.08}><Card hover style={{ borderTop: `4px solid ${P.accent}` }}>
        <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 19, color: P.primary, marginBottom: 4 }}>{t.tier}</h3>
        <div style={{ fontSize: 16, fontWeight: 700, color: P.accent, marginBottom: 14 }}>{t.price}</div>
        {t.perks.map((pk, j) => <div key={j} style={{ fontSize: 13, lineHeight: 1.9, color: P.textLight, paddingLeft: 14, position: "relative" }}><span style={{ position: "absolute", left: 0, color: P.accent }}>✓</span>{pk}</div>)}
      </Card></Reveal>))}</div></Con></Sec>
    <Sec><Con width={1000}><ST sub="Inventory" title="Activation Opportunities" />
      <Reveal><DT compact headers={["Activation", "Title", "Gold", "Silver", "Community"]} rows={[
        ["Start/Finish branding", "✓", "✓", "—", "—"], ["KM gate naming", "✓", "✓", "—", "—"],
        ["Expo headline booth", "✓", "—", "—", "—"], ["Expo standard booth", "—", "✓", "✓", "—"],
        ["Tourism Village", "—", "—", "✓", "✓"], ["Culture stage branding", "✓", "✓", "—", "—"],
        ["Digital & social media", "✓", "✓", "✓", "✓"], ["Bib logo", "✓", "✓", "—", "—"],
        ["VIP hospitality", "✓", "✓", "✓", "—"],
      ]} /></Reveal>
      <div style={{ textAlign: "center", marginTop: 28 }}><Btn label="Download Sponsorship Proposal" onClick={() => track("proposal_download_click")} variant="outline" icon="📄" /></div></Con></Sec>
    <Sec bg={P.cream}><Con width={560}><ST sub="Inquire" title="Sponsor Inquiry" />
      {sent ? (<Card style={{ textAlign: "center", padding: 48 }}><div style={{ fontSize: 48, marginBottom: 14 }}>✉️</div><h3 style={{ fontFamily: "var(--ff-display)", fontSize: 22, color: P.primary }}>Inquiry Sent!</h3><p style={{ color: P.textLight }}>We'll respond within 48 hours.</p></Card>
      ) : (<Card>
        <FF label="Your Name" placeholder="Full name" value={form.name} onChange={s("name")} required />
        <FF label="Organisation" placeholder="Company or brand" value={form.org} onChange={s("org")} required />
        <FF label="Email" type="email" placeholder="you@company.com" value={form.email} onChange={s("email")} required />
        <FF label="Phone" placeholder="+256 700 000 000" value={form.phone} onChange={s("phone")} />
        <FF label="Budget Range" type="select" value={form.budget} onChange={s("budget")} options={["Select...", "Community ($1K+)", "Silver ($5K+)", "Gold ($10K+)", "Title (Custom)"]} />
        <FF label="Message" type="textarea" placeholder="Tell us about your brand..." value={form.message} onChange={s("message")} />
        <Btn label="Submit Inquiry" onClick={() => { if (form.name && form.email) { setSent(true); track("sponsor_inquiry_submit"); } }} full size="lg" /></Card>)}</Con></Sec>
  </div>);
}

function MediaPage() {
  return (<Sec><Con width={900}><ST sub="Press & Media" title="Media Centre" />
    <Reveal><Card style={{ textAlign: "center", marginBottom: 36, padding: 36, borderLeft: `4px solid ${P.accent}` }}>
      <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20, color: P.primary, marginBottom: 10 }}>Media Kit</h3>
      <p style={{ fontSize: 14, color: P.textLight, marginBottom: 18 }}>Logos, brand guidelines, high-res images, and fact sheets.</p>
      <Btn label="Download Media Kit (ZIP)" onClick={() => track("proposal_download_click")} icon="📦" /></Card></Reveal>

    <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20, color: P.primary, marginBottom: 18 }}>Press Releases</h3>
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 44 }}>
      {[{ d: "Feb 2026", t: "Jinja Explorer Marathon Announced for November 2026" },
        { d: "Mar 2026", t: "Early Bird Registration Opens" },
        { d: "Apr 2026", t: "Busoga Cultural Soundboard: A First for African Marathons" },
      ].map((pr, i) => (<Reveal key={pr.t} delay={i * 0.06}><Card style={{ padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div><Tag label={pr.d} /><h4 style={{ fontSize: 15, fontWeight: 600, color: P.primary, margin: "8px 0 0" }}>{pr.t}</h4></div>
          <Btn label="Read" variant="ghost" size="sm" onClick={() => {}} /></div></Card></Reveal>))}</div>

    <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20, color: P.primary, marginBottom: 18 }}>Photo Gallery</h3>
    <div className="jem-grid-3">{["Jinja City aerial", "Nile bridge sunrise", "Busoga drums", "Runners on trail", "Expo setup", "Finisher celebrations"].map((p, i) => (
      <Reveal key={p} delay={i * 0.04}><Img text={`📷 ${p}`} height={180} /></Reveal>))}</div>

    <h3 style={{ fontFamily: "var(--ff-display)", fontSize: 20, color: P.primary, margin: "44px 0 18px" }}>Video</h3>
    <Reveal><Img text="🎬 Promo Video — Coming Soon" height={320} dark /></Reveal></Con></Sec>);
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const s = k => e => setForm({ ...form, [k]: e.target.value });
  return (<Sec><Con width={960}><ST sub="Get in Touch" title="Contact Us" />
    <div className="jem-grid-2" style={{ alignItems: "start" }}>
      <Reveal>{sent ? (<Card style={{ textAlign: "center", padding: 48 }}><div style={{ fontSize: 48, marginBottom: 14 }}>✅</div><h3 style={{ fontFamily: "var(--ff-display)", fontSize: 22, color: P.primary }}>Message Sent!</h3><p style={{ color: P.textLight }}>We'll respond within 48 hours.</p></Card>
      ) : (<Card>
        <FF label="Name" placeholder="Your name" value={form.name} onChange={s("name")} required />
        <FF label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={s("email")} required />
        <FF label="Subject" placeholder="What's this about?" value={form.subject} onChange={s("subject")} />
        <FF label="Message" type="textarea" placeholder="Your message..." value={form.message} onChange={s("message")} required />
        <Btn label="Send Message" onClick={() => { if (form.name && form.email && form.message) setSent(true); }} full size="lg" /></Card>)}</Reveal>
      <Reveal delay={0.1}><div>
        <Card style={{ marginBottom: 16 }}><h3 style={{ fontFamily: "var(--ff-display)", fontSize: 18, color: P.primary, marginBottom: 14 }}>Reach Us Directly</h3>
          <div style={{ fontSize: 14, lineHeight: 2.4, color: P.textLight }}>✉ {SITE.email}<br />☏ {SITE.phone}<br />⊕ Jinja City, Busoga Region, Uganda</div>
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: P.white,
            padding: "11px 22px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 14, marginTop: 14,
          }}>💬 WhatsApp</a></Card>
        <Card style={{ marginBottom: 16 }}><h3 style={{ fontFamily: "var(--ff-display)", fontSize: 18, color: P.primary, marginBottom: 14 }}>Follow Us</h3>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{["Instagram", "X / Twitter", "Facebook", "YouTube", "TikTok"].map(soc => (
            <span key={soc} style={{ padding: "8px 14px", borderRadius: 8, background: P.cream, fontSize: 12, fontWeight: 600, color: P.textLight, border: `1px solid ${P.borderLight}` }}>{soc}</span>
          ))}</div></Card>
        <Img text="📍 Google Maps — Jinja City" height={200} />
      </div></Reveal>
    </div></Con></Sec>);
}

/* ═══ MAIN APP ═══ */
function App() {
  const [page, setPage] = useState("/");
  const nav = useCallback((p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  const render = () => {
    switch (page) {
      case "/about": return <AboutPage nav={nav} />;
      case "/register": return <RegisterPage nav={nav} />;
      case "/course": return <CoursePage />;
      case "/race-week": return <RaceWeekPage />;
      case "/explore-jinja": return <ExploreJinjaPage nav={nav} />;
      case "/culture": return <CulturePage />;
      case "/results": return <ResultsPage />;
      case "/sponsors": return <SponsorsPage />;
      case "/media": return <MediaPage />;
      case "/contact": return <ContactPage />;
      default: return <HomePage nav={nav} />;
    }
  };

  /* JSON-LD Event Schema (PRD §9) */
  const eventSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "name": SITE.name,
    "description": SITE.story,
    "startDate": "2026-11-01T06:00:00+03:00",
    "endDate": "2026-11-01T14:00:00+03:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Jinja City",
      "address": { "@type": "PostalAddress", "addressLocality": "Jinja", "addressRegion": "Busoga", "addressCountry": "UG" }
    },
    "organizer": { "@type": "Organization", "name": "Jinja Explorer Marathon", "url": "https://jinjaexplorermarathon.com" },
    "offers": FEES.map(f => ({
      "@type": "Offer", "name": f.category, "price": f.regular.replace(/[^0-9]/g, ""),
      "priceCurrency": f.regular.includes("UGX") ? "UGX" : "USD", "availability": "https://schema.org/InStock"
    })),
    "sport": "Marathon Running",
    "image": "https://jinjaexplorermarathon.com/og-image.jpg"
  });

  const seo = SEO[page] || SEO["/"];

  return (
    <>
      {/* Structured Data + OG Tags (PRD §9) */}
      {page === "/" && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: eventSchema }} />}
      <div style={{ display: "none" }} data-og-title={seo.title} data-og-description={seo.desc} data-og-type="website" data-og-image="https://jinjaexplorermarathon.com/og-image.jpg" data-og-url={`https://jinjaexplorermarathon.com${page}`} aria-hidden="true" />

      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header currentPage={page} onNavigate={nav} />
        <main style={{ flex: 1 }}>{render()}</main>
        {page !== "/register" && (
          <div className="jem-mobile-register" style={{
            position: "fixed", bottom: 0, left: 0, right: 0, padding: "12px 20px",
            background: "rgba(13,21,32,0.95)", backdropFilter: "blur(12px)",
            borderTop: `1px solid ${P.accent}22`, zIndex: 90,
          }}>
            <button onClick={() => { nav("/register"); track("register_click"); }} style={{
              width: "100%", background: `linear-gradient(135deg, ${P.accent}, ${P.accentHover})`, color: P.bgDark,
              border: "none", padding: "14px", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer",
            }}>Register Now — {SITE.dateShort}</button>
          </div>
        )}
        <Footer onNavigate={nav} />
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
