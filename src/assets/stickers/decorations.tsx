import type { Decoration } from '../../types';

interface DecorationOverlayProps {
  decoration: Decoration;
  color: string;
  size: number;
}

export function DecorationOverlay({ decoration, color, size }: DecorationOverlayProps) {
  if (decoration === 'none') return null;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    >
      {decoration === 'bow' && <BowDecoration color={color} />}
      {decoration === 'crown' && <CrownDecoration color={color} />}
      {decoration === 'wings' && <WingsDecoration color={color} />}
      {decoration === 'halo' && <HaloDecoration color={color} />}
      {decoration === 'frame' && <FrameDecoration color={color} />}
      {decoration === 'tiara' && <TiaraDecoration color={color} />}
      {decoration === 'flower_wreath' && <FlowerWreathDecoration color={color} />}
      {decoration === 'scarf' && <ScarfDecoration color={color} />}
    </svg>
  );
}

function BowDecoration({ color }: { color: string }) {
  return (
    <g>
      <ellipse cx="24" cy="6" rx="8" ry="5" fill={color} opacity="0.8" transform="rotate(-15 24 6)" />
      <ellipse cx="40" cy="6" rx="8" ry="5" fill={color} opacity="0.8" transform="rotate(15 40 6)" />
      <circle cx="32" cy="7" r="3" fill={color} />
    </g>
  );
}

function CrownDecoration({ color }: { color: string }) {
  return (
    <g>
      <polygon
        points="18,14 22,2 28,10 32,0 36,10 42,2 46,14"
        fill={color}
        opacity="0.85"
      />
      <rect x="18" y="12" width="28" height="4" rx="1" fill={color} opacity="0.85" />
      <circle cx="22" cy="3" r="1.5" fill="#FFE66D" />
      <circle cx="32" cy="1" r="1.5" fill="#FFE66D" />
      <circle cx="42" cy="3" r="1.5" fill="#FFE66D" />
    </g>
  );
}

function WingsDecoration({ color }: { color: string }) {
  return (
    <g opacity="0.7">
      {/* Left wing */}
      <path
        d="M8 32 C2 24 2 16 10 20 C6 18 4 12 12 16 C8 14 8 8 14 14 L16 32 Z"
        fill={color}
      />
      {/* Right wing */}
      <path
        d="M56 32 C62 24 62 16 54 20 C58 18 60 12 52 16 C56 14 56 8 50 14 L48 32 Z"
        fill={color}
      />
    </g>
  );
}

function HaloDecoration({ color }: { color: string }) {
  return (
    <g>
      <ellipse
        cx="32"
        cy="6"
        rx="14"
        ry="4"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        opacity="0.7"
      />
      <ellipse
        cx="32"
        cy="6"
        rx="14"
        ry="4"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1"
        opacity="0.4"
      />
    </g>
  );
}

function FrameDecoration({ color }: { color: string }) {
  return (
    <g>
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="8"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeDasharray="4 2"
        opacity="0.6"
      />
      {/* Corner dots */}
      <circle cx="6" cy="6" r="2" fill={color} opacity="0.7" />
      <circle cx="58" cy="6" r="2" fill={color} opacity="0.7" />
      <circle cx="6" cy="58" r="2" fill={color} opacity="0.7" />
      <circle cx="58" cy="58" r="2" fill={color} opacity="0.7" />
    </g>
  );
}

function TiaraDecoration({ color }: { color: string }) {
  return (
    <g>
      {/* Tiara band */}
      <path
        d="M14,14 Q20,6 26,10 Q32,4 38,10 Q44,6 50,14"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.8"
      />
      {/* Gemstones */}
      <circle cx="26" cy="9" r="2" fill="#FFE66D" opacity="0.8" />
      <circle cx="32" cy="5" r="2.5" fill="#FF9FF3" opacity="0.8" />
      <circle cx="38" cy="9" r="2" fill="#74B9FF" opacity="0.8" />
    </g>
  );
}

function FlowerWreathDecoration({ color }: { color: string }) {
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  const cx = 32, cy = 32, r = 28;
  return (
    <g opacity="0.7">
      {angles.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const fx = cx + r * Math.cos(rad);
        const fy = cy + r * Math.sin(rad);
        return (
          <g key={angle} transform={`translate(${fx},${fy})`}>
            {[0, 72, 144, 216, 288].map((pa) => (
              <ellipse
                key={pa}
                cx={3 * Math.cos((pa * Math.PI) / 180)}
                cy={3 * Math.sin((pa * Math.PI) / 180)}
                rx="2.5"
                ry="1.5"
                fill={color}
                transform={`rotate(${pa})`}
              />
            ))}
            <circle cx="0" cy="0" r="1.5" fill="#FFE66D" />
          </g>
        );
      })}
    </g>
  );
}

function ScarfDecoration({ color }: { color: string }) {
  return (
    <g opacity="0.75">
      {/* Scarf band */}
      <path
        d="M8,46 Q16,42 24,46 Q32,50 40,46 Q48,42 56,46 L56,52 Q48,48 40,52 Q32,56 24,52 Q16,48 8,52 Z"
        fill={color}
      />
      {/* Fringe left */}
      <line x1="10" y1="52" x2="8" y2="58" stroke={color} strokeWidth="1.5" />
      <line x1="14" y1="52" x2="12" y2="58" stroke={color} strokeWidth="1.5" />
      {/* Fringe right */}
      <line x1="50" y1="52" x2="52" y2="58" stroke={color} strokeWidth="1.5" />
      <line x1="54" y1="52" x2="56" y2="58" stroke={color} strokeWidth="1.5" />
    </g>
  );
}
