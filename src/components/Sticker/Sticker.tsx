import React from 'react';
import type { StickerDef } from '../../types';
import { SIZE_MAP } from '../../data/constants';
import { SHAPE_COMPONENTS } from '../../assets/stickers/baseShapes';
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

const shapeClassMap: Record<string, string> = {
  circle: styles.shapeCircle,
  star: styles.shapeStar,
  heart: styles.shapeHeart,
  flower: styles.shapeFlower,
  animal_face: styles.shapeAnimalFace,
  food: styles.shapeFood,
  diamond: styles.shapeDiamond,
  cloud: styles.shapeCloud,
  moon: styles.shapeMoon,
  ribbon: styles.shapeRibbon,
  cat: styles.shapeCat,
  bunny: styles.shapeBunny,
  bear: styles.shapeBear,
  penguin: styles.shapePenguin,
  cherry: styles.shapeCherry,
  strawberry: styles.shapeStrawberry,
  ice_cream: styles.shapeIceCream,
  rainbow: styles.shapeRainbow,
  shooting_star: styles.shapeShootingStar,
  butterfly: styles.shapeButterfly,
};

export function StickerView({ sticker, className = '', style, isNew, onDoubleClick }: StickerProps) {
  const size = SIZE_MAP[sticker.size];
  const ShapeComponent = SHAPE_COMPONENTS[sticker.baseShape];
  const shapeClass = shapeClassMap[sticker.baseShape] || styles.shapeCircle;

  const rarityClass =
    sticker.rarity === 'super_rare' ? styles.superRare :
    sticker.rarity === 'rare' ? styles.rare : '';

  const classes = [
    styles.stickerBase,
    shapeClass,
    rarityClass,
    isNew ? styles.popIn : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={{
        width: size,
        height: size,
        backgroundColor: sticker.primaryColor,
        ...style,
      }}
      onDoubleClick={onDoubleClick}
      title={sticker.name}
    >
      <div className={styles.stickerContent}>
        {ShapeComponent && (
          <ShapeComponent
            primaryColor={sticker.primaryColor}
            secondaryColor={sticker.secondaryColor}
            size={size}
          />
        )}
        <PatternOverlay
          pattern={sticker.pattern}
          color={sticker.secondaryColor}
          size={size}
        />
        <ExpressionOverlay expression={sticker.expression} size={size} />
        <DecorationOverlay
          decoration={sticker.decoration}
          color={sticker.secondaryColor}
          size={size}
        />
      </div>
    </div>
  );
}
