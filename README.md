# Jinja Explorer Marathon (static preview)

This folder is ready for GitHub Pages (no build tooling).

## Files
- `index.html`
- `styles.css`
- `app.js` (runs via Babel in the browser)

## Add your logo
Place your logo file in this same folder and name it:
- `jem-logo.png`

(Or change `LOGO_SRC` inside `app.js`.)

## GitHub Pages
1. Create a repo and upload these files to the repo root (or `/docs`).
2. In GitHub: Settings → Pages → select the branch/folder → Save.
3. Open the Pages URL and you should see the site.

> Note: Because this uses Babel in the browser, it’s meant for **preview/demo**.
> For production, use a normal React build (Vite/CRA/Next) and deploy the compiled output.
