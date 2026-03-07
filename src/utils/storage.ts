import type { GameState, UserProfile } from '../types';

// Legacy single-user key (for migration)
const LEGACY_KEY = 'seal-book-game-state';

// Multi-user keys
const PROFILES_KEY = 'seal-book-profiles';
const ACTIVE_KEY = 'seal-book-active';
const STATE_PREFIX = 'seal-book-state-';

// ── Profile list ──────────────────────────────────────────────

export function loadProfiles(): UserProfile[] {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as UserProfile[];
  } catch {
    return [];
  }
}

export function saveProfiles(profiles: UserProfile[]): void {
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  } catch (e) {
    console.warn('Failed to save profiles:', e);
  }
}

// ── Active profile ────────────────────────────────────────────

export function getActiveProfileName(): string | null {
  return localStorage.getItem(ACTIVE_KEY);
}

export function setActiveProfileName(name: string): void {
  localStorage.setItem(ACTIVE_KEY, name);
}

// ── Per-profile state ─────────────────────────────────────────

export function loadProfileState(name: string): GameState | null {
  try {
    const raw = localStorage.getItem(STATE_PREFIX + name);
    if (!raw) return null;
    return JSON.parse(raw) as GameState;
  } catch {
    return null;
  }
}

export function saveProfileState(name: string, state: GameState): void {
  try {
    localStorage.setItem(STATE_PREFIX + name, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save profile state:', e);
  }
}

export function deleteProfileData(name: string): void {
  localStorage.removeItem(STATE_PREFIX + name);
}

// ── Legacy migration ──────────────────────────────────────────

/**
 * If the old single-user key exists, migrate it to a "わたし" profile.
 * Returns the migrated profile name, or null if no migration was needed.
 */
export function migrateLegacyData(): string | null {
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return null;

    const legacyState = JSON.parse(raw) as GameState;
    const profileName = 'わたし';

    // Save under new key
    saveProfileState(profileName, legacyState);

    // Create profile entry
    const profiles = loadProfiles();
    if (!profiles.some(p => p.name === profileName)) {
      profiles.unshift({ name: profileName, createdAt: new Date().toISOString() });
      saveProfiles(profiles);
    }

    // Set as active
    setActiveProfileName(profileName);

    // Remove legacy key
    localStorage.removeItem(LEGACY_KEY);

    return profileName;
  } catch {
    return null;
  }
}

// ── Legacy compat (kept for any internal use) ─────────────────

export function loadGameState(): GameState | null {
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GameState;
  } catch {
    return null;
  }
}

export function saveGameState(state: GameState): void {
  try {
    localStorage.setItem(LEGACY_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save game state:', e);
  }
}
