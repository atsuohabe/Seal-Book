import { forwardRef } from 'react';
import type { AlbumPage as AlbumPageType, StickerDef } from '../../types';
import { StickerView } from '../Sticker/Sticker';
import styles from './AlbumPage.module.css';

interface AlbumPageProps {
  page: AlbumPageType;
  onRemoveSticker: (instanceId: string) => void;
  onPointerDown: (
    e: React.PointerEvent,
    sticker: StickerDef,
    source: 'tray' | 'page',
    instanceId?: string,
  ) => void;
  isTimeUp: boolean;
}

export const AlbumPage = forwardRef<HTMLDivElement, AlbumPageProps>(
  function AlbumPage({ page, onRemoveSticker, onPointerDown, isTimeUp }, ref) {
    return (
      <div
        ref={ref}
        className={styles.albumContainer}
        style={{ backgroundColor: page.backgroundColor }}
      >
        <div className={styles.pageContent}>
          <div className={styles.pageLines} />

          {page.stickers.length === 0 && (
            <div className={styles.emptyHint}>
              シールをここにドラッグして<br />貼ってみよう!
            </div>
          )}

          {page.stickers.map((placed) => (
            <div
              key={placed.instanceId}
              className={styles.placedSticker}
              style={{
                left: `${placed.x}%`,
                top: `${placed.y}%`,
                transform: `translate(-50%, -50%) rotate(${placed.rotation}deg) scale(${placed.scale})`,
                zIndex: placed.zIndex,
              }}
              onPointerDown={(e) => {
                if (!isTimeUp) {
                  e.stopPropagation();
                  onPointerDown(e, placed.sticker, 'page', placed.instanceId);
                }
              }}
              onDoubleClick={() => {
                if (!isTimeUp) onRemoveSticker(placed.instanceId);
              }}
            >
              <StickerView sticker={placed.sticker} />
            </div>
          ))}

          <div className={styles.pageDecoration}>
            Page {page.id + 1}
          </div>
        </div>
      </div>
    );
  }
);
