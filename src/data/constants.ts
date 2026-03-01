import type { BaseShape, Pattern, Decoration, Expression, CoverDesign, Pose, CharacterType } from '../types';

export const MAX_PLAY_TIME_MS = 30 * 60 * 1000; // 30分
export const MIN_GACHA_COUNT = 5;
export const MAX_GACHA_COUNT = 10;
export const MAX_PAGES = 20;
export const INITIAL_PAGES = 4;

export const BASE_SHAPES: BaseShape[] = [
  'circle', 'star', 'heart', 'flower', 'animal_face',
  'food', 'diamond', 'cloud', 'moon', 'ribbon',
  'cat', 'bunny', 'bear', 'penguin', 'cherry',
  'strawberry', 'ice_cream', 'rainbow', 'shooting_star', 'butterfly',
  'cat_sitting', 'cat_jumping', 'bunny_sitting', 'bunny_jumping',
  'bear_waving', 'bear_sleeping', 'penguin_sliding', 'penguin_dancing',
];

export const FACE_SHAPES: BaseShape[] = [
  'circle', 'star', 'heart', 'flower', 'animal_face',
  'food', 'diamond', 'cloud', 'moon', 'ribbon',
  'cat', 'bunny', 'bear', 'penguin', 'cherry',
  'strawberry', 'ice_cream', 'rainbow', 'shooting_star', 'butterfly',
];

export const FULL_BODY_SHAPES: BaseShape[] = [
  'cat_sitting', 'cat_jumping', 'bunny_sitting', 'bunny_jumping',
  'bear_waving', 'bear_sleeping', 'penguin_sliding', 'penguin_dancing',
];

export const ANIMAL_BASE_SHAPES: BaseShape[] = [
  'cat', 'bunny', 'bear', 'penguin', 'animal_face',
];

export const PATTERNS: Pattern[] = [
  'none', 'dots', 'stripes', 'stars', 'sparkle', 'gradient',
  'hearts', 'confetti', 'rainbow',
];

export const DECORATIONS: Decoration[] = [
  'none', 'bow', 'crown', 'wings', 'halo', 'frame',
  'tiara', 'flower_wreath', 'scarf',
];

export const EXPRESSIONS: Expression[] = [
  'none', 'smile', 'wink', 'heart_eyes', 'sleepy',
  'surprised', 'happy_cry',
];

export const PRIMARY_COLORS = [
  '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E86B',
  '#FF9FF3', '#A29BFE', '#FF9F43', '#74B9FF',
  '#DDA0DD', '#98FB98', '#FF7F7F', '#FFD700'
];

export const SECONDARY_COLORS = [
  '#FF8E8E', '#7EDCD5', '#FFF09D', '#B2F08A',
  '#FFB8F6', '#C4BFFF', '#FFB76B', '#9DD3FF',
  '#E8C0E8', '#B8FFB8', '#FFA5A5', '#FFE44D'
];

export const SHAPE_NAMES: Record<BaseShape, string> = {
  circle: 'まる',
  star: 'ほし',
  heart: 'ハート',
  flower: 'おはな',
  animal_face: 'どうぶつ',
  food: 'たべもの',
  diamond: 'ダイヤ',
  cloud: 'くも',
  moon: 'おつきさま',
  ribbon: 'リボン',
  cat: 'ねこ',
  bunny: 'うさぎ',
  bear: 'くま',
  penguin: 'ペンギン',
  cherry: 'さくらんぼ',
  strawberry: 'いちご',
  ice_cream: 'アイス',
  rainbow: 'にじ',
  shooting_star: 'ながれぼし',
  butterfly: 'ちょうちょ',
  cat_sitting: 'おすわりねこ',
  cat_jumping: 'ジャンプねこ',
  bunny_sitting: 'おすわりうさぎ',
  bunny_jumping: 'ジャンプうさぎ',
  bear_waving: 'バイバイくま',
  bear_sleeping: 'おねむくま',
  penguin_sliding: 'すべるペンギン',
  penguin_dancing: 'ダンスペンギン',
};

export const POSES: Pose[] = [
  'sitting', 'jumping', 'waving', 'sleeping', 'sliding', 'dancing',
];

export const SHAPE_CHARACTER_TYPE: Record<BaseShape, CharacterType> = {
  circle: 'face',
  star: 'face',
  heart: 'face',
  flower: 'face',
  animal_face: 'face',
  food: 'face',
  diamond: 'face',
  cloud: 'face',
  moon: 'face',
  ribbon: 'face',
  cat: 'face',
  bunny: 'face',
  bear: 'face',
  penguin: 'face',
  cherry: 'face',
  strawberry: 'face',
  ice_cream: 'face',
  rainbow: 'face',
  shooting_star: 'face',
  butterfly: 'face',
  cat_sitting: 'full_body',
  cat_jumping: 'full_body',
  bunny_sitting: 'full_body',
  bunny_jumping: 'full_body',
  bear_waving: 'full_body',
  bear_sleeping: 'full_body',
  penguin_sliding: 'full_body',
  penguin_dancing: 'full_body',
};

export const RARITY_WEIGHTS = {
  common: 70,
  rare: 25,
  super_rare: 5
} as const;

export const SIZE_MAP = {
  small: 56,
  medium: 72,
  large: 88
} as const;

export const COVER_DESIGNS: { id: CoverDesign; label: string }[] = [
  { id: 'pastel_flowers', label: 'パステルフラワー' },
  { id: 'stars_ribbons', label: 'ほしとリボン' },
  { id: 'animal_friends', label: 'どうぶつなかま' },
  { id: 'rainbow_dream', label: 'にじのゆめ' },
];
