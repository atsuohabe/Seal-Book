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

export function CatShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={`cat-g-${primaryColor.slice(1)}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Ears */}
      <polygon points="12,8 8,24 22,22" fill={`url(#cat-g-${primaryColor.slice(1)})`} />
      <polygon points="52,8 56,24 42,22" fill={`url(#cat-g-${primaryColor.slice(1)})`} />
      <polygon points="14,12 12,22 20,20" fill={secondaryColor} opacity="0.5" />
      <polygon points="50,12 52,22 44,20" fill={secondaryColor} opacity="0.5" />
      {/* Face */}
      <circle cx="32" cy="36" r="22" fill={`url(#cat-g-${primaryColor.slice(1)})`} />
      {/* Nose */}
      <polygon points="32,38 30,41 34,41" fill="#FFB6C1" />
      {/* Whiskers */}
      <line x1="8" y1="36" x2="22" y2="38" stroke="#333" strokeWidth="0.8" opacity="0.3" />
      <line x1="8" y1="42" x2="22" y2="40" stroke="#333" strokeWidth="0.8" opacity="0.3" />
      <line x1="56" y1="36" x2="42" y2="38" stroke="#333" strokeWidth="0.8" opacity="0.3" />
      <line x1="56" y1="42" x2="42" y2="40" stroke="#333" strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

export function BunnyShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={`bun-g-${primaryColor.slice(1)}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Ears */}
      <ellipse cx="22" cy="14" rx="7" ry="16" fill={`url(#bun-g-${primaryColor.slice(1)})`} transform="rotate(-8 22 14)" />
      <ellipse cx="42" cy="14" rx="7" ry="16" fill={`url(#bun-g-${primaryColor.slice(1)})`} transform="rotate(8 42 14)" />
      <ellipse cx="22" cy="14" rx="4" ry="12" fill={secondaryColor} opacity="0.5" transform="rotate(-8 22 14)" />
      <ellipse cx="42" cy="14" rx="4" ry="12" fill={secondaryColor} opacity="0.5" transform="rotate(8 42 14)" />
      {/* Face */}
      <circle cx="32" cy="38" r="22" fill={`url(#bun-g-${primaryColor.slice(1)})`} />
      {/* Nose */}
      <ellipse cx="32" cy="40" rx="2.5" ry="2" fill="#FFB6C1" />
    </svg>
  );
}

export function BearShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={`bear-g-${primaryColor.slice(1)}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Ears */}
      <circle cx="14" cy="16" r="10" fill={`url(#bear-g-${primaryColor.slice(1)})`} />
      <circle cx="50" cy="16" r="10" fill={`url(#bear-g-${primaryColor.slice(1)})`} />
      <circle cx="14" cy="16" r="6" fill={secondaryColor} opacity="0.5" />
      <circle cx="50" cy="16" r="6" fill={secondaryColor} opacity="0.5" />
      {/* Face */}
      <circle cx="32" cy="36" r="24" fill={`url(#bear-g-${primaryColor.slice(1)})`} />
      {/* Muzzle */}
      <ellipse cx="32" cy="42" rx="10" ry="8" fill={secondaryColor} opacity="0.6" />
      {/* Nose */}
      <ellipse cx="32" cy="39" rx="3" ry="2.5" fill="#333" opacity="0.7" />
    </svg>
  );
}

export function PenguinShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={`pen-g-${primaryColor.slice(1)}`} cx="40%" cy="30%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Body */}
      <ellipse cx="32" cy="36" rx="22" ry="26" fill={`url(#pen-g-${primaryColor.slice(1)})`} />
      {/* Belly */}
      <ellipse cx="32" cy="40" rx="14" ry="18" fill={secondaryColor} opacity="0.7" />
      {/* Beak */}
      <polygon points="28,34 32,38 36,34" fill="#FF9F43" />
      {/* Feet */}
      <ellipse cx="24" cy="60" rx="6" ry="3" fill="#FF9F43" opacity="0.8" />
      <ellipse cx="40" cy="60" rx="6" ry="3" fill="#FF9F43" opacity="0.8" />
    </svg>
  );
}

export function CherryShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={`chr-g-${primaryColor.slice(1)}`} cx="35%" cy="30%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Stems */}
      <path d="M22 32 Q26 14 32 8" fill="none" stroke="#4A7C59" strokeWidth="2" />
      <path d="M42 32 Q38 14 32 8" fill="none" stroke="#4A7C59" strokeWidth="2" />
      {/* Leaf */}
      <ellipse cx="34" cy="10" rx="6" ry="3" fill="#4A7C59" transform="rotate(20 34 10)" />
      {/* Cherries */}
      <circle cx="22" cy="42" r="14" fill={`url(#chr-g-${primaryColor.slice(1)})`} />
      <circle cx="42" cy="42" r="14" fill={`url(#chr-g-${primaryColor.slice(1)})`} />
      {/* Highlights */}
      <circle cx="18" cy="38" r="3" fill="#FFF" opacity="0.3" />
      <circle cx="38" cy="38" r="3" fill="#FFF" opacity="0.3" />
    </svg>
  );
}

export function StrawberryShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={`stb-g-${primaryColor.slice(1)}`} cx="40%" cy="30%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Leaves */}
      <ellipse cx="26" cy="12" rx="7" ry="4" fill="#4A7C59" transform="rotate(-20 26 12)" />
      <ellipse cx="38" cy="12" rx="7" ry="4" fill="#4A7C59" transform="rotate(20 38 12)" />
      <ellipse cx="32" cy="10" rx="5" ry="4" fill="#5A8C69" />
      {/* Body */}
      <path
        d="M16 18 Q14 36 20 48 Q26 58 32 60 Q38 58 44 48 Q50 36 48 18 Q32 12 16 18Z"
        fill={`url(#stb-g-${primaryColor.slice(1)})`}
      />
      {/* Seeds */}
      <circle cx="24" cy="28" r="1.2" fill={secondaryColor} opacity="0.6" />
      <circle cx="32" cy="26" r="1.2" fill={secondaryColor} opacity="0.6" />
      <circle cx="40" cy="28" r="1.2" fill={secondaryColor} opacity="0.6" />
      <circle cx="28" cy="36" r="1.2" fill={secondaryColor} opacity="0.6" />
      <circle cx="36" cy="36" r="1.2" fill={secondaryColor} opacity="0.6" />
      <circle cx="32" cy="44" r="1.2" fill={secondaryColor} opacity="0.6" />
    </svg>
  );
}

export function IceCreamShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={`ice-g-${primaryColor.slice(1)}`} cx="40%" cy="30%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Cone */}
      <polygon points="20,34 32,60 44,34" fill="#DEB887" />
      <line x1="22" y1="36" x2="30" y2="56" stroke="#C4A06A" strokeWidth="0.8" opacity="0.5" />
      <line x1="42" y1="36" x2="34" y2="56" stroke="#C4A06A" strokeWidth="0.8" opacity="0.5" />
      <line x1="20" y1="40" x2="44" y2="40" stroke="#C4A06A" strokeWidth="0.8" opacity="0.5" />
      <line x1="22" y1="46" x2="42" y2="46" stroke="#C4A06A" strokeWidth="0.8" opacity="0.5" />
      {/* Scoop */}
      <circle cx="32" cy="24" r="16" fill={`url(#ice-g-${primaryColor.slice(1)})`} />
      {/* Drip */}
      <ellipse cx="24" cy="36" rx="3" ry="4" fill={primaryColor} opacity="0.7" />
    </svg>
  );
}

export function RainbowShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      {/* Rainbow arcs */}
      <path d="M8 48 A24 24 0 0 1 56 48" fill="none" stroke="#FF6B6B" strokeWidth="5" opacity="0.7" />
      <path d="M13 48 A19 19 0 0 1 51 48" fill="none" stroke="#FFE66D" strokeWidth="5" opacity="0.7" />
      <path d="M18 48 A14 14 0 0 1 46 48" fill="none" stroke={primaryColor} strokeWidth="5" opacity="0.7" />
      <path d="M23 48 A9 9 0 0 1 41 48" fill="none" stroke={secondaryColor} strokeWidth="5" opacity="0.7" />
      {/* Clouds */}
      <circle cx="10" cy="48" r="6" fill="#FFF" opacity="0.8" />
      <circle cx="16" cy="46" r="5" fill="#FFF" opacity="0.8" />
      <circle cx="54" cy="48" r="6" fill="#FFF" opacity="0.8" />
      <circle cx="48" cy="46" r="5" fill="#FFF" opacity="0.8" />
    </svg>
  );
}

export function ShootingStarShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={`ss-g-${primaryColor.slice(1)}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Tail */}
      <circle cx="14" cy="50" r="3" fill={primaryColor} opacity="0.2" />
      <circle cx="22" cy="44" r="4" fill={primaryColor} opacity="0.3" />
      <circle cx="30" cy="36" r="5" fill={primaryColor} opacity="0.4" />
      {/* Star */}
      <polygon
        points="44,8 48,20 60,20 50,28 54,40 44,32 34,40 38,28 28,20 40,20"
        fill={`url(#ss-g-${primaryColor.slice(1)})`}
      />
    </svg>
  );
}

export function ButterflyShape({ primaryColor, secondaryColor, size }: ShapeProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <radialGradient id={`btf-g-${primaryColor.slice(1)}`} cx="50%" cy="40%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Antennae */}
      <path d="M32 22 Q26 8 20 6" fill="none" stroke="#333" strokeWidth="1.2" opacity="0.5" />
      <path d="M32 22 Q38 8 44 6" fill="none" stroke="#333" strokeWidth="1.2" opacity="0.5" />
      <circle cx="20" cy="6" r="2" fill="#333" opacity="0.5" />
      <circle cx="44" cy="6" r="2" fill="#333" opacity="0.5" />
      {/* Upper wings */}
      <ellipse cx="18" cy="28" rx="14" ry="12" fill={`url(#btf-g-${primaryColor.slice(1)})`} opacity="0.85" />
      <ellipse cx="46" cy="28" rx="14" ry="12" fill={`url(#btf-g-${primaryColor.slice(1)})`} opacity="0.85" />
      {/* Lower wings */}
      <ellipse cx="20" cy="44" rx="10" ry="10" fill={`url(#btf-g-${primaryColor.slice(1)})`} opacity="0.7" />
      <ellipse cx="44" cy="44" rx="10" ry="10" fill={`url(#btf-g-${primaryColor.slice(1)})`} opacity="0.7" />
      {/* Wing patterns */}
      <circle cx="16" cy="26" r="4" fill={secondaryColor} opacity="0.4" />
      <circle cx="48" cy="26" r="4" fill={secondaryColor} opacity="0.4" />
      {/* Body */}
      <ellipse cx="32" cy="36" rx="3" ry="14" fill="#333" opacity="0.6" />
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
  cat: CatShape,
  bunny: BunnyShape,
  bear: BearShape,
  penguin: PenguinShape,
  cherry: CherryShape,
  strawberry: StrawberryShape,
  ice_cream: IceCreamShape,
  rainbow: RainbowShape,
  shooting_star: ShootingStarShape,
  butterfly: ButterflyShape,
};
