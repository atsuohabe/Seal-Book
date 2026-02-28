import type { BaseShape, Pattern, Decoration, Expression } from '../types';

export const MAX_PLAY_TIME_MS = 30 * 60 * 1000; // 30分
export const MIN_GACHA_COUNT = 5;
export const MAX_GACHA_COUNT = 10;
export const MAX_PAGES = 20;
export const INITIAL_PAGES = 4;

export const BASE_SHAPES: BaseShape[] = [
  'circle', 'star', 'heart', 'flower', 'animal_face',
  'food', 'diamond', 'cloud', 'moon', 'ribbon'
];

export const PATTERNS: Pattern[] = [
  'none', 'dots', 'stripes', 'stars', 'sparkle', 'gradient'
];

export const DECORATIONS: Decoration[] = [
  'none', 'bow', 'crown', 'wings', 'halo', 'frame'
];

export const EXPRESSIONS: Expression[] = [
  'none', 'smile', 'wink', 'heart_eyes', 'sleepy'
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
  ribbon: 'リボン'
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
