import { getAverageColor } from "fast-average-color-node";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Color utilities ─────────────────────────────────────────────

function darken(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, Math.floor((num >> 16) * (1 - amount)));
  const g = Math.max(0, Math.floor(((num >> 8) & 0x00ff) * (1 - amount)));
  const b = Math.max(0, Math.floor((num & 0x0000ff) * (1 - amount)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function lighten(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(
    255,
    Math.floor((num >> 16) + (255 - (num >> 16)) * amount),
  );
  const g = Math.min(
    255,
    Math.floor(((num >> 8) & 0x00ff) + (255 - ((num >> 8) & 0x00ff)) * amount),
  );
  const b = Math.min(
    255,
    Math.floor((num & 0x0000ff) + (255 - (num & 0x0000ff)) * amount),
  );
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function hexToRgba(hex: string, alpha: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = num >> 16;
  const g = (num >> 8) & 0x00ff;
  const b = num & 0x0000ff;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ─── Image mapping ───────────────────────────────────────────────

const perfumeImages: Record<string, string> = {
  minuit: "bottle-noir.jpg",
  blanche: "bottle-blanc.jpg",
  ombre: "bottle-ombre.jpg",
  creed: "bottle-creed.webp",
  "rose-noir": "bottle-rose.jpg",
  "ambre-sauvage": "bottle-ambre.jpg",
  "vert-douce": "bottle-vert.jpg",
  "nuit-blanche": "bottle-nuit.jpg",
  "dore-acier": "bottle-dore.jpg",
  "argent-pur": "bottle-argent.jpg",
  "cristal-vert": "bottle-cristal.jpg",
  cuir: "bottle-cuir.jpg",
  santal: "bottle-santal.webp",
  marine: "bottle-marine.jpg",
  oudRoyal: "bottle-oud-royal.webp",
  tubereuse: "bottle-tubéreuse.webp",
  vetiver: "bottle-vetiver.webp",
  patchouli: "bottle-patchouli.jpg",
  muscBlanc: "bottle-musc-blanc.jpg",
  neroli: "bottle-neroli.jpg",
  cedre: "bottle-cedre.jpg",
  iris: "bottle-iris.webp",
  ambreGris: "bottle-ambre-gris.webp",
  roseOud: "bottle-rose-oud.jpeg",
  cuirNoir: "bottle-cuir-noir.jpg",
  eauCristal: "bottle-eau-cristal.webp",
};

// ─── Palette injection ───────────────────────────────────────────

async function extractPalettes() {
  const publicDir = join(__dirname, "../src/assets");
  const perfumesPath = join(__dirname, "../src/data/perfumes.ts");

  if (!existsSync(perfumesPath)) {
    console.error(`❌ perfumes.ts not found at ${perfumesPath}`);
    process.exit(1);
  }

  const extracted: Record<
    string,
    {
      dominant: string;
      ambient: string;
      accent: string;
      dark: string;
      glow: string;
    }
  > = {};

  console.log("🔍 Extracting color palettes from bottle images...\n");

  for (const [id, filename] of Object.entries(perfumeImages)) {
    const imagePath = join(publicDir, filename);

    if (!existsSync(imagePath)) {
      console.warn(`⚠️  Missing image for ${id}: ${filename}`);
      continue;
    }

    try {
      // Use dominant algorithm + ignore white/light grey backgrounds
      const color = await getAverageColor(imagePath, {
        algorithm: "dominant",
        ignoredColor: [
          [255, 255, 255, 255, 35], // Skip white ±35
          [240, 240, 240, 255, 30], // Skip light grey
          [220, 220, 220, 255, 25], // Skip medium grey
        ],
        mode: "precision",
      });

      const hex = color.hex;

      extracted[id] = {
        dominant: hex,
        ambient: darken(hex, 0.7),
        accent: lighten(hex, 0.3),
        dark: darken(hex, 0.5),
        glow: hexToRgba(hex, 0.15),
      };

      console.log(
        `✅ ${id.padEnd(15)} ${hex} → accent: ${extracted[id].accent}`,
      );
    } catch (e) {
      console.error(`❌ Failed for ${id}:`, e);
    }
  }

  if (Object.keys(extracted).length === 0) {
    console.error("❌ No palettes extracted. Check image paths.");
    process.exit(1);
  }

  // Read current perfumes.ts
  let content = readFileSync(perfumesPath, "utf-8");

  // Build the new palettes object as a string
  const paletteEntries = Object.entries(extracted)
    .map(([id, p]) => {
      const key = id.includes("-") ? `"${id}"` : id;
      return `  ${key}: {
    dominant: "${p.dominant}",
    ambient: "${p.ambient}",
    accent: "${p.accent}",
    dark: "${p.dark}",
    glow: "${p.glow}",
  }`;
    })
    .join(",\n");

  const newPalettesBlock = `const palettes: Record<string, PerfumePalette> = {\n${paletteEntries}\n};`;

  // Replace existing palettes block
  const paletteRegex =
    /const palettes: Record<string, PerfumePalette> = \{[\s\S]*?\};/;

  if (!paletteRegex.test(content)) {
    console.error(
      "❌ Could not find palettes object in perfumes.ts. Make sure it exists with the exact signature.",
    );
    process.exit(1);
  }

  content = content.replace(paletteRegex, newPalettesBlock);

  writeFileSync(perfumesPath, content);
  console.log(
    `\n💾 Auto-injected ${Object.keys(extracted).length} palettes into src/data/perfumes.ts`,
  );
}

extractPalettes().catch((err) => {
  console.error(err);
  process.exit(1);
});
