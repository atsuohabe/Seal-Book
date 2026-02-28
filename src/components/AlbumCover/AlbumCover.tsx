import type { CoverDesign } from '../../types';
import styles from './AlbumCover.module.css';

interface AlbumCoverProps {
  design: CoverDesign;
  onChangeDesign?: () => void;
  isThumbnail?: boolean;
}

export function AlbumCover({ design, onChangeDesign, isThumbnail }: AlbumCoverProps) {
  return (
    <div
      className={`${styles.cover} ${styles[design]} ${isThumbnail ? styles.thumbnail : ''}`}
      onClick={onChangeDesign}
      style={{ cursor: onChangeDesign ? 'pointer' : undefined }}
    >
      <svg viewBox="0 0 540 720" className={styles.coverSvg}>
        {design === 'pastel_flowers' && <PastelFlowersDesign />}
        {design === 'stars_ribbons' && <StarsRibbonsDesign />}
        {design === 'animal_friends' && <AnimalFriendsDesign />}
        {design === 'rainbow_dream' && <RainbowDreamDesign />}
        {/* Title */}
        <text x="270" y="320" textAnchor="middle" fontSize={isThumbnail ? "36" : "36"} fontWeight="bold" fill="#555" fontFamily="sans-serif">
          わたしの
        </text>
        <text x="270" y="370" textAnchor="middle" fontSize={isThumbnail ? "42" : "42"} fontWeight="bold" fill="#555" fontFamily="sans-serif">
          シールちょう
        </text>
      </svg>
      {!isThumbnail && (
        <div className={styles.tapHint}>タップでデザイン変更</div>
      )}
    </div>
  );
}

function PastelFlowersDesign() {
  const flowers = [
    { cx: 90, cy: 120, r: 24, color: '#FFB6C1' },
    { cx: 420, cy: 80, r: 20, color: '#DDA0DD' },
    { cx: 60, cy: 400, r: 18, color: '#FF9FF3' },
    { cx: 480, cy: 350, r: 22, color: '#FFB6C1' },
    { cx: 120, cy: 600, r: 26, color: '#DDA0DD' },
    { cx: 400, cy: 620, r: 20, color: '#FFB6C1' },
    { cx: 270, cy: 150, r: 16, color: '#E8C0E8' },
    { cx: 200, cy: 550, r: 14, color: '#FF9FF3' },
    { cx: 450, cy: 500, r: 18, color: '#DDA0DD' },
  ];
  return (
    <>
      <rect x="0" y="0" width="540" height="720" fill="#FFF0F5" />
      {flowers.map((f, i) => (
        <g key={i}>
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse
              key={angle}
              cx={f.cx + f.r * 0.7 * Math.cos((angle * Math.PI) / 180)}
              cy={f.cy + f.r * 0.7 * Math.sin((angle * Math.PI) / 180)}
              rx={f.r * 0.5}
              ry={f.r * 0.35}
              fill={f.color}
              opacity="0.6"
              transform={`rotate(${angle} ${f.cx + f.r * 0.7 * Math.cos((angle * Math.PI) / 180)} ${f.cy + f.r * 0.7 * Math.sin((angle * Math.PI) / 180)})`}
            />
          ))}
          <circle cx={f.cx} cy={f.cy} r={f.r * 0.25} fill="#FFE66D" opacity="0.8" />
        </g>
      ))}
      {/* Decorative frame */}
      <rect x="40" y="260" width="460" height="160" rx="16" fill="rgba(255,255,255,0.6)" />
    </>
  );
}

function StarsRibbonsDesign() {
  const stars = [
    { cx: 80, cy: 100, s: 18 },
    { cx: 460, cy: 90, s: 22 },
    { cx: 120, cy: 250, s: 14 },
    { cx: 420, cy: 240, s: 16 },
    { cx: 70, cy: 580, s: 20 },
    { cx: 470, cy: 600, s: 18 },
    { cx: 200, cy: 650, s: 12 },
    { cx: 350, cy: 660, s: 14 },
  ];
  return (
    <>
      <rect x="0" y="0" width="540" height="720" fill="#FFFDE6" />
      {/* Stars */}
      {stars.map((st, i) => (
        <polygon
          key={i}
          points={starPoints(st.cx, st.cy, st.s, st.s * 0.4)}
          fill="#FFD700"
          opacity="0.5"
        />
      ))}
      {/* Sparkle dots */}
      {[
        [160, 140], [380, 180], [100, 450], [440, 430],
        [250, 100], [300, 620], [150, 500],
      ].map(([x, y], i) => (
        <circle key={`d${i}`} cx={x} cy={y} r="3" fill="#FFD700" opacity="0.4" />
      ))}
      {/* Ribbons */}
      <path d="M0 200 Q270 170 540 200 Q270 230 0 200Z" fill="#FFB6C1" opacity="0.25" />
      <path d="M0 520 Q270 490 540 520 Q270 550 0 520Z" fill="#A29BFE" opacity="0.2" />
      {/* Title area */}
      <rect x="40" y="260" width="460" height="160" rx="16" fill="rgba(255,255,255,0.65)" />
    </>
  );
}

function AnimalFriendsDesign() {
  return (
    <>
      <rect x="0" y="0" width="540" height="720" fill="#F0FFF0" />
      {/* Cat peeking from top-left */}
      <g transform="translate(40, 60)">
        <circle cx="50" cy="50" r="40" fill="#FFB6C1" opacity="0.7" />
        <polygon points="20,20 14,4 32,16" fill="#FFB6C1" opacity="0.7" />
        <polygon points="80,20 86,4 68,16" fill="#FFB6C1" opacity="0.7" />
        <circle cx="38" cy="45" r="5" fill="#333" opacity="0.6" />
        <circle cx="62" cy="45" r="5" fill="#333" opacity="0.6" />
        <circle cx="40" cy="43" r="2" fill="#FFF" opacity="0.8" />
        <circle cx="64" cy="43" r="2" fill="#FFF" opacity="0.8" />
        <polygon points="50,52 48,56 52,56" fill="#FFB6C1" />
      </g>
      {/* Bunny peeking from top-right */}
      <g transform="translate(400, 50)">
        <circle cx="50" cy="55" r="38" fill="#DDA0DD" opacity="0.7" />
        <ellipse cx="36" cy="16" rx="8" ry="22" fill="#DDA0DD" opacity="0.7" />
        <ellipse cx="64" cy="16" rx="8" ry="22" fill="#DDA0DD" opacity="0.7" />
        <ellipse cx="36" cy="16" rx="5" ry="16" fill="#E8C0E8" opacity="0.5" />
        <ellipse cx="64" cy="16" rx="5" ry="16" fill="#E8C0E8" opacity="0.5" />
        <circle cx="38" cy="50" r="4.5" fill="#333" opacity="0.6" />
        <circle cx="62" cy="50" r="4.5" fill="#333" opacity="0.6" />
      </g>
      {/* Bear peeking from bottom */}
      <g transform="translate(200, 570)">
        <circle cx="70" cy="60" r="50" fill="#DEB887" opacity="0.6" />
        <circle cx="30" cy="24" r="18" fill="#DEB887" opacity="0.6" />
        <circle cx="110" cy="24" r="18" fill="#DEB887" opacity="0.6" />
        <circle cx="30" cy="24" r="10" fill="#C4A06A" opacity="0.4" />
        <circle cx="110" cy="24" r="10" fill="#C4A06A" opacity="0.4" />
        <circle cx="54" cy="52" r="5" fill="#333" opacity="0.5" />
        <circle cx="86" cy="52" r="5" fill="#333" opacity="0.5" />
        <ellipse cx="70" cy="64" rx="5" ry="4" fill="#333" opacity="0.5" />
      </g>
      {/* Scattered paw prints */}
      {[[180, 200], [360, 180], [100, 480], [440, 500]].map(([x, y], i) => (
        <g key={i} opacity="0.15">
          <circle cx={x} cy={y} r="6" fill="#333" />
          <circle cx={x - 6} cy={y - 8} r="3" fill="#333" />
          <circle cx={x + 6} cy={y - 8} r="3" fill="#333" />
          <circle cx={x - 9} cy={y - 2} r="3" fill="#333" />
          <circle cx={x + 9} cy={y - 2} r="3" fill="#333" />
        </g>
      ))}
      {/* Title area */}
      <rect x="40" y="260" width="460" height="160" rx="16" fill="rgba(255,255,255,0.65)" />
    </>
  );
}

function RainbowDreamDesign() {
  return (
    <>
      <rect x="0" y="0" width="540" height="720" fill="#F0F8FF" />
      {/* Rainbow */}
      <path d="M40 300 A230 230 0 0 1 500 300" fill="none" stroke="#FF6B6B" strokeWidth="20" opacity="0.5" />
      <path d="M60 300 A210 210 0 0 1 480 300" fill="none" stroke="#FF9F43" strokeWidth="20" opacity="0.5" />
      <path d="M80 300 A190 190 0 0 1 460 300" fill="none" stroke="#FFE66D" strokeWidth="20" opacity="0.5" />
      <path d="M100 300 A170 170 0 0 1 440 300" fill="none" stroke="#95E86B" strokeWidth="20" opacity="0.5" />
      <path d="M120 300 A150 150 0 0 1 420 300" fill="none" stroke="#74B9FF" strokeWidth="20" opacity="0.5" />
      <path d="M140 300 A130 130 0 0 1 400 300" fill="none" stroke="#A29BFE" strokeWidth="20" opacity="0.5" />
      {/* Clouds */}
      <g opacity="0.7">
        <circle cx="60" cy="300" r="30" fill="#FFF" />
        <circle cx="90" cy="290" r="25" fill="#FFF" />
        <circle cx="40" cy="295" r="20" fill="#FFF" />
        <circle cx="480" cy="300" r="30" fill="#FFF" />
        <circle cx="450" cy="290" r="25" fill="#FFF" />
        <circle cx="500" cy="295" r="20" fill="#FFF" />
      </g>
      {/* Small clouds elsewhere */}
      <g opacity="0.4">
        <circle cx="120" cy="550" r="20" fill="#FFF" />
        <circle cx="145" cy="540" r="16" fill="#FFF" />
        <circle cx="400" cy="580" r="18" fill="#FFF" />
        <circle cx="420" cy="572" r="14" fill="#FFF" />
      </g>
      {/* Stars */}
      {[[180, 120], [360, 100], [270, 80], [450, 160], [90, 150]].map(([x, y], i) => (
        <polygon
          key={i}
          points={starPoints(x, y, 8, 3)}
          fill="#FFD700"
          opacity="0.35"
        />
      ))}
      {/* Title area */}
      <rect x="40" y="310" width="460" height="160" rx="16" fill="rgba(255,255,255,0.65)" />
    </>
  );
}

function starPoints(cx: number, cy: number, outerR: number, innerR: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 5; i++) {
    const outerAngle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const innerAngle = outerAngle + Math.PI / 5;
    pts.push(`${cx + outerR * Math.cos(outerAngle)},${cy + outerR * Math.sin(outerAngle)}`);
    pts.push(`${cx + innerR * Math.cos(innerAngle)},${cy + innerR * Math.sin(innerAngle)}`);
  }
  return pts.join(' ');
}
