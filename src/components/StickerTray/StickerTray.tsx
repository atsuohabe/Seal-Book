import type { StickerDef } from '../../types';
import { StickerView } from '../Sticker/Sticker';
import styles from './StickerTray.module.css';

interface StickerTrayProps {
  inventory: StickerDef[];
  canGacha: boolean;
  onGacha: () => void;
  onPointerDown: (
    e: React.PointerEvent,
    sticker: StickerDef,
    source: 'tray' | 'page',
    instanceId?: string,
  ) => void;
  isTimeUp: boolean;
}

export function StickerTray({ inventory, canGacha, onGacha, onPointerDown, isTimeUp }: StickerTrayProps) {
  return (
    <div className={styles.tray}>
      <button
        className={styles.gachaButton}
        onClick={onGacha}
        disabled={!canGacha || isTimeUp}
      >
        {canGacha ? 'ガチャ\nを回す' : '明日\nまた来てね'}
      </button>

      {inventory.length === 0 && !canGacha && (
        <div className={styles.emptyTray}>
          シールがありません
        </div>
      )}

      {inventory.map((sticker, index) => (
        <div
          key={`${sticker.id}-${index}`}
          className={styles.draggableSticker}
          onPointerDown={(e) => {
            if (!isTimeUp) onPointerDown(e, sticker, 'tray');
          }}
          style={{ touchAction: 'none' }}
        >
          <StickerView sticker={sticker} />
        </div>
      ))}
    </div>
  );
}
