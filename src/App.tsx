import { useState, useCallback, useRef } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
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

  const [activeDragSticker, setActiveDragSticker] = useState<StickerDef | null>(null);
  const [gachaStickers, setGachaStickers] = useState<StickerDef[] | null>(null);
  const albumRef = useRef<HTMLDivElement>(null);

  // Start timer on first interaction
  const ensureTimerStarted = useCallback(() => {
    if (!isRunning && !isTimeUp) {
      start();
    }
  }, [isRunning, isTimeUp, start]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    ensureTimerStarted();
    const data = event.active.data.current;
    if (data?.sticker) {
      setActiveDragSticker(data.sticker as StickerDef);
    }
  }, [ensureTimerStarted]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveDragSticker(null);
    const { active, over } = event;
    if (!over) return;

    const data = active.data.current;
    if (!data) return;

    // Only drop on album page
    if (over.data.current?.type !== 'album-page') return;

    // Get drop position relative to album container
    const rect = over.rect;
    const activatorEvent = event.activatorEvent;

    let dropX: number;
    let dropY: number;
    if (activatorEvent instanceof MouseEvent || activatorEvent instanceof PointerEvent) {
      dropX = activatorEvent.clientX + (event.delta?.x || 0);
      dropY = activatorEvent.clientY + (event.delta?.y || 0);
    } else if (activatorEvent instanceof TouchEvent && activatorEvent.touches.length > 0) {
      dropX = activatorEvent.touches[0].clientX + (event.delta?.x || 0);
      dropY = activatorEvent.touches[0].clientY + (event.delta?.y || 0);
    } else {
      dropX = rect.left + rect.width / 2;
      dropY = rect.top + rect.height / 2;
    }

    const xPercent = Math.max(5, Math.min(95, ((dropX - rect.left) / rect.width) * 100));
    const yPercent = Math.max(5, Math.min(95, ((dropY - rect.top) / rect.height) * 100));

    if (data.source === 'tray') {
      placeSticker(data.sticker as StickerDef, xPercent, yPercent);
    } else if (data.source === 'page' && data.instanceId) {
      moveSticker(data.instanceId as string, xPercent, yPercent);
    }
  }, [placeSticker, moveSticker]);

  const handleGacha = useCallback(() => {
    ensureTimerStarted();
    const today = getTodayDateString();
    const stickers = rollGacha(today, state.gachaCount);
    setGachaStickers(stickers);
    addToInventory(stickers);
    setLastGachaDate(today);
  }, [ensureTimerStarted, state.gachaCount, addToInventory, setLastGachaDate]);

  const handleGachaClose = useCallback(() => {
    setGachaStickers(null);
  }, []);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={styles.app} onClick={ensureTimerStarted}>
        <header className={styles.header}>
          <div className={styles.title}>シールちょう</div>
          <Timer
            remainingMinutes={remainingMinutes}
            remainingSeconds={remainingSeconds}
            isTimeUp={isTimeUp}
          />
        </header>

        <div className={styles.albumArea} ref={albumRef}>
          <AlbumPage
            page={currentPage}
            onRemoveSticker={removeSticker}
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
            isTimeUp={isTimeUp}
          />
        </div>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeDragSticker && (
          <StickerView sticker={activeDragSticker} />
        )}
      </DragOverlay>

      {gachaStickers && (
        <GachaModal stickers={gachaStickers} onClose={handleGachaClose} />
      )}
    </DndContext>
  );
}
