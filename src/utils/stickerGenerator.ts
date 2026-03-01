import type { StickerDef, BaseShape, Pattern, Decoration, Expression, Rarity, StickerSize, NamedCharacter, CharacterType, Pose } from '../types';
import { BASE_SHAPES, PATTERNS, DECORATIONS, EXPRESSIONS, PRIMARY_COLORS, SECONDARY_COLORS, SHAPE_NAMES, ANIMAL_BASE_SHAPES, SHAPE_CHARACTER_TYPE } from '../data/constants';

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

// Full-body variant map: face shape -> list of full-body variants
const FULL_BODY_VARIANTS: Partial<Record<BaseShape, BaseShape[]>> = {
  cat: ['cat_sitting', 'cat_jumping'],
  bunny: ['bunny_sitting', 'bunny_jumping'],
  bear: ['bear_waving', 'bear_sleeping'],
  penguin: ['penguin_sliding', 'penguin_dancing'],
};

// Shape -> pose mapping
const SHAPE_POSE: Partial<Record<BaseShape, Pose>> = {
  cat_sitting: 'sitting',
  cat_jumping: 'jumping',
  bunny_sitting: 'sitting',
  bunny_jumping: 'jumping',
  bear_waving: 'waving',
  bear_sleeping: 'sleeping',
  penguin_sliding: 'sliding',
  penguin_dancing: 'dancing',
};

export function generateSticker(seed: number): StickerDef {
  const rng = seededRandom(seed);

  const rarity = determineRarity(rng);

  // Full-body probability by rarity
  const fullBodyChance = rarity === 'super_rare' ? 0.7 : rarity === 'rare' ? 0.5 : 0.3;
  let baseShape = pick(BASE_SHAPES, rng);

  // If picked an animal face shape, maybe upgrade to full-body variant
  if (ANIMAL_BASE_SHAPES.includes(baseShape) && FULL_BODY_VARIANTS[baseShape]) {
    if (rng() < fullBodyChance) {
      const variants = FULL_BODY_VARIANTS[baseShape]!;
      baseShape = pick(variants, rng);
    }
  }

  const primaryColor = pick(PRIMARY_COLORS, rng);
  const secondaryColor = pick(SECONDARY_COLORS, rng);
  const size = determineSize(rng);

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
    pattern = pick(PATTERNS.filter(p => p !== 'none'), rng);
    decoration = pick(DECORATIONS.filter(d => d !== 'none'), rng);
  }

  // Expression for face-like shapes only
  const faceShapes: BaseShape[] = ['circle', 'animal_face', 'cloud', 'star', 'cat', 'bunny', 'bear', 'penguin'];
  if (faceShapes.includes(baseShape)) {
    expression = rng() < 0.7 ? pick(EXPRESSIONS.filter(e => e !== 'none'), rng) : 'none';
  }

  const characterType: CharacterType = SHAPE_CHARACTER_TYPE[baseShape] ?? 'face';
  const pose: Pose | undefined = SHAPE_POSE[baseShape];
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
    characterType,
    ...(pose ? { pose } : {}),
  };
}

function generateVariation(character: NamedCharacter, seed: number): StickerDef {
  const rng = seededRandom(seed);

  // Same base shape family but potentially different variant
  let baseShape = character.baseShape;
  const variants = FULL_BODY_VARIANTS[baseShape];
  if (variants && rng() < 0.5) {
    baseShape = pick(variants, rng);
  }

  // Different colors but keep the character's identity
  const primaryColor = rng() < 0.4 ? character.primaryColor : pick(PRIMARY_COLORS, rng);
  const secondaryColor = rng() < 0.4 ? character.secondaryColor : pick(SECONDARY_COLORS, rng);

  const rarity: Rarity = rng() < 0.3 ? 'rare' : 'common';
  const size = determineSize(rng);
  const pattern: Pattern = rng() < 0.5 ? pick(PATTERNS.filter(p => p !== 'none'), rng) : 'none';
  const decoration: Decoration = rng() < 0.3 ? pick(DECORATIONS.filter(d => d !== 'none'), rng) : 'none';

  const faceShapes: BaseShape[] = ['circle', 'animal_face', 'cloud', 'star', 'cat', 'bunny', 'bear', 'penguin'];
  const expression: Expression = faceShapes.includes(baseShape)
    ? pick(EXPRESSIONS.filter(e => e !== 'none'), rng)
    : 'none';

  const characterType: CharacterType = SHAPE_CHARACTER_TYPE[baseShape] ?? 'face';
  const pose: Pose | undefined = SHAPE_POSE[baseShape];

  return {
    id: `var-${character.name}-${seed}`,
    name: `${character.name}のなかま`,
    seed,
    baseShape,
    primaryColor,
    secondaryColor,
    pattern,
    decoration,
    expression,
    rarity,
    size,
    characterType,
    ...(pose ? { pose } : {}),
    isVariation: true,
    variationOfName: character.name,
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
    tiara: 'ティアラ付き',
    flower_wreath: '花冠付き',
    scarf: 'マフラー付き',
  };
  return names[d];
}

export function generateDailyStickers(dateStr: string, gachaIndex: number, count: number, namedCharacters: NamedCharacter[] = []): StickerDef[] {
  const baseSeed = hashString(`${dateStr}-gacha-${gachaIndex}`);
  const stickers: StickerDef[] = [];

  for (let i = 0; i < count; i++) {
    const seed = baseSeed + i * 7919;

    // 30% chance of generating a variation if there are named characters
    if (namedCharacters.length > 0 && Math.random() < 0.3) {
      const character = namedCharacters[Math.floor(Math.random() * namedCharacters.length)];
      stickers.push(generateVariation(character, seed + 1234));
    } else {
      stickers.push(generateSticker(seed));
    }
  }

  return stickers;
}
