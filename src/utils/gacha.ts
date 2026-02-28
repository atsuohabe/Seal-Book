import type { StickerDef } from '../types';
import { MIN_GACHA_COUNT, MAX_GACHA_COUNT } from '../data/constants';
import { generateDailyStickers } from './stickerGenerator';

export function rollGacha(dateStr: string, gachaIndex: number): StickerDef[] {
  const count = MIN_GACHA_COUNT + Math.floor(Math.random() * (MAX_GACHA_COUNT - MIN_GACHA_COUNT + 1));
  return generateDailyStickers(dateStr, gachaIndex, count);
}
