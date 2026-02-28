import type React from 'react';

interface ShapeProps {
  primaryColor: string;
  secondaryColor: string;
  size: number;
}

export function CircleShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={`cg-${primaryColor.slice(1)}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill={`url(#cg-${primaryColor.slice(1)})`} />
    </svg>
  );
}

export function StarShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={`sg-${primaryColor.slice(1)}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <polygon
        points="32,4 39,24 60,24 43,37 50,58 32,45 14,58 21,37 4,24 25,24"
        fill={`url(#sg-${primaryColor.slice(1)})`}
      />
    </svg>
  );
}

export function HeartShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={`hg-${primaryColor.slice(1)}`} cx="40%" cy="30%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <path
        d="M32 56 C32 56 6 38 6 20 C6 10 14 4 24 4 C28 4 32 8 32 8 C32 8 36 4 40 4 C50 4 58 10 58 20 C58 38 32 56 32 56Z"
        fill={`url(#hg-${primaryColor.slice(1)})`}
      />
    </svg>
  );
}

export function FlowerShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={`fg-${primaryColor.slice(1)}`} cx="50%" cy="50%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="32"
          cy="16"
          rx="10"
          ry="14"
          fill={`url(#fg-${primaryColor.slice(1)})`}
          transform={`rotate(${angle} 32 32)`}
          opacity="0.85"
        />
      ))}
      <circle cx="32" cy="32" r="8" fill="#FFE66D" />
    </svg>
  );
}

export function AnimalFaceShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={`ag-${primaryColor.slice(1)}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Ears */}
      <ellipse cx="16" cy="14" rx="10" ry="12" fill={`url(#ag-${primaryColor.slice(1)})`} />
      <ellipse cx="48" cy="14" rx="10" ry="12" fill={`url(#ag-${primaryColor.slice(1)})`} />
      <ellipse cx="16" cy="14" rx="6" ry="8" fill={secondaryColor} opacity="0.5" />
      <ellipse cx="48" cy="14" rx="6" ry="8" fill={secondaryColor} opacity="0.5" />
      {/* Face */}
      <circle cx="32" cy="34" r="24" fill={`url(#ag-${primaryColor.slice(1)})`} />
    </svg>
  );
}

export function FoodShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={`fdg-${primaryColor.slice(1)}`} cx="40%" cy="30%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Cupcake base */}
      <path d="M16 36 L20 58 H44 L48 36 Z" fill="#DEB887" />
      <path d="M16 36 L20 58 H44 L48 36 Z" fill="url(#stripe-food)" opacity="0.3" />
      {/* Cream top */}
      <ellipse cx="32" cy="28" rx="20" ry="16" fill={`url(#fdg-${primaryColor.slice(1)})`} />
      <circle cx="26" cy="22" r="8" fill={secondaryColor} opacity="0.6" />
      <circle cx="38" cy="24" r="7" fill={secondaryColor} opacity="0.5" />
      {/* Cherry on top */}
      <circle cx="32" cy="14" r="5" fill="#FF6B6B" />
      <line x1="32" y1="14" x2="32" y2="8" stroke="#4A7C59" strokeWidth="1.5" />
    </svg>
  );
}

export function DiamondShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <linearGradient id={`dg-${primaryColor.slice(1)}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="50%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>
      </defs>
      <polygon
        points="32,4 58,24 32,60 6,24"
        fill={`url(#dg-${primaryColor.slice(1)})`}
      />
      <polygon
        points="32,4 44,24 32,44 20,24"
        fill={secondaryColor}
        opacity="0.3"
      />
    </svg>
  );
}

export function CloudShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={`clg-${primaryColor.slice(1)}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <circle cx="22" cy="36" r="14" fill={`url(#clg-${primaryColor.slice(1)})`} />
      <circle cx="36" cy="28" r="16" fill={`url(#clg-${primaryColor.slice(1)})`} />
      <circle cx="48" cy="36" r="12" fill={`url(#clg-${primaryColor.slice(1)})`} />
      <rect x="12" y="36" width="44" height="14" rx="7" fill={`url(#clg-${primaryColor.slice(1)})`} />
    </svg>
  );
}

export function MoonShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={`mg-${primaryColor.slice(1)}`} cx="30%" cy="30%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <path
        d="M40 6 C22 6 8 20 8 38 C8 52 18 60 32 60 C46 60 56 50 56 38 C42 46 28 38 28 22 C28 14 34 8 40 6Z"
        fill={`url(#mg-${primaryColor.slice(1)})`}
      />
    </svg>
  );
}

export function RibbonShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={`rg-${primaryColor.slice(1)}`} cx="50%" cy="40%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Left bow */}
      <ellipse cx="20" cy="24" rx="14" ry="10" fill={`url(#rg-${primaryColor.slice(1)})`} transform="rotate(-20 20 24)" />
      {/* Right bow */}
      <ellipse cx="44" cy="24" rx="14" ry="10" fill={`url(#rg-${primaryColor.slice(1)})`} transform="rotate(20 44 24)" />
      {/* Center knot */}
      <circle cx="32" cy="28" r="6" fill={primaryColor} />
      {/* Tails */}
      <path d="M28 34 L20 56 L28 48" fill={`url(#rg-${primaryColor.slice(1)})`} />
      <path d="M36 34 L44 56 L36 48" fill={`url(#rg-${primaryColor.slice(1)})`} />
    </svg>
  );
}

export const SHAPE_COMPONENTS: Record<string, (props: ShapeProps) => React.JSX.Element> = {
  circle: CircleShape,
  star: StarShape,
  heart: HeartShape,
  flower: FlowerShape,
  animal_face: AnimalFaceShape,
  food: FoodShape,
  diamond: DiamondShape,
  cloud: CloudShape,
  moon: MoonShape,
  ribbon: RibbonShape,
};
