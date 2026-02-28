import { useState, useCallback, useRef } from 'react';
import type { StickerDef } from './types';
import { useGameState } from './hooks/useGameState';
import { useTimer } from './hooks/useTimer';
import { rollGacha } from './utils/gacha';
import { getTodayDateString } from './utils/dateUtils';
import { AlbumPage } from './components/AlbumPage/AlbumPage';
import { StickerTray } from './components/StickerTray/StickerTray';
import { StickerView } from './components/Sticker/Sticker';
import { PageNavigator } from './components/PageNavigator/PageNavigator';
import { Timer } from './components/Timer/Timer';
import { GachaModal } from './components/GachaModal/GachaModal';
import styles from './App.module.css';

export interface DragInfo {
  sticker: StickerDef;
  source: 'tray' | 'page';
  instanceId?: string;
  currentX: number;
  currentY: number;
}

export default function App() {
  const {
    state,
    currentPage,
    canGacha,
    nextPage,
    prevPage,
    addPage,
    placeSticker,
    moveSticker,
    removeSticker,
    addToInventory,
    setLastGachaDate,
    updatePlayTime,
  } = useGameState();

  const { remainingMinutes, remainingSeconds, isTimeUp, start, isRunning } = useTimer(
    state.todayPlayTimeMs,
    updatePlayTime
  );

  const [drag, setDrag] = useState<DragInfo | null>(null);
  const [gachaStickers, setGachaStickers] = useState<StickerDef[] | null>(null);
  const albumRef = useRef<HTMLDivElement>(null);

  const ensureTimerStarted = useCallback(() => {
    if (!isRunning && !isTimeUp) start();
  }, [isRunning, isTimeUp, start]);

  const handlePointerDown = useCallback((
    e: React.PointerEvent,
    sticker: StickerDef,
    source: 'tray' | 'page',
    instanceId?: string,
  ) => {
    if (isTimeUp) return;
    ensureTimerStarted();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setDrag({ sticker, source, instanceId, currentX: e.clientX, currentY: e.clientY });
  }, [isTimeUp, ensureTimerStarted]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!drag) return;
    setDrag(prev => prev ? { ...prev, currentX: e.clientX, currentY: e.clientY } : null);
  }, [drag]);

  const handlePointerUp = useCallback(() => {
    if (!drag || !albumRef.current) {
      setDrag(null);
      return;
    }
    const rect = albumRef.current.getBoundingClientRect();
    const { currentX, currentY } = drag;

    if (currentX >= rect.left && currentX <= rect.right &&
        currentY >= rect.top && currentY <= rect.bottom) {
      const xPct = Math.max(5, Math.min(95, ((currentX - rect.left) / rect.width) * 100));
      const yPct = Math.max(5, Math.min(95, ((currentY - rect.top) / rect.height) * 100));

      if (drag.source === 'tray') {
        placeSticker(drag.sticker, xPct, yPct);
      } else if (drag.source === 'page' && drag.instanceId) {
        moveSticker(drag.instanceId, xPct, yPct);
      }
    }
    setDrag(null);
  }, [drag, placeSticker, moveSticker]);

  const handleGacha = useCallback(() => {
    ensureTimerStarted();
    const today = getTodayDateString();
    const stickers = rollGacha(today, state.gachaCount);
    setGachaStickers(stickers);
    addToInventory(stickers);
    setLastGachaDate(today);
  }, [ensureTimerStarted, state.gachaCount, addToInventory, setLastGachaDate]);

  return (
    <div
      className={styles.app}
      onClick={ensureTimerStarted}
      onPointerMove={drag ? handlePointerMove : undefined}
      onPointerUp={drag ? handlePointerUp : undefined}
      onPointerCancel={drag ? () => setDrag(null) : undefined}
      style={{ touchAction: drag ? 'none' : undefined }}
    >
      <header className={styles.header}>
        <div className={styles.title}>シールちょう</div>
        <Timer
          remainingMinutes={remainingMinutes}
          remainingSeconds={remainingSeconds}
          isTimeUp={isTimeUp}
        />
      </header>

      <div className={styles.albumArea}>
        <AlbumPage
          ref={albumRef}
          page={currentPage}
          onRemoveSticker={removeSticker}
          onPointerDown={handlePointerDown}
          isTimeUp={isTimeUp}
        />
        <PageNavigator
          currentIndex={state.currentPageIndex}
          totalPages={state.pages.length}
          onPrev={prevPage}
          onNext={nextPage}
          onAddPage={addPage}
        />
      </div>

      <div className={styles.footer}>
        <div className={styles.inventoryCount}>
          もちもの: {state.inventory.length}枚
        </div>
        <StickerTray
          inventory={state.inventory}
          canGacha={canGacha}
          onGacha={handleGacha}
          onPointerDown={handlePointerDown}
          isTimeUp={isTimeUp}
        />
      </div>

      {drag && (
        <div style={{
          position: 'fixed',
          left: drag.currentX,
          top: drag.currentY,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0.85,
        }}>
          <StickerView sticker={drag.sticker} />
        </div>
      )}

      {gachaStickers && (
        <GachaModal stickers={gachaStickers} onClose={() => setGachaStickers(null)} />
      )}
    </div>
  );
}
