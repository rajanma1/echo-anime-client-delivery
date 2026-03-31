# ECHO ANIME - Client Delivery Package

This package is production-ready and includes:

- Static version (deploy anywhere): `static/`
- Next.js version (App Router): `next/`
- NFT-ready export flow: single PNG/JSON per card and full ZIP bundle

## 1) Review Summary (What was improved)

- Refactor: split into clean HTML/CSS/JS structure, removed inline handlers, centralized reusable functions.
- Visual + responsive: stronger art direction, improved typography scale, improved mobile card layout and controls.
- NFT export complete: per-piece `1024x1024 PNG`, metadata JSON, and one-click full collection ZIP (`images/` + `metadata/`).
- Performance + a11y: delegated event handling, reduced-motion support, focus-visible states, semantic structure, skip link.
- React/Next.js version: complete App Router implementation with matching features.

## 2) Delivery Contents

- `static/index.html`
- `static/assets/styles.css`
- `static/assets/app.js`
- `next/package.json`
- `next/app/layout.js`
- `next/app/page.js`
- `next/app/globals.css`
- `next/lib/pieces.js`

## 3) How to run

### Static
1. Open `static/index.html` in a browser.
2. For best reliability (CDN JSZip), serve with a local server:
   - `npx serve static`
   - or VS Code Live Server

### Next.js
1. `cd next`
2. `npm install`
3. `npm run dev`
4. Open `http://localhost:3000`

## 4) Client handoff notes

- Replace `ipfs://YOUR_CID_HERE/` with the real CID after upload.
- `external_url` currently points to `https://echoanime.art` placeholder.
- Naming is CID-friendly and deterministic.

## 5) Acceptance checklist

- [x] Responsive desktop + mobile layout
- [x] Individual PNG export works
- [x] Individual metadata export works
- [x] Full ZIP pack export works
- [x] Rarity filter works
- [x] Keyboard and focus accessibility basics are in place
