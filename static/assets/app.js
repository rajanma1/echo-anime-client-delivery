const PIECES = [
  { id: 0, name: "NEON KIRA #001", accent: "#ff00aa", hair: "#ff66ee", eyes: "#00ffff", skin: "#f8c8b0", traits: [{ t: "Hair", v: "Cyber Twin Tails" }, { t: "Eyes", v: "Heterochromia Glow" }, { t: "Outfit", v: "Neon Hoodie + Jacket" }, { t: "Accessory", v: "VR Visor" }, { t: "Bg", v: "Tokyo Night Rain" }, { t: "Rarity", v: "Legendary" }] },
  { id: 1, name: "SHADOW RYU #002", accent: "#00ffcc", hair: "#222233", eyes: "#ff3366", skin: "#e8b080", traits: [{ t: "Hair", v: "Undercut Samurai" }, { t: "Eyes", v: "Scarred Crimson" }, { t: "Outfit", v: "Torn Kimono Jacket" }, { t: "Accessory", v: "Katana Sheath" }, { t: "Bg", v: "Neon Dojo" }, { t: "Rarity", v: "Mythic" }] },
  { id: 2, name: "SAKURA NOVA #003", accent: "#ff99ff", hair: "#ff4488", eyes: "#88ffff", skin: "#ffe0c0", traits: [{ t: "Hair", v: "Sakura Bangs" }, { t: "Eyes", v: "Star Pupils" }, { t: "Outfit", v: "Cherry Kimono Hoodie" }, { t: "Accessory", v: "Floating Petals" }, { t: "Bg", v: "Blooming Shrine" }, { t: "Rarity", v: "Legendary" }] },
  { id: 3, name: "MECHA LUNA #004", accent: "#00aaff", hair: "#aaccff", eyes: "#ffdd00", skin: "#d0e0ff", traits: [{ t: "Hair", v: "Holo Bob" }, { t: "Eyes", v: "Mech Scanner" }, { t: "Outfit", v: "Pilot Exo-Suit" }, { t: "Accessory", v: "Neural Crown" }, { t: "Bg", v: "Orbital Station" }, { t: "Rarity", v: "Epic" }] },
  { id: 4, name: "ONI BLAZE #005", accent: "#ff4400", hair: "#ff8800", eyes: "#ffff66", skin: "#aa6644", traits: [{ t: "Hair", v: "Flame Horns" }, { t: "Eyes", v: "Inferno Glow" }, { t: "Outfit", v: "Street Oni Jacket" }, { t: "Accessory", v: "Demon Mask" }, { t: "Bg", v: "Volcano City" }, { t: "Rarity", v: "Mythic" }] },
  { id: 5, name: "KITSUNE ECHO #006", accent: "#ccff44", hair: "#ddff88", eyes: "#ff44aa", skin: "#ffe8c8", traits: [{ t: "Hair", v: "Nine-Tail Flow" }, { t: "Eyes", v: "Fox Hetero" }, { t: "Outfit", v: "Spirit Kimono" }, { t: "Accessory", v: "Golden Bell" }, { t: "Bg", v: "Mystic Forest" }, { t: "Rarity", v: "Legendary" }] },
  { id: 6, name: "VOID RONIN #007", accent: "#aa66ff", hair: "#553388", eyes: "#ffffff", skin: "#c8b0a0", traits: [{ t: "Hair", v: "Long Black Topknot" }, { t: "Eyes", v: "Void White" }, { t: "Outfit", v: "Shadow Trench" }, { t: "Accessory", v: "Broken Mask" }, { t: "Bg", v: "Abandoned Temple" }, { t: "Rarity", v: "Epic" }] },
  { id: 7, name: "CYBER SAKI #008", accent: "#ff0088", hair: "#44ffff", eyes: "#ff0088", skin: "#f0d0b8", traits: [{ t: "Hair", v: "Holographic Bob" }, { t: "Eyes", v: "LED Pink" }, { t: "Outfit", v: "Chrome School Uniform" }, { t: "Accessory", v: "Data Gloves" }, { t: "Bg", v: "Shibuya Grid" }, { t: "Rarity", v: "Mythic" }] },
  { id: 8, name: "THUNDER YUKI #009", accent: "#66aaff", hair: "#ffffff", eyes: "#00ffff", skin: "#e8e8ff", traits: [{ t: "Hair", v: "Lightning Spikes" }, { t: "Eyes", v: "Electric Blue" }, { t: "Outfit", v: "Storm Jacket" }, { t: "Accessory", v: "Thunder Orb" }, { t: "Bg", v: "Lightning Sky" }, { t: "Rarity", v: "Legendary" }] },
  { id: 9, name: "GALAXY HARU #010", accent: "#cc88ff", hair: "#aa44ff", eyes: "#ffff88", skin: "#f8e0ff", traits: [{ t: "Hair", v: "Starry Twintails" }, { t: "Eyes", v: "Galaxy Swirl" }, { t: "Outfit", v: "Cosmic Hoodie" }, { t: "Accessory", v: "Nebula Earpiece" }, { t: "Bg", v: "Starfield" }, { t: "Rarity", v: "Epic" }] },
  { id: 10, name: "FLAME AKIRA #011", accent: "#ff5522", hair: "#ffaa44", eyes: "#ffee66", skin: "#f8c8a0", traits: [{ t: "Hair", v: "Fire Mohawk" }, { t: "Eyes", v: "Ember Glow" }, { t: "Outfit", v: "Racer Jacket" }, { t: "Accessory", v: "Flame Sunglasses" }, { t: "Bg", v: "Midnight Race" }, { t: "Rarity", v: "Mythic" }] },
  { id: 11, name: "CRYSTAL MIO #012", accent: "#44ffee", hair: "#88ffff", eyes: "#ff88ff", skin: "#f0ffff", traits: [{ t: "Hair", v: "Crystal Waves" }, { t: "Eyes", v: "Diamond Spark" }, { t: "Outfit", v: "Ice Princess Coat" }, { t: "Accessory", v: "Floating Crown" }, { t: "Bg", v: "Frozen Neon" }, { t: "Rarity", v: "Legendary" }] }
];

const EXPORT_DEFAULTS = {
  collectionName: "ECHO ANIME",
  collectionDescription: "12 hand-crafted 1/1 anime masterpieces from ECHO ANIME Vault.",
  imageBaseUri: "ipfs://YOUR_CID_HERE/images",
  externalUrl: "https://echoanime.art",
  chain: "ethereum",
  contractAddress: "",
  sellerFeeBasisPoints: 500,
  feeRecipient: ""
};

const gallery = document.querySelector("#gallery");
const rarityFilter = document.querySelector("#rarityFilter");
const configInputs = {
  collectionName: document.querySelector("#cfgCollectionName"),
  collectionDescription: document.querySelector("#cfgCollectionDescription"),
  imageBaseUri: document.querySelector("#cfgImageBaseUri"),
  externalUrl: document.querySelector("#cfgExternalUrl"),
  chain: document.querySelector("#cfgChain"),
  contractAddress: document.querySelector("#cfgContractAddress"),
  sellerFeeBasisPoints: document.querySelector("#cfgSellerFeeBps"),
  feeRecipient: document.querySelector("#cfgFeeRecipient")
};

function sanitizeFileName(value) {
  return String(value).replace(/[^a-z0-9_-]+/gi, "_");
}

function tokenIdFor(piece) {
  return piece.id + 1;
}

function getTrait(piece, traitName) {
  const trait = piece.traits.find((item) => item.t === traitName);
  return trait ? trait.v : "";
}

function normalizeIpfsUri(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("ipfs://")) return trimmed.replace(/\/+$/, "");

  const cidOnlyMatch = trimmed.match(/^[a-zA-Z0-9]{30,}$/);
  if (cidOnlyMatch) return `ipfs://${trimmed}`;

  const gatewayMatch = trimmed.match(/^https?:\/\/[^/]+\/ipfs\/([^/?#]+)(?:[/?#].*)?$/i);
  if (gatewayMatch) return `ipfs://${gatewayMatch[1]}`;

  return trimmed.replace(/\/+$/, "");
}

function buildImageUri(baseUri, tokenId) {
  const base = normalizeIpfsUri(baseUri);
  return base ? `${base}/${tokenId}.png` : `${tokenId}.png`;
}

function buildSvg(piece, size = 300) {
  return `
<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
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

  <ellipse cx="128" cy="132" rx="8" ry="18" fill="#ffffff22" transform="rotate(-25 128 132)"/>
</svg>`;
}

function fallbackHashFromBytes(bytes) {
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < bytes.length; i += 1) {
    h1 ^= bytes[i];
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= bytes[i] + (i & 0xff);
    h2 = Math.imul(h2, 0x01000013);
  }
  const p1 = (h1 >>> 0).toString(16).padStart(8, "0");
  const p2 = (h2 >>> 0).toString(16).padStart(8, "0");
  return `fallback_${p1}${p2}`;
}

async function strongOrFallbackHashFromText(value) {
  const bytes = new TextEncoder().encode(value);
  if (globalThis.crypto && globalThis.crypto.subtle) {
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  return fallbackHashFromBytes(bytes);
}

async function strongOrFallbackHashFromBlob(blob) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  if (globalThis.crypto && globalThis.crypto.subtle) {
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  return fallbackHashFromBytes(bytes);
}

function getExportConfig() {
  const raw = {
    collectionName: configInputs.collectionName.value || EXPORT_DEFAULTS.collectionName,
    collectionDescription: configInputs.collectionDescription.value || EXPORT_DEFAULTS.collectionDescription,
    imageBaseUri: normalizeIpfsUri(configInputs.imageBaseUri.value || EXPORT_DEFAULTS.imageBaseUri),
    externalUrl: configInputs.externalUrl.value.trim(),
    chain: (configInputs.chain.value || EXPORT_DEFAULTS.chain).trim().toLowerCase(),
    contractAddress: configInputs.contractAddress.value.trim(),
    sellerFeeBasisPoints: Number(configInputs.sellerFeeBasisPoints.value),
    feeRecipient: configInputs.feeRecipient.value.trim()
  };

  if (!Number.isFinite(raw.sellerFeeBasisPoints) || raw.sellerFeeBasisPoints < 0 || raw.sellerFeeBasisPoints > 10000) {
    raw.sellerFeeBasisPoints = EXPORT_DEFAULTS.sellerFeeBasisPoints;
  }

  return raw;
}

function syncConfigToInputs(config) {
  configInputs.collectionName.value = config.collectionName;
  configInputs.collectionDescription.value = config.collectionDescription;
  configInputs.imageBaseUri.value = config.imageBaseUri;
  configInputs.externalUrl.value = config.externalUrl;
  configInputs.chain.value = config.chain;
  configInputs.contractAddress.value = config.contractAddress;
  configInputs.sellerFeeBasisPoints.value = String(config.sellerFeeBasisPoints);
  configInputs.feeRecipient.value = config.feeRecipient;
}

function persistExportConfig(config) {
  localStorage.setItem("echo_anime_export_config", JSON.stringify(config));
}

function restoreExportConfig() {
  try {
    const raw = localStorage.getItem("echo_anime_export_config");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    syncConfigToInputs({ ...EXPORT_DEFAULTS, ...parsed });
  } catch {
    syncConfigToInputs(EXPORT_DEFAULTS);
  }
}

async function metadataFor(piece, config) {
  const tokenId = tokenIdFor(piece);
  const dnaSource = `${piece.name}|${piece.traits.map((t) => `${t.t}:${t.v}`).join("|")}`;
  const dna = await strongOrFallbackHashFromText(dnaSource);
  const attributes = piece.traits.map((trait) => ({ trait_type: trait.t, value: trait.v }));
  const metadata = {
    name: `${config.collectionName} #${String(tokenId).padStart(4, "0")}`,
    description: config.collectionDescription,
    image: buildImageUri(config.imageBaseUri, tokenId),
    external_url: config.externalUrl || undefined,
    background_color: piece.accent.replace("#", ""),
    token_id: String(tokenId),
    tokenId,
    edition: tokenId,
    dna,
    chain: config.chain,
    contract_address: config.contractAddress || undefined,
    attributes,
    properties: {
      category: "image",
      creators: config.feeRecipient ? [{ address: config.feeRecipient, share: 100 }] : [],
      files: [{ uri: `${tokenId}.png`, type: "image/png" }]
    }
  };

  if (!metadata.external_url) delete metadata.external_url;
  if (!metadata.contract_address) delete metadata.contract_address;
  if (!metadata.properties.creators.length) delete metadata.properties.creators;

  return metadata;
}

function contractUriFor(config) {
  return {
    name: config.collectionName,
    description: config.collectionDescription,
    seller_fee_basis_points: config.sellerFeeBasisPoints,
    fee_recipient: config.feeRecipient || "",
    external_link: config.externalUrl || "",
    image: normalizeIpfsUri(config.imageBaseUri) ? `${normalizeIpfsUri(config.imageBaseUri)}/collection.png` : "",
    collaborators: []
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
  return await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 1));
}

function triggerDownloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function triggerDownloadText(jsonObject, filename) {
  const blob = new Blob([JSON.stringify(jsonObject, null, 2)], { type: "application/json" });
  triggerDownloadBlob(blob, filename);
}

function pieceById(id) {
  return PIECES.find((piece) => piece.id === Number(id));
}

async function downloadPiecePng(id) {
  const piece = pieceById(id);
  if (!piece) return;

  const tokenId = tokenIdFor(piece);
  const svg = buildSvg(piece, 300);
  const blob = await svgToPngBlob(svg, 1024);
  triggerDownloadBlob(blob, `${tokenId}.png`);
}

async function downloadPieceJson(id) {
  const piece = pieceById(id);
  if (!piece) return;

  const config = getExportConfig();
  const tokenId = tokenIdFor(piece);
  const metadata = await metadataFor(piece, config);
  triggerDownloadText(metadata, `${tokenId}.json`);
}

function downloadContractUriJson() {
  const config = getExportConfig();
  triggerDownloadText(contractUriFor(config), "contract-uri.json");
}

async function downloadAllAsZip() {
  if (!window.JSZip) {
    alert("JSZip failed to load. Check network access and try again.");
    return;
  }

  const button = document.querySelector('[data-action="download-all"]');
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "Building ZIP...";

  try {
    const config = getExportConfig();
    persistExportConfig(config);

    const zip = new JSZip();
    const imagesFolder = zip.folder("images");
    const metadataFolder = zip.folder("metadata");

    const manifestRows = ["token_id,file_name,image_hash,metadata_hash,name,rarity"];

    for (let i = 0; i < PIECES.length; i += 1) {
      const piece = PIECES[i];
      const tokenId = tokenIdFor(piece);

      const pngBlob = await svgToPngBlob(buildSvg(piece, 300), 1024);
      imagesFolder.file(`${tokenId}.png`, pngBlob);

      const metadata = await metadataFor(piece, config);
      const metadataText = JSON.stringify(metadata, null, 2);
      metadataFolder.file(`${tokenId}.json`, metadataText);

      const imageHash = await strongOrFallbackHashFromBlob(pngBlob);
      const metadataHash = await strongOrFallbackHashFromText(metadataText);
      manifestRows.push([
        tokenId,
        `${tokenId}.png`,
        imageHash,
        metadataHash,
        `"${metadata.name.replace(/"/g, '""')}"`,
        `"${getTrait(piece, "Rarity")}"`
      ].join(","));

      button.textContent = `Building ZIP... ${i + 1}/${PIECES.length}`;
    }

    zip.file("contract-uri.json", JSON.stringify(contractUriFor(config), null, 2));
    zip.file("manifest.csv", manifestRows.join("\n"));
    zip.file("README.txt", [
      "ECHO ANIME Export Package",
      "",
      "Structure:",
      "- images/{token_id}.png",
      "- metadata/{token_id}.json",
      "- contract-uri.json",
      "- manifest.csv",
      "",
      "Notes:",
      "1) Upload images folder to IPFS.",
      "2) Set imageBaseUri in export settings to ipfs://<CID>/images before generating final metadata.",
      "3) Upload metadata folder to IPFS and set contract baseURI to that CID.",
      ""
    ].join("\n"));

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const zipName = `${sanitizeFileName(config.collectionName)}_production_pack.zip`;
    triggerDownloadBlob(zipBlob, zipName);
  } catch (error) {
    alert(`Export failed: ${error.message}`);
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
}

function cardHtml(piece, index) {
  const rarity = getTrait(piece, "Rarity");
  const traits = piece.traits.map((trait) => `<span>${trait.t}: ${trait.v}</span>`).join("");

  return `
<article class="card" style="--accent:${piece.accent};--delay:${index * 45}ms" data-rarity="${rarity}">
  <div class="art">${buildSvg(piece)}</div>
  <div class="meta">
    <span class="name">${piece.name}</span>
    <div class="traits">${traits}</div>
    <div class="card-actions">
      <button class="btn" type="button" data-action="download-png" data-id="${piece.id}" aria-label="Download ${piece.name} as 1024x1024 PNG">PNG 1024</button>
      <button class="btn" type="button" data-action="download-json" data-id="${piece.id}" aria-label="Download metadata JSON for ${piece.name}">Metadata</button>
    </div>
  </div>
</article>`;
}

function renderGallery(filterValue = "ALL") {
  const selected = filterValue.toLowerCase();
  const filtered = PIECES.filter((piece) => {
    if (selected === "all") return true;
    return getTrait(piece, "Rarity").toLowerCase() === selected;
  });

  gallery.innerHTML = filtered.map(cardHtml).join("");
}

document.addEventListener("click", async (event) => {
  const target = event.target.closest("button[data-action]");
  if (!target) return;

  const action = target.dataset.action;
  const id = target.dataset.id;

  if (action === "download-png") await downloadPiecePng(id);
  if (action === "download-json") await downloadPieceJson(id);
  if (action === "download-all") await downloadAllAsZip();
  if (action === "download-contract-uri") downloadContractUriJson();
});

Object.values(configInputs).forEach((input) => {
  input.addEventListener("change", () => persistExportConfig(getExportConfig()));
});

rarityFilter.addEventListener("change", (event) => renderGallery(event.target.value));

restoreExportConfig();
renderGallery();