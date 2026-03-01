import type { Pattern } from '../../types';

interface PatternOverlayProps {
  pattern: Pattern;
  color: string;
  stickerId: string;
}

export function PatternOverlay({ pattern, color, stickerId }: PatternOverlayProps) {
  if (pattern === 'none') return null;
  return (
    <>
      {pattern === 'dots' && <DotsPattern color={color} />}
      {pattern === 'stripes' && <StripesPattern color={color} />}
      {pattern === 'stars' && <StarsPattern color={color} />}
      {pattern === 'sparkle' && <SparklePattern color={color} />}
      {pattern === 'gradient' && <GradientPattern color={color} stickerId={stickerId} />}
      {pattern === 'hearts' && <HeartsPattern color={color} />}
      {pattern === 'confetti' && <ConfettiPattern color={color} />}
      {pattern === 'rainbow' && <RainbowPattern stickerId={stickerId} />}
    </>
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

function GradientPattern({ color, stickerId }: { color: string; stickerId: string }) {
  const id = `pat-grad-${stickerId}`;
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="64" height="64" fill={`url(#${id})`} />
    </>
  );
}

function HeartsPattern({ color }: { color: string }) {
  const positions = [[16, 16], [40, 12], [28, 32], [48, 40], [12, 46]];
  return (
    <>
      {positions.map(([cx, cy], i) => (
        <path
          key={i}
          d={`M${cx} ${cy + 1} C${cx} ${cy - 1} ${cx - 3} ${cy - 3} ${cx - 3} ${cy - 1} C${cx - 3} ${cy + 1} ${cx} ${cy + 4} ${cx} ${cy + 4} C${cx} ${cy + 4} ${cx + 3} ${cy + 1} ${cx + 3} ${cy - 1} C${cx + 3} ${cy - 3} ${cx} ${cy - 1} ${cx} ${cy + 1}Z`}
          fill={color}
          opacity="0.35"
        />
      ))}
    </>
  );
}

function ConfettiPattern({ color }: { color: string }) {
  const pieces = [
    { x: 14, y: 14, r: 30 },
    { x: 38, y: 10, r: -20 },
    { x: 50, y: 28, r: 45 },
    { x: 22, y: 40, r: -35 },
    { x: 44, y: 48, r: 15 },
    { x: 10, y: 30, r: 60 },
    { x: 52, y: 50, r: -10 },
  ];
  return (
    <>
      {pieces.map(({ x, y, r }, i) => (
        <rect
          key={i}
          x={x - 2}
          y={y - 1}
          width="4"
          height="2"
          rx="0.5"
          fill={color}
          opacity={0.25 + (i % 3) * 0.1}
          transform={`rotate(${r} ${x} ${y})`}
        />
      ))}
    </>
  );
}

function RainbowPattern({ stickerId }: { stickerId: string }) {
  const id = `pat-rainbow-${stickerId}`;
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.25" />
          <stop offset="25%" stopColor="#FFE66D" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#95E86B" stopOpacity="0.25" />
          <stop offset="75%" stopColor="#74B9FF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#A29BFE" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="64" height="64" fill={`url(#${id})`} />
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
