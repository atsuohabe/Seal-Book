import type { Pattern } from '../../types';

interface PatternOverlayProps {
  pattern: Pattern;
  color: string;
  size: number;
}

export function PatternOverlay({ pattern, color, size }: PatternOverlayProps) {
  if (pattern === 'none') return null;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    >
      {pattern === 'dots' && <DotsPattern color={color} />}
      {pattern === 'stripes' && <StripesPattern color={color} />}
      {pattern === 'stars' && <StarsPattern color={color} />}
      {pattern === 'sparkle' && <SparklePattern color={color} />}
      {pattern === 'gradient' && <GradientPattern color={color} />}
    </svg>
  );
}

function DotsPattern({ color }: { color: string }) {
  const dots = [
    [16, 16], [32, 12], [48, 18],
    [12, 32], [28, 28], [44, 34],
    [20, 46], [36, 44], [50, 48],
  ];
  return (
    <>
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill={color} opacity="0.4" />
      ))}
    </>
  );
}

function StripesPattern({ color }: { color: string }) {
  return (
    <>
      {[12, 22, 32, 42, 52].map((x) => (
        <line
          key={x}
          x1={x}
          y1="4"
          x2={x - 8}
          y2="60"
          stroke={color}
          strokeWidth="2"
          opacity="0.25"
        />
      ))}
    </>
  );
}

function StarsPattern({ color }: { color: string }) {
  const positions = [[18, 18], [42, 14], [30, 38], [14, 48], [50, 44]];
  return (
    <>
      {positions.map(([cx, cy], i) => (
        <polygon
          key={i}
          points={starPoints(cx, cy, 4, 2)}
          fill={color}
          opacity="0.35"
        />
      ))}
    </>
  );
}

function SparklePattern({ color }: { color: string }) {
  const positions = [[16, 16], [44, 12], [28, 32], [48, 40], [16, 48]];
  return (
    <>
      {positions.map(([cx, cy], i) => (
        <g key={i} opacity="0.4">
          <line x1={cx - 4} y1={cy} x2={cx + 4} y2={cy} stroke={color} strokeWidth="1.5" />
          <line x1={cx} y1={cy - 4} x2={cx} y2={cy + 4} stroke={color} strokeWidth="1.5" />
          <line x1={cx - 2.5} y1={cy - 2.5} x2={cx + 2.5} y2={cy + 2.5} stroke={color} strokeWidth="1" />
          <line x1={cx + 2.5} y1={cy - 2.5} x2={cx - 2.5} y2={cy + 2.5} stroke={color} strokeWidth="1" />
        </g>
      ))}
    </>
  );
}

function GradientPattern({ color }: { color: string }) {
  return (
    <>
      <defs>
        <linearGradient id="pat-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="64" height="64" fill="url(#pat-grad)" />
    </>
  );
}

function starPoints(cx: number, cy: number, outerR: number, innerR: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 5; i++) {
    const outerAngle = (Math.PI / 2) + (i * 2 * Math.PI / 5);
    const innerAngle = outerAngle + Math.PI / 5;
    pts.push(`${cx + outerR * Math.cos(outerAngle)},${cy - outerR * Math.sin(outerAngle)}`);
    pts.push(`${cx + innerR * Math.cos(innerAngle)},${cy - innerR * Math.sin(innerAngle)}`);
  }
  return pts.join(' ');
}
