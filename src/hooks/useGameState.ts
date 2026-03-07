import { useState, useCallback, useEffect, useRef } from 'react';
import type { GameState, AlbumPage, PlacedSticker, StickerDef, CoverDesign } from '../types';
import { loadProfileState, saveProfileState } from '../utils/storage';
import { getTodayDateString, isSameDay } from '../utils/dateUtils';
import { INITIAL_PAGES, MAX_PAGES } from '../data/constants';

export function createInitialState(): GameState {
  const pages: AlbumPage[] = [];
  for (let i = 0; i < INITIAL_PAGES; i++) {
    pages.push({ id: i, backgroundColor: '#faf8f0', stickers: [] });
  }
  const today = getTodayDateString();
  return {
    pages,
    currentPageIndex: 0,
    inventory: [],
    collectedStickers: [],
    lastGachaDate: '',
    todayPlayTimeMs: 0,
    lastPlayDate: today,
    gachaCount: 0,
    coverDesign: 'pastel_flowers' as CoverDesign,
    coverTitle: 'わたしの\nシールちょう',
    namedCharacters: [],
  };
}

function migrateStickerDef(s: StickerDef): StickerDef {
  return {
    ...s,
    characterType: s.characterType ?? 'face',
  };
}

function loadAndMigrate(profileName: string): GameState {
  const saved = loadProfileState(profileName);
  if (saved) {
    // Field migrations
    if (!saved.coverDesign) saved.coverDesign = 'pastel_flowers';
    if (!saved.coverTitle) saved.coverTitle = 'わたしの\nシールちょう';
    if (!saved.namedCharacters) saved.namedCharacters = [];
    // Sticker migrations
    saved.inventory = (saved.inventory ?? []).map(migrateStickerDef);
    saved.collectedStickers = (saved.collectedStickers ?? []).map(migrateStickerDef);
    saved.pages = (saved.pages ?? []).map(p => ({
      ...p,
      stickers: p.stickers.map(ps => ({ ...ps, sticker: migrateStickerDef(ps.sticker) })),
    }));
    const today = getTodayDateString();
    if (!isSameDay(saved.lastPlayDate)) {
      return { ...saved, todayPlayTimeMs: 0, lastPlayDate: today };
    }
    return saved;
  }
  return createInitialState();
}

export function useGameState(profileName: string) {
  const [state, setState] = useState<GameState>(() => loadAndMigrate(profileName));

  const saveTimeoutRef = useRef<number | null>(null);

  // Debounced save
  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = window.setTimeout(() => {
      saveProfileState(profileName, state);
    }, 300);
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [state, profileName]);

  const goToPage = useCallback((index: number) => {
    setState(prev => {
      if (index < 0 || index >= prev.pages.length) return prev;
      return { ...prev, currentPageIndex: index };
    });
  }, []);

  const nextPage = useCallback(() => {
    setState(prev => {
      const next = prev.currentPageIndex + 1;
      if (next >= prev.pages.length) return prev;
      return { ...prev, currentPageIndex: next };
    });
  }, []);

  const prevPage = useCallback(() => {
    setState(prev => {
      const p = prev.currentPageIndex - 1;
      if (p < 0) return prev;
      return { ...prev, currentPageIndex: p };
    });
  }, []);

  const addPage = useCallback(() => {
    setState(prev => {
      if (prev.pages.length >= MAX_PAGES) return prev;
      const newPage: AlbumPage = {
        id: prev.pages.length,
        backgroundColor: '#faf8f0',
        stickers: [],
      };
      return { ...prev, pages: [...prev.pages, newPage] };
    });
  }, []);

  const placeSticker = useCallback((sticker: StickerDef, x: number, y: number) => {
    setState(prev => {
      const placed: PlacedSticker = {
        instanceId: `${sticker.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        sticker,
        x,
        y,
        rotation: 0,
        scale: 1,
        zIndex: prev.pages[prev.currentPageIndex].stickers.length + 1,
      };
      const pages = prev.pages.map((page, i) =>
        i === prev.currentPageIndex
          ? { ...page, stickers: [...page.stickers, placed] }
          : page
      );
      const inventory = prev.inventory.filter((s) => s.id !== sticker.id);
      return { ...prev, pages, inventory };
    });
  }, []);

  const moveSticker = useCallback((instanceId: string, newX: number, newY: number) => {
    setState(prev => {
      const pages = prev.pages.map((page, i) =>
        i === prev.currentPageIndex
          ? {
              ...page,
              stickers: page.stickers.map(s =>
                s.instanceId === instanceId ? { ...s, x: newX, y: newY } : s
              ),
            }
          : page
      );
      return { ...prev, pages };
    });
  }, []);

  const removeSticker = useCallback((instanceId: string) => {
    setState(prev => {
      const page = prev.pages[prev.currentPageIndex];
      const removed = page.stickers.find(s => s.instanceId === instanceId);
      if (!removed) return prev;

      const pages = prev.pages.map((p, i) =>
        i === prev.currentPageIndex
          ? { ...p, stickers: p.stickers.filter(s => s.instanceId !== instanceId) }
          : p
      );
      return {
        ...prev,
        pages,
        inventory: [...prev.inventory, removed.sticker],
      };
    });
  }, []);

  const addToInventory = useCallback((stickers: StickerDef[]) => {
    setState(prev => ({
      ...prev,
      inventory: [...prev.inventory, ...stickers],
      collectedStickers: [...prev.collectedStickers, ...stickers],
    }));
  }, []);

  const setLastGachaDate = useCallback((date: string) => {
    setState(prev => ({ ...prev, lastGachaDate: date, gachaCount: prev.gachaCount + 1 }));
  }, []);

  const updatePlayTime = useCallback((ms: number) => {
    setState(prev => ({ ...prev, todayPlayTimeMs: ms }));
  }, []);

  const setCoverDesign = useCallback((design: CoverDesign) => {
    setState(prev => ({ ...prev, coverDesign: design }));
  }, []);

  const setCoverTitle = useCallback((title: string) => {
    setState(prev => ({ ...prev, coverTitle: title }));
  }, []);

  const nameSticker = useCallback((instanceId: string, customName: string) => {
    setState(prev => {
      const page = prev.pages[prev.currentPageIndex];
      const placed = page.stickers.find(s => s.instanceId === instanceId);
      if (!placed) return prev;

      const pages = prev.pages.map((p, i) =>
        i === prev.currentPageIndex
          ? {
              ...p,
              stickers: p.stickers.map(s =>
                s.instanceId === instanceId
                  ? { ...s, sticker: { ...s.sticker, customName } }
                  : s
              ),
            }
          : p
      );

      const alreadyNamed = prev.namedCharacters.some(
        nc => nc.originalStickerId === placed.sticker.id
      );
      const newCharacter = {
        name: customName,
        baseShape: placed.sticker.baseShape,
        primaryColor: placed.sticker.primaryColor,
        secondaryColor: placed.sticker.secondaryColor,
        originalStickerId: placed.sticker.id,
      };
      const namedCharacters = alreadyNamed
        ? prev.namedCharacters.map(nc =>
            nc.originalStickerId === placed.sticker.id ? { ...nc, name: customName } : nc
          )
        : [...prev.namedCharacters, newCharacter];

      return { ...prev, pages, namedCharacters };
    });
  }, []);

  const canGacha = !isSameDay(state.lastGachaDate);
  const currentPage = state.pages[state.currentPageIndex];

  return {
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
  };
}
