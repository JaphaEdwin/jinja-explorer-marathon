# Jinja Explorer Marathon — Website

## Overview
Complete marketing website for the Jinja Explorer Marathon (JEM), a destination marathon in Jinja, Uganda. Built as a static SPA (Single Page Application) with hash-based routing — no build step required.

## Quick Start

### Run Locally
Simply open `index.html` in a browser, or serve with any static server:

```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## File Structure
```
├── index.html      # Main HTML shell (header, footer, mobile nav, meta tags)
├── styles.css      # Complete design system (variables, components, responsive)
├── config.js       # ALL editable site content (fees, times, FAQs, instruments, etc.)
├── app.js          # SPA router, page renderers, form handlers, soundboard
└── README.md       # This file
```

## Editing Content

### All content lives in `config.js`
Open `config.js` and edit any section:

| Section | What it controls |
|---------|-----------------|
| `site` | Event name, date, location, contact details, social links |
| `fees` | Race entry fees by category |
| `startTimes` | Gun times and assembly times |
| `pillars` | Brand values (Belonging, Pride, Legacy, Adventure, Stewardship) |
| `instruments` | Busoga Soundboard cards |
| `sponsorTiers` | Sponsorship packages and perks |
| `itineraries` | Tourism weekend plans |
| `faqs` | Frequently Asked Questions |
| `courseMarkers` | Route landmarks timeline |
| `aidStations` | Medical and hydration stations |
| `raceWeekSchedule` | Thursday–Sunday schedule |
| `accommodation` | Hotel/lodge listings |
| `transport` | Getting to Jinja info |
| `routeLinks` | GPX, Strava, Google Maps links per distance |
| `seo` | Meta titles and descriptions per page |

### Replace Images
All image placeholders use CSS gradient backgrounds. To add real images:
1. Place images in an `/images` folder
2. In `styles.css`, update `.card__img` and similar classes
3. Or in `app.js`, replace the placeholder HTML with `<img>` tags

### Replace Audio
The soundboard uses Web Audio API tones as placeholders. To add real audio:
1. Place MP3 files in an `/audio` folder (e.g., `embaire.mp3`)
2. In `app.js`, update the `playSound()` function to load real files

## Pages (11 routes)

| Route | Page |
|-------|------|
| `#/` | Home |
| `#/about` | About JEM |
| `#/register` | Registration (fees, times, form) |
| `#/course` | Course, route downloads, aid stations |
| `#/race-week` | Expo, bib collection, schedule |
| `#/explore-jinja` | Tourism, accommodation, transport |
| `#/culture` | Busoga Soundboard + Twegaite pledge |
| `#/results` | Results & Winners (pre-event placeholder) |
| `#/sponsors` | Sponsorship tiers, inquiry form |
| `#/media` | Press kit, gallery, videos |
| `#/contact` | Contact form, WhatsApp, socials |

## Forms
All forms include:
- Client-side validation
- Honeypot anti-spam
- Success/error states
- Analytics event tracking (console.log)

**Note:** Forms are front-end only. To make them functional:
- Connect to a backend (e.g., Formspree, Netlify Forms, custom API)
- Or integrate with a service like Google Forms / Airtable

## Analytics Events
Events are logged via `trackEvent()` (console.log + dataLayer):
- `register_click` — Register button clicks
- `sponsor_inquiry_submit` — Sponsor form submissions
- `proposal_download_click` — Proposal PDF downloads
- `audio_play` — Soundboard instrument plays
- `itinerary_click` — Tourism itinerary clicks
- `newsletter_signup` — Newsletter signups
- `contact_submit` — Contact form submissions
- `twegaite_pledge` — Twegaite pledge signups

## Deployment

### Netlify / Vercel / Cloudflare Pages
1. Push files to a Git repository
2. Connect repo to hosting platform
3. Set build command: (none — static files)
4. Set publish directory: `.` or `/`

### Traditional hosting
Upload all files to your web server root directory.

### Custom domain
Point your domain DNS to your hosting provider and enable SSL.

## Browser Support
- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Mobile Safari, Chrome for Android
- Progressive enhancement for older browsers

## Roadmap (from Gap Checklist)
- [ ] Backend registration with database storage
- [ ] Email confirmations (SendGrid / Mailgun)
- [ ] Payment integration (Mobile Money + Card)
- [ ] Admin panel with database backend
- [ ] Results integration with timing partner
- [ ] Blog/news section
- [ ] Runner self-service portal

## License
© 2026 Jinja Explorer Marathon. All rights reserved.
