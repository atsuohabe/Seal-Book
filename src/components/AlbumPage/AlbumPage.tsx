import { useDroppable } from '@dnd-kit/core';
import type { AlbumPage as AlbumPageType } from '../../types';
import { DraggablePlacedSticker } from '../Sticker/DraggablePlacedSticker';
import styles from './AlbumPage.module.css';

interface AlbumPageProps {
  page: AlbumPageType;
  onRemoveSticker: (instanceId: string) => void;
  isTimeUp: boolean;
}

export function AlbumPage({ page, onRemoveSticker, isTimeUp }: AlbumPageProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'album-page',
    data: { type: 'album-page' },
  });

  return (
    <div
      ref={setNodeRef}
      className={styles.albumContainer}
      style={{
        backgroundColor: page.backgroundColor,
        outline: isOver ? '3px dashed rgba(78, 205, 196, 0.5)' : 'none',
      }}
    >
      <div className={styles.pageContent}>
        <div className={styles.pageLines} />

        {page.stickers.length === 0 && (
          <div className={styles.emptyHint}>
            シールをここにドラッグして<br />貼ってみよう!
          </div>
        )}

        {page.stickers.map((placed) => (
          <DraggablePlacedSticker
            key={placed.instanceId}
            placed={placed}
            onRemove={() => onRemoveSticker(placed.instanceId)}
            disabled={isTimeUp}
          />
        ))}

        <div className={styles.pageDecoration}>
          Page {page.id + 1}
        </div>
      </div>
    </div>
  );
}
