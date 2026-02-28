import { useState, useEffect, useRef, useCallback } from 'react';
import { MAX_PLAY_TIME_MS } from '../data/constants';

export function useTimer(
  initialMs: number,
  onTick: (ms: number) => void
) {
  const [elapsedMs, setElapsedMs] = useState(initialMs);
  const [isRunning, setIsRunning] = useState(false);
  const lastTickRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const remainingMs = Math.max(0, MAX_PLAY_TIME_MS - elapsedMs);
  const isTimeUp = remainingMs <= 0;

  const start = useCallback(() => {
    if (isTimeUp) return;
    setIsRunning(true);
    lastTickRef.current = Date.now();
  }, [isTimeUp]);

  const pause = useCallback(() => {
    setIsRunning(false);
    lastTickRef.current = null;
  }, []);

  // Core tick
  useEffect(() => {
    if (!isRunning || isTimeUp) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = window.setInterval(() => {
      const now = Date.now();
      const delta = lastTickRef.current ? now - lastTickRef.current : 1000;
      lastTickRef.current = now;

      setElapsedMs(prev => {
        const next = Math.min(prev + delta, MAX_PLAY_TIME_MS);
        onTick(next);
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, isTimeUp, onTick]);

  // Pause on tab hidden
  useEffect(() => {
    function handleVisibility() {
      if (document.hidden && isRunning) {
        pause();
      }
    }
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isRunning, pause]);

  const remainingMinutes = Math.floor(remainingMs / 60000);
  const remainingSeconds = Math.floor((remainingMs % 60000) / 1000);

  return {
    elapsedMs,
    remainingMs,
    remainingMinutes,
    remainingSeconds,
    isRunning,
    isTimeUp,
    start,
    pause,
  };
}
