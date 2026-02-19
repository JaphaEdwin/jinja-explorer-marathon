/* ═══════════════════════════════════════════════════════════
   JEM APP v2 — Jinja Explorer Marathon SPA
   Hash routing · 11 pages + Admin · Tickets · Email sim
   ═══════════════════════════════════════════════════════════ */

const S = CONFIG.site;
const app = document.getElementById('app');

/* ─── ADMIN CREDENTIALS ─── */
const ADMIN_CREDS = {
  email: "admin@jinjaexplorermarathon.com",
  password: "JEM2026"
};
let isAdminLoggedIn = false;

/* ─── LOCAL DATA STORE (shared between public + admin) ─── */
const STORE_KEYS = { regs: 'jem-registrations', subs: 'jem-submissions' };

function loadStore(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
}
function saveStore(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch { }
}

// Seed sample data on first load
function seedSampleData() {
  if (localStorage.getItem('jem-seeded')) return;
  const sampleRegs = [
    { id: "JEM-A1B2C", firstName: "Sarah", lastName: "Namukasa", email: "sarah@example.com", phone: "+256 701 234 567", category: "Full Marathon 42K", tshirt: "M", gender: "Female", nationality: "Uganda", status: "Paid", date: "2026-02-15T10:30:00", payment: "MTN MoMo" },
    { id: "JEM-D3E4F", firstName: "James", lastName: "Okello", email: "james.o@example.com", phone: "+256 772 345 678", category: "Half Marathon 21K", tshirt: "L", gender: "Male", nationality: "Uganda", status: "Paid", date: "2026-02-16T14:20:00", payment: "Airtel Money" },
    { id: "JEM-G5H6I", firstName: "Emma", lastName: "Van der Berg", email: "emma.vdb@example.com", phone: "+31 612 345 678", category: "Full Marathon 42K", tshirt: "S", gender: "Female", nationality: "Netherlands", status: "Pending", date: "2026-02-18T09:00:00", payment: "Card" },
    { id: "JEM-J7K8L", firstName: "David", lastName: "Kiplangat", email: "david.k@example.com", phone: "+254 712 345 678", category: "Full Marathon 42K", tshirt: "M", gender: "Male", nationality: "Kenya", status: "Paid", date: "2026-02-18T11:15:00", payment: "Card" },
    { id: "JEM-M9N0P", firstName: "Grace", lastName: "Auma", email: "grace.a@example.com", phone: "+256 780 456 789", category: "5K Fun Run", tshirt: "S", gender: "Female", nationality: "Uganda", status: "Paid", date: "2026-02-19T08:45:00", payment: "MTN MoMo" },
    { id: "JEM-Q1R2S", firstName: "Michael", lastName: "Johnson", email: "mj.runner@example.com", phone: "+1 555 234 5678", category: "Half Marathon 21K", tshirt: "XL", gender: "Male", nationality: "USA", status: "Failed", date: "2026-02-19T16:30:00", payment: "Card" },
  ];
  const sampleSubs = [
    { type: "sponsor", name: "MTN Uganda", org: "MTN", email: "sponsor@mtn.co.ug", phone: "+256 800 100 100", budget: "Gold Sponsor", message: "Interested in Gold tier brand activation.", date: "2026-02-14T10:00:00", status: "New" },
    { type: "contact", name: "Rose Nabwire", email: "rose@media.co.ug", subject: "Media & press", message: "We'd like to cover the marathon for NTV Uganda.", date: "2026-02-17T13:00:00", status: "Replied" },
    { type: "sponsor", name: "Uganda Breweries", org: "UBL", email: "events@ubl.co.ug", phone: "+256 700 222 333", budget: "Silver Sponsor", message: "Looking at hydration station branding.", date: "2026-02-18T09:30:00", status: "New" },
    { type: "contact", name: "Patrick Otieno", email: "patrick@gmail.com", subject: "Registration query", message: "Can I register a team of 10 runners? Any group discount?", date: "2026-02-19T07:15:00", status: "New" },
  ];
  saveStore(STORE_KEYS.regs, sampleRegs);
  saveStore(STORE_KEYS.subs, sampleSubs);
  localStorage.setItem('jem-seeded', 'true');
}
seedSampleData();

/* ─── ANALYTICS HOOKS ─── */
function trackEvent(event, detail) {
  console.log(`[JEM Analytics] ${event}`, detail || '');
  if (window.dataLayer) window.dataLayer.push({ event, detail });
}

/* ─── TOAST ─── */
function showToast(msg, type = 'success') {
  const old = document.querySelector('.toast');
  if (old) old.remove();
  const t = document.createElement('div');
  t.className = `toast toast--${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

/* ─── MOBILE NAV ─── */
function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}

/* ─── ADMIN LOGIN ─── */
function openAdminLogin() {
  if (isAdminLoggedIn) { navigate('/admin'); return; }
  document.getElementById('adminLoginModal').classList.add('open');
  document.getElementById('adminEmail').focus();
  document.getElementById('loginError').style.display = 'none';
}
function closeAdminLogin() {
  document.getElementById('adminLoginModal').classList.remove('open');
}
function attemptAdminLogin() {
  const email = document.getElementById('adminEmail').value.trim();
  const pw = document.getElementById('adminPassword').value;
  const err = document.getElementById('loginError');
  if (email === ADMIN_CREDS.email && pw === ADMIN_CREDS.password) {
    isAdminLoggedIn = true;
    closeAdminLogin();
    navigate('/admin');
    showToast('Welcome to JEM Admin 🔐');
  } else {
    err.textContent = 'Invalid credentials. Please try again.';
    err.style.display = 'block';
  }
}
function adminLogout() {
  isAdminLoggedIn = false;
  navigate('/');
  showToast('Logged out of admin panel');
}

/* ─── EMAIL SIMULATION ─── */
function simulateEmail(recipientEmail, regData) {
  const statusEl = document.getElementById('emailStatus');
  if (!statusEl) return;

  // Phase 1: Sending
  statusEl.innerHTML = `
    <div class="email-status">
      <div class="email-status__icon email-status__icon--sending">📤</div>
      <div>
        <div style="font-weight:600;font-size:0.88rem;color:var(--navy)">Sending confirmation email...</div>
        <div style="font-size:0.78rem;color:var(--text-light)">To: ${recipientEmail}</div>
      </div>
    </div>`;

  // Phase 2: Delivered (after 1.5s)
  setTimeout(() => {
    statusEl.innerHTML = `
      <div class="email-status" style="border-color:rgba(52,168,83,0.2)">
        <div class="email-status__icon email-status__icon--sent">✅</div>
        <div style="flex:1">
          <div style="font-weight:600;font-size:0.88rem;color:var(--success)">Confirmation email delivered</div>
          <div style="font-size:0.78rem;color:var(--text-light)">To: ${recipientEmail} · ${new Date().toLocaleTimeString()}</div>
          <div style="font-size:0.75rem;color:var(--text-light);margin-top:4px">Contains: Registration ID, payment instructions, race-day info</div>
        </div>
        <button class="btn btn--outline btn--sm" style="flex-shrink:0" onclick="previewEmail('${regData.id}')">Preview</button>
      </div>`;

    // Also add to admin email log
    const logs = loadStore('jem-email-log');
    logs.push({
      to: recipientEmail,
      subject: 'JEM Registration Confirmation — ' + regData.id,
      status: 'delivered',
      date: new Date().toISOString(),
      regId: regData.id
    });
    saveStore('jem-email-log', logs);
  }, 1800);
}

function previewEmail(regId) {
  const regs = loadStore(STORE_KEYS.regs);
  const reg = regs.find(r => r.id === regId);
  if (!reg) return;
  const fee = CONFIG.fees.find(f => f.category === reg.category);

  const win = window.open('', '_blank', 'width=600,height=700');
  win.document.write(`
    <!DOCTYPE html><html><head><meta charset="UTF-8"><title>JEM Confirmation Email Preview</title>
    <style>body{font-family:'Segoe UI',Arial,sans-serif;margin:0;padding:24px;background:#f5f5f5}
    .email{max-width:520px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.1)}
    .hdr{background:linear-gradient(135deg,#0D1520,#1C2D4F);padding:28px;color:white;text-align:center}
    .hdr h1{font-size:18px;margin:0 0 4px} .hdr p{font-size:12px;opacity:0.7;margin:0}
    .bd{padding:24px} .bd h2{font-size:16px;color:#1C2D4F;margin:0 0 16px}
    .row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee;font-size:14px}
    .row:last-child{border:none} .lab{color:#888} .val{font-weight:600;color:#1A1A1A}
    .cta{display:block;text-align:center;background:linear-gradient(135deg,#C8963E,#B5842F);color:#0D1520;
    padding:14px;border-radius:8px;font-weight:700;text-decoration:none;margin:16px 0;font-size:14px}
    .ft{background:#f9f7f3;padding:16px 24px;font-size:12px;color:#888;text-align:center}
    </style></head><body>
    <div class="email">
      <div class="hdr"><h1>Jinja Explorer Marathon</h1><p>Registration Confirmation</p></div>
      <div class="bd">
        <h2>🎉 You're registered, ${reg.firstName}!</h2>
        <div class="row"><span class="lab">Registration ID</span><span class="val">${reg.id}</span></div>
        <div class="row"><span class="lab">Category</span><span class="val">${reg.category}</span></div>
        <div class="row"><span class="lab">Fee (Early Bird)</span><span class="val">${fee ? fee.early : '—'}</span></div>
        <div class="row"><span class="lab">T-Shirt Size</span><span class="val">${reg.tshirt}</span></div>
        <div class="row"><span class="lab">Status</span><span class="val">${reg.status === 'Paid' ? '✅ Paid' : '⏳ Pending Payment'}</span></div>
        <a class="cta" href="#">${reg.status === 'Paid' ? 'View Your Ticket' : 'Complete Payment Now'}</a>
        <h2 style="margin-top:20px">📋 Next Steps</h2>
        <p style="font-size:13px;color:#444;line-height:1.6">${reg.status === 'Paid'
          ? 'Your entry is confirmed! Collect your race kit at the Expo on Thursday or Friday. Bring this email and a photo ID.'
          : 'Please complete payment within 48 hours to secure your place. MTN MoMo: Send to 0700 000 000, Reference: ' + reg.id}</p>
      </div>
      <div class="ft">Jinja Explorer Marathon · ${S.date} · ${S.location}<br>📧 ${S.email} · 📞 ${S.phone}</div>
    </div></body></html>`);
}

/* ─── DIGITAL TICKET ─── */
function generateTicketId() {
  return 'JEM-' + Date.now().toString(36).toUpperCase().slice(-5);
}

function showDigitalTicket(regData) {
  const modal = document.getElementById('ticketModal');
  const content = document.getElementById('ticketContent');
  const fee = CONFIG.fees.find(f => f.category === regData.category);
  const startTime = CONFIG.startTimes.find(t => t.event.includes(regData.category.split(' ')[0]) || regData.category.includes(t.event.split(' ')[0]));
  const isPaid = regData.status === 'Paid';

  content.innerHTML = `
    <div class="ticket" id="ticketPrintArea">
      <div class="ticket__header">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div style="font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;opacity:0.6;margin-bottom:6px">Race Entry Ticket</div>
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;margin-bottom:4px">Jinja Explorer Marathon</div>
            <div style="font-size:0.85rem;opacity:0.7">${S.date} · ${S.location}</div>
          </div>
          <div class="ticket__qr">
            <div style="font-size:1.8rem">📱</div>
            <span>QR Code</span>
          </div>
        </div>
        <div style="margin-top:16px;display:flex;gap:8px;align-items:center">
          <span class="ticket__status ${isPaid ? 'ticket__status--paid' : 'ticket__status--pending'}">
            ${isPaid ? '✓ PAID' : '⏳ PENDING PAYMENT'}
          </span>
          <span style="font-family:monospace;font-size:0.8rem;opacity:0.7">${regData.id}</span>
        </div>
      </div>

      <div class="ticket__body">
        <div class="ticket__row">
          <div><div class="ticket__field-label">Runner Name</div><div class="ticket__field-value">${regData.firstName} ${regData.lastName}</div></div>
          <div><div class="ticket__field-label">Category</div><div class="ticket__field-value" style="color:var(--gold)">${regData.category}</div></div>
        </div>
        <div class="ticket__row">
          <div><div class="ticket__field-label">Email</div><div class="ticket__field-value" style="font-size:0.85rem">${regData.email}</div></div>
          <div><div class="ticket__field-label">Phone</div><div class="ticket__field-value">${regData.phone}</div></div>
        </div>
        <div class="ticket__row">
          <div><div class="ticket__field-label">T-Shirt Size</div><div class="ticket__field-value">${regData.tshirt}</div></div>
          <div><div class="ticket__field-label">Entry Fee</div><div class="ticket__field-value">${fee ? fee.early + ' (Early Bird)' : '—'}</div></div>
        </div>
        ${startTime ? `
        <div class="ticket__row">
          <div><div class="ticket__field-label">Gun Time</div><div class="ticket__field-value">${startTime.time}</div></div>
          <div><div class="ticket__field-label">Assembly</div><div class="ticket__field-value">${startTime.assembly}</div></div>
        </div>` : ''}

        <hr class="ticket__divider">

        <div style="font-size:0.78rem;color:var(--text-light);line-height:1.6">
          <strong style="color:var(--navy)">📋 Important:</strong> Present this ticket and a photo ID at the Expo to collect your race kit. Bib collection is Thursday & Friday only. No race-day bib collection.
        </div>

        ${!isPaid ? `
        <div style="margin-top:14px;padding:14px;background:rgba(251,188,4,0.08);border:1px solid rgba(251,188,4,0.2);border-radius:8px;font-size:0.82rem;color:#8B6B00">
          <strong>⏳ Payment Required</strong><br>
          MTN MoMo: Send <strong>${fee ? fee.early : 'fee'}</strong> to <strong>0700 000 000</strong><br>
          Reference: <strong>${regData.id}</strong><br>
          Payment must be completed within 48 hours.
        </div>` : ''}
      </div>

      <div class="ticket__footer">
        <button class="btn btn--gold btn--sm" onclick="printTicket()">🖨️ Print Ticket</button>
        <button class="btn btn--outline btn--sm" onclick="downloadTicket()">📥 Download</button>
        <button class="btn btn--outline btn--sm" onclick="closeTicketModal()">Close</button>
      </div>
    </div>`;

  modal.classList.add('open');
}

function closeTicketModal() {
  document.getElementById('ticketModal').classList.remove('open');
}

function printTicket() {
  const printContent = document.getElementById('ticketPrintArea').innerHTML;
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head><title>JEM Ticket</title>
    <link rel="stylesheet" href="styles.css">
    <style>@media print { .ticket__footer { display: none !important; } body { margin: 0; } }</style>
    </head><body style="background:#fff;padding:20px">
    <div style="max-width:500px;margin:0 auto;border:1px solid #ddd;border-radius:16px;overflow:hidden">${printContent}</div>
    <script>setTimeout(()=>window.print(),300)<\/script></body></html>`);
}

function downloadTicket() {
  showToast('Ticket download ready — use Print > Save as PDF');
  printTicket();
}

/* ─── FORM HELPERS ─── */
function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function validatePhone(p) { return /^[\+]?[\d\s\-()]{7,}$/.test(p); }

function getFormData(formId) {
  const form = document.getElementById(formId);
  if (!form) return null;
  const data = {};
  form.querySelectorAll('input, select, textarea').forEach(el => {
    if (el.name && !el.classList.contains('ohnohoney')) {
      if (el.type === 'checkbox') data[el.name] = el.checked;
      else data[el.name] = el.value.trim();
    }
  });
  return data;
}

function setFieldError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('error');
  let err = el.parentNode.querySelector('.form-error');
  if (!err) { err = document.createElement('div'); err.className = 'form-error'; el.parentNode.appendChild(err); }
  err.textContent = msg;
}

function clearErrors(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.querySelectorAll('.error').forEach(e => e.classList.remove('error'));
  form.querySelectorAll('.form-error').forEach(e => e.remove());
}

/* ─── FOOTER NEWSLETTER ─── */
function submitFooterNewsletter() {
  const email = document.getElementById('footerEmail').value.trim();
  if (!validateEmail(email)) { showToast('Please enter a valid email', 'error'); return; }
  trackEvent('newsletter_signup', email);
  showToast('Thanks for subscribing! 🎉');
  document.getElementById('footerEmail').value = '';
}

/* ─── ROUTING ─── */
function getRoute() {
  const hash = window.location.hash.replace('#', '') || '/';
  return hash;
}

function navigate(route) {
  window.location.hash = '#' + route;
}

function updateActiveLinks(route) {
  document.querySelectorAll('[data-route]').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-route') === route);
  });
}

function updateMeta(route) {
  const seo = CONFIG.seo[route];
  if (seo) {
    document.title = seo.title;
    document.querySelector('meta[name="description"]').content = seo.desc;
  }
}

/* ─── PAGE RENDERERS ─── */

function renderHome() {
  return `
    <!-- HERO -->
    <section class="hero">
      <div class="container hero__content">
        <div class="hero__label">📍 ${S.location} · ${S.date}</div>
        <h1 class="t-display t-hero hero__title">${S.name}</h1>
        <p class="hero__subtitle">${S.tagline}</p>
        <div class="hero__actions">
          <a href="#/register" class="btn btn--gold btn--lg" onclick="trackEvent('register_click','hero')">Register Now</a>
          <a href="#/explore-jinja" class="btn btn--outline-white" onclick="trackEvent('itinerary_click','hero')">Explore Jinja</a>
          <a href="#/sponsors" class="btn btn--outline-white">Become a Sponsor</a>
        </div>
      </div>
    </section>

    <!-- QUICK FACTS BAR -->
    <section class="section" style="margin-top:-48px;position:relative;z-index:3">
      <div class="container">
        <div class="facts-bar">
          <div class="facts-bar__item">
            <div class="facts-bar__value">4 Distances</div>
            <div class="facts-bar__label">5K · 10K · 21K · 42K</div>
          </div>
          <div class="facts-bar__item">
            <div class="facts-bar__value">${S.date}</div>
            <div class="facts-bar__label">Race Weekend</div>
          </div>
          <div class="facts-bar__item">
            <div class="facts-bar__value">06:00 AM</div>
            <div class="facts-bar__label">Marathon Gun Time</div>
          </div>
          <div class="facts-bar__item">
            <div class="facts-bar__value">Jinja City</div>
            <div class="facts-bar__label">Source of the Nile</div>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY EXPLORER -->
    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="badge badge--gold section-head__label">Why Explorer?</span>
          <h2 class="t-display t-h1 section-head__title">More Than a Marathon</h2>
          <p class="section-head__desc">${S.story}</p>
        </div>
        <div class="grid-3">
          <div class="card">
            <div class="card__img">🏃</div>
            <div class="card__body">
              <h3 style="font-family:var(--font-display);font-size:1.1rem;margin-bottom:8px">World-Class Race</h3>
              <p class="t-small text-mid">Certified course, professional timing, medical support, and operational standards benchmarked against international marathons.</p>
            </div>
          </div>
          <div class="card">
            <div class="card__img" style="background:linear-gradient(135deg,#2E86AB,#1C2D4F)">🌊</div>
            <div class="card__body">
              <h3 style="font-family:var(--font-display);font-size:1.1rem;margin-bottom:8px">Adventure Capital</h3>
              <p class="t-small text-mid">Jinja offers white-water rafting, bungee jumping, quad biking, and Nile cruises — turn your race into a weekend adventure.</p>
            </div>
          </div>
          <div class="card">
            <div class="card__img" style="background:linear-gradient(135deg,#C8963E,#C45B28)">🎶</div>
            <div class="card__body">
              <h3 style="font-family:var(--font-display);font-size:1.1rem;margin-bottom:8px">Busoga Culture</h3>
              <p class="t-small text-mid">Experience the Embaire xylophone, Bigwala trumpets, and Engalabi drums — the living heritage of Busoga Kingdom on course.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PILLARS -->
    <section class="section" style="background:var(--white)">
      <div class="container">
        <div class="section-head">
          <span class="badge badge--navy section-head__label">Our Pillars</span>
          <h2 class="t-display t-h1 section-head__title">The Explorer Values</h2>
        </div>
        <div class="grid-5">
          ${CONFIG.pillars.map(p => `
            <div class="pillar-card">
              <span class="pillar-card__icon" style="color:${p.color}">${p.icon}</span>
              <h3 class="pillar-card__title" style="color:${p.color}">${p.title}</h3>
              <p class="pillar-card__desc">${p.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- FEATURED: FEES + COURSE + RACE WEEK -->
    <section class="section">
      <div class="container">
        <div class="section-head">
          <h2 class="t-display t-h1 section-head__title">Race Essentials</h2>
          <p class="section-head__desc">Everything you need to know at a glance.</p>
        </div>
        <div class="grid-3">
          <!-- Fees snapshot -->
          <div class="card">
            <div class="card__body">
              <span class="badge badge--gold mb-12">Entry Fees</span>
              <h3 style="font-family:var(--font-display);font-size:1.1rem;margin-bottom:16px">Race Categories & Pricing</h3>
              ${CONFIG.fees.map(f => `
                <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border-light);font-size:0.85rem">
                  <span style="font-weight:600">${f.category}</span>
                  <span style="color:var(--gold);font-weight:700">${f.early}</span>
                </div>
              `).join('')}
              <p class="t-xs text-light mt-24">Early bird prices shown. <a href="#/register" style="color:var(--gold)">See all pricing →</a></p>
            </div>
          </div>
          <!-- Course snapshot -->
          <div class="card">
            <div class="card__img" style="height:180px">🗺️</div>
            <div class="card__body">
              <span class="badge badge--teal mb-12">The Course</span>
              <h3 style="font-family:var(--font-display);font-size:1.1rem;margin-bottom:12px">Run Along the Nile</h3>
              <p class="t-small text-mid mb-16">A scenic, certified route through Jinja City, across the Nile Bridge, past cultural gates and adventure corridors.</p>
              <a href="#/course" class="btn btn--outline btn--sm">View Course →</a>
            </div>
          </div>
          <!-- Race week snapshot -->
          <div class="card">
            <div class="card__body">
              <span class="badge badge--copper mb-12">Race Week</span>
              <h3 style="font-family:var(--font-display);font-size:1.1rem;margin-bottom:16px">Thu–Sun Programme</h3>
              ${CONFIG.raceWeekSchedule.slice(0, 3).map(d => `
                <div style="margin-bottom:12px">
                  <div style="font-weight:700;font-size:0.82rem;color:var(--navy);margin-bottom:4px">${d.day}</div>
                  <div style="font-size:0.8rem;color:var(--text-mid)">${d.events[0]}</div>
                </div>
              `).join('')}
              <a href="#/race-week" class="btn btn--outline btn--sm mt-24">Full Schedule →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- EXPLORE JINJA TEASER -->
    <section class="section" style="background:var(--white)">
      <div class="container">
        <div class="section-head">
          <span class="badge badge--green section-head__label">Tourism</span>
          <h2 class="t-display t-h1 section-head__title">Plan Your Explorer Weekend</h2>
          <p class="section-head__desc">Three curated itineraries to make the most of your time in Jinja.</p>
        </div>
        <div class="grid-3">
          ${CONFIG.itineraries.map(it => `
            <div class="itinerary-card" onclick="navigate('/explore-jinja');trackEvent('itinerary_click','${it.title}')">
              <div class="itinerary-card__header" style="background:linear-gradient(135deg,${it.color},${it.color}dd)">
                <div class="itinerary-card__emoji">${it.emoji}</div>
                <div class="itinerary-card__title">${it.title}</div>
              </div>
              <div class="itinerary-card__body">
                ${it.highlights.map(h => `
                  <div class="itinerary-card__item">
                    <div class="itinerary-card__bullet" style="background:${it.color}"></div>
                    ${h}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CULTURE TEASER -->
    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="badge badge--copper section-head__label">Culture</span>
          <h2 class="t-display t-h1 section-head__title">The Sound of Busoga</h2>
          <p class="section-head__desc">Hear the instruments that will power your race experience.</p>
        </div>
        <div class="grid-3">
          ${CONFIG.instruments.slice(0, 3).map(inst => `
            <div class="instrument-card">
              <div class="instrument-card__visual">
                <span class="instrument-card__emoji">${inst.emoji}</span>
                <button class="instrument-card__play" onclick="event.stopPropagation();playSound('${inst.id}',this)" title="Play ${inst.name}">▶</button>
              </div>
              <div class="instrument-card__body">
                <h3 class="instrument-card__name">${inst.name}</h3>
                <span class="badge badge--${inst.tag === 'Protocol' ? 'gold' : inst.tag === 'Hype' ? 'copper' : inst.tag === 'Chill' ? 'teal' : 'navy'} instrument-card__tag">${inst.tag}</span>
                <p class="instrument-card__desc">${inst.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="text-center mt-32">
          <a href="#/culture" class="btn btn--navy">Explore Full Soundboard →</a>
        </div>
      </div>
    </section>

    <!-- SPONSORS STRIP -->
    <section class="section" style="background:var(--white)">
      <div class="container text-center">
        <span class="badge badge--navy mb-16">Partners</span>
        <h2 class="t-display t-h2 mb-24">Our Sponsors & Partners</h2>
        <div class="sponsor-strip mb-32">
          <div class="sponsor-strip__logo">Sponsor 1</div>
          <div class="sponsor-strip__logo">Sponsor 2</div>
          <div class="sponsor-strip__logo">Sponsor 3</div>
          <div class="sponsor-strip__logo">Sponsor 4</div>
          <div class="sponsor-strip__logo">Sponsor 5</div>
        </div>
        <a href="#/sponsors" class="btn btn--outline">Become a Partner →</a>
      </div>
    </section>

    <!-- FAQ PREVIEW -->
    <section class="section">
      <div class="container" style="max-width:760px">
        <div class="section-head">
          <h2 class="t-display t-h1 section-head__title">Frequently Asked Questions</h2>
        </div>
        <div id="homeFaqs">
          ${CONFIG.faqs.map((faq, i) => `
            <div class="faq-item" onclick="toggleFaq(this)">
              <button class="faq-item__q">${faq.q}<span class="faq-item__arrow">▾</span></button>
              <div class="faq-item__a"><div class="faq-item__a-inner">${faq.a}</div></div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- NEWSLETTER / TWEGAITE -->
    <section class="section" style="background:var(--white)">
      <div class="container" style="max-width:680px">
        <div class="twegaite-block text-center">
          <div style="font-size:2rem;margin-bottom:12px">🤝</div>
          <h2 class="twegaite-block__title">Twegaite — Come Together</h2>
          <p class="twegaite-block__sub">Join the Explorer community</p>
          <p style="color:rgba(255,255,255,0.6);font-size:0.9rem;margin-bottom:24px">Sign up for race updates, travel tips, and invitations to be part of the Jinja Explorer Marathon community.</p>
          <div style="display:flex;gap:8px;max-width:400px;margin:0 auto">
            <input type="email" placeholder="Your email" id="twegaiteEmail" class="form-input" style="background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.15);color:white">
            <button class="btn btn--gold" onclick="submitTwegaiteHome()">Join</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderAbout() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--gold mb-12">Our Story</span>
        <h1 class="t-display t-h1 page-hero__title">About the Jinja Explorer Marathon</h1>
        <p class="page-hero__desc">Discover the story behind East Africa's most distinctive destination marathon.</p>
      </div>
    </section>

    <section class="section">
      <div class="container" style="max-width:800px">
        <h2 class="t-display t-h2 mb-24">The Gateway to Busoga</h2>
        <p class="text-mid mb-16">Jinja sits at the source of the River Nile, where Lake Victoria pours into one of the world's greatest rivers. For centuries, it has been the gateway to the Busoga Kingdom — a vibrant cultural region with its own language, royal traditions, and living heritage of music and storytelling.</p>
        <p class="text-mid mb-16">Today, Jinja is also Uganda's adventure capital. White-water rafting, bungee jumping, kayaking, and wildlife experiences draw visitors from around the world. The Jinja Explorer Marathon brings these worlds together — elite athletics, cultural celebration, and adventure tourism — in a single destination race weekend.</p>
        <p class="text-mid mb-32">Our mission is to build a world-class annual marathon that celebrates Busoga culture, drives sustainable tourism to Jinja, and creates lasting economic and social value for the community.</p>

        <div class="divider"></div>

        <h2 class="t-display t-h2 mb-24 mt-48">The Explorer Pillars</h2>
        <div class="grid-2 mb-48">
          ${CONFIG.pillars.map(p => `
            <div style="display:flex;gap:16px;align-items:flex-start">
              <span style="font-size:1.5rem;color:${p.color};flex-shrink:0;margin-top:2px">${p.icon}</span>
              <div>
                <h3 style="font-family:var(--font-display);font-size:1.1rem;margin-bottom:6px;color:${p.color}">${p.title}</h3>
                <p class="t-small text-mid">${p.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="divider"></div>

        <h2 class="t-display t-h2 mb-24 mt-48">Organising Team</h2>
        <div class="grid-3 mb-48">
          ${['Race Director', 'Operations Lead', 'Culture & Tourism Lead'].map(role => `
            <div class="card">
              <div class="card__img" style="height:160px;font-size:2rem">👤</div>
              <div class="card__body text-center">
                <h4 style="font-weight:700;margin-bottom:4px">Name TBC</h4>
                <p class="t-small text-light">${role}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <h2 class="t-display t-h2 mb-16">Governance & Partners</h2>
        <p class="text-mid mb-32">The Jinja Explorer Marathon is organised in collaboration with local government, the Busoga Kingdom cultural authority, Uganda Athletics Federation, and certified race operations partners. Full governance and advisory details will be published ahead of the event.</p>

        <div class="gap-center mt-32">
          <a href="#/register" class="btn btn--gold" onclick="trackEvent('register_click','about')">Register Now</a>
          <a href="#/sponsors" class="btn btn--outline">Become a Sponsor</a>
        </div>
      </div>
    </section>
  `;
}

function renderRegister() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--gold mb-12">Entry</span>
        <h1 class="t-display t-h1 page-hero__title">Register for JEM 2026</h1>
        <p class="page-hero__desc">Secure your place at the Jinja Explorer Marathon. ${S.date}, ${S.location}.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- FEES TABLE -->
        <div class="grid-2" style="gap:32px;align-items:start">
          <div>
            <h2 class="t-display t-h2 mb-16">Entry Fees</h2>
            <div class="table-wrap mb-24">
              <table>
                <thead>
                  <tr><th>Category</th><th>Early Bird</th><th>Regular</th><th>International</th></tr>
                </thead>
                <tbody>
                  ${CONFIG.fees.map(f => `
                    <tr><td style="font-weight:600">${f.category}</td><td style="color:var(--gold);font-weight:700">${f.early}</td><td>${f.regular}</td><td>${f.intl}</td></tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <p class="t-small text-light">Early bird pricing available until 30 days before race day. All fees are non-refundable. Transfers permitted up to 14 days before race day.</p>
          </div>
          <div>
            <h2 class="t-display t-h2 mb-16">Start Times</h2>
            <div class="table-wrap mb-24">
              <table>
                <thead>
                  <tr><th>Event</th><th>Gun Time</th><th>Assembly</th></tr>
                </thead>
                <tbody>
                  ${CONFIG.startTimes.map(t => `
                    <tr><td style="font-weight:600">${t.event}</td><td style="color:var(--gold);font-weight:700">${t.time}</td><td>${t.assembly}</td></tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <!-- WHAT'S INCLUDED -->
        <h2 class="t-display t-h2 mb-24">What's Included</h2>
        <div class="grid-3 mb-48">
          ${['Race bib with timing chip', 'Finisher medal', 'Official race t-shirt', 'Hydration on course', 'Medical support', 'Post-race refreshments', 'Digital finisher certificate', 'Expo access', 'Route support & marshals'].map(item => `
            <div class="checklist-item"><span class="checklist-check">✓</span>${item}</div>
          `).join('')}
        </div>

        <!-- HOW REGISTRATION WORKS -->
        <h2 class="t-display t-h2 mb-24">How to Register</h2>
        <div class="steps mb-48" style="max-width:600px">
          <div class="step-item"><div class="step-num">1</div><div class="step-content"><div class="step-title">Fill in the form below</div><div class="step-desc">Provide your details, select your category, and choose a t-shirt size.</div></div></div>
          <div class="step-item"><div class="step-num">2</div><div class="step-content"><div class="step-title">Make payment</div><div class="step-desc">Pay via MTN/Airtel Mobile Money, bank transfer, or international card.</div></div></div>
          <div class="step-item"><div class="step-num">3</div><div class="step-content"><div class="step-title">Receive confirmation</div><div class="step-desc">You'll get an email and SMS confirmation with your registration number.</div></div></div>
          <div class="step-item"><div class="step-num">4</div><div class="step-content"><div class="step-title">Collect your bib at the Expo</div><div class="step-desc">Bring your ID and confirmation to the Expo (Thursday or Friday) to pick up your race kit.</div></div></div>
        </div>

        <!-- REGISTRATION FORM -->
        <div style="max-width:700px;margin:0 auto">
          <h2 class="t-display t-h2 mb-8">Registration Form</h2>
          <p class="text-mid mb-24">Complete your registration below. Fields marked * are required.</p>

          <div id="regFormContainer">
            <div id="registrationForm">
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">First Name *</label>
                  <input type="text" name="firstName" id="regFirstName" class="form-input" required placeholder="First name">
                </div>
                <div class="form-group">
                  <label class="form-label">Last Name *</label>
                  <input type="text" name="lastName" id="regLastName" class="form-input" required placeholder="Last name">
                </div>
              </div>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Email *</label>
                  <input type="email" name="email" id="regEmail" class="form-input" required placeholder="you@email.com">
                </div>
                <div class="form-group">
                  <label class="form-label">Phone *</label>
                  <input type="tel" name="phone" id="regPhone" class="form-input" required placeholder="+256 7XX XXX XXX">
                </div>
              </div>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Race Category *</label>
                  <select name="category" id="regCategory" class="form-select">
                    <option value="">Select category</option>
                    ${CONFIG.fees.map(f => `<option value="${f.category}">${f.category}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">T-Shirt Size *</label>
                  <select name="tshirt" id="regTshirt" class="form-select">
                    <option value="">Select size</option>
                    <option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option>
                  </select>
                </div>
              </div>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Gender</label>
                  <select name="gender" id="regGender" class="form-select">
                    <option value="">Select</option>
                    <option>Male</option><option>Female</option><option>Non-binary</option><option>Prefer not to say</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Date of Birth</label>
                  <input type="date" name="dob" id="regDob" class="form-input">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Nationality</label>
                <input type="text" name="nationality" id="regNationality" class="form-input" placeholder="Country">
              </div>
              <div class="form-group">
                <label class="form-label">Emergency Contact Name & Phone</label>
                <input type="text" name="emergency" id="regEmergency" class="form-input" placeholder="Name — +256 7XX XXX XXX">
              </div>
              <div class="form-group">
                <label class="form-label">Team / Running Club (optional)</label>
                <input type="text" name="club" id="regClub" class="form-input" placeholder="Club name">
              </div>
              <div class="form-group">
                <label class="form-label">Promo / Discount Code</label>
                <input type="text" name="promo" id="regPromo" class="form-input" placeholder="Enter code if applicable">
              </div>
              <!-- Honeypot -->
              <div class="ohnohoney">
                <input type="text" name="website" id="regHoney" tabindex="-1" autocomplete="off">
              </div>
              <div class="form-group">
                <label class="form-check">
                  <input type="checkbox" name="terms" id="regTerms">
                  I agree to the race terms, conditions, and waiver. I understand entries are non-refundable. *
                </label>
              </div>
              <div class="form-group">
                <label class="form-check">
                  <input type="checkbox" name="newsletter" id="regNewsletter" checked>
                  Send me race updates and Jinja travel tips by email.
                </label>
              </div>
              <button class="btn btn--gold btn--lg" style="width:100%;margin-top:8px" onclick="submitRegistration()">Complete Registration</button>
            </div>
          </div>
          <div style="margin-top:24px;padding:20px;background:var(--cream-dark);border-radius:var(--radius);font-size:0.85rem;color:var(--text-mid)">
            <strong style="color:var(--navy)">Payment Options:</strong><br>
            Mobile Money: MTN — Airtel (details sent after form submission)<br>
            Bank Transfer: Details provided on confirmation email<br>
            International: Visa/Mastercard via secure payment link
          </div>
        </div>

        <div class="divider"></div>

        <!-- REGISTRATION FAQS -->
        <h2 class="t-display t-h2 mb-24" style="max-width:700px;margin-left:auto;margin-right:auto">Registration FAQs</h2>
        <div style="max-width:700px;margin:0 auto">
          ${CONFIG.faqs.filter(f => f.q.toLowerCase().includes('refund') || f.q.toLowerCase().includes('age') || f.q.toLowerCase().includes('included') || f.q.toLowerCase().includes('register')).map(faq => `
            <div class="faq-item" onclick="toggleFaq(this)">
              <button class="faq-item__q">${faq.q}<span class="faq-item__arrow">▾</span></button>
              <div class="faq-item__a"><div class="faq-item__a-inner">${faq.a}</div></div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderCourse() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--teal mb-12">The Route</span>
        <h1 class="t-display t-h1 page-hero__title">Course & Route</h1>
        <p class="page-hero__desc">Run along the Nile through Jinja City — a scenic, certified marathon route.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Map placeholder -->
        <div style="background:linear-gradient(135deg,var(--navy-mid),var(--navy-deep));border-radius:var(--radius-lg);height:360px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3);font-size:1.2rem;margin-bottom:24px">
          🗺️ Interactive Route Map — Coming Soon
        </div>

        <!-- Route downloads -->
        <h2 class="t-display t-h2 mb-24">Download Route Files</h2>
        <div class="grid-4 mb-48">
          ${Object.entries(CONFIG.routeLinks).map(([dist, links]) => `
            <div class="route-card">
              <div class="route-card__title">${dist} Route</div>
              <div class="route-card__links">
                <a href="${links.gpx}" class="btn btn--outline btn--sm" onclick="trackEvent('gpx_download','${dist}')">📥 GPX</a>
                <a href="${links.strava}" target="_blank" class="btn btn--outline btn--sm">Strava</a>
                <a href="${links.google}" target="_blank" class="btn btn--outline btn--sm">Maps</a>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="divider"></div>

        <!-- Explorer Markers -->
        <h2 class="t-display t-h2 mb-24">Explorer Markers</h2>
        <p class="text-mid mb-32">Key landmarks and cultural zones along the marathon route.</p>
        <div class="marker-timeline mb-48" style="max-width:650px">
          ${CONFIG.courseMarkers.map(m => `
            <div class="marker-item">
              <div class="marker-item__km">${m.km}</div>
              <h3 class="marker-item__name">${m.name}</h3>
              <p class="marker-item__desc">${m.desc}</p>
            </div>
          `).join('')}
        </div>

        <div class="divider"></div>

        <!-- Aid Stations -->
        <h2 class="t-display t-h2 mb-24">Aid Stations & Medical Support</h2>
        <div class="table-wrap mb-48">
          <table>
            <thead>
              <tr><th>Station</th><th>Location</th><th>Water</th><th>Electrolytes</th><th>Medical</th></tr>
            </thead>
            <tbody>
              ${CONFIG.aidStations.map(a => `
                <tr>
                  <td style="font-weight:600">${a.name}</td>
                  <td>${a.location}</td>
                  <td>${a.water ? '✓' : '—'}</td>
                  <td>${a.electrolytes ? '✓' : '—'}</td>
                  <td><span class="badge ${a.medical === 'Paramedic' ? 'badge--copper' : 'badge--green'}">${a.medical}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Safety & Transport -->
        <div class="grid-2">
          <div>
            <h2 class="t-display t-h2 mb-16">Safety Notes</h2>
            <div class="checklist-item"><span class="checklist-check">✓</span>Ambulances stationed at KM 0, 15, 30, and finish</div>
            <div class="checklist-item"><span class="checklist-check">✓</span>Course fully marshalled with traffic control</div>
            <div class="checklist-item"><span class="checklist-check">✓</span>Spectator zones clearly marked for safety</div>
            <div class="checklist-item"><span class="checklist-check">✓</span>Cut-off times enforced for runner safety</div>
            <div class="checklist-item"><span class="checklist-check">✓</span>Sweep vehicle follows the final runner</div>
          </div>
          <div>
            <h2 class="t-display t-h2 mb-16">Getting to the Start</h2>
            <p class="text-mid mb-12">${CONFIG.transport.raceDay}</p>
            <p class="text-mid mb-12"><strong>Parking:</strong> Designated parking areas near the start line. Arrive early to allow for security screening.</p>
            <p class="text-mid"><strong>Spectators:</strong> Best viewing points are at KM 0 (Start), KM 15 (Cultural Gate), KM 21 (Half Finish), and KM 42 (Finish).</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderRaceWeek() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--copper mb-12">Race Week</span>
        <h1 class="t-display t-h1 page-hero__title">Race Week & Expo</h1>
        <p class="page-hero__desc">Everything you need for a smooth race week — expo, bib collection, schedule.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Expo Info -->
        <div class="grid-2 mb-48" style="gap:32px">
          <div>
            <h2 class="t-display t-h2 mb-16">The Explorer Expo</h2>
            <p class="text-mid mb-16">The Explorer Expo is your race-week hub — collect your bib, browse sponsor activations, explore the Tourism Village, enjoy live cultural performances, and connect with fellow runners.</p>
            <div style="background:var(--cream-dark);padding:20px;border-radius:var(--radius);margin-bottom:16px">
              <p style="font-weight:700;color:var(--navy);margin-bottom:8px">📍 Jinja Sports Ground</p>
              <p class="t-small text-mid">Thursday & Friday: 9:00 AM – 6:00 PM</p>
            </div>
            <h3 style="font-weight:700;margin-bottom:8px">What to bring for bib collection:</h3>
            <div class="checklist-item"><span class="checklist-check">✓</span>Photo ID (national ID, passport, or driving permit)</div>
            <div class="checklist-item"><span class="checklist-check">✓</span>Registration confirmation (email/SMS)</div>
            <div class="checklist-item"><span class="checklist-check">✓</span>Payment proof if paying on-site</div>
          </div>
          <div>
            <h3 style="font-weight:700;margin-bottom:16px">Bib Collection Steps</h3>
            <div class="steps">
              <div class="step-item"><div class="step-num">1</div><div class="step-content"><div class="step-title">Go to the Registration Desk</div><div class="step-desc">Present your ID and confirmation.</div></div></div>
              <div class="step-item"><div class="step-num">2</div><div class="step-content"><div class="step-title">Collect your race kit</div><div class="step-desc">Bib, timing chip, t-shirt, and runner's bag.</div></div></div>
              <div class="step-item"><div class="step-num">3</div><div class="step-content"><div class="step-title">Sign the waiver</div><div class="step-desc">Complete the race waiver at the desk.</div></div></div>
              <div class="step-item"><div class="step-num">4</div><div class="step-content"><div class="step-title">Explore the Expo</div><div class="step-desc">Visit sponsor booths, the Tourism Village, and cultural showcase.</div></div></div>
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <!-- Schedule -->
        <h2 class="t-display t-h2 mb-24">Race Week Schedule</h2>
        <div class="mb-48">
          ${CONFIG.raceWeekSchedule.map(day => `
            <div class="schedule-block">
              <div class="schedule-block__header">${day.day}</div>
              <div class="schedule-block__events">
                ${day.events.map(ev => `<div class="schedule-block__event">${ev}</div>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="divider"></div>

        <!-- Race Day Checklist -->
        <h2 class="t-display t-h2 mb-24">Race Day Checklist</h2>
        <div class="grid-2 mb-48">
          <div>
            <h3 style="font-weight:700;margin-bottom:12px">Must-have</h3>
            ${['Race bib (pinned to front)', 'Timing chip (attached to shoe)', 'Running shoes & gear', 'Photo ID', 'Water bottle (optional)'].map(i => `<div class="checklist-item"><span class="checklist-check">✓</span>${i}</div>`).join('')}
          </div>
          <div>
            <h3 style="font-weight:700;margin-bottom:12px">Recommended</h3>
            ${['Sunscreen & cap', 'Energy gels/snacks', 'Phone for photos', 'Post-race change of clothes', 'Positive energy! 🎉'].map(i => `<div class="checklist-item"><span class="checklist-check">✓</span>${i}</div>`).join('')}
          </div>
        </div>

        <!-- Help Desk -->
        <div style="background:var(--cream-dark);border-radius:var(--radius-lg);padding:32px;text-align:center">
          <h3 class="t-display t-h3 mb-12">Need Help During Race Week?</h3>
          <p class="text-mid mb-16">Visit the Help Desk at the Expo or contact us directly.</p>
          <div class="gap-center">
            <a href="https://wa.me/${S.whatsapp}" target="_blank" class="btn btn--whatsapp btn--sm">💬 WhatsApp</a>
            <a href="mailto:${S.email}" class="btn btn--outline btn--sm">📧 Email Us</a>
            <a href="tel:${S.phone.replace(/\s/g, '')}" class="btn btn--outline btn--sm">📞 ${S.phone}</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderExploreJinja() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--green mb-12">Tourism</span>
        <h1 class="t-display t-h1 page-hero__title">Explore Jinja</h1>
        <p class="page-hero__desc">Plan your Explorer Weekend in Uganda's adventure capital — at the source of the Nile.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Itineraries -->
        <div class="section-head section-head--left">
          <h2 class="t-display t-h2 section-head__title">Weekend Itineraries</h2>
          <p class="section-head__desc">Three curated plans to make the most of your race weekend in Jinja.</p>
        </div>
        <div class="grid-3 mb-48">
          ${CONFIG.itineraries.map(it => `
            <div class="itinerary-card">
              <div class="itinerary-card__header" style="background:linear-gradient(135deg,${it.color},${it.color}cc)">
                <div class="itinerary-card__emoji">${it.emoji}</div>
                <div class="itinerary-card__title">${it.title}</div>
              </div>
              <div class="itinerary-card__body">
                ${it.highlights.map(h => `
                  <div class="itinerary-card__item">
                    <div class="itinerary-card__bullet" style="background:${it.color}"></div>
                    ${h}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="divider"></div>

        <!-- Explorer Guides -->
        <h2 class="t-display t-h2 mb-24">Explorer Guides</h2>
        <div class="grid-5 mb-48">
          ${[
            { title: 'Adventure', emoji: '🌊', desc: 'Rafting, bungee, kayaking, quad biking' },
            { title: 'Culture', emoji: '🎶', desc: 'Busoga heritage, music, crafts, history' },
            { title: 'Food & Drink', emoji: '🍽️', desc: 'Local cuisine, rolex, Nile-side dining' },
            { title: 'Where to Stay', emoji: '🏨', desc: 'Hotels, lodges, camps, hostels' },
            { title: 'Transport', emoji: '🚌', desc: 'Getting here and getting around' },
          ].map(g => `
            <div class="pillar-card">
              <span class="pillar-card__icon">${g.emoji}</span>
              <h3 class="pillar-card__title">${g.title}</h3>
              <p class="pillar-card__desc">${g.desc}</p>
            </div>
          `).join('')}
        </div>

        <div class="divider"></div>

        <!-- Accommodation -->
        <h2 class="t-display t-h2 mb-24">Where to Stay</h2>
        <p class="text-mid mb-24">Recommended accommodation partners for race weekend. Book early to secure the best rates.</p>
        <div class="grid-2 mb-48">
          ${CONFIG.accommodation.map(a => `
            <div class="accom-card">
              <div style="display:flex;justify-content:space-between;align-items:start">
                <h3 class="accom-card__name">${a.name}</h3>
                <span class="accom-card__type badge ${a.type === 'Luxury' ? 'badge--gold' : a.type === 'Budget' ? 'badge--green' : 'badge--navy'}">${a.type}</span>
              </div>
              <p class="accom-card__detail">${a.desc}</p>
              <p class="accom-card__detail">📍 ${a.location}</p>
              <p class="accom-card__price">${a.price}</p>
              <p class="accom-card__detail">📞 ${a.phone}</p>
            </div>
          `).join('')}
        </div>

        <div class="divider"></div>

        <!-- Transport -->
        <h2 class="t-display t-h2 mb-24">Getting to Jinja</h2>
        <div class="grid-2 mb-32">
          <div>
            <h3 style="font-weight:700;margin-bottom:8px">From Entebbe Airport</h3>
            <p class="text-mid t-small mb-16">${CONFIG.transport.fromEntebbe}</p>
            <h3 style="font-weight:700;margin-bottom:8px">From Kampala</h3>
            <p class="text-mid t-small">${CONFIG.transport.fromKampala}</p>
          </div>
          <div>
            <h3 style="font-weight:700;margin-bottom:8px">Within Jinja</h3>
            <p class="text-mid t-small mb-16">${CONFIG.transport.local}</p>
            <h3 style="font-weight:700;margin-bottom:8px">Race Day Shuttles</h3>
            <p class="text-mid t-small">${CONFIG.transport.raceDay}</p>
          </div>
        </div>

        <div class="gap-center mt-32">
          <a href="#/register" class="btn btn--gold" onclick="trackEvent('register_click','explore')">Register Now</a>
          <a href="#" class="btn btn--outline" onclick="trackEvent('itinerary_click','pdf_download')">📥 Download Itinerary PDF</a>
        </div>
      </div>
    </section>
  `;
}

function renderCulture() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--copper mb-12">Culture</span>
        <h1 class="t-display t-h1 page-hero__title">The Explorer Sound of Busoga</h1>
        <p class="page-hero__desc">Hear the instruments that will power your race experience — the living heritage of Busoga Kingdom.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Filters -->
        <div class="filter-tabs" id="soundboardFilters">
          <button class="filter-tab active" onclick="filterInstruments('All',this)">All</button>
          <button class="filter-tab" onclick="filterInstruments('Protocol',this)">Protocol</button>
          <button class="filter-tab" onclick="filterInstruments('Hype',this)">Hype</button>
          <button class="filter-tab" onclick="filterInstruments('Chill',this)">Chill</button>
          <button class="filter-tab" onclick="filterInstruments('Story',this)">Story</button>
        </div>

        <!-- Instrument Grid -->
        <div class="grid-3 mb-48" id="instrumentGrid">
          ${CONFIG.instruments.map(inst => `
            <div class="instrument-card" data-tag="${inst.tag}">
              <div class="instrument-card__visual">
                <span class="instrument-card__emoji">${inst.emoji}</span>
                <button class="instrument-card__play" onclick="event.stopPropagation();playSound('${inst.id}',this)" title="Play ${inst.name}" id="play-${inst.id}">▶</button>
              </div>
              <div class="instrument-card__body">
                <h3 class="instrument-card__name">${inst.name}</h3>
                <span class="badge badge--${inst.tag === 'Protocol' ? 'gold' : inst.tag === 'Hype' ? 'copper' : inst.tag === 'Chill' ? 'teal' : 'navy'} instrument-card__tag">${inst.tag}</span>
                <p class="instrument-card__desc">${inst.desc}</p>
                <p class="instrument-card__best">🎯 ${inst.best}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="divider"></div>

        <!-- TWEGAITE BLOCK -->
        <div class="twegaite-block">
          <div style="display:flex;flex-wrap:wrap;gap:40px;align-items:flex-start">
            <div style="flex:1;min-width:280px">
              <div style="font-size:2rem;margin-bottom:12px">🤝</div>
              <h2 class="twegaite-block__title">Twegaite — Come Together</h2>
              <p class="twegaite-block__sub">"Twegaite" means "Come Together" in Lusoga</p>
              <p style="color:rgba(255,255,255,0.6);font-size:0.9rem;margin-bottom:24px">Join the Twegaite movement — pledge to make the Jinja Explorer Marathon a celebration of community, culture, and unity.</p>
              <div class="pledge-options" id="pledgeOptions">
                <div class="pledge-option" onclick="selectPledge(this,'volunteer')">🙋 Volunteer</div>
                <div class="pledge-option" onclick="selectPledge(this,'friend')">👫 Bring a Friend</div>
                <div class="pledge-option" onclick="selectPledge(this,'sponsor-runner')">💛 Sponsor a Runner</div>
                <div class="pledge-option" onclick="selectPledge(this,'donate')">🎁 Donate</div>
              </div>
            </div>
            <div style="flex:1;min-width:280px">
              <div id="twegaiteForm">
                <div class="form-group">
                  <label class="form-label" style="color:rgba(255,255,255,0.5)">Email *</label>
                  <input type="email" id="pledgeEmail" class="form-input" style="background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.15);color:white" placeholder="you@email.com">
                </div>
                <div class="form-group">
                  <label class="form-label" style="color:rgba(255,255,255,0.5)">Phone</label>
                  <input type="tel" id="pledgePhone" class="form-input" style="background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.15);color:white" placeholder="+256 7XX XXX XXX">
                </div>
                <input type="hidden" id="pledgeType" value="">
                <div class="form-group">
                  <label class="form-check" style="color:rgba(255,255,255,0.5)">
                    <input type="checkbox" id="pledgeConsent">
                    I consent to receive communications about JEM and Twegaite initiatives.
                  </label>
                </div>
                <button class="btn btn--gold" style="width:100%" onclick="submitPledge()">Take the Pledge</button>
              </div>
            </div>
          </div>
        </div>

        <div class="divider" style="border-color:rgba(255,255,255,0.1)"></div>

        <!-- Credits -->
        <div class="mt-48" style="max-width:600px;margin-left:auto;margin-right:auto;text-align:center">
          <h3 class="t-display t-h3 mb-16">Cultural Credits & Acknowledgements</h3>
          <p class="text-mid t-small mb-12">The Busoga Soundboard is developed in collaboration with cultural custodians, musicians, and the Busoga Kingdom. All instrument recordings are curated with respect for tradition and proper cultural protocols.</p>
          <p class="text-light t-xs">Instruments and descriptions are subject to final curation. Audio recordings are placeholders pending studio sessions with approved musicians.</p>
        </div>
      </div>
    </section>
  `;
}

function renderResults() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--gold mb-12">Results</span>
        <h1 class="t-display t-h1 page-hero__title">Results & Winners</h1>
        <p class="page-hero__desc">Race results, winner tables, and highlights from JEM 2026.</p>
      </div>
    </section>

    <section class="section">
      <div class="container text-center" style="max-width:700px">
        <div style="background:var(--white);border-radius:var(--radius-xl);padding:64px 32px;border:1px solid var(--border-light)">
          <div style="font-size:3rem;margin-bottom:16px">🏅</div>
          <h2 class="t-display t-h2 mb-12">Results Coming Soon</h2>
          <p class="text-mid mb-24">Official results will be published here after the race in ${S.date}. Results will be powered by our official timing partner.</p>
          <p class="text-mid mb-32">You will be able to search by name or bib number, view category winners, and download full results.</p>
          <div class="gap-center">
            <a href="#" class="btn btn--outline btn--sm" style="opacity:0.5;pointer-events:none">🔗 Search Results (coming soon)</a>
            <a href="#" class="btn btn--outline btn--sm" style="opacity:0.5;pointer-events:none">📥 Download Full Results</a>
          </div>
        </div>

        <div class="divider"></div>

        <h3 class="t-display t-h3 mb-16">Photo Gallery</h3>
        <p class="text-mid mb-24">Race day photos will be shared here after the event.</p>
        <div class="gallery-grid">
          ${Array(8).fill(0).map((_, i) => `<div class="gallery-item">📷</div>`).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderSponsors() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--gold mb-12">Partners</span>
        <h1 class="t-display t-h1 page-hero__title">Sponsor the Jinja Explorer Marathon</h1>
        <p class="page-hero__desc">Partner with East Africa's premier destination marathon. Reach runners, adventurers, and cultural enthusiasts.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Why Sponsor -->
        <div class="grid-2 mb-48" style="gap:40px;align-items:center">
          <div>
            <h2 class="t-display t-h2 mb-16">Why Sponsor JEM?</h2>
            <p class="text-mid mb-16">The Jinja Explorer Marathon offers a unique brand activation opportunity — reaching local, regional, and international audiences across sport, tourism, and culture.</p>
            <p class="text-mid mb-16">Your brand will be seen at the start line, on the course, at the Expo, in digital media, and across our Tourism Village — connecting with an engaged, active audience.</p>
            <div class="grid-2" style="gap:12px">
              ${['2,000+ Runners (target)', '10,000+ Spectators', '50,000+ Digital reach', '4-day Expo & Tourism Village'].map(s => `
                <div style="background:var(--cream-dark);padding:12px;border-radius:var(--radius-sm);font-size:0.85rem;font-weight:600;text-align:center">${s}</div>
              `).join('')}
            </div>
          </div>
          <div style="background:linear-gradient(135deg,var(--navy-mid),var(--navy-deep));border-radius:var(--radius-lg);height:320px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3);font-size:2rem">
            📊 Audience Infographic
          </div>
        </div>

        <div class="divider"></div>

        <!-- Tiers -->
        <h2 class="t-display t-h2 mb-24 text-center">Sponsorship Packages</h2>
        <div class="grid-4 mb-48">
          ${CONFIG.sponsorTiers.map((t, i) => `
            <div class="tier-card ${i === 0 ? 'tier-card--featured' : ''}">
              <div class="tier-card__header">
                ${i === 0 ? '<span class="badge badge--gold mb-8">Flagship</span>' : ''}
                <h3 class="tier-card__name">${t.tier}</h3>
                <div class="tier-card__price">${t.price}</div>
              </div>
              <div class="tier-card__body">
                ${t.perks.map(p => `<div class="tier-card__perk">${p}</div>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="divider"></div>

        <!-- Activation Inventory -->
        <h2 class="t-display t-h2 mb-24">Activation Inventory</h2>
        <div class="table-wrap mb-48">
          <table class="activation-table">
            <thead>
              <tr><th>Activation</th><th>Title</th><th>Gold</th><th>Silver</th><th>Community</th></tr>
            </thead>
            <tbody>
              ${[
                ['Start/Finish line branding','✓','—','—','—'],
                ['Km gate branding (per gate)','✓','✓ (2)','—','—'],
                ['Expo booth','Headline','Premium','Standard','Tourism Village'],
                ['Bib & medal logo','✓','✓','—','—'],
                ['Digital & social media','Full','Featured','Mentions','Mentions'],
                ['VIP hospitality','20 pax','10 pax','5 pax','2 pax'],
                ['Culture stage naming','✓','—','—','—'],
                ['Hydration station','✓','✓','✓','—'],
              ].map(row => `
                <tr>${row.map((c,i) => `<td${i===0?' style="font-weight:600"':''}>${c}</td>`).join('')}</tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="gap-center mb-48">
          <a href="#" class="btn btn--navy" onclick="trackEvent('proposal_download_click')">📥 Download Sponsorship Proposal</a>
        </div>

        <div class="divider"></div>

        <!-- Sponsor Inquiry Form -->
        <div style="max-width:600px;margin:0 auto">
          <h2 class="t-display t-h2 mb-24 text-center">Get in Touch</h2>
          <div id="sponsorFormContainer">
            <div id="sponsorForm">
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Your Name *</label>
                  <input type="text" id="spName" name="name" class="form-input" placeholder="Full name">
                </div>
                <div class="form-group">
                  <label class="form-label">Organisation *</label>
                  <input type="text" id="spOrg" name="org" class="form-input" placeholder="Company / brand">
                </div>
              </div>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Email *</label>
                  <input type="email" id="spEmail" name="email" class="form-input" placeholder="you@company.com">
                </div>
                <div class="form-group">
                  <label class="form-label">Phone</label>
                  <input type="tel" id="spPhone" name="phone" class="form-input" placeholder="+256 7XX XXX XXX">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Interested Package</label>
                <select id="spBudget" name="budget" class="form-select">
                  <option value="">Select a tier</option>
                  ${CONFIG.sponsorTiers.map(t => `<option value="${t.tier}">${t.tier} — ${t.price}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Message</label>
                <textarea id="spMessage" name="message" class="form-textarea" rows="4" placeholder="Tell us about your brand and partnership goals..."></textarea>
              </div>
              <div class="ohnohoney">
                <input type="text" name="website" id="spHoney" tabindex="-1" autocomplete="off">
              </div>
              <button class="btn btn--gold btn--lg" style="width:100%" onclick="submitSponsorInquiry()">Send Inquiry</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderMedia() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--navy mb-12">Press</span>
        <h1 class="t-display t-h1 page-hero__title">Media Centre</h1>
        <p class="page-hero__desc">Press kit, releases, and media resources for the Jinja Explorer Marathon.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Media Kit -->
        <div style="background:var(--white);border-radius:var(--radius-lg);padding:32px;border:1px solid var(--border-light);text-align:center;margin-bottom:48px">
          <h2 class="t-display t-h2 mb-12">Media Kit</h2>
          <p class="text-mid mb-24">Download logos, brand guidelines, photos, and event fact sheet.</p>
          <a href="#" class="btn btn--navy">📥 Download Media Kit (PDF)</a>
        </div>

        <!-- Press Releases -->
        <h2 class="t-display t-h2 mb-24">Press Releases</h2>
        <div class="grid-2 mb-48">
          ${[
            { title: 'Jinja Explorer Marathon Announced', date: 'February 2026', desc: 'Official announcement of the inaugural Jinja Explorer Marathon.' },
            { title: 'Registration Opens for JEM 2026', date: 'Coming Soon', desc: 'Early bird registration opens with four race categories.' },
            { title: 'Busoga Soundboard Partnership', date: 'Coming Soon', desc: 'Cultural partnership with Busoga Kingdom announced.' },
          ].map(pr => `
            <div class="card">
              <div class="card__body">
                <span class="badge badge--navy mb-12">${pr.date}</span>
                <h3 style="font-family:var(--font-display);font-size:1.1rem;margin-bottom:8px">${pr.title}</h3>
                <p class="t-small text-mid">${pr.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="divider"></div>

        <!-- Photo Gallery -->
        <h2 class="t-display t-h2 mb-24">Photo Gallery</h2>
        <p class="text-mid mb-24">High-resolution images from the event. Available for editorial use with credit.</p>
        <div class="gallery-grid mb-48">
          ${Array(8).fill(0).map(() => `<div class="gallery-item">📷</div>`).join('')}
        </div>

        <!-- Video -->
        <h2 class="t-display t-h2 mb-24">Videos</h2>
        <div class="grid-2">
          <div style="background:linear-gradient(135deg,var(--navy-mid),var(--navy-deep));border-radius:var(--radius-lg);aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3);font-size:2rem">▶ Promo Video</div>
          <div style="background:linear-gradient(135deg,var(--navy-mid),var(--navy-deep));border-radius:var(--radius-lg);aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3);font-size:2rem">▶ Course Preview</div>
        </div>
      </div>
    </section>
  `;
}

function renderContact() {
  return `
    <section class="page-hero">
      <div class="container">
        <span class="badge badge--gold mb-12">Contact</span>
        <h1 class="t-display t-h1 page-hero__title">Get in Touch</h1>
        <p class="page-hero__desc">Questions about the race, sponsorship, or tourism? We'd love to hear from you.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid-2" style="gap:48px;align-items:start">
          <!-- Contact Form -->
          <div>
            <h2 class="t-display t-h2 mb-24">Send Us a Message</h2>
            <div id="contactFormContainer">
              <div id="contactForm">
                <div class="form-grid">
                  <div class="form-group">
                    <label class="form-label">Name *</label>
                    <input type="text" id="ctName" name="name" class="form-input" placeholder="Your name">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Email *</label>
                    <input type="email" id="ctEmail" name="email" class="form-input" placeholder="you@email.com">
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Subject</label>
                  <select id="ctSubject" name="subject" class="form-select">
                    <option value="">Select topic</option>
                    <option>Registration query</option>
                    <option>Sponsorship inquiry</option>
                    <option>Tourism & accommodation</option>
                    <option>Media & press</option>
                    <option>Volunteering</option>
                    <option>General inquiry</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Message *</label>
                  <textarea id="ctMessage" name="message" class="form-textarea" rows="5" placeholder="How can we help?"></textarea>
                </div>
                <div class="ohnohoney">
                  <input type="text" name="website" id="ctHoney" tabindex="-1" autocomplete="off">
                </div>
                <button class="btn btn--gold btn--lg" style="width:100%" onclick="submitContactForm()">Send Message</button>
              </div>
            </div>
          </div>

          <!-- Contact Info -->
          <div>
            <h2 class="t-display t-h2 mb-24">Quick Contact</h2>

            <a href="https://wa.me/${S.whatsapp}" target="_blank" class="btn btn--whatsapp" style="width:100%;margin-bottom:16px">
              💬 Chat on WhatsApp
            </a>

            <div style="background:var(--white);border-radius:var(--radius-lg);padding:24px;border:1px solid var(--border-light);margin-bottom:24px">
              <h3 style="font-weight:700;margin-bottom:16px">Contact Details</h3>
              <div style="font-size:0.9rem;color:var(--text-mid)">
                <p style="margin-bottom:10px">📧 <a href="mailto:${S.email}" style="color:var(--gold)">${S.email}</a></p>
                <p style="margin-bottom:10px">📞 <a href="tel:${S.phone.replace(/\s/g, '')}" style="color:var(--gold)">${S.phone}</a></p>
                <p>📍 Jinja City, Uganda</p>
              </div>
            </div>

            <div style="background:var(--white);border-radius:var(--radius-lg);padding:24px;border:1px solid var(--border-light);margin-bottom:24px">
              <h3 style="font-weight:700;margin-bottom:16px">Follow Us</h3>
              <div style="display:flex;flex-wrap:wrap;gap:8px">
                <a href="${S.socials.facebook}" target="_blank" class="btn btn--outline btn--sm">Facebook</a>
                <a href="${S.socials.instagram}" target="_blank" class="btn btn--outline btn--sm">Instagram</a>
                <a href="${S.socials.twitter}" target="_blank" class="btn btn--outline btn--sm">X / Twitter</a>
                <a href="${S.socials.youtube}" target="_blank" class="btn btn--outline btn--sm">YouTube</a>
                <a href="${S.socials.strava}" target="_blank" class="btn btn--outline btn--sm">Strava</a>
              </div>
            </div>

            <!-- Map placeholder -->
            <div style="background:linear-gradient(135deg,var(--navy-mid),var(--navy-deep));border-radius:var(--radius-lg);height:200px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3);font-size:1rem">
              🗺️ Map Embed — Jinja City
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ─── ADMIN DASHBOARD PAGE ─── */
let adminTab = 'registrations';

function renderAdmin() {
  if (!isAdminLoggedIn) {
    return `<section class="section" style="margin-top:var(--header-h);text-align:center;padding:120px 20px">
      <h2 class="t-display t-h2 mb-16">Access Denied</h2>
      <p class="text-mid mb-24">Please log in via the Admin link in the footer.</p>
      <button class="btn btn--gold" onclick="openAdminLogin()">Sign In</button>
    </section>`;
  }

  const regs = loadStore(STORE_KEYS.regs);
  const subs = loadStore(STORE_KEYS.subs);
  const emailLog = loadStore('jem-email-log');
  const paid = regs.filter(r => r.status === 'Paid').length;
  const pending = regs.filter(r => r.status === 'Pending').length;
  const failed = regs.filter(r => r.status === 'Failed').length;
  const newSubs = subs.filter(s => s.status === 'New').length;

  // Category breakdown
  const cats = {};
  regs.forEach(r => { cats[r.category] = (cats[r.category] || 0) + 1; });

  return `
    <!-- Admin Topbar -->
    <div class="admin-topbar">
      <div class="admin-topbar__title">
        <span style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,var(--gold),var(--gold-hover));display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:1rem;color:var(--navy-deep)">J</span>
        JEM Admin Dashboard
      </div>
      <div class="admin-topbar__actions">
        <button class="btn btn--outline-white btn--sm" onclick="adminExportRegsCSV()">📥 Export Registrations CSV</button>
        <button class="btn btn--outline-white btn--sm" onclick="adminExportAllJSON()">📦 Export All JSON</button>
        <button class="btn btn--outline-white btn--sm" onclick="adminLogout()" style="border-color:rgba(234,67,53,0.3);color:#ff6b6b">⏻ Logout</button>
      </div>
    </div>

    <section class="section" style="padding-top:32px">
      <div class="container">
        <!-- Stats -->
        <div class="admin-stat-grid mb-32">
          <div class="admin-stat">
            <div class="admin-stat__icon" style="background:rgba(200,150,62,0.1)">🏃</div>
            <div><div class="admin-stat__value">${regs.length}</div><div class="admin-stat__label">Total Registrations</div></div>
          </div>
          <div class="admin-stat">
            <div class="admin-stat__icon" style="background:rgba(52,168,83,0.1)">✓</div>
            <div><div class="admin-stat__value" style="color:var(--success)">${paid}</div><div class="admin-stat__label">Paid</div></div>
          </div>
          <div class="admin-stat">
            <div class="admin-stat__icon" style="background:rgba(251,188,4,0.1)">⏳</div>
            <div><div class="admin-stat__value" style="color:var(--warn)">${pending}</div><div class="admin-stat__label">Pending Payment</div></div>
          </div>
          <div class="admin-stat">
            <div class="admin-stat__icon" style="background:rgba(234,67,53,0.1)">✕</div>
            <div><div class="admin-stat__value" style="color:var(--danger)">${failed}</div><div class="admin-stat__label">Failed</div></div>
          </div>
          <div class="admin-stat">
            <div class="admin-stat__icon" style="background:rgba(46,134,171,0.1)">📬</div>
            <div><div class="admin-stat__value" style="color:var(--teal)">${newSubs}</div><div class="admin-stat__label">New Submissions</div></div>
          </div>
          <div class="admin-stat">
            <div class="admin-stat__icon" style="background:rgba(200,150,62,0.06)">📧</div>
            <div><div class="admin-stat__value">${emailLog.length}</div><div class="admin-stat__label">Emails Sent</div></div>
          </div>
        </div>

        <!-- Category breakdown -->
        ${Object.keys(cats).length > 0 ? `
        <div style="background:var(--white);border:1px solid var(--border-light);border-radius:var(--radius);padding:20px;margin-bottom:32px">
          <h3 style="font-weight:700;font-size:0.9rem;margin-bottom:14px;color:var(--navy)">Registrations by Category</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px">
            ${Object.entries(cats).map(([cat, count]) => {
              const pct = Math.round((count / regs.length) * 100);
              return `<div>
                <div style="display:flex;justify-content:space-between;font-size:0.78rem;margin-bottom:4px">
                  <span style="font-weight:600;color:var(--text)">${cat}</span>
                  <span style="color:var(--text-light)">${count} (${pct}%)</span>
                </div>
                <div style="height:8px;border-radius:4px;background:rgba(200,150,62,0.1)">
                  <div style="height:100%;border-radius:4px;background:linear-gradient(90deg,var(--gold),var(--gold-hover));width:${pct}%"></div>
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>` : ''}

        <!-- Tabs -->
        <div class="admin-tabs">
          <button class="admin-tab ${adminTab === 'registrations' ? 'active' : ''}" onclick="switchAdminTab('registrations')">🏃 Registrations (${regs.length})</button>
          <button class="admin-tab ${adminTab === 'submissions' ? 'active' : ''}" onclick="switchAdminTab('submissions')">📬 Submissions (${subs.length})</button>
          <button class="admin-tab ${adminTab === 'emails' ? 'active' : ''}" onclick="switchAdminTab('emails')">📧 Email Log (${emailLog.length})</button>
        </div>

        ${adminTab === 'registrations' ? renderAdminRegistrations(regs) : ''}
        ${adminTab === 'submissions' ? renderAdminSubmissions(subs) : ''}
        ${adminTab === 'emails' ? renderAdminEmailLog(emailLog) : ''}
      </div>
    </section>
  `;
}

function renderAdminRegistrations(regs) {
  const sorted = [...regs].sort((a, b) => new Date(b.date) - new Date(a.date));
  return `
    <div style="margin-bottom:12px;display:flex;gap:8px;align-items:center;flex-wrap:wrap">
      <input type="text" placeholder="Search name, email, ID..." id="adminRegSearch" class="form-input" style="max-width:300px;padding:8px 14px;font-size:0.85rem" oninput="filterAdminRegs()">
      <select id="adminRegFilter" class="form-select" style="max-width:180px;padding:8px 14px;font-size:0.85rem" onchange="filterAdminRegs()">
        <option value="All">All Statuses</option>
        <option value="Paid">Paid</option>
        <option value="Pending">Pending</option>
        <option value="Failed">Failed</option>
      </select>
    </div>
    <div class="admin-table-wrap">
      <table id="adminRegsTable">
        <thead><tr>
          <th style="background:var(--navy);color:white;padding:12px;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.5px;text-align:left">ID</th>
          <th style="background:var(--navy);color:white;padding:12px;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.5px;text-align:left">Name</th>
          <th style="background:var(--navy);color:white;padding:12px;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.5px;text-align:left">Email</th>
          <th style="background:var(--navy);color:white;padding:12px;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.5px;text-align:left">Phone</th>
          <th style="background:var(--navy);color:white;padding:12px;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.5px;text-align:left">Category</th>
          <th style="background:var(--navy);color:white;padding:12px;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.5px;text-align:left">Size</th>
          <th style="background:var(--navy);color:white;padding:12px;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.5px;text-align:left">Status</th>
          <th style="background:var(--navy);color:white;padding:12px;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.5px;text-align:left">Date</th>
          <th style="background:var(--navy);color:white;padding:12px;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.5px;text-align:left">Actions</th>
        </tr></thead>
        <tbody>
          ${sorted.map((r, i) => `
            <tr data-name="${r.firstName} ${r.lastName}" data-email="${r.email}" data-id="${r.id}" data-status="${r.status}" style="border-bottom:1px solid var(--border-light);background:${i % 2 === 0 ? 'var(--white)' : 'var(--cream)'}">
              <td style="padding:10px 12px;font-family:monospace;font-size:0.75rem">${r.id}</td>
              <td style="padding:10px 12px;font-weight:600;font-size:0.85rem;white-space:nowrap">${r.firstName} ${r.lastName}</td>
              <td style="padding:10px 12px;font-size:0.8rem;color:var(--text-mid)">${r.email}</td>
              <td style="padding:10px 12px;font-size:0.8rem;color:var(--text-mid)">${r.phone}</td>
              <td style="padding:10px 12px;font-size:0.8rem;white-space:nowrap">${r.category}</td>
              <td style="padding:10px 12px;font-size:0.85rem">${r.tshirt}</td>
              <td style="padding:10px 12px">
                <span class="badge badge--${r.status === 'Paid' ? 'green' : r.status === 'Pending' ? 'gold' : 'copper'}">${r.status}</span>
              </td>
              <td style="padding:10px 12px;font-size:0.78rem;color:var(--text-light);white-space:nowrap">${new Date(r.date).toLocaleDateString()}</td>
              <td style="padding:10px 12px;white-space:nowrap">
                <select onchange="updateRegStatus('${r.id}', this.value)" style="padding:4px 8px;border-radius:6px;border:1px solid var(--border-light);font-size:0.75rem;font-family:var(--font-body)">
                  <option value="Paid" ${r.status === 'Paid' ? 'selected' : ''}>✓ Paid</option>
                  <option value="Pending" ${r.status === 'Pending' ? 'selected' : ''}>⏳ Pending</option>
                  <option value="Failed" ${r.status === 'Failed' ? 'selected' : ''}>✕ Failed</option>
                </select>
                <button class="btn btn--outline btn--sm" style="padding:4px 8px;font-size:0.7rem;margin-left:4px" onclick='showDigitalTicket(${JSON.stringify(r).replace(/'/g, "\\'")})'>🎟️</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    ${sorted.length === 0 ? '<p class="text-center text-light" style="padding:40px">No registrations yet.</p>' : ''}
  `;
}

function renderAdminSubmissions(subs) {
  const sorted = [...subs].sort((a, b) => new Date(b.date) - new Date(a.date));
  const typeColors = { sponsor: 'var(--gold)', contact: 'var(--teal)', pledge: 'var(--green)' };
  return `
    <div style="display:flex;flex-direction:column;gap:10px">
      ${sorted.map((s, i) => `
        <div style="background:var(--white);border-radius:var(--radius);border:1px solid var(--border-light);padding:16px 18px;border-left:4px solid ${typeColors[s.type] || 'var(--accent)'}">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;margin-bottom:8px">
            <div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:2px">
                <span style="font-weight:700;font-size:0.9rem">${s.name || s.email}</span>
                <span class="badge badge--${s.type === 'sponsor' ? 'gold' : s.type === 'contact' ? 'teal' : 'green'}">${s.type}</span>
                <span class="badge badge--${s.status === 'New' ? 'teal' : s.status === 'Replied' ? 'green' : 'navy'}">${s.status}</span>
              </div>
              <div style="font-size:0.78rem;color:var(--text-light)">${s.email}${s.org ? ' · ' + s.org : ''}${s.phone ? ' · ' + s.phone : ''}</div>
            </div>
            <div style="display:flex;gap:6px;align-items:center">
              <span style="font-size:0.75rem;color:var(--text-light)">${new Date(s.date).toLocaleDateString()}</span>
              <select onchange="updateSubStatus(${i}, this.value)" style="padding:4px 8px;border-radius:6px;border:1px solid var(--border-light);font-size:0.75rem">
                <option value="New" ${s.status === 'New' ? 'selected' : ''}>New</option>
                <option value="Replied" ${s.status === 'Replied' ? 'selected' : ''}>Replied</option>
                <option value="Archived" ${s.status === 'Archived' ? 'selected' : ''}>Archived</option>
              </select>
            </div>
          </div>
          ${s.subject || s.budget || s.pledge ? `<div style="font-size:0.8rem;font-weight:600;color:var(--navy);margin-bottom:4px">${s.subject || s.budget || 'Pledge: ' + s.pledge}</div>` : ''}
          ${s.message ? `<div style="font-size:0.85rem;color:var(--text-mid);line-height:1.5;background:var(--cream);padding:10px 14px;border-radius:8px;margin-top:4px">${s.message}</div>` : ''}
        </div>
      `).join('')}
      ${sorted.length === 0 ? '<p class="text-center text-light" style="padding:40px">No submissions yet.</p>' : ''}
    </div>
  `;
}

function renderAdminEmailLog(log) {
  const sorted = [...log].sort((a, b) => new Date(b.date) - new Date(a.date));
  return `
    <div class="admin-table-wrap">
      <table>
        <thead><tr>
          <th style="background:var(--navy);color:white;padding:12px;font-size:0.72rem;text-transform:uppercase;text-align:left">To</th>
          <th style="background:var(--navy);color:white;padding:12px;font-size:0.72rem;text-transform:uppercase;text-align:left">Subject</th>
          <th style="background:var(--navy);color:white;padding:12px;font-size:0.72rem;text-transform:uppercase;text-align:left">Status</th>
          <th style="background:var(--navy);color:white;padding:12px;font-size:0.72rem;text-transform:uppercase;text-align:left">Sent</th>
          <th style="background:var(--navy);color:white;padding:12px;font-size:0.72rem;text-transform:uppercase;text-align:left">Preview</th>
        </tr></thead>
        <tbody>
          ${sorted.map((e, i) => `
            <tr style="border-bottom:1px solid var(--border-light);background:${i % 2 === 0 ? 'var(--white)' : 'var(--cream)'}">
              <td style="padding:10px 12px;font-size:0.85rem">${e.to}</td>
              <td style="padding:10px 12px;font-size:0.82rem;color:var(--text-mid)">${e.subject}</td>
              <td style="padding:10px 12px"><span class="badge badge--green">✓ ${e.status}</span></td>
              <td style="padding:10px 12px;font-size:0.78rem;color:var(--text-light)">${new Date(e.date).toLocaleString()}</td>
              <td style="padding:10px 12px"><button class="btn btn--outline btn--sm" style="padding:4px 10px;font-size:0.72rem" onclick="previewEmail('${e.regId}')">👁️ View</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    ${sorted.length === 0 ? '<p class="text-center text-light" style="padding:40px">No emails sent yet. Register a runner to see the email flow.</p>' : ''}
  `;
}

/* ─── ADMIN ACTIONS ─── */
function switchAdminTab(tab) {
  adminTab = tab;
  renderPage();
}

function updateRegStatus(id, status) {
  const regs = loadStore(STORE_KEYS.regs);
  const updated = regs.map(r => r.id === id ? { ...r, status } : r);
  saveStore(STORE_KEYS.regs, updated);
  showToast(`${id} marked as ${status}`);
  renderPage();
}

function updateSubStatus(idx, status) {
  const subs = loadStore(STORE_KEYS.subs);
  if (subs[idx]) subs[idx].status = status;
  saveStore(STORE_KEYS.subs, subs);
  showToast(`Marked as ${status}`);
  renderPage();
}

function filterAdminRegs() {
  const search = (document.getElementById('adminRegSearch') || {}).value || '';
  const filter = (document.getElementById('adminRegFilter') || {}).value || 'All';
  const rows = document.querySelectorAll('#adminRegsTable tbody tr');
  rows.forEach(row => {
    const name = row.dataset.name || '';
    const email = row.dataset.email || '';
    const id = row.dataset.id || '';
    const status = row.dataset.status || '';
    const matchSearch = !search || `${name} ${email} ${id}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filter === 'All' || status === filter;
    row.style.display = matchSearch && matchStatus ? '' : 'none';
  });
}

function adminExportRegsCSV() {
  const regs = loadStore(STORE_KEYS.regs);
  const headers = ["ID","First Name","Last Name","Email","Phone","Category","T-Shirt","Gender","Nationality","Status","Payment","Date"];
  const rows = regs.map(r => [r.id, r.firstName, r.lastName, r.email, r.phone, r.category, r.tshirt, r.gender, r.nationality, r.status, r.payment, r.date]);
  const csv = [headers, ...rows].map(r => r.map(c => `"${(c||'').replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = `jem-registrations-${new Date().toISOString().slice(0,10)}.csv`;
  a.click(); URL.revokeObjectURL(a.href);
  showToast(`Exported ${regs.length} registrations as CSV`);
}

function adminExportAllJSON() {
  const payload = {
    config: CONFIG,
    registrations: loadStore(STORE_KEYS.regs),
    submissions: loadStore(STORE_KEYS.subs),
    emailLog: loadStore('jem-email-log'),
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = `jem-full-export-${new Date().toISOString().slice(0,10)}.json`;
  a.click(); showToast('Full data export downloaded');
}

/* ─── PAGE ROUTER ─── */
const routes = {
  '/': renderHome,
  '/about': renderAbout,
  '/register': renderRegister,
  '/course': renderCourse,
  '/race-week': renderRaceWeek,
  '/explore-jinja': renderExploreJinja,
  '/culture': renderCulture,
  '/results': renderResults,
  '/sponsors': renderSponsors,
  '/media': renderMedia,
  '/contact': renderContact,
  '/admin': renderAdmin,
};

function renderPage() {
  const route = getRoute();
  const renderer = routes[route] || routes['/'];
  app.innerHTML = renderer();
  updateActiveLinks(route);
  updateMeta(route);
  window.scrollTo(0, 0);

  // Toggle footer & mobile register bar for admin page
  const isAdmin = route === '/admin';
  const footer = document.getElementById('footer');
  const mobileBar = document.getElementById('mobileRegBar');
  if (footer) footer.style.display = isAdmin ? 'none' : '';
  if (mobileBar) mobileBar.style.display = isAdmin ? 'none' : '';
}

window.addEventListener('hashchange', renderPage);
window.addEventListener('DOMContentLoaded', renderPage);

/* ─── FAQ TOGGLE ─── */
function toggleFaq(el) {
  el.classList.toggle('open');
}

/* ─── SOUNDBOARD ─── */
let currentAudio = null;
let currentPlayBtn = null;

function playSound(instrumentId, btn) {
  trackEvent('audio_play', instrumentId);

  // Stop current if playing
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
    if (currentPlayBtn) { currentPlayBtn.textContent = '▶'; currentPlayBtn.classList.remove('playing'); }
  }

  if (currentPlayBtn === btn) { currentPlayBtn = null; return; }

  // Create placeholder audio tone using Web Audio API
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Different frequencies for different instruments
    const freqs = { embaire: 523, bigwala: 220, drums: 110, shakers: 880, flute: 659, lyre: 440 };
    const types = { embaire: 'triangle', bigwala: 'sawtooth', drums: 'square', shakers: 'sine', flute: 'sine', lyre: 'triangle' };

    osc.frequency.value = freqs[instrumentId] || 440;
    osc.type = types[instrumentId] || 'sine';
    gain.gain.value = 0.15;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 2);

    btn.textContent = '⏸';
    btn.classList.add('playing');
    currentPlayBtn = btn;

    setTimeout(() => {
      btn.textContent = '▶';
      btn.classList.remove('playing');
      currentPlayBtn = null;
    }, 2000);
  } catch (e) {
    showToast('Audio placeholder — real recordings coming soon', 'error');
  }
}

function filterInstruments(tag, btn) {
  // Update active tab
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  // Filter cards
  document.querySelectorAll('.instrument-card').forEach(card => {
    if (tag === 'All' || card.dataset.tag === tag) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

/* ─── PLEDGE SELECTION ─── */
let selectedPledge = '';

function selectPledge(el, type) {
  document.querySelectorAll('.pledge-option').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  selectedPledge = type;
  const h = document.getElementById('pledgeType');
  if (h) h.value = type;
}

/* ─── FORM SUBMISSIONS ─── */

function submitRegistration() {
  clearErrors('registrationForm');
  const firstName = document.getElementById('regFirstName').value.trim();
  const lastName = document.getElementById('regLastName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const category = document.getElementById('regCategory').value;
  const tshirt = document.getElementById('regTshirt').value;
  const gender = document.getElementById('regGender') ? document.getElementById('regGender').value : '';
  const nationality = document.getElementById('regNationality') ? document.getElementById('regNationality').value.trim() : '';
  const terms = document.getElementById('regTerms').checked;
  const honey = document.getElementById('regHoney').value;

  if (honey) return; // Bot detected

  let valid = true;
  if (!firstName) { setFieldError('regFirstName', 'First name is required'); valid = false; }
  if (!lastName) { setFieldError('regLastName', 'Last name is required'); valid = false; }
  if (!email || !validateEmail(email)) { setFieldError('regEmail', 'Valid email is required'); valid = false; }
  if (!phone || !validatePhone(phone)) { setFieldError('regPhone', 'Valid phone number is required'); valid = false; }
  if (!category) { setFieldError('regCategory', 'Select a category'); valid = false; }
  if (!tshirt) { setFieldError('regTshirt', 'Select a size'); valid = false; }
  if (!terms) { showToast('Please accept the terms and conditions', 'error'); valid = false; }

  if (!valid) return;

  // Generate registration data
  const regData = {
    id: generateTicketId(),
    firstName, lastName, email, phone, category, tshirt, gender, nationality,
    status: 'Pending',
    date: new Date().toISOString(),
    payment: 'Pending',
    club: document.getElementById('regClub') ? document.getElementById('regClub').value.trim() : '',
  };

  // Save to store
  const regs = loadStore(STORE_KEYS.regs);
  regs.push(regData);
  saveStore(STORE_KEYS.regs, regs);

  trackEvent('register_click', { category, email });

  // Show success with ticket + email status
  document.getElementById('regFormContainer').innerHTML = `
    <div class="form-success" style="padding:24px">
      <div style="font-size:2.5rem;margin-bottom:10px">🎉</div>
      <h3 style="font-size:1.2rem;margin-bottom:8px;color:var(--success)">Registration Received!</h3>
      <p style="color:var(--text-mid);font-size:0.9rem;margin-bottom:6px">Thank you, <strong>${firstName}</strong>! Your registration for the <strong>${category}</strong> has been submitted.</p>
      <p style="color:var(--text-light);font-size:0.82rem;margin-bottom:20px">Registration ID: <strong style="font-family:monospace;color:var(--navy)">${regData.id}</strong></p>

      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:16px">
        <button class="btn btn--gold btn--sm" onclick='showDigitalTicket(${JSON.stringify(regData)})'>🎟️ View Digital Ticket</button>
        <button class="btn btn--outline btn--sm" onclick='showDigitalTicket(${JSON.stringify(regData)})'>📥 Download Invoice</button>
      </div>

      <div id="emailStatus"></div>
    </div>
  `;

  // Trigger email simulation
  setTimeout(() => simulateEmail(email, regData), 400);

  showToast('Registration submitted! Check your email 🎉');
}

function submitSponsorInquiry() {
  const name = document.getElementById('spName').value.trim();
  const org = document.getElementById('spOrg').value.trim();
  const email = document.getElementById('spEmail').value.trim();
  const phone = document.getElementById('spPhone') ? document.getElementById('spPhone').value.trim() : '';
  const budget = document.getElementById('spBudget') ? document.getElementById('spBudget').value : '';
  const message = document.getElementById('spMessage') ? document.getElementById('spMessage').value.trim() : '';
  const honey = document.getElementById('spHoney').value;

  if (honey) return;
  if (!name || !org || !email || !validateEmail(email)) {
    showToast('Please fill in name, organisation, and a valid email', 'error');
    return;
  }

  // Save submission
  const subs = loadStore(STORE_KEYS.subs);
  subs.push({ type: 'sponsor', name, org, email, phone, budget, message, date: new Date().toISOString(), status: 'New' });
  saveStore(STORE_KEYS.subs, subs);

  trackEvent('sponsor_inquiry_submit', { name, org, email });

  document.getElementById('sponsorFormContainer').innerHTML = `
    <div class="form-success">
      <div style="font-size:2rem;margin-bottom:12px">🤝</div>
      <h3 style="color:var(--success)">Inquiry Sent!</h3>
      <p style="color:var(--text-mid);font-size:0.9rem;margin-top:8px">Thank you, ${name}. We'll get back to you within 2 business days at <strong>${email}</strong>.</p>
    </div>
  `;
  showToast('Sponsor inquiry sent! 🤝');
}

function submitContactForm() {
  const name = document.getElementById('ctName').value.trim();
  const email = document.getElementById('ctEmail').value.trim();
  const subject = document.getElementById('ctSubject') ? document.getElementById('ctSubject').value : '';
  const message = document.getElementById('ctMessage').value.trim();
  const honey = document.getElementById('ctHoney').value;

  if (honey) return;
  if (!name || !email || !validateEmail(email) || !message) {
    showToast('Please fill in name, email, and message', 'error');
    return;
  }

  const subs = loadStore(STORE_KEYS.subs);
  subs.push({ type: 'contact', name, email, subject, message, date: new Date().toISOString(), status: 'New' });
  saveStore(STORE_KEYS.subs, subs);

  trackEvent('contact_submit', { name, email });

  document.getElementById('contactFormContainer').innerHTML = `
    <div class="form-success">
      <div style="font-size:2rem;margin-bottom:12px">✉️</div>
      <h3 style="color:var(--success)">Message Sent!</h3>
      <p style="color:var(--text-mid);font-size:0.9rem;margin-top:8px">Thanks, ${name}. We'll respond to <strong>${email}</strong> as soon as possible.</p>
    </div>
  `;

  showToast('Message sent! ✉️');
}

function submitPledge() {
  const email = document.getElementById('pledgeEmail').value.trim();
  const consent = document.getElementById('pledgeConsent').checked;

  if (!email || !validateEmail(email)) {
    showToast('Please enter a valid email', 'error');
    return;
  }
  if (!consent) {
    showToast('Please accept the consent checkbox', 'error');
    return;
  }

  trackEvent('twegaite_pledge', { email, pledge: selectedPledge || 'general' });

  document.getElementById('twegaiteForm').innerHTML = `
    <div style="text-align:center;padding:20px">
      <div style="font-size:2rem;margin-bottom:8px">🤝</div>
      <h3 style="color:var(--gold);font-size:1.1rem">Welcome to Twegaite!</h3>
      <p style="color:rgba(255,255,255,0.6);font-size:0.85rem;margin-top:8px">You've joined the movement. We'll be in touch at <strong style="color:var(--gold)">${email}</strong>.</p>
    </div>
  `;

  showToast('Welcome to Twegaite! 🤝');
}

function submitTwegaiteHome() {
  const email = document.getElementById('twegaiteEmail').value.trim();
  if (!email || !validateEmail(email)) {
    showToast('Please enter a valid email', 'error');
    return;
  }
  trackEvent('newsletter_signup', email);
  showToast('Welcome to the Explorer community! 🎉');
  document.getElementById('twegaiteEmail').value = '';
}
