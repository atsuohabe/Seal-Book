import { useState, useEffect, useCallback, useRef } from 'react';
import type { AlbumPage as AlbumPageType, CoverDesign } from '../../types';
import { AlbumPage } from '../AlbumPage/AlbumPage';
import { AlbumCover } from '../AlbumCover/AlbumCover';
import styles from './FullscreenViewer.module.css';

interface FullscreenViewerProps {
  pages: AlbumPageType[];
  currentPageIndex: number;
  showingCover: boolean;
  coverDesign: CoverDesign;
  coverTitle: string;
  onClose: () => void;
}

const noop = () => {};

export function FullscreenViewer({
  pages,
  currentPageIndex,
  showingCover,
  coverDesign,
  coverTitle,
  onClose,
}: FullscreenViewerProps) {
  // -1 = cover, 0..n = page index
  const [viewIndex, setViewIndex] = useState(showingCover ? -1 : currentPageIndex);
  const touchStartX = useRef(0);

  const totalPages = pages.length;
  const canPrev = viewIndex > -1;
  const canNext = viewIndex < totalPages - 1;

  const goPrev = useCallback(() => {
    setViewIndex(prev => Math.max(-1, prev - 1));
  }, []);

  const goNext = useCallback(() => {
    setViewIndex(prev => Math.min(totalPages - 1, prev + 1));
  }, [totalPages]);

  // Escape key to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      } else if (e.key === 'ArrowRight') {
        goNext();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goPrev, goNext]);

  // Touch swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
  }, [goPrev, goNext]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className={styles.overlay}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button className={styles.closeButton} onClick={onClose} title="とじる">
        &#x2715;
      </button>

      {/* Left arrow */}
      <button
        className={`${styles.navButton} ${styles.navButtonLeft}`}
        onClick={goPrev}
        disabled={!canPrev}
      >
        &#8249;
      </button>

      {/* Page content */}
      <div className={styles.pageContainer}>
        {viewIndex === -1 ? (
          <AlbumCover design={coverDesign} title={coverTitle} isThumbnail />
        ) : (
          <AlbumPage
            page={pages[viewIndex]}
            onPointerDown={noop as any}
            isTimeUp={true}
          />
        )}
      </div>

      {/* Right arrow */}
      <button
        className={`${styles.navButton} ${styles.navButtonRight}`}
        onClick={goNext}
        disabled={!canNext}
      >
        &#8250;
      </button>

      {/* Page indicator */}
      <div className={styles.pageIndicator}>
        {viewIndex === -1 ? '表紙' : `${viewIndex + 1} / ${totalPages}`}
      </div>
    </div>
  );
}
