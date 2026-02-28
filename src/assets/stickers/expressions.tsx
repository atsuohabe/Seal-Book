import type { Expression } from '../../types';

interface ExpressionOverlayProps {
  expression: Expression;
  size: number;
}

export function ExpressionOverlay({ expression, size }: ExpressionOverlayProps) {
  if (expression === 'none') return null;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    >
      {expression === 'smile' && <SmileExpression />}
      {expression === 'wink' && <WinkExpression />}
      {expression === 'heart_eyes' && <HeartEyesExpression />}
      {expression === 'sleepy' && <SleepyExpression />}
    </svg>
  );
}

function SmileExpression() {
  return (
    <g>
      {/* Eyes */}
      <ellipse cx="24" cy="28" rx="3" ry="3.5" fill="#333" />
      <ellipse cx="40" cy="28" rx="3" ry="3.5" fill="#333" />
      {/* Eye highlights */}
      <circle cx="25" cy="27" r="1.2" fill="#FFF" />
      <circle cx="41" cy="27" r="1.2" fill="#FFF" />
      {/* Cheeks */}
      <ellipse cx="18" cy="36" rx="4" ry="2.5" fill="#FF9999" opacity="0.4" />
      <ellipse cx="46" cy="36" rx="4" ry="2.5" fill="#FF9999" opacity="0.4" />
      {/* Mouth */}
      <path d="M26 36 Q32 42 38 36" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

function WinkExpression() {
  return (
    <g>
      {/* Left eye (open) */}
      <ellipse cx="24" cy="28" rx="3" ry="3.5" fill="#333" />
      <circle cx="25" cy="27" r="1.2" fill="#FFF" />
      {/* Right eye (winking) */}
      <path d="M37 28 Q40 25 43 28" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      {/* Cheeks */}
      <ellipse cx="18" cy="36" rx="4" ry="2.5" fill="#FF9999" opacity="0.4" />
      <ellipse cx="46" cy="36" rx="4" ry="2.5" fill="#FF9999" opacity="0.4" />
      {/* Mouth */}
      <path d="M28 36 Q32 40 36 36" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
      {/* Sparkle near wink */}
      <g transform="translate(48, 24)" opacity="0.7">
        <line x1="-2" y1="0" x2="2" y2="0" stroke="#FFD700" strokeWidth="1" />
        <line x1="0" y1="-2" x2="0" y2="2" stroke="#FFD700" strokeWidth="1" />
      </g>
    </g>
  );
}

function HeartEyesExpression() {
  return (
    <g>
      {/* Heart eyes */}
      <path d="M24 26 C24 24 22 22 20 24 C18 22 16 24 16 26 C16 30 24 32 24 32 C24 32 32 30 32 26 C32 24 30 22 28 24 C26 22 24 24 24 26Z"
        fill="#FF6B6B" transform="translate(4, -2) scale(0.7)" />
      <path d="M24 26 C24 24 22 22 20 24 C18 22 16 24 16 26 C16 30 24 32 24 32 C24 32 32 30 32 26 C32 24 30 22 28 24 C26 22 24 24 24 26Z"
        fill="#FF6B6B" transform="translate(24, -2) scale(0.7)" />
      {/* Cheeks */}
      <ellipse cx="18" cy="36" rx="4" ry="2.5" fill="#FF9999" opacity="0.5" />
      <ellipse cx="46" cy="36" rx="4" ry="2.5" fill="#FF9999" opacity="0.5" />
      {/* Mouth */}
      <path d="M26 37 Q32 43 38 37" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

function SleepyExpression() {
  return (
    <g>
      {/* Closed eyes */}
      <path d="M20 28 Q24 31 28 28" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 28 Q40 31 44 28" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      {/* Cheeks */}
      <ellipse cx="18" cy="34" rx="4" ry="2.5" fill="#FF9999" opacity="0.35" />
      <ellipse cx="46" cy="34" rx="4" ry="2.5" fill="#FF9999" opacity="0.35" />
      {/* Mouth (small o) */}
      <ellipse cx="32" cy="38" rx="3" ry="2.5" fill="#333" opacity="0.6" />
      {/* Zzz */}
      <text x="48" y="18" fontSize="8" fill="#A29BFE" fontWeight="bold" opacity="0.6">z</text>
      <text x="52" y="12" fontSize="6" fill="#A29BFE" fontWeight="bold" opacity="0.4">z</text>
    </g>
  );
}
