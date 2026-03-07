import { useState, useCallback, useRef, useEffect } from 'react';
import type { StickerDef, CoverDesign, UserProfile, GameState } from './types';
import { useGameState, createInitialState } from './hooks/useGameState';
import { useTimer } from './hooks/useTimer';
import { rollGacha } from './utils/gacha';
import { getTodayDateString } from './utils/dateUtils';
import {
  loadProfiles, saveProfiles,
  getActiveProfileName, setActiveProfileName,
  loadProfileState, saveProfileState, deleteProfileData,
  migrateLegacyData,
} from './utils/storage';
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
import { ProfileSelector } from './components/ProfileSelector/ProfileSelector';
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

// ── Game content (per-profile, remounted on profile switch via key prop) ───

interface GameContentProps {
  profileName: string;
  onOpenProfileSelector: () => void;
}

function GameContent({ profileName, onOpenProfileSelector }: GameContentProps) {
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
  } = useGameState(profileName);

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
        <button className={styles.profileButton} onClick={onOpenProfileSelector} title="ユーザーをきりかえる">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </button>
        <div className={styles.title}>{profileName}のシールちょう</div>
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
          onFullscreen={() => setIsFullscreen(true)}
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

// ── First-launch screen ────────────────────────────────────────────────────

function FirstLaunchScreen({ onCreate }: { onCreate: (name: string) => void }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {
    const trimmed = name.trim();
    if (!trimmed) { setError('なまえをにゅうりょくしてください'); return; }
    onCreate(trimmed);
  }

  return (
    <div className={styles.firstLaunch}>
      <div className={styles.firstLaunchCard}>
        <div className={styles.firstLaunchTitle}>🌟 シールちょうへようこそ！</div>
        <div className={styles.firstLaunchSubtitle}>あなたのなまえをおしえてください</div>
        <input
          className={`${styles.firstLaunchInput} ${error ? styles.firstLaunchInputError : ''}`}
          type="text"
          value={name}
          onChange={e => { setName(e.target.value); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="なまえ（10もじまで）"
          maxLength={10}
          autoFocus
        />
        {error && <div className={styles.firstLaunchError}>{error}</div>}
        <button className={styles.firstLaunchButton} onClick={handleSubmit}>
          はじめる！
        </button>
      </div>
    </div>
  );
}

// ── App shell ──────────────────────────────────────────────────────────────

export default function App() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [activeProfile, setActiveProfile] = useState<string | null>(null);
  const [showProfileSelector, setShowProfileSelector] = useState(false);
  const [friendViewing, setFriendViewing] = useState<{ name: string; state: GameState } | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Initialize: migrate legacy data, load profiles
  useEffect(() => {
    migrateLegacyData();
    const loaded = loadProfiles();
    setProfiles(loaded);
    if (loaded.length > 0) {
      const active = getActiveProfileName();
      const validActive = active && loaded.some(p => p.name === active) ? active : loaded[0].name;
      setActiveProfileName(validActive);
      setActiveProfile(validActive);
    }
    setInitialized(true);
  }, []);

  const handleCreateProfile = useCallback((name: string) => {
    const newProfile: UserProfile = { name, createdAt: new Date().toISOString() };
    const updated = [...profiles, newProfile];
    saveProfiles(updated);
    saveProfileState(name, createInitialState());
    setActiveProfileName(name);
    setProfiles(updated);
    setActiveProfile(name);
  }, [profiles]);

  const handleSelectProfile = useCallback((name: string) => {
    setActiveProfileName(name);
    setActiveProfile(name);
  }, []);

  const handleDeleteProfile = useCallback((name: string) => {
    deleteProfileData(name);
    const updated = profiles.filter(p => p.name !== name);
    saveProfiles(updated);
    setProfiles(updated);
    if (activeProfile === name) {
      const next = updated[0]?.name ?? null;
      if (next) setActiveProfileName(next);
      setActiveProfile(next);
    }
  }, [profiles, activeProfile]);

  const handleViewAlbum = useCallback((name: string) => {
    const state = loadProfileState(name);
    if (state) setFriendViewing({ name, state });
  }, []);

  // Still initializing
  if (!initialized) return null;

  // First launch: no profiles yet
  if (profiles.length === 0) {
    return <FirstLaunchScreen onCreate={handleCreateProfile} />;
  }

  // Profile exists but not yet active (edge case)
  if (!activeProfile) return null;

  return (
    <>
      {/* key={activeProfile} forces full remount on profile switch */}
      <GameContent
        key={activeProfile}
        profileName={activeProfile}
        onOpenProfileSelector={() => setShowProfileSelector(true)}
      />

      {showProfileSelector && (
        <ProfileSelector
          profiles={profiles}
          activeProfile={activeProfile}
          onSelect={handleSelectProfile}
          onCreate={handleCreateProfile}
          onDelete={handleDeleteProfile}
          onViewAlbum={handleViewAlbum}
          onClose={() => setShowProfileSelector(false)}
        />
      )}

      {friendViewing && (
        <FullscreenViewer
          pages={friendViewing.state.pages}
          currentPageIndex={0}
          showingCover={true}
          coverDesign={friendViewing.state.coverDesign}
          coverTitle={friendViewing.state.coverTitle}
          friendName={friendViewing.name}
          onClose={() => setFriendViewing(null)}
        />
      )}
    </>
  );
}
