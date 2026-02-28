import type { StickerDef, BaseShape, Pattern, Decoration, Expression, Rarity, StickerSize } from '../types';
import { BASE_SHAPES, PATTERNS, DECORATIONS, EXPRESSIONS, PRIMARY_COLORS, SECONDARY_COLORS, SHAPE_NAMES } from '../data/constants';

// Mulberry32 seeded PRNG
function seededRandom(seed: number): () => number {
  let s = seed | 0;
  return function () {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function determineRarity(rng: () => number): Rarity {
  const roll = rng() * 100;
  if (roll < 5) return 'super_rare';
  if (roll < 30) return 'rare';
  return 'common';
}

function determineSize(rng: () => number): StickerSize {
  const roll = rng();
  if (roll < 0.25) return 'small';
  if (roll < 0.75) return 'medium';
  return 'large';
}

export function generateSticker(seed: number): StickerDef {
  const rng = seededRandom(seed);

  const rarity = determineRarity(rng);
  const baseShape = pick(BASE_SHAPES, rng);
  const primaryColor = pick(PRIMARY_COLORS, rng);
  const secondaryColor = pick(SECONDARY_COLORS, rng);
  const size = determineSize(rng);

  // Common stickers have simpler combinations
  let pattern: Pattern = 'none';
  let decoration: Decoration = 'none';
  let expression: Expression = 'none';

  if (rarity === 'common') {
    pattern = rng() < 0.4 ? pick(PATTERNS.filter(p => p !== 'none'), rng) : 'none';
    decoration = rng() < 0.2 ? pick(DECORATIONS.filter(d => d !== 'none'), rng) : 'none';
  } else if (rarity === 'rare') {
    pattern = rng() < 0.6 ? pick(PATTERNS.filter(p => p !== 'none'), rng) : 'none';
    decoration = pick(DECORATIONS.filter(d => d !== 'none'), rng);
  } else {
    // super_rare: always has pattern + decoration
    pattern = pick(PATTERNS.filter(p => p !== 'none'), rng);
    decoration = pick(DECORATIONS.filter(d => d !== 'none'), rng);
  }

  // Expression for face-like shapes
  const faceShapes: BaseShape[] = ['circle', 'animal_face', 'cloud', 'star'];
  if (faceShapes.includes(baseShape)) {
    expression = rng() < 0.7 ? pick(EXPRESSIONS.filter(e => e !== 'none'), rng) : 'none';
  }

  const name = generateName(baseShape, rarity, decoration);

  return {
    id: `gen-${seed}`,
    name,
    seed,
    baseShape,
    primaryColor,
    secondaryColor,
    pattern,
    decoration,
    expression,
    rarity,
    size,
  };
}

function generateName(shape: BaseShape, rarity: Rarity, decoration: Decoration): string {
  const shapeName = SHAPE_NAMES[shape];
  const prefix = rarity === 'super_rare' ? 'キラキラ' : rarity === 'rare' ? 'ステキな' : '';
  const decoSuffix = decoration !== 'none' ? `(${decorationName(decoration)})` : '';
  return `${prefix}${shapeName}${decoSuffix}`.trim();
}

function decorationName(d: Decoration): string {
  const names: Record<Decoration, string> = {
    none: '',
    bow: 'リボン付き',
    crown: '王冠付き',
    wings: '羽つき',
    halo: '天使の輪',
    frame: 'フレーム付き',
  };
  return names[d];
}

export function generateDailyStickers(dateStr: string, gachaIndex: number, count: number): StickerDef[] {
  const baseSeed = hashString(`${dateStr}-gacha-${gachaIndex}`);
  const stickers: StickerDef[] = [];

  for (let i = 0; i < count; i++) {
    const seed = baseSeed + i * 7919; // Use prime offset for variety
    stickers.push(generateSticker(seed));
  }

  return stickers;
}
