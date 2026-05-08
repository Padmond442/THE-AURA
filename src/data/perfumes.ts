import noir from "@/assets/bottle-noir.jpg";
import blanc from "@/assets/bottle-blanc.jpg";
import ombre from "@/assets/bottle-ombre.jpg";
import rose from "@/assets/bottle-rose.jpg";
import ambre from "@/assets/bottle-ambre.jpg";
import vert from "@/assets/bottle-vert.jpg";
import nuit from "@/assets/bottle-nuit.jpg";
import dore from "@/assets/bottle-dore.jpg";
import argent from "@/assets/bottle-argent.jpg";
import cristal from "@/assets/bottle-cristal.jpg";
import creed from "@/assets/bottle-creed.webp";
import cuir from "@/assets/bottle-cuir.jpg";
import santal from "@/assets/bottle-santal.webp";
import marine from "@/assets/bottle-marine.jpg";
import oudRoyal from "@/assets/bottle-oud-royal.webp";
import tubereuse from "@/assets/bottle-tubéreuse.webp";
import vetiver from "@/assets/bottle-vetiver.webp";
import patchouli from "@/assets/bottle-patchouli.jpg";
import muscBlanc from "@/assets/bottle-musc-blanc.jpg";
import neroli from "@/assets/bottle-neroli.jpg";
import cedre from "@/assets/bottle-cedre.jpg";
import iris from "@/assets/bottle-iris.webp";
import ambreGris from "@/assets/bottle-ambre-gris.webp";
import roseOud from "@/assets/bottle-rose-oud.jpeg";
import cuirNoir from "@/assets/bottle-cuir-noir.jpg";
import eauCristal from "@/assets/bottle-eau-cristal.webp";

export type AuraVariant = "ember" | "silver" | "frost";

export type PerfumePalette = {
  dominant: string; // Main bottle color (hex)
  ambient: string; // Darkened for backgrounds
  accent: string; // Lightened for text/CTAs
  dark: string; // For text on accent
  glow: string; // RGBA for bloom effects
};

export type AuraStyleConfig = {
  from: string;
  to: string;
  speed: string;
};

export type Perfume = {
  id: string;
  name: string;
  tagline: string;
  family: string;
  price: number;
  image: string;
  images?: string[];
  notes: { top: string[]; heart: string[]; base: string[] };
  story: string;
  mood: string[];
  aura: AuraVariant;
  palette: PerfumePalette;
};

export const auraStyles: Record<
  AuraVariant,
  { from: string; to: string; speed: string }
> = {
  ember: {
    from: "oklch(0.65 0.15 60)",
    to: "oklch(0.25 0.08 30)",
    speed: "18s",
  },
  silver: { from: "oklch(0.95 0 0)", to: "oklch(0.35 0 0)", speed: "22s" },
  frost: {
    from: "oklch(0.9 0.04 220)",
    to: "oklch(0.3 0.05 240)",
    speed: "26s",
  },
};

// Pre-computed palettes — extracted at build time from each bottle image
// These are the "soul colors" that drive the entire product page aesthetic
const palettes: Record<string, PerfumePalette> = {
  minuit: {
    dominant: "#050504",
    ambient: "#010101",
    accent: "#50504f",
    dark: "#020202",
    glow: "rgba(5, 5, 4, 0.15)",
  },
  blanche: {
    dominant: "#a8a8a8",
    ambient: "#323232",
    accent: "#c2c2c2",
    dark: "#545454",
    glow: "rgba(168, 168, 168, 0.15)",
  },
  ombre: {
    dominant: "#5e5e5e",
    ambient: "#1c1c1c",
    accent: "#8e8e8e",
    dark: "#2f2f2f",
    glow: "rgba(94, 94, 94, 0.15)",
  },
  creed: {
    dominant: "#161616",
    ambient: "#060606",
    accent: "#5b5b5b",
    dark: "#0b0b0b",
    glow: "rgba(22, 22, 22, 0.15)",
  },
  "rose-noir": {
    dominant: "#020102",
    ambient: "#000000",
    accent: "#4d4d4d",
    dark: "#010001",
    glow: "rgba(2, 1, 2, 0.15)",
  },
  "ambre-sauvage": {
    dominant: "#c5c2bd",
    ambient: "#3b3a38",
    accent: "#d6d4d0",
    dark: "#62615e",
    glow: "rgba(197, 194, 189, 0.15)",
  },
  "vert-douce": {
    dominant: "#bcd1c2",
    ambient: "#383e3a",
    accent: "#d0ded4",
    dark: "#5e6861",
    glow: "rgba(188, 209, 194, 0.15)",
  },
  "nuit-blanche": {
    dominant: "#8f96a1",
    ambient: "#2a2d30",
    accent: "#b0b5bd",
    dark: "#474b50",
    glow: "rgba(143, 150, 161, 0.15)",
  },
  "dore-acier": {
    dominant: "#a6a5aa",
    ambient: "#313133",
    accent: "#c0c0c3",
    dark: "#535255",
    glow: "rgba(166, 165, 170, 0.15)",
  },
  "argent-pur": {
    dominant: "#030304",
    ambient: "#000001",
    accent: "#4e4e4f",
    dark: "#010102",
    glow: "rgba(3, 3, 4, 0.15)",
  },
  "cristal-vert": {
    dominant: "#324545",
    ambient: "#0f1414",
    accent: "#6f7c7c",
    dark: "#192222",
    glow: "rgba(50, 69, 69, 0.15)",
  },
  "cuir": {
    dominant: "#76675d",
    ambient: "#231e1b",
    accent: "#9f948d",
    dark: "#3b332e",
    glow: "rgba(118, 103, 93, 0.15)",
  },
  "santal": {
    dominant: "#d0c4a2",
    ambient: "#3e3a30",
    accent: "#ded5bd",
    dark: "#686251",
    glow: "rgba(208, 196, 162, 0.15)",
  },
  "marine": {
    dominant: "#0f1f63",
    ambient: "#04091d",
    accent: "#576291",
    dark: "#070f31",
    glow: "rgba(15, 31, 99, 0.15)",
  },
  "oud-royal": {
    dominant: "#e9d7ac",
    ambient: "#454033",
    accent: "#efe3c4",
    dark: "#746b56",
    glow: "rgba(233, 215, 172, 0.15)",
  },
  "tubereuse": {
    dominant: "#c1bbc4",
    ambient: "#39383a",
    accent: "#d3cfd5",
    dark: "#605d62",
    glow: "rgba(193, 187, 196, 0.15)",
  },
  "vetiver": {
    dominant: "#d5d732",
    ambient: "#3f400f",
    accent: "#e1e36f",
    dark: "#6a6b19",
    glow: "rgba(213, 215, 50, 0.15)",
  },
  "patchouli": {
    dominant: "#f0af77",
    ambient: "#483423",
    accent: "#f4c79f",
    dark: "#78573b",
    glow: "rgba(240, 175, 119, 0.15)",
  },
  "musc-blanc": {
    dominant: "#30302f",
    ambient: "#0e0e0e",
    accent: "#6e6e6d",
    dark: "#181817",
    glow: "rgba(48, 48, 47, 0.15)",
  },
  "neroli": {
    dominant: "#e0ba71",
    ambient: "#433721",
    accent: "#e9ce9b",
    dark: "#705d38",
    glow: "rgba(224, 186, 113, 0.15)",
  },
  "cedre": {
    dominant: "#17444d",
    ambient: "#061417",
    accent: "#5c7c82",
    dark: "#0b2226",
    glow: "rgba(23, 68, 77, 0.15)",
  },
  "iris": {
    dominant: "#edc461",
    ambient: "#473a1d",
    accent: "#f2d590",
    dark: "#766230",
    glow: "rgba(237, 196, 97, 0.15)",
  },
  "ambre-gris": {
    dominant: "#accff1",
    ambient: "#333e48",
    accent: "#c4ddf5",
    dark: "#566778",
    glow: "rgba(172, 207, 241, 0.15)",
  },
  "rose-oud": {
    dominant: "#910a05",
    ambient: "#2b0301",
    accent: "#b25350",
    dark: "#480502",
    glow: "rgba(145, 10, 5, 0.15)",
  },
  "cuir-noir": {
    dominant: "#1e1d1f",
    ambient: "#090809",
    accent: "#616062",
    dark: "#0f0e0f",
    glow: "rgba(30, 29, 31, 0.15)",
  },
  "eau-cristal": {
    dominant: "#fad2cf",
    ambient: "#4b3f3e",
    accent: "#fbdfdd",
    dark: "#7d6967",
    glow: "rgba(250, 210, 207, 0.15)",
  }
};

export const perfumes: Perfume[] = [
  
  {
    id: "minuit",
    name: "Minuit",
    tagline: "A midnight whispered in oud",
    family: "Oriental · Woody",
    price: 240,
    image: noir,
    notes: {
      top: ["Bergamot", "Pink Pepper"],
      heart: ["Bulgarian Rose", "Saffron"],
      base: ["Oud", "Amber", "Vanilla"],
    },
    story:
      "Crafted in Grasse from a single midnight in Marrakech — Minuit captures the moment the city falls silent.",
    mood: ["Mysterious", "Warm", "Evening"],
    aura: "ember",
    palette: palettes.minuit,
  },
  {
    id: "blanche",
    name: "Blanche",
    tagline: "Linen, light, and the first morning",
    family: "Floral · Musky",
    price: 195,
    image: blanc,
    notes: {
      top: ["Iris", "Bergamot"],
      heart: ["Jasmine", "White Tea"],
      base: ["White Musk", "Cedarwood"],
    },
    story:
      "A Parisian apartment at dawn. Sun on cotton sheets. Blanche is the scent of beginnings.",
    mood: ["Soft", "Luminous", "Daily"],
    aura: "silver",
    palette: palettes.blanche,
  },
  {
    id: "ombre",
    name: "Ombre",
    tagline: "Crystal-cut, sharp as a held breath",
    family: "Aromatic · Fresh",
    price: 220,
    image: ombre,
    notes: {
      top: ["Grapefruit", "Cardamom"],
      heart: ["Lavender", "Geranium"],
      base: ["Vetiver", "Leather"],
    },
    story:
      "Forged for the moment between intent and movement — Ombre is the architecture of presence.",
    mood: ["Sharp", "Confident", "Power"],
    aura: "frost",
    palette: palettes.ombre,
  },
  {
    id: "creed",
    name: "Creed Aventus",
    tagline: "The scent of victory, bottled",
    family: "Bold · Clean",
    price: 445,
    image: creed,
    notes: {
      top: ["Pineapple", "Bergamot", "Black Currant"],
      heart: ["Birch", "Patchouli", "Jasmine"],
      base: ["Musk", "Oakmoss", "Ambergris"],
    },
    story:
      "A modern classic forged from the traditions of a 250-year-old house. Aventus is the scent of success.",
    mood: ["Bold", "Confident", "Power"],
    aura: "silver",
    palette: palettes.creed,
  },
  {
    id: "rose-noir",
    name: "Rose Noir",
    tagline: "Velvet petals in candle smoke",
    family: "Oriental · Floral",
    price: 265,
    image: rose,
    notes: {
      top: ["Damask Rose", "Black Pepper"],
      heart: ["Incense", "Myrrh"],
      base: ["Patchouli", "Labdanum"],
    },
    story:
      "A rose that blooms only after dark. For those who find beauty in shadows.",
    mood: ["Dramatic", "Sensual", "Evening"],
    aura: "ember",
    palette: palettes["rose-noir"],
  },
  {
    id: "ambre-sauvage",
    name: "Ambre Sauvage",
    tagline: "Raw amber, untamed heat",
    family: "Oriental · Amber",
    price: 280,
    image: ambre,
    notes: {
      top: ["Mandarin", "Cinnamon"],
      heart: ["Amber", "Tonka Bean"],
      base: ["Sandalwood", "Musk"],
    },
    story:
      "Gathered from the resin of ancient forests — amber as it was before civilization softened it.",
    mood: ["Wild", "Warm", "Intimate"],
    aura: "ember",
    palette: palettes["ambre-sauvage"],
  },
  {
    id: "vert-douce",
    name: "Vert Douce",
    tagline: "Spring grass after the thaw",
    family: "Green · Floral",
    price: 175,
    image: vert,
    notes: {
      top: ["Green Fig", "Galbanum"],
      heart: ["Lily of the Valley", "Hyacinth"],
      base: ["Oakmoss", "White Woods"],
    },
    story:
      "The first green of the year. Tender, hopeful, and quietly persistent.",
    mood: ["Fresh", "Hopeful", "Morning"],
    aura: "silver",
    palette: palettes["vert-douce"],
  },
  {
    id: "nuit-blanche",
    name: "Nuit Blanche",
    tagline: "Sleepless cities, silver light",
    family: "Floral · Musky",
    price: 210,
    image: nuit,
    notes: {
      top: ["Aldehydes", "Pear"],
      heart: ["Orange Blossom", "Tuberose"],
      base: ["White Musk", "Cashmere Wood"],
    },
    story:
      "For the hours between midnight and dawn when the city belongs to the awake.",
    mood: ["Ethereal", "Nocturnal", "Dream"],
    aura: "silver",
    palette: palettes["nuit-blanche"],
  },
  {
    id: "dore-acier",
    name: "Doré Acier",
    tagline: "Gold forged in cold steel",
    family: "Metallic · Oriental",
    price: 295,
    image: dore,
    notes: {
      top: ["Metallic Notes", "Saffron"],
      heart: ["Rose", "Copper"],
      base: ["Ambergris", "Steel Accord"],
    },
    story:
      "Where luxury meets industrial precision. A fragrance for the modern monument.",
    mood: ["Bold", "Structural", "Power"],
    aura: "frost",
    palette: palettes["dore-acier"],
  },
  {
    id: "argent-pur",
    name: "Argent Pur",
    tagline: "Liquid mercury, mirror-skin",
    family: "Aromatic · Metallic",
    price: 255,
    image: argent,
    notes: {
      top: ["Silver Fir", "Peppermint"],
      heart: ["Iris", "Aluminum"],
      base: ["Vetiver", "Mineral Accord"],
    },
    story:
      "The scent of reflection itself — clean, precise, and infinitely cool.",
    mood: ["Cool", "Minimal", "Focus"],
    aura: "frost",
    palette: palettes["argent-pur"],
  },
  {
    id: "cristal-vert",
    name: "Cristal Vert",
    tagline: "Crushed emerald, glacial air",
    family: "Aromatic · Green",
    price: 230,
    image: cristal,
    notes: {
      top: ["Eucalyptus", "Green Apple"],
      heart: ["Mate", "Bamboo"],
      base: ["Cedar", "Crystal Musk"],
    },
    story:
      "A breath from high altitude. Thin air, sharp light, and the green that survives it.",
    mood: ["Crisp", "Elevated", "Clarity"],
    aura: "frost",
    palette: palettes["cristal-vert"],
  },
  {
    id: "cuir",
    name: "Cuir",
    tagline: "Rawhide warmth, tanned by firelight",
    family: "Leather · Smoky",
    price: 275,
    image: cuir,
    notes: {
      top: ["Birch Tar", "Cardamom"],
      heart: ["Suede", "Jasmine"],
      base: ["Leather", "Amber", "Moss"],
    },
    story: "The workshop at dusk — tools laid down, the scent of treated hide still hanging in the air. Cuir is craftsmanship made wearable.",
    mood: ["Bold", "Warm", "Evening"],
    aura: "ember",
    palette: palettes.cuir,
  },
  {
    id: "santal",
    name: "Santal",
    tagline: "Sacred wood, ground to dust",
    family: "Woody · Oriental",
    price: 260,
    image: santal,
    notes: {
      top: ["Sandalwood", "Bergamot"],
      heart: ["Cedar", "Rose"],
      base: ["Musk", "Vanilla", "Amber"],
    },
    story: "Harvested from trees that grow for centuries — Santal carries the patience of stone and the warmth of sun-baked earth.",
    mood: ["Warm", "Meditative", "Daily"],
    aura: "silver",
    palette: palettes.santal,
  },
  {
    id: "marine",
    name: "Marine",
    tagline: "Salt spray on black rock",
    family: "Aquatic · Fresh",
    price: 185,
    image: marine,
    notes: {
      top: ["Sea Salt", "Citrus"],
      heart: ["Seaweed", "Lavender"],
      base: ["Driftwood", "Ambergris"],
    },
    story: "The Atlantic at dawn — cold, vast, and indifferent. Marine bottles the edge where water meets weathered stone.",
    mood: ["Fresh", "Crisp", "Morning"],
    aura: "frost",
    palette: palettes.marine,
  },
  {
    id: "oud-royal",
    name: "Oud Royal",
    tagline: "Liquid gold from agarwood",
    family: "Oriental · Woody",
    price: 520,
    image: oudRoyal,
    notes: {
      top: ["Saffron", "Raspberry"],
      heart: ["Oud", "Rose"],
      base: ["Incense", "Leather", "Musk"],
    },
    story: "Reserved for kings and those who command silence upon entry. Oud Royal is not worn — it is announced.",
    mood: ["Powerful", "Luxurious", "Evening"],
    aura: "ember",
    palette: palettes["oud-royal"],
  },
  {
    id: "tubereuse",
    name: "Tubéreuse",
    tagline: "White flowers under moonlight",
    family: "Floral · White",
    price: 230,
    image: tubereuse,
    notes: {
      top: ["Tuberose", "Orange Blossom"],
      heart: ["Jasmine", "Gardenia"],
      base: ["Musk", "Sandalwood"],
    },
    story: "A garden that only opens after dark. Tubéreuse is the scent of secrets told in bloom.",
    mood: ["Sensual", "Ethereal", "Evening"],
    aura: "silver",
    palette: palettes.tubereuse,
  },
  {
    id: "vetiver",
    name: "Vetiver",
    tagline: "Earth's roots, pulled from wet soil",
    family: "Woody · Earthy",
    price: 195,
    image: vetiver,
    notes: {
      top: ["Grapefruit", "Bergamot"],
      heart: ["Vetiver", "Geranium"],
      base: ["Patchouli", "Cedar", "Musk"],
    },
    story: "The smell of rain on dry ground. Vetiver is nature's reminder that growth begins below the surface.",
    mood: ["Grounded", "Fresh", "Daily"],
    aura: "frost",
    palette: palettes.vetiver,
  },
  {
    id: "patchouli",
    name: "Patchouli",
    tagline: "Incense trails and velvet curtains",
    family: "Oriental · Woody",
    price: 210,
    image: patchouli,
    notes: {
      top: ["Patchouli Leaf", "Bergamot"],
      heart: ["Rose", "Cinnamon"],
      base: ["Vanilla", "Amber", "Musk"],
    },
    story: "From the cargo holds of ships crossing the Indian Ocean — Patchouli carries the weight of distant ports and darker rooms.",
    mood: ["Mysterious", "Warm", "Evening"],
    aura: "ember",
    palette: palettes.patchouli,
  },
  {
    id: "musc-blanc",
    name: "Musc Blanc",
    tagline: "Clean skin, warmed by sleep",
    family: "Musky · Clean",
    price: 180,
    image: muscBlanc,
    notes: {
      top: ["White Musk", "Aldehydes"],
      heart: ["Jasmine", "Lily of the Valley"],
      base: ["Cedar", "Amber"],
    },
    story: "The scent of nothing and everything. Musc Blanc is what remains when all else fades — pure, human, quiet.",
    mood: ["Soft", "Clean", "Daily"],
    aura: "silver",
    palette: palettes["musc-blanc"],
  },
  {
    id: "neroli",
    name: "Neroli",
    tagline: "Orange groves in full sun",
    family: "Citrus · Floral",
    price: 170,
    image: neroli,
    notes: {
      top: ["Bitter Orange", "Neroli"],
      heart: ["Orange Blossom", "Petitgrain"],
      base: ["Musk", "Cedar"],
    },
    story: "The harvest in Seville — baskets of bitter fruit, hands sticky with oil. Neroli is summer pressed into glass.",
    mood: ["Bright", "Fresh", "Morning"],
    aura: "silver",
    palette: palettes.neroli,
  },
  {
    id: "cedre",
    name: "Cèdre",
    tagline: "Ancient forest, fallen needles",
    family: "Woody · Aromatic",
    price: 225,
    image: cedre,
    notes: {
      top: ["Cedarwood", "Pine"],
      heart: ["Sandalwood", "Vetiver"],
      base: ["Amber", "Musk", "Leather"],
    },
    story: "Walk the path where light barely reaches. Cèdre is the vertical scent — trunk, bark, and the shadow of canopy.",
    mood: ["Grounded", "Warm", "Daily"],
    aura: "ember",
    palette: palettes.cedre,
  },
  {
    id: "iris",
    name: "Iris",
    tagline: "Powdered violet, dusted with silver",
    family: "Floral · Powdery",
    price: 290,
    image: iris,
    notes: {
      top: ["Iris", "Violet"],
      heart: ["Rose", "Mimosa"],
      base: ["Musk", "Sandalwood", "Amber"],
    },
    story: "The most expensive root in perfumery — harvested, dried, and aged for years. Iris is patience made floral.",
    mood: ["Elegant", "Soft", "Daily"],
    aura: "silver",
    palette: palettes.iris,
  },
  {
    id: "ambre-gris",
    name: "Ambre Gris",
    tagline: "Ocean treasure, aged by salt and time",
    family: "Amber · Marine",
    price: 380,
    image: ambreGris,
    notes: {
      top: ["Sea Salt", "Bergamot"],
      heart: ["Ambergris", "Iris"],
      base: ["Musk", "Sandalwood", "Vanilla"],
    },
    story: "Worth more than gold by weight — found floating on open ocean or washed ashore. Ambre Gris is rarity itself.",
    mood: ["Luxurious", "Warm", "Evening"],
    aura: "ember",
    palette: palettes["ambre-gris"],
  },
  {
    id: "rose-oud",
    name: "Rose Oud",
    tagline: "Velvet and varnish, rose in shadow",
    family: "Oriental · Floral",
    price: 340,
    image: roseOud,
    notes: {
      top: ["Damask Rose", "Saffron"],
      heart: ["Oud", "Peony"],
      base: ["Incense", "Leather", "Musk"],
    },
    story: "Two opposites forced into harmony — the softness of petals against the density of resin. Rose Oud is contradiction perfected.",
    mood: ["Dramatic", "Sensual", "Evening"],
    aura: "ember",
    palette: palettes["rose-oud"],
  },
  {
    id: "cuir-noir",
    name: "Cuir Noir",
    tagline: "Black leather, stitched with smoke",
    family: "Leather · Smoky",
    price: 310,
    image: cuirNoir,
    notes: {
      top: ["Black Pepper", "Birch"],
      heart: ["Leather", "Jasmine"],
      base: ["Amber", "Musk", "Vanilla"],
    },
    story: "The interior of a vintage roadster at midnight — worn seats, cold metal, and the ghost of every journey taken.",
    mood: ["Bold", "Mysterious", "Evening"],
    aura: "ember",
    palette: palettes["cuir-noir"],
  },
  {
    id: "eau-cristal",
    name: "Eau Cristal",
    tagline: "Frozen stream, cracked light",
    family: "Aquatic · Fresh",
    price: 165,
    image: eauCristal,
    notes: {
      top: ["Ice Accord", "Citrus"],
      heart: ["Water Lily", "Bamboo"],
      base: ["White Musk", "Cedar"],
    },
    story: "The moment before the thaw — when everything is still, clear, and about to change. Eau Cristal is anticipation bottled.",
    mood: ["Crisp", "Clean", "Morning"],
    aura: "frost",
    palette: palettes["eau-cristal"],
  },
];
