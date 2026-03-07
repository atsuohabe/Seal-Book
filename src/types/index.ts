export type BaseShape =
  | 'circle' | 'star' | 'heart' | 'flower' | 'animal_face' | 'food' | 'diamond' | 'cloud' | 'moon' | 'ribbon'
  | 'cat' | 'bunny' | 'bear' | 'penguin' | 'cherry' | 'strawberry' | 'ice_cream' | 'rainbow' | 'shooting_star' | 'butterfly'
  | 'cat_sitting' | 'cat_jumping' | 'bunny_sitting' | 'bunny_jumping'
  | 'bear_waving' | 'bear_sleeping' | 'penguin_sliding' | 'penguin_dancing';

export type CharacterType = 'face' | 'full_body';
export type Pose = 'sitting' | 'jumping' | 'waving' | 'sleeping' | 'sliding' | 'dancing';
export type Pattern = 'none' | 'dots' | 'stripes' | 'stars' | 'sparkle' | 'gradient' | 'hearts' | 'confetti' | 'rainbow';
export type Decoration = 'none' | 'bow' | 'crown' | 'wings' | 'halo' | 'frame' | 'tiara' | 'flower_wreath' | 'scarf';
export type Expression = 'none' | 'smile' | 'wink' | 'heart_eyes' | 'sleepy' | 'surprised' | 'happy_cry';
export type CoverDesign = 'pastel_flowers' | 'stars_ribbons' | 'animal_friends' | 'rainbow_dream';
export type Rarity = 'common' | 'rare' | 'super_rare';
export type StickerSize = 'small' | 'medium' | 'large';

export interface NamedCharacter {
  name: string;
  baseShape: BaseShape;
  primaryColor: string;
  secondaryColor: string;
  originalStickerId: string;
}

export interface StickerDef {
  id: string;
  name: string;
  seed: number;
  baseShape: BaseShape;
  primaryColor: string;
  secondaryColor: string;
  pattern: Pattern;
  decoration: Decoration;
  expression: Expression;
  rarity: Rarity;
  size: StickerSize;
  characterType: CharacterType;
  pose?: Pose;
  customName?: string;
  isVariation?: boolean;
  variationOfName?: string;
}

export interface PlacedSticker {
  instanceId: string;
  sticker: StickerDef;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  zIndex: number;
}

export interface AlbumPage {
  id: number;
  backgroundColor: string;
  stickers: PlacedSticker[];
}

export interface UserProfile {
  name: string;
  createdAt: string;
}

export interface GameState {
  pages: AlbumPage[];
  currentPageIndex: number;
  inventory: StickerDef[];
  collectedStickers: StickerDef[];
  lastGachaDate: string;
  todayPlayTimeMs: number;
  lastPlayDate: string;
  gachaCount: number;
  coverDesign: CoverDesign;
  coverTitle: string;
  namedCharacters: NamedCharacter[];
}
