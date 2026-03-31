"use client";

import { useMemo, useState } from "react";
import JSZip from "jszip";
import { PIECES } from "../lib/pieces";

function sanitizeFileName(value) {
  return value.replace(/[^a-z0-9_-]+/gi, "_");
}

function getTrait(piece, name) {
  return piece.traits.find((x) => x.t === name)?.v || "";
}

function buildSvg(piece, size = 300) {
  return `
<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#0a0a14"/>
  <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.37}" fill="${piece.accent}33"/>
  <path d="M80 90 Q60 140 75 180 Q90 160 120 155" fill="${piece.hair}" opacity="0.95"/>
  <path d="M220 90 Q240 140 225 180 Q210 160 180 155" fill="${piece.hair}" opacity="0.95"/>
  <ellipse cx="150" cy="155" rx="62" ry="78" fill="${piece.skin}"/>
  <path d="M95 95 Q120 60 150 75 Q180 60 205 95" fill="${piece.hair}"/>
  <ellipse cx="122" cy="145" rx="18" ry="22" fill="#111"/>
  <ellipse cx="178" cy="145" rx="18" ry="22" fill="#111"/>
  <circle cx="125" cy="142" r="8" fill="${piece.eyes}"/>
  <circle cx="181" cy="142" r="8" fill="${piece.eyes}"/>
  <circle cx="128" cy="139" r="3" fill="#fff"/>
  <circle cx="184" cy="139" r="3" fill="#fff"/>
  <path d="M130 185 Q150 195 170 185" fill="none" stroke="#aa4466" stroke-width="6" stroke-linecap="round"/>
  <path d="M95 210 Q105 260 150 245 Q195 260 205 210 L180 225 L120 225 Z" fill="#1a1a2e"/>
  <path d="M105 215 Q115 235 150 230 Q185 235 195 215" fill="${piece.accent}55"/>
</svg>`;
}

function metadataFor(piece) {
  return {
    name: piece.name,
    description: "1/1 hand-crafted anime masterpiece from ECHO ANIME Vault. Azuki-inspired streetwear meets premium anime aesthetics.",
    image: `ipfs://YOUR_CID_HERE/images/${sanitizeFileName(piece.name)}_1024.png`,
    external_url: "https://echoanime.art",
    attributes: piece.traits.map((t) => ({ trait_type: t.t, value: t.v }))
  };
}

async function svgToPngBlob(svg, size = 1024) {
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  const image = await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, 0, 0, size, size);
  URL.revokeObjectURL(url);

  return new Promise((resolve) => canvas.toBlob(resolve, "image/png", 1));
}

function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

export default function Page() {
  const [rarity, setRarity] = useState("ALL");
  const [progress, setProgress] = useState("");

  const visible = useMemo(() => {
    if (rarity === "ALL") return PIECES;
    return PIECES.filter((piece) => getTrait(piece, "Rarity") === rarity);
  }, [rarity]);

  async function downloadPng(piece) {
    const blob = await svgToPngBlob(buildSvg(piece), 1024);
    downloadBlob(blob, `${sanitizeFileName(piece.name)}_1024.png`);
  }

  function downloadJson(piece) {
    const blob = new Blob([JSON.stringify(metadataFor(piece), null, 2)], { type: "application/json" });
    downloadBlob(blob, `${sanitizeFileName(piece.name)}_metadata.json`);
  }

  async function downloadAll() {
    const zip = new JSZip();
    const imageFolder = zip.folder("images");
    const metadataFolder = zip.folder("metadata");

    for (let i = 0; i < PIECES.length; i += 1) {
      const piece = PIECES[i];
      const basename = sanitizeFileName(piece.name);

      const pngBlob = await svgToPngBlob(buildSvg(piece), 1024);
      imageFolder.file(`${basename}_1024.png`, pngBlob);
      metadataFolder.file(`${basename}_metadata.json`, JSON.stringify(metadataFor(piece), null, 2));
      setProgress(`Packing ${i + 1}/${PIECES.length}...`);
    }

    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob(blob, "echo_anime_collection_pack.zip");
    setProgress("");
  }

  return (
    <main>
      <header className="hero">
        <h1>ECHO ANIME</h1>
        <p>12/12 ULTRA-RARE 1/1 ANIME MASTERPIECES</p>
        <p className="sub">AZUKI-INSPIRED STREET x ANIME FUSION</p>
        <div className="toolbar">
          <button className="btn btn-primary" onClick={downloadAll} type="button">Download Full Pack (.zip)</button>
          <label className="filter">
            <span>Rarity</span>
            <select value={rarity} onChange={(e) => setRarity(e.target.value)} aria-label="Filter by rarity">
              <option value="ALL">All</option>
              <option value="Legendary">Legendary</option>
              <option value="Mythic">Mythic</option>
              <option value="Epic">Epic</option>
            </select>
          </label>
          <span className="progress" aria-live="polite">{progress}</span>
        </div>
      </header>

      <section className="gallery" aria-label="Anime collection">
        {visible.map((piece, i) => (
          <article className="card" style={{ "--accent": piece.accent, "--delay": `${i * 40}ms` }} key={piece.id}>
            <div className="art" dangerouslySetInnerHTML={{ __html: buildSvg(piece) }} />
            <div className="meta">
              <span className="name">{piece.name}</span>
              <div className="traits">
                {piece.traits.map((trait) => (
                  <span key={`${piece.id}-${trait.t}`}>{trait.t}: {trait.v}</span>
                ))}
              </div>
              <div className="card-actions">
                <button className="btn" type="button" onClick={() => downloadPng(piece)}>PNG 1024</button>
                <button className="btn" type="button" onClick={() => downloadJson(piece)}>Metadata</button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer>ECHO ANIME VAULT 2026 | 12 UNIQUE CHARACTERS | NEXT.JS EDITION</footer>
    </main>
  );
}
