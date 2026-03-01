import type React from 'react';

interface ShapeProps {
  primaryColor: string;
  secondaryColor: string;
  stickerId: string;
}

// --- Clip path silhouettes (used by StickerView for shape-accurate clipping) ---

export const SHAPE_CLIP_PATHS: Record<string, React.ReactNode> = {
  circle: <circle cx="32" cy="32" r="31" />,
  star: <polygon points="32,3 39,24 61,24 43,37 50,59 32,45 14,59 21,37 3,24 25,24" />,
  heart: <path d="M32 58 C32 58 5 38 5 19 C5 9 13 3 23 3 C27 3 32 8 32 8 C32 8 37 3 41 3 C51 3 59 9 59 19 C59 38 32 58 32 58Z" />,
  flower: (
    <>
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse key={angle} cx="32" cy="14" rx="11" ry="15" transform={`rotate(${angle} 32 32)`} />
      ))}
      <circle cx="32" cy="32" r="10" />
    </>
  ),
  animal_face: (
    <>
      <ellipse cx="14" cy="13" rx="11" ry="13" />
      <ellipse cx="50" cy="13" rx="11" ry="13" />
      <circle cx="32" cy="34" r="25" />
    </>
  ),
  food: <path d="M14 34 L18 60 H46 L50 34 Z M12 20 Q32 8 52 20 L52 36 L12 36 Z" />,
  diamond: <polygon points="32,3 61,24 32,61 3,24" />,
  cloud: (
    <>
      <circle cx="20" cy="36" r="15" />
      <circle cx="34" cy="28" r="17" />
      <circle cx="48" cy="36" r="13" />
      <rect x="10" y="36" width="44" height="15" rx="7" />
    </>
  ),
  moon: <path d="M42 5 C22 5 6 20 6 38 C6 53 17 62 32 62 C47 62 58 51 58 38 C43 47 27 38 27 21 C27 13 34 7 42 5Z" />,
  ribbon: (
    <>
      <ellipse cx="20" cy="24" rx="15" ry="11" transform="rotate(-20 20 24)" />
      <ellipse cx="44" cy="24" rx="15" ry="11" transform="rotate(20 44 24)" />
      <circle cx="32" cy="28" r="7" />
      <path d="M27 35 L18 58 L28 50" />
      <path d="M37 35 L46 58 L36 50" />
    </>
  ),
  cat: (
    <>
      <polygon points="10,6 5,24 22,22" />
      <polygon points="54,6 59,24 42,22" />
      <circle cx="32" cy="38" r="24" />
    </>
  ),
  bunny: (
    <>
      <ellipse cx="22" cy="13" rx="8" ry="17" transform="rotate(-8 22 13)" />
      <ellipse cx="42" cy="13" rx="8" ry="17" transform="rotate(8 42 13)" />
      <circle cx="32" cy="38" r="23" />
    </>
  ),
  bear: (
    <>
      <circle cx="13" cy="15" r="12" />
      <circle cx="51" cy="15" r="12" />
      <circle cx="32" cy="36" r="25" />
    </>
  ),
  penguin: <ellipse cx="32" cy="36" rx="24" ry="27" />,
  cherry: (
    <>
      <circle cx="20" cy="43" r="15" />
      <circle cx="44" cy="43" r="15" />
    </>
  ),
  strawberry: <path d="M14 17 Q12 36 18 49 Q25 60 32 62 Q39 60 46 49 Q52 36 50 17 Q32 10 14 17Z" />,
  ice_cream: (
    <>
      <circle cx="32" cy="24" r="18" />
      <path d="M18 34 L32 62 L46 34 Z" />
    </>
  ),
  rainbow: (
    <>
      <path d="M5 50 A27 27 0 0 1 59 50 L59 58 A19 19 0 0 0 5 58 Z" />
      <circle cx="8" cy="50" r="8" />
      <circle cx="56" cy="50" r="8" />
    </>
  ),
  shooting_star: (
    <>
      <polygon points="44,7 48,21 61,21 50,29 54,43 44,35 34,43 38,29 27,21 40,21" />
      <circle cx="24" cy="44" r="6" />
      <circle cx="16" cy="52" r="4" />
    </>
  ),
  butterfly: (
    <>
      <ellipse cx="17" cy="28" rx="15" ry="13" />
      <ellipse cx="47" cy="28" rx="15" ry="13" />
      <ellipse cx="19" cy="44" rx="11" ry="11" />
      <ellipse cx="45" cy="44" rx="11" ry="11" />
      <ellipse cx="32" cy="36" rx="4" ry="16" />
    </>
  ),
  cat_sitting: (
    <>
      <polygon points="20,18 15,5 27,14" />
      <polygon points="44,18 49,5 37,14" />
      <circle cx="32" cy="26" r="15" />
      <ellipse cx="32" cy="46" rx="14" ry="13" />
    </>
  ),
  cat_jumping: (
    <>
      <polygon points="12,12 8,2 20,10" />
      <polygon points="42,8 46,0 36,8" />
      <circle cx="28" cy="22" r="14" />
      <ellipse cx="32" cy="44" rx="14" ry="14" />
    </>
  ),
  bunny_sitting: (
    <>
      <ellipse cx="22" cy="10" rx="7" ry="15" transform="rotate(-8 22 10)" />
      <ellipse cx="42" cy="10" rx="7" ry="15" transform="rotate(8 42 10)" />
      <circle cx="32" cy="26" r="14" />
      <ellipse cx="32" cy="46" rx="13" ry="14" />
    </>
  ),
  bunny_jumping: (
    <>
      <ellipse cx="18" cy="8" rx="6" ry="16" transform="rotate(-20 18 8)" />
      <ellipse cx="46" cy="8" rx="6" ry="16" transform="rotate(20 46 8)" />
      <circle cx="32" cy="28" r="14" />
      <ellipse cx="32" cy="48" rx="14" ry="12" />
    </>
  ),
  bear_waving: (
    <>
      <circle cx="14" cy="14" r="11" />
      <circle cx="50" cy="14" r="11" />
      <circle cx="32" cy="34" r="22" />
      <ellipse cx="55" cy="42" rx="8" ry="6" transform="rotate(-30 55 42)" />
    </>
  ),
  bear_sleeping: (
    <>
      <circle cx="14" cy="16" r="11" />
      <circle cx="50" cy="16" r="11" />
      <circle cx="32" cy="36" r="22" />
    </>
  ),
  penguin_sliding: (
    <>
      <ellipse cx="32" cy="32" rx="20" ry="27" />
      <ellipse cx="54" cy="48" rx="10" ry="6" transform="rotate(-20 54 48)" />
    </>
  ),
  penguin_dancing: (
    <>
      <ellipse cx="32" cy="34" rx="20" ry="26" />
      <ellipse cx="10" cy="40" rx="8" ry="5" transform="rotate(30 10 40)" />
      <ellipse cx="54" cy="40" rx="8" ry="5" transform="rotate(-30 54 40)" />
    </>
  ),
};

// --- Shape components (return <g> for composition in the sticker SVG) ---

export function CircleShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `cg-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill={`url(#${gid})`} />
    </g>
  );
}

export function StarShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `sg-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <polygon points="32,4 39,24 60,24 43,37 50,58 32,45 14,58 21,37 4,24 25,24" fill={`url(#${gid})`} />
    </g>
  );
}

export function HeartShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `hg-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="30%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <path d="M32 56 C32 56 6 38 6 20 C6 10 14 4 24 4 C28 4 32 8 32 8 C32 8 36 4 40 4 C50 4 58 10 58 20 C58 38 32 56 32 56Z" fill={`url(#${gid})`} />
    </g>
  );
}

export function FlowerShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `fg-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="50%" cy="50%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse key={angle} cx="32" cy="16" rx="10" ry="14" fill={`url(#${gid})`} transform={`rotate(${angle} 32 32)`} opacity="0.85" />
      ))}
      <circle cx="32" cy="32" r="8" fill="#FFE66D" />
    </g>
  );
}

export function AnimalFaceShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `ag-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <ellipse cx="16" cy="14" rx="10" ry="12" fill={`url(#${gid})`} />
      <ellipse cx="48" cy="14" rx="10" ry="12" fill={`url(#${gid})`} />
      <ellipse cx="16" cy="14" rx="6" ry="8" fill={secondaryColor} opacity="0.5" />
      <ellipse cx="48" cy="14" rx="6" ry="8" fill={secondaryColor} opacity="0.5" />
      <circle cx="32" cy="34" r="24" fill={`url(#${gid})`} />
    </g>
  );
}

export function FoodShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `fdg-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="30%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <path d="M16 36 L20 58 H44 L48 36 Z" fill="#DEB887" />
      <ellipse cx="32" cy="28" rx="20" ry="16" fill={`url(#${gid})`} />
      <circle cx="26" cy="22" r="8" fill={secondaryColor} opacity="0.6" />
      <circle cx="38" cy="24" r="7" fill={secondaryColor} opacity="0.5" />
      <circle cx="32" cy="14" r="5" fill="#FF6B6B" />
      <line x1="32" y1="14" x2="32" y2="8" stroke="#4A7C59" strokeWidth="1.5" />
    </g>
  );
}

export function DiamondShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `dg-${stickerId}`;
  return (
    <g>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="50%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>
      </defs>
      <polygon points="32,4 58,24 32,60 6,24" fill={`url(#${gid})`} />
      <polygon points="32,4 44,24 32,44 20,24" fill={secondaryColor} opacity="0.3" />
    </g>
  );
}

export function CloudShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `clg-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <circle cx="22" cy="36" r="14" fill={`url(#${gid})`} />
      <circle cx="36" cy="28" r="16" fill={`url(#${gid})`} />
      <circle cx="48" cy="36" r="12" fill={`url(#${gid})`} />
      <rect x="12" y="36" width="44" height="14" rx="7" fill={`url(#${gid})`} />
    </g>
  );
}

export function MoonShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `mg-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="30%" cy="30%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <path d="M40 6 C22 6 8 20 8 38 C8 52 18 60 32 60 C46 60 56 50 56 38 C42 46 28 38 28 22 C28 14 34 8 40 6Z" fill={`url(#${gid})`} />
    </g>
  );
}

export function RibbonShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `rg-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="50%" cy="40%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <ellipse cx="20" cy="24" rx="14" ry="10" fill={`url(#${gid})`} transform="rotate(-20 20 24)" />
      <ellipse cx="44" cy="24" rx="14" ry="10" fill={`url(#${gid})`} transform="rotate(20 44 24)" />
      <circle cx="32" cy="28" r="6" fill={primaryColor} />
      <path d="M28 34 L20 56 L28 48" fill={`url(#${gid})`} />
      <path d="M36 34 L44 56 L36 48" fill={`url(#${gid})`} />
    </g>
  );
}

export function CatShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `cat-g-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <polygon points="12,8 8,24 22,22" fill={`url(#${gid})`} />
      <polygon points="52,8 56,24 42,22" fill={`url(#${gid})`} />
      <polygon points="14,12 12,22 20,20" fill={secondaryColor} opacity="0.5" />
      <polygon points="50,12 52,22 44,20" fill={secondaryColor} opacity="0.5" />
      <circle cx="32" cy="36" r="22" fill={`url(#${gid})`} />
      <polygon points="32,38 30,41 34,41" fill="#FFB6C1" />
      <line x1="8" y1="36" x2="22" y2="38" stroke="#333" strokeWidth="0.8" opacity="0.3" />
      <line x1="8" y1="42" x2="22" y2="40" stroke="#333" strokeWidth="0.8" opacity="0.3" />
      <line x1="56" y1="36" x2="42" y2="38" stroke="#333" strokeWidth="0.8" opacity="0.3" />
      <line x1="56" y1="42" x2="42" y2="40" stroke="#333" strokeWidth="0.8" opacity="0.3" />
    </g>
  );
}

export function BunnyShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `bun-g-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <ellipse cx="22" cy="14" rx="7" ry="16" fill={`url(#${gid})`} transform="rotate(-8 22 14)" />
      <ellipse cx="42" cy="14" rx="7" ry="16" fill={`url(#${gid})`} transform="rotate(8 42 14)" />
      <ellipse cx="22" cy="14" rx="4" ry="12" fill={secondaryColor} opacity="0.5" transform="rotate(-8 22 14)" />
      <ellipse cx="42" cy="14" rx="4" ry="12" fill={secondaryColor} opacity="0.5" transform="rotate(8 42 14)" />
      <circle cx="32" cy="38" r="22" fill={`url(#${gid})`} />
      <ellipse cx="32" cy="40" rx="2.5" ry="2" fill="#FFB6C1" />
    </g>
  );
}

export function BearShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `bear-g-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <circle cx="14" cy="16" r="10" fill={`url(#${gid})`} />
      <circle cx="50" cy="16" r="10" fill={`url(#${gid})`} />
      <circle cx="14" cy="16" r="6" fill={secondaryColor} opacity="0.5" />
      <circle cx="50" cy="16" r="6" fill={secondaryColor} opacity="0.5" />
      <circle cx="32" cy="36" r="24" fill={`url(#${gid})`} />
      <ellipse cx="32" cy="42" rx="10" ry="8" fill={secondaryColor} opacity="0.6" />
      <ellipse cx="32" cy="39" rx="3" ry="2.5" fill="#333" opacity="0.7" />
    </g>
  );
}

export function PenguinShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `pen-g-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="30%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <ellipse cx="32" cy="36" rx="22" ry="26" fill={`url(#${gid})`} />
      <ellipse cx="32" cy="40" rx="14" ry="18" fill={secondaryColor} opacity="0.7" />
      <polygon points="28,34 32,38 36,34" fill="#FF9F43" />
      <ellipse cx="24" cy="60" rx="6" ry="3" fill="#FF9F43" opacity="0.8" />
      <ellipse cx="40" cy="60" rx="6" ry="3" fill="#FF9F43" opacity="0.8" />
    </g>
  );
}

export function CherryShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `chr-g-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="35%" cy="30%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <path d="M22 32 Q26 14 32 8" fill="none" stroke="#4A7C59" strokeWidth="2" />
      <path d="M42 32 Q38 14 32 8" fill="none" stroke="#4A7C59" strokeWidth="2" />
      <ellipse cx="34" cy="10" rx="6" ry="3" fill="#4A7C59" transform="rotate(20 34 10)" />
      <circle cx="22" cy="42" r="14" fill={`url(#${gid})`} />
      <circle cx="42" cy="42" r="14" fill={`url(#${gid})`} />
      <circle cx="18" cy="38" r="3" fill="#FFF" opacity="0.3" />
      <circle cx="38" cy="38" r="3" fill="#FFF" opacity="0.3" />
    </g>
  );
}

export function StrawberryShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `stb-g-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="30%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <ellipse cx="26" cy="12" rx="7" ry="4" fill="#4A7C59" transform="rotate(-20 26 12)" />
      <ellipse cx="38" cy="12" rx="7" ry="4" fill="#4A7C59" transform="rotate(20 38 12)" />
      <ellipse cx="32" cy="10" rx="5" ry="4" fill="#5A8C69" />
      <path d="M16 18 Q14 36 20 48 Q26 58 32 60 Q38 58 44 48 Q50 36 48 18 Q32 12 16 18Z" fill={`url(#${gid})`} />
      <circle cx="24" cy="28" r="1.2" fill={secondaryColor} opacity="0.6" />
      <circle cx="32" cy="26" r="1.2" fill={secondaryColor} opacity="0.6" />
      <circle cx="40" cy="28" r="1.2" fill={secondaryColor} opacity="0.6" />
      <circle cx="28" cy="36" r="1.2" fill={secondaryColor} opacity="0.6" />
      <circle cx="36" cy="36" r="1.2" fill={secondaryColor} opacity="0.6" />
      <circle cx="32" cy="44" r="1.2" fill={secondaryColor} opacity="0.6" />
    </g>
  );
}

export function IceCreamShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `ice-g-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="30%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <polygon points="20,34 32,60 44,34" fill="#DEB887" />
      <line x1="22" y1="36" x2="30" y2="56" stroke="#C4A06A" strokeWidth="0.8" opacity="0.5" />
      <line x1="42" y1="36" x2="34" y2="56" stroke="#C4A06A" strokeWidth="0.8" opacity="0.5" />
      <line x1="20" y1="40" x2="44" y2="40" stroke="#C4A06A" strokeWidth="0.8" opacity="0.5" />
      <line x1="22" y1="46" x2="42" y2="46" stroke="#C4A06A" strokeWidth="0.8" opacity="0.5" />
      <circle cx="32" cy="24" r="16" fill={`url(#${gid})`} />
      <ellipse cx="24" cy="36" rx="3" ry="4" fill={primaryColor} opacity="0.7" />
    </g>
  );
}

export function RainbowShape({ primaryColor, secondaryColor }: ShapeProps) {
  return (
    <g>
      <path d="M8 48 A24 24 0 0 1 56 48" fill="none" stroke="#FF6B6B" strokeWidth="5" opacity="0.7" />
      <path d="M13 48 A19 19 0 0 1 51 48" fill="none" stroke="#FFE66D" strokeWidth="5" opacity="0.7" />
      <path d="M18 48 A14 14 0 0 1 46 48" fill="none" stroke={primaryColor} strokeWidth="5" opacity="0.7" />
      <path d="M23 48 A9 9 0 0 1 41 48" fill="none" stroke={secondaryColor} strokeWidth="5" opacity="0.7" />
      <circle cx="10" cy="48" r="6" fill="#FFF" opacity="0.8" />
      <circle cx="16" cy="46" r="5" fill="#FFF" opacity="0.8" />
      <circle cx="54" cy="48" r="6" fill="#FFF" opacity="0.8" />
      <circle cx="48" cy="46" r="5" fill="#FFF" opacity="0.8" />
    </g>
  );
}

export function ShootingStarShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `ss-g-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <circle cx="14" cy="50" r="3" fill={primaryColor} opacity="0.2" />
      <circle cx="22" cy="44" r="4" fill={primaryColor} opacity="0.3" />
      <circle cx="30" cy="36" r="5" fill={primaryColor} opacity="0.4" />
      <polygon points="44,8 48,20 60,20 50,28 54,40 44,32 34,40 38,28 28,20 40,20" fill={`url(#${gid})`} />
    </g>
  );
}

export function ButterflyShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `btf-g-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="50%" cy="40%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      <path d="M32 22 Q26 8 20 6" fill="none" stroke="#333" strokeWidth="1.2" opacity="0.5" />
      <path d="M32 22 Q38 8 44 6" fill="none" stroke="#333" strokeWidth="1.2" opacity="0.5" />
      <circle cx="20" cy="6" r="2" fill="#333" opacity="0.5" />
      <circle cx="44" cy="6" r="2" fill="#333" opacity="0.5" />
      <ellipse cx="18" cy="28" rx="14" ry="12" fill={`url(#${gid})`} opacity="0.85" />
      <ellipse cx="46" cy="28" rx="14" ry="12" fill={`url(#${gid})`} opacity="0.85" />
      <ellipse cx="20" cy="44" rx="10" ry="10" fill={`url(#${gid})`} opacity="0.7" />
      <ellipse cx="44" cy="44" rx="10" ry="10" fill={`url(#${gid})`} opacity="0.7" />
      <circle cx="16" cy="26" r="4" fill={secondaryColor} opacity="0.4" />
      <circle cx="48" cy="26" r="4" fill={secondaryColor} opacity="0.4" />
      <ellipse cx="32" cy="36" rx="3" ry="14" fill="#333" opacity="0.6" />
    </g>
  );
}

// --- Full-body character shapes (Feature D) ---

export function CatSittingShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `cat-sit-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Ears */}
      <polygon points="20,20 15,6 28,15" fill={`url(#${gid})`} />
      <polygon points="44,20 49,6 36,15" fill={`url(#${gid})`} />
      <polygon points="22,19 18,9 27,15" fill={secondaryColor} opacity="0.5" />
      <polygon points="42,19 46,9 37,15" fill={secondaryColor} opacity="0.5" />
      {/* Head */}
      <circle cx="32" cy="26" r="15" fill={`url(#${gid})`} />
      {/* Nose */}
      <polygon points="32,28 30,31 34,31" fill="#FFB6C1" />
      {/* Body */}
      <ellipse cx="32" cy="48" rx="13" ry="12" fill={`url(#${gid})`} />
      {/* Paws */}
      <ellipse cx="24" cy="58" rx="5" ry="3" fill={`url(#${gid})`} />
      <ellipse cx="40" cy="58" rx="5" ry="3" fill={`url(#${gid})`} />
      {/* Tail */}
      <path d="M44,52 Q56,44 52,36" fill="none" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

export function CatJumpingShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `cat-jmp-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Ears */}
      <polygon points="14,14 10,2 22,12" fill={`url(#${gid})`} />
      <polygon points="40,10 44,0 34,10" fill={`url(#${gid})`} />
      {/* Head */}
      <circle cx="28" cy="22" r="14" fill={`url(#${gid})`} />
      <polygon points="28,24 26,27 30,27" fill="#FFB6C1" />
      {/* Body */}
      <ellipse cx="34" cy="46" rx="14" ry="13" fill={`url(#${gid})`} />
      {/* Extended legs */}
      <ellipse cx="20" cy="56" rx="6" ry="4" fill={`url(#${gid})`} transform="rotate(-30 20 56)" />
      <ellipse cx="48" cy="56" rx="6" ry="4" fill={`url(#${gid})`} transform="rotate(30 48 56)" />
      {/* Tail (up) */}
      <path d="M46,42 Q58,30 52,20" fill="none" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

export function BunnySittingShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `bun-sit-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Ears */}
      <ellipse cx="22" cy="10" rx="7" ry="16" fill={`url(#${gid})`} transform="rotate(-8 22 10)" />
      <ellipse cx="42" cy="10" rx="7" ry="16" fill={`url(#${gid})`} transform="rotate(8 42 10)" />
      <ellipse cx="22" cy="10" rx="4" ry="11" fill={secondaryColor} opacity="0.5" transform="rotate(-8 22 10)" />
      <ellipse cx="42" cy="10" rx="4" ry="11" fill={secondaryColor} opacity="0.5" transform="rotate(8 42 10)" />
      {/* Head */}
      <circle cx="32" cy="26" r="14" fill={`url(#${gid})`} />
      <ellipse cx="32" cy="28" rx="2.5" ry="2" fill="#FFB6C1" />
      {/* Body */}
      <ellipse cx="32" cy="48" rx="13" ry="14" fill={`url(#${gid})`} />
      {/* Paws */}
      <ellipse cx="22" cy="58" rx="6" ry="4" fill={`url(#${gid})`} />
      <ellipse cx="42" cy="58" rx="6" ry="4" fill={`url(#${gid})`} />
      {/* Tail */}
      <circle cx="44" cy="52" r="4" fill="#FFF" opacity="0.8" />
    </g>
  );
}

export function BunnyJumpingShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `bun-jmp-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Ears (tilted back) */}
      <ellipse cx="18" cy="8" rx="6" ry="17" fill={`url(#${gid})`} transform="rotate(-20 18 8)" />
      <ellipse cx="44" cy="6" rx="6" ry="17" fill={`url(#${gid})`} transform="rotate(15 44 6)" />
      <ellipse cx="18" cy="8" rx="3.5" ry="12" fill={secondaryColor} opacity="0.5" transform="rotate(-20 18 8)" />
      <ellipse cx="44" cy="6" rx="3.5" ry="12" fill={secondaryColor} opacity="0.5" transform="rotate(15 44 6)" />
      {/* Head */}
      <circle cx="32" cy="28" r="14" fill={`url(#${gid})`} />
      <ellipse cx="32" cy="30" rx="2.5" ry="2" fill="#FFB6C1" />
      {/* Body */}
      <ellipse cx="32" cy="50" rx="14" ry="12" fill={`url(#${gid})`} />
      {/* Extended back legs */}
      <ellipse cx="16" cy="58" rx="8" ry="5" fill={`url(#${gid})`} transform="rotate(-25 16 58)" />
      <ellipse cx="48" cy="58" rx="8" ry="5" fill={`url(#${gid})`} transform="rotate(25 48 58)" />
    </g>
  );
}

export function BearWavingShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `bear-wav-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Ears */}
      <circle cx="13" cy="14" r="11" fill={`url(#${gid})`} />
      <circle cx="51" cy="14" r="11" fill={`url(#${gid})`} />
      <circle cx="13" cy="14" r="6" fill={secondaryColor} opacity="0.5" />
      <circle cx="51" cy="14" r="6" fill={secondaryColor} opacity="0.5" />
      {/* Head */}
      <circle cx="32" cy="28" r="20" fill={`url(#${gid})`} />
      <ellipse cx="32" cy="34" rx="8" ry="6" fill={secondaryColor} opacity="0.6" />
      <ellipse cx="32" cy="31" rx="2.5" ry="2" fill="#333" opacity="0.7" />
      {/* Body */}
      <ellipse cx="28" cy="52" rx="14" ry="10" fill={`url(#${gid})`} />
      {/* Waving arm (right) */}
      <ellipse cx="52" cy="38" rx="8" ry="6" fill={`url(#${gid})`} transform="rotate(-40 52 38)" />
      <circle cx="58" cy="30" r="5" fill={`url(#${gid})`} />
      {/* Left arm */}
      <ellipse cx="14" cy="46" rx="8" ry="5" fill={`url(#${gid})`} transform="rotate(20 14 46)" />
      {/* Feet */}
      <ellipse cx="22" cy="60" rx="6" ry="4" fill={`url(#${gid})`} />
      <ellipse cx="36" cy="61" rx="6" ry="4" fill={`url(#${gid})`} />
    </g>
  );
}

export function BearSleepingShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `bear-slp-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="35%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Ears */}
      <circle cx="14" cy="16" r="11" fill={`url(#${gid})`} />
      <circle cx="50" cy="16" r="11" fill={`url(#${gid})`} />
      <circle cx="14" cy="16" r="6" fill={secondaryColor} opacity="0.5" />
      <circle cx="50" cy="16" r="6" fill={secondaryColor} opacity="0.5" />
      {/* Head (tilted) */}
      <circle cx="32" cy="30" r="20" fill={`url(#${gid})`} />
      <ellipse cx="32" cy="36" rx="8" ry="6" fill={secondaryColor} opacity="0.6" />
      {/* Sleeping eyes (curved) */}
      <path d="M22 26 Q26 30 30 26" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <path d="M34 26 Q38 30 42 26" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      {/* Zzz */}
      <text x="46" y="16" fontSize="9" fill="#A29BFE" fontWeight="bold" opacity="0.7">z</text>
      <text x="51" y="10" fontSize="7" fill="#A29BFE" fontWeight="bold" opacity="0.5">z</text>
      {/* Body (curled) */}
      <ellipse cx="32" cy="52" rx="18" ry="10" fill={`url(#${gid})`} />
      {/* Paws */}
      <ellipse cx="18" cy="56" rx="7" ry="5" fill={`url(#${gid})`} />
      <ellipse cx="46" cy="56" rx="7" ry="5" fill={`url(#${gid})`} />
    </g>
  );
}

export function PenguinSlidingShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `pen-sld-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="30%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Body (tilted/sliding) */}
      <ellipse cx="30" cy="34" rx="20" ry="24" fill={`url(#${gid})`} transform="rotate(-15 30 34)" />
      <ellipse cx="30" cy="38" rx="12" ry="16" fill={secondaryColor} opacity="0.7" transform="rotate(-15 30 38)" />
      {/* Beak */}
      <polygon points="26,26 30,31 34,26" fill="#FF9F43" />
      {/* Extended flipper (sliding) */}
      <ellipse cx="52" cy="44" rx="10" ry="5" fill={`url(#${gid})`} transform="rotate(-20 52 44)" />
      {/* Feet */}
      <ellipse cx="20" cy="58" rx="7" ry="4" fill="#FF9F43" opacity="0.8" transform="rotate(-15 20 58)" />
      {/* Ice trail */}
      <path d="M20,58 Q10,56 4,52" fill="none" stroke="#74B9FF" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
    </g>
  );
}

export function PenguinDancingShape({ primaryColor, secondaryColor, stickerId }: ShapeProps) {
  const gid = `pen-dnc-${stickerId}`;
  return (
    <g>
      <defs>
        <radialGradient id={gid} cx="40%" cy="30%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </radialGradient>
      </defs>
      {/* Body */}
      <ellipse cx="32" cy="36" rx="19" ry="24" fill={`url(#${gid})`} />
      <ellipse cx="32" cy="40" rx="11" ry="16" fill={secondaryColor} opacity="0.7" />
      {/* Beak */}
      <polygon points="28,28 32,32 36,28" fill="#FF9F43" />
      {/* Left flipper (up) */}
      <ellipse cx="10" cy="36" rx="8" ry="5" fill={`url(#${gid})`} transform="rotate(40 10 36)" />
      {/* Right flipper (up) */}
      <ellipse cx="54" cy="36" rx="8" ry="5" fill={`url(#${gid})`} transform="rotate(-40 54 36)" />
      {/* Feet (tap dancing) */}
      <ellipse cx="24" cy="59" rx="6" ry="3" fill="#FF9F43" opacity="0.8" transform="rotate(-10 24 59)" />
      <ellipse cx="40" cy="61" rx="6" ry="3" fill="#FF9F43" opacity="0.8" transform="rotate(10 40 61)" />
      {/* Musical notes */}
      <text x="50" y="16" fontSize="8" fill="#FFD700" opacity="0.7">♪</text>
      <text x="8" y="14" fontSize="7" fill="#FFD700" opacity="0.5">♪</text>
    </g>
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
  cat_sitting: CatSittingShape,
  cat_jumping: CatJumpingShape,
  bunny_sitting: BunnySittingShape,
  bunny_jumping: BunnyJumpingShape,
  bear_waving: BearWavingShape,
  bear_sleeping: BearSleepingShape,
  penguin_sliding: PenguinSlidingShape,
  penguin_dancing: PenguinDancingShape,
};
