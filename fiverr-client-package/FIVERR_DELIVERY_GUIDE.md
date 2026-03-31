# Fiverr Client Delivery - ECHO ANIME

This package is prepared for direct client handoff.

## Included
- `static/` : zero-build version (open directly or host on any static server)
- `next/` : Next.js source version (App Router)
- `README.md` : project overview

## Quick Start For Client

### Option A: Static (fastest)
1. Open `static/index.html` in browser.
2. Or host `static/` on Netlify/Vercel static hosting.

### Option B: Next.js
1. Open terminal in `next/`
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:3000`

## NFT Export Notes
- Production export controls are in the static app header (`Export Settings`).
- Set `Image Base URI` to final IPFS path before final metadata export.
- Full pack ZIP includes:
  - `images/{tokenId}.png`
  - `metadata/{tokenId}.json`
  - `contract-uri.json`
  - `manifest.csv`

## Final Client Steps
1. Upload `images/` to IPFS.
2. Set exported metadata image URIs to the image CID path.
3. Upload `metadata/` to IPFS.
4. Set smart contract `baseURI` to metadata CID.

## Delivery Integrity
- This handoff intentionally excludes `node_modules/` and `.next/`.
- Client can regenerate everything from included source files.