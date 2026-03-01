import { useState, useCallback, useRef } from 'react';
import type { StickerDef, CoverDesign } from './types';
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
import { StickerActionMenu } from './components/StickerActionMenu/StickerActionMenu';
import { AlbumCover } from './components/AlbumCover/AlbumCover';
import { CoverPicker } from './components/CoverPicker/CoverPicker';
import { PageOverview } from './components/PageOverview/PageOverview';
import { FullscreenViewer } from './components/FullscreenViewer/FullscreenViewer';
import styles from './App.module.css';

export interface DragInfo {
  sticker: StickerDef;
  source: 'tray' | 'page';
  instanceId?: string;
  currentX: number;
  currentY: number;
  startX: number;
  startY: number;
  startTime: number;
  hasMoved: boolean;
}

interface StickerMenuInfo {
  instanceId: string;
  x: number;
  y: number;
}

export default function App() {
  const {
    state,
    currentPage,
    canGacha,
    goToPage,
    nextPage,
    prevPage,
    addPage,
    placeSticker,
    moveSticker,
    removeSticker,
    addToInventory,
    setLastGachaDate,
    updatePlayTime,
    setCoverDesign,
    setCoverTitle,
    nameSticker,
  } = useGameState();

  const { remainingMinutes, remainingSeconds, isTimeUp, start, isRunning } = useTimer(
    state.todayPlayTimeMs,
    updatePlayTime
  );

  const [drag, setDrag] = useState<DragInfo | null>(null);
  const [gachaStickers, setGachaStickers] = useState<StickerDef[] | null>(null);
  const [stickerMenu, setStickerMenu] = useState<StickerMenuInfo | null>(null);
  const [showingCover, setShowingCover] = useState(true);
  const [showCoverPicker, setShowCoverPicker] = useState(false);
  const [viewMode, setViewMode] = useState<'single' | 'overview'>('single');
  const [isFullscreen, setIsFullscreen] = useState(false);
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
    setStickerMenu(null);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setDrag({
      sticker, source, instanceId,
      currentX: e.clientX, currentY: e.clientY,
      startX: e.clientX, startY: e.clientY,
      startTime: Date.now(), hasMoved: false,
    });
  }, [isTimeUp, ensureTimerStarted]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!drag) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    const hasMoved = drag.hasMoved || Math.sqrt(dx * dx + dy * dy) > 5;
    setDrag(prev => prev ? { ...prev, currentX: e.clientX, currentY: e.clientY, hasMoved } : null);
  }, [drag]);

  const handlePointerUp = useCallback(() => {
    if (!drag) {
      setDrag(null);
      return;
    }

    // Detect tap on a placed sticker (no movement, short duration)
    if (drag.source === 'page' && drag.instanceId && !drag.hasMoved) {
      const elapsed = Date.now() - drag.startTime;
      if (elapsed < 300) {
        setStickerMenu({
          instanceId: drag.instanceId,
          x: drag.currentX,
          y: drag.currentY,
        });
        setDrag(null);
        return;
      }
    }

    if (!albumRef.current) {
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
    const stickers = rollGacha(today, state.gachaCount, state.namedCharacters);
    setGachaStickers(stickers);
    addToInventory(stickers);
    setLastGachaDate(today);
  }, [ensureTimerStarted, state.gachaCount, state.namedCharacters, addToInventory, setLastGachaDate]);

  const handlePrev = useCallback(() => {
    setStickerMenu(null);
    if (showingCover) return;
    if (state.currentPageIndex === 0) {
      setShowingCover(true);
    } else {
      prevPage();
    }
  }, [showingCover, state.currentPageIndex, prevPage]);

  const handleNext = useCallback(() => {
    setStickerMenu(null);
    if (showingCover) {
      setShowingCover(false);
      goToPage(0);
    } else {
      nextPage();
    }
  }, [showingCover, goToPage, nextPage]);

  const handleSelectPage = useCallback((index: number) => {
    if (index === -1) {
      setShowingCover(true);
    } else {
      setShowingCover(false);
      goToPage(index);
    }
    setViewMode('single');
    setStickerMenu(null);
  }, [goToPage]);

  const toggleOverview = useCallback(() => {
    setViewMode(prev => prev === 'single' ? 'overview' : 'single');
    setStickerMenu(null);
  }, []);

  const handleFullscreen = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const handleCoverDesignSelect = useCallback((design: CoverDesign) => {
    setCoverDesign(design);
    setShowCoverPicker(false);
  }, [setCoverDesign]);

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
        {viewMode === 'overview' ? (
          <PageOverview
            pages={state.pages}
            currentPageIndex={state.currentPageIndex}
            showingCover={showingCover}
            coverDesign={state.coverDesign}
            coverTitle={state.coverTitle}
            onSelectPage={handleSelectPage}
            onPointerDown={handlePointerDown}
            isTimeUp={isTimeUp}
          />
        ) : showingCover ? (
          <AlbumCover
            design={state.coverDesign}
            title={state.coverTitle}
            onChangeDesign={() => setShowCoverPicker(true)}
            onChangeTitle={setCoverTitle}
          />
        ) : (
          <AlbumPage
            ref={albumRef}
            page={currentPage}
            onPointerDown={handlePointerDown}
            isTimeUp={isTimeUp}
          />
        )}
        <PageNavigator
          currentIndex={state.currentPageIndex}
          totalPages={state.pages.length}
          showingCover={showingCover}
          isOverview={viewMode === 'overview'}
          onPrev={handlePrev}
          onNext={handleNext}
          onAddPage={addPage}
          onToggleOverview={toggleOverview}
          onFullscreen={handleFullscreen}
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

      {stickerMenu && (
        <StickerActionMenu
          x={stickerMenu.x}
          y={stickerMenu.y}
          currentName={currentPage.stickers.find(s => s.instanceId === stickerMenu.instanceId)?.sticker.customName}
          onRemove={() => {
            removeSticker(stickerMenu.instanceId);
            setStickerMenu(null);
          }}
          onName={(name) => {
            nameSticker(stickerMenu.instanceId, name);
            setStickerMenu(null);
          }}
          onClose={() => setStickerMenu(null)}
        />
      )}

      {showCoverPicker && (
        <CoverPicker
          currentDesign={state.coverDesign}
          onSelect={handleCoverDesignSelect}
          onClose={() => setShowCoverPicker(false)}
        />
      )}

      {gachaStickers && (
        <GachaModal stickers={gachaStickers} onClose={() => setGachaStickers(null)} />
      )}

      {isFullscreen && (
        <FullscreenViewer
          pages={state.pages}
          currentPageIndex={state.currentPageIndex}
          showingCover={showingCover}
          coverDesign={state.coverDesign}
          coverTitle={state.coverTitle}
          onClose={() => setIsFullscreen(false)}
        />
      )}
    </div>
  );
}
