import React from 'react';
import type { StickerDef } from '../../types';
import { SIZE_MAP } from '../../data/constants';
import { SHAPE_COMPONENTS, SHAPE_CLIP_PATHS } from '../../assets/stickers/baseShapes';
import { PatternOverlay } from '../../assets/stickers/patterns';
import { DecorationOverlay } from '../../assets/stickers/decorations';
import { ExpressionOverlay } from '../../assets/stickers/expressions';
import styles from './Sticker.module.css';

interface StickerProps {
  sticker: StickerDef;
  className?: string;
  style?: React.CSSProperties;
  isNew?: boolean;
  onDoubleClick?: () => void;
}

export function StickerView({ sticker, className = '', style, isNew, onDoubleClick }: StickerProps) {
  const size = SIZE_MAP[sticker.size];
  const ShapeComponent = SHAPE_COMPONENTS[sticker.baseShape];
  const clipContent = SHAPE_CLIP_PATHS[sticker.baseShape];
  const clipId = `clip-${sticker.id}`;

  const rarityClass =
    sticker.rarity === 'super_rare' ? styles.superRare :
    sticker.rarity === 'rare' ? styles.rare : '';

  const classes = [
    styles.stickerBase,
    rarityClass,
    isNew ? styles.popIn : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={{ width: size, height: size, ...style }}
      onDoubleClick={onDoubleClick}
      title={sticker.name}
    >
      <svg viewBox="0 0 64 64" width={size} height={size} overflow="visible">
        <defs>
          {clipContent && (
            <clipPath id={clipId}>
              {clipContent}
            </clipPath>
          )}
        </defs>

        {/* Clipped area: background + shape + pattern + expression + gloss */}
        <g clipPath={clipContent ? `url(#${clipId})` : undefined}>
          {/* Background fill */}
          <rect width="64" height="64" fill={sticker.primaryColor} />

          {/* Shape art */}
          {ShapeComponent && (
            <ShapeComponent
              primaryColor={sticker.primaryColor}
              secondaryColor={sticker.secondaryColor}
              stickerId={sticker.id}
            />
          )}

          {/* Pattern overlay */}
          <PatternOverlay
            pattern={sticker.pattern}
            color={sticker.secondaryColor}
            stickerId={sticker.id}
          />

          {/* Expression overlay */}
          <ExpressionOverlay expression={sticker.expression} />

          {/* Gloss highlight */}
          <ellipse cx="24" cy="20" rx="18" ry="13" fill="white" opacity="0.22" />
        </g>

        {/* Decoration: NOT clipped (can extend beyond shape) */}
        <DecorationOverlay
          decoration={sticker.decoration}
          color={sticker.secondaryColor}
        />
      </svg>
    </div>
  );
}
