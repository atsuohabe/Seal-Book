import { useState, useEffect } from 'react';
import type { StickerDef } from '../../types';
import { StickerView } from '../Sticker/Sticker';
import styles from './GachaModal.module.css';

interface GachaModalProps {
  stickers: StickerDef[];
  onClose: () => void;
}

export function GachaModal({ stickers, onClose }: GachaModalProps) {
  const [phase, setPhase] = useState<'spin' | 'reveal'>('spin');

  useEffect(() => {
    const timer = setTimeout(() => setPhase('reveal'), 1300);
    return () => clearTimeout(timer);
  }, []);

  const rarityLabel = (r: string) => {
    if (r === 'super_rare') return { text: 'SR', cls: styles.badgeSuperRare };
    if (r === 'rare') return { text: 'R', cls: styles.badgeRare };
    return { text: 'N', cls: styles.badgeCommon };
  };

  return (
    <div className={styles.overlay} onClick={phase === 'reveal' ? onClose : undefined}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title}>
          {phase === 'spin' ? 'ガチャ回転中...' : 'シールゲット!'}
        </div>
        <div className={styles.subtitle}>
          {phase === 'reveal' && `${stickers.length}枚のシールを手に入れた!`}
        </div>

        {phase === 'spin' ? (
          <div className={styles.spinAnimation}>
            <div className={styles.capsule} />
          </div>
        ) : (
          <div className={styles.stickersGrid}>
            {stickers.map((sticker, i) => {
              const badge = rarityLabel(sticker.rarity);
              return (
                <div
                  key={sticker.id}
                  className={styles.stickerItem}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div
                    className={styles.stickerReveal}
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <StickerView sticker={sticker} isNew />
                  </div>
                  <span className={`${styles.rarityBadge} ${badge.cls}`}>{badge.text}</span>
                  <span className={styles.stickerName}>{sticker.name}</span>
                </div>
              );
            })}
          </div>
        )}

        {phase === 'reveal' && (
          <button className={styles.closeButton} onClick={onClose}>
            アルバムに戻る
          </button>
        )}
      </div>
    </div>
  );
}
