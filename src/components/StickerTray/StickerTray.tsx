import { useDraggable } from '@dnd-kit/core';
import type { StickerDef } from '../../types';
import { StickerView } from '../Sticker/Sticker';
import styles from './StickerTray.module.css';

interface StickerTrayProps {
  inventory: StickerDef[];
  canGacha: boolean;
  onGacha: () => void;
  isTimeUp: boolean;
}

export function StickerTray({ inventory, canGacha, onGacha, isTimeUp }: StickerTrayProps) {
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
        <DraggableTraySticker
          key={`${sticker.id}-${index}`}
          sticker={sticker}
          index={index}
          disabled={isTimeUp}
        />
      ))}
    </div>
  );
}

function DraggableTraySticker({
  sticker,
  index,
  disabled,
}: {
  sticker: StickerDef;
  index: number;
  disabled: boolean;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `tray-${sticker.id}-${index}`,
    data: {
      source: 'tray',
      sticker,
      index,
    },
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={styles.draggableSticker}
      style={{ opacity: isDragging ? 0.3 : 1 }}
    >
      <StickerView sticker={sticker} />
    </div>
  );
}
