// ═══════════════════════════════════════════════════════════
// JEM SITE CONFIG — All editable content lives here
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  site: {
    name: "Jinja Explorer Marathon",
    tagline: "Run the Royal Gateway. Explore the Adventure City.",
    story: "A destination marathon hosted in Jinja — gateway of Busoga and Uganda's adventure city — combining world-class race operations with tourism and culture.",
    date: "November 2026",
    dateShort: "Nov 2026",
    location: "Jinja City, Uganda",
    email: "info@jinjaexplorermarathon.com",
    phone: "+256 700 000 000",
    whatsapp: "+256700000000",
    socials: {
      facebook: "https://facebook.com/jinjaexplorermarathon",
      instagram: "https://instagram.com/jinjaexplorermarathon",
      twitter: "https://x.com/JinjaExplorer",
      youtube: "https://youtube.com/@jinjaexplorermarathon",
      strava: "https://strava.com/clubs/jinjaexplorer"
    }
  },
  fees: [
    { category: "5K Fun Run", early: "UGX 30,000", regular: "UGX 50,000", intl: "$15" },
    { category: "10K", early: "UGX 60,000", regular: "UGX 80,000", intl: "$25" },
    { category: "Half Marathon 21K", early: "UGX 100,000", regular: "UGX 130,000", intl: "$40" },
    { category: "Full Marathon 42K", early: "UGX 150,000", regular: "UGX 200,000", intl: "$60" },
  ],
  startTimes: [
    { event: "Full Marathon (42K)", time: "06:00 AM", assembly: "05:15 AM" },
    { event: "Half Marathon (21K)", time: "06:30 AM", assembly: "05:45 AM" },
    { event: "10K", time: "07:00 AM", assembly: "06:30 AM" },
    { event: "5K Fun Run", time: "08:00 AM", assembly: "07:30 AM" },
  ],
  pillars: [
    { icon: "◈", title: "Belonging", desc: "A race for every runner — from first-timers to elites. Twegaite: Come Together.", color: "#C8963E" },
    { icon: "◆", title: "Pride", desc: "Celebrating Busoga heritage, the Kyabazinga's legacy, and Uganda's running culture.", color: "#C45B28" },
    { icon: "▣", title: "Legacy", desc: "Building a world-class annual race that drives lasting value for Jinja and Busoga.", color: "#1C2D4F" },
    { icon: "◎", title: "Adventure", desc: "Jinja is Uganda's adventure capital — rafting, bungee, wildlife, and the mighty Nile.", color: "#2E86AB" },
    { icon: "✦", title: "Stewardship", desc: "Eco-conscious operations, community reinvestment, and responsible tourism.", color: "#4A7C59" },
  ],
  instruments: [
    { id: "embaire", name: "Embaire", tag: "Protocol", desc: "The royal xylophone of Busoga — a signature cultural motif and ceremonial centrepiece with wooden keys over banana-stem resonators.", best: "Opening ceremony, start line fanfare", emoji: "🎶" },
    { id: "bigwala", name: "Bigwala", tag: "Protocol", desc: "Sacred gourd trumpets traditionally played during royal coronations and state processions of the Kyabazinga.", best: "Royal protocols, VIP arrivals", emoji: "📯" },
    { id: "drums", name: "Engalabi Drums", tag: "Hype", desc: "Powerful long drums with lizard-skin heads that drive energy, rhythm and unity at celebrations and gatherings.", best: "Km gate hype zones, finish line energy", emoji: "🥁" },
    { id: "shakers", name: "Ensaasi Shakers", tag: "Hype", desc: "Gourd shakers filled with seeds, adding rhythmic texture and enabling crowd participation in communal music.", best: "Crowd zones, cheer points", emoji: "🎵" },
    { id: "flute", name: "Endere Flute", tag: "Chill", desc: "A soft bamboo flute producing meditative, breathy melodies deeply tied to Busoga storytelling traditions.", best: "Cool-down zones, post-race relaxation", emoji: "🎼" },
    { id: "lyre", name: "Endongo Lyre", tag: "Story", desc: "A stringed bowl lyre used by griots, storytellers and poets to accompany oral histories and evening gatherings.", best: "Cultural expo, storytelling sessions", emoji: "🎻" },
  ],
  sponsorTiers: [
    { tier: "Title Partner", price: "Custom", perks: ["Full naming rights", "Start/finish branding", "All media & digital", "VIP hospitality (20 pax)", "Expo headline booth", "Bib & medal logo"] },
    { tier: "Gold Sponsor", price: "From $10,000", perks: ["Km gate branding (2 gates)", "Expo premium booth", "Bib logo placement", "Digital & social media", "VIP passes (10 pax)"] },
    { tier: "Silver Sponsor", price: "From $5,000", perks: ["Expo standard booth", "Digital media mentions", "Hydration station branding", "Event passes (5 pax)", "Website logo"] },
    { tier: "Community Partner", price: "In-kind / $1,000+", perks: ["Logo on website", "Social media mentions", "Tourism village presence", "Event passes (2 pax)"] },
  ],
  itineraries: [
    { title: "Runner Weekend", emoji: "🏃", color: "#C8963E", highlights: ["Expo & bib collection Friday", "Race day Saturday — chase your PB", "Recovery brunch & Nile cruise Sunday"] },
    { title: "Family Weekend", emoji: "👨‍👩‍👧‍👦", color: "#4A7C59", highlights: ["Kids' fun run Saturday morning", "Cultural showcase & Busoga food market", "Source of the Nile boat trip Sunday"] },
    { title: "Adventure Weekend", emoji: "🌊", color: "#2E86AB", highlights: ["White-water rafting Friday", "Race day Saturday — run the Nile route", "Bungee jumping & quad biking Sunday"] },
  ],
  faqs: [
    { q: "When and where is the race?", a: "The Jinja Explorer Marathon takes place in November 2026 in Jinja City, Uganda — the adventure capital at the source of the Nile." },
    { q: "What distances are available?", a: "We offer 5K Fun Run, 10K, Half Marathon (21K), and Full Marathon (42K) categories for all abilities." },
    { q: "How do I register?", a: "Click the Register button to access our form. Payment is via Mobile Money (MTN/Airtel), bank transfer, or international card." },
    { q: "Can I get a refund or transfer my entry?", a: "Entries are non-refundable but transferable to another runner up to 14 days before race day. A small transfer fee applies." },
    { q: "Is there a minimum age requirement?", a: "5K: 10+, 10K: 14+, 21K: 16+, 42K: 18+. Runners under 18 need guardian consent at registration." },
    { q: "What is included in my entry fee?", a: "Race bib with timing chip, finisher medal, official race t-shirt, hydration on course, medical support, post-race refreshments, and digital certificate." },
  ],
  courseMarkers: [
    { km: "KM 0", name: "Start — Main Street, Jinja", desc: "The race launches in the heart of Jinja City with a ceremonial Embaire fanfare and Bigwala trumpets." },
    { km: "KM 8", name: "Nile Bridge Crossing", desc: "Runners cross the iconic Nile bridge with panoramic views of Bujagali Falls and the river below." },
    { km: "KM 15", name: "Busoga Cultural Gate", desc: "A Bigwala trumpet zone marks the heritage stretch — Engalabi drums drive the pace forward." },
    { km: "KM 21", name: "Half Marathon Finish", desc: "Half marathon runners finish at the lakeside promenade with medal ceremony and refreshments." },
    { km: "KM 30", name: "Adventure Corridor", desc: "The route passes rafting launch points and riverside trails — cheering zones line the path." },
    { km: "KM 42", name: "Finish — Jinja Sports Ground", desc: "A roaring finish with drums, medals, photo wall, and the full celebration of Twegaite." },
  ],
  aidStations: [
    { name: "Station 1", location: "KM 5", water: true, electrolytes: false, medical: "First Aid" },
    { name: "Station 2", location: "KM 10", water: true, electrolytes: true, medical: "First Aid" },
    { name: "Station 3", location: "KM 15", water: true, electrolytes: true, medical: "Paramedic" },
    { name: "Station 4", location: "KM 20", water: true, electrolytes: true, medical: "First Aid" },
    { name: "Station 5", location: "KM 25", water: true, electrolytes: true, medical: "Paramedic" },
    { name: "Station 6", location: "KM 30", water: true, electrolytes: true, medical: "First Aid" },
    { name: "Station 7", location: "KM 35", water: true, electrolytes: true, medical: "Paramedic" },
    { name: "Station 8", location: "KM 40", water: true, electrolytes: true, medical: "First Aid" },
  ],
  raceWeekSchedule: [
    { day: "Thursday", events: ["Expo opens 9 AM – 6 PM", "Bib collection begins", "Welcome talk — Race Director", "Tourism Village opens"] },
    { day: "Friday", events: ["Expo continues 9 AM – 6 PM", "Shakeout run 7 AM (Nile promenade)", "Cultural showcase & Soundboard preview", "Pasta party 6 PM (Sports Ground)"] },
    { day: "Saturday — Race Day", events: ["Assembly from 5:15 AM", "42K gun: 6:00 AM", "21K gun: 6:30 AM", "10K gun: 7:00 AM", "5K gun: 8:00 AM", "Awards ceremony 12:00 PM"] },
    { day: "Sunday", events: ["Recovery yoga 7 AM", "Nile cruise (optional, bookable)", "Adventure activities", "Farewell brunch 11 AM"] },
  ],
  accommodation: [
    { name: "Jinja Nile Resort", type: "Luxury", price: "$120–200/night", location: "Nile bank, 5 min from start", phone: "+256 700 000 001", website: "#", desc: "Premium riverfront resort with pool, spa, and Nile views." },
    { name: "Explorers River Camp", type: "Mid-range", price: "$50–90/night", location: "Bujagali, 15 min from start", phone: "+256 700 000 002", website: "#", desc: "Adventure-friendly camp with riverside cabins and rafting access." },
    { name: "The Pearl of Jinja", type: "Mid-range", price: "$40–70/night", location: "Jinja town centre", phone: "+256 700 000 003", website: "#", desc: "Central location, walking distance to expo and start line." },
    { name: "Nile Backpackers", type: "Budget", price: "$15–30/night", location: "Bujagali Falls area", phone: "+256 700 000 004", website: "#", desc: "Social hostel popular with international visitors and runners." },
    { name: "Haven Lodge Jinja", type: "Boutique", price: "$80–140/night", location: "Quiet lakeside setting", phone: "+256 700 000 005", website: "#", desc: "Eco-boutique lodge with gardens, pool, and local cuisine." },
  ],
  transport: {
    fromEntebbe: "Jinja is approximately 3 hours (130 km) east of Entebbe International Airport via the Kampala-Jinja Highway. Shared shuttles, private hire, and Post Bus services run daily.",
    fromKampala: "Jinja is 80 km east of Kampala — about 2 hours by road. Regular buses and minibus taxis depart from Kampala's main bus park throughout the day.",
    local: "Within Jinja, boda-bodas (motorcycle taxis) and special-hire vehicles are the most common transport. Ride-hailing apps like SafeBoda operate in Jinja.",
    raceDay: "Free shuttle buses will run from designated hotels to the start/finish area on race morning. Details will be confirmed closer to the event."
  },
  routeLinks: {
    "42K": { strava: "#", gpx: "#", google: "#" },
    "21K": { strava: "#", gpx: "#", google: "#" },
    "10K": { strava: "#", gpx: "#", google: "#" },
    "5K": { strava: "#", gpx: "#", google: "#" },
  },
  seo: {
    "/": { title: "Jinja Explorer Marathon — Run the Royal Gateway", desc: "A destination marathon in Jinja, Uganda. 5K, 10K, Half & Full Marathon. Explore Busoga culture, Nile adventures & world-class race operations." },
    "/about": { title: "About — Jinja Explorer Marathon", desc: "Discover the story behind East Africa's most distinctive destination marathon." },
    "/register": { title: "Register — Jinja Explorer Marathon", desc: "Entry fees, start times, and registration. 5K from UGX 30,000." },
    "/course": { title: "Course & Route — Jinja Explorer Marathon", desc: "Explore the certified race course through Jinja City and along the Nile." },
    "/race-week": { title: "Race Week & Expo — Jinja Explorer Marathon", desc: "Expo details, bib collection, race week schedule and race day checklist." },
    "/explore-jinja": { title: "Explore Jinja — Tourism & Itineraries", desc: "Plan your Explorer Weekend in Uganda's adventure capital." },
    "/culture": { title: "Busoga Culture Soundboard — Jinja Explorer Marathon", desc: "Experience the instruments and sounds of Busoga kingdom." },
    "/results": { title: "Results & Winners — Jinja Explorer Marathon", desc: "Race results, winner tables, and photo highlights." },
    "/sponsors": { title: "Sponsor — Jinja Explorer Marathon", desc: "Partnership packages for East Africa's premier destination marathon." },
    "/media": { title: "Media Centre — Jinja Explorer Marathon", desc: "Press kit, press releases, and media resources." },
    "/contact": { title: "Contact — Jinja Explorer Marathon", desc: "Get in touch with the Jinja Explorer Marathon team." },
  },
};
