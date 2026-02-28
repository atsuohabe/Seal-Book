import { useDraggable } from '@dnd-kit/core';
import type { PlacedSticker } from '../../types';
import { StickerView } from './Sticker';
import styles from './Sticker.module.css';

interface Props {
  placed: PlacedSticker;
  onRemove: () => void;
  disabled: boolean;
}

export function DraggablePlacedSticker({ placed, onRemove, disabled }: Props) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `placed-${placed.instanceId}`,
    data: {
      source: 'page',
      instanceId: placed.instanceId,
      sticker: placed.sticker,
    },
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={styles.placed}
      style={{
        left: `${placed.x}%`,
        top: `${placed.y}%`,
        transform: `translate(-50%, -50%) rotate(${placed.rotation}deg) scale(${placed.scale})`,
        zIndex: placed.zIndex,
        opacity: isDragging ? 0.3 : 1,
      }}
    >
      <StickerView
        sticker={placed.sticker}
        className={isDragging ? styles.dragging : ''}
        onDoubleClick={disabled ? undefined : onRemove}
      />
    </div>
  );
}
