import React, { useRef, useState, useEffect } from 'react';
import type { AlbumPage as AlbumPageType, StickerDef, CoverDesign } from '../../types';
import { AlbumPage } from '../AlbumPage/AlbumPage';
import { AlbumCover } from '../AlbumCover/AlbumCover';
import styles from './PageOverview.module.css';

interface PageOverviewProps {
  pages: AlbumPageType[];
  currentPageIndex: number;
  showingCover: boolean;
  coverDesign: CoverDesign;
  coverTitle: string;
  onSelectPage: (index: number) => void;
  onPointerDown: (
    e: React.PointerEvent,
    sticker: StickerDef,
    source: 'tray' | 'page',
    instanceId?: string,
  ) => void;
  isTimeUp: boolean;
}

function ScaledThumbnail({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setScale(entry.contentRect.width / 540);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={styles.thumbnailContent}>
      <div style={{
        width: 540,
        height: 720,
        transformOrigin: 'top left',
        transform: `scale(${scale})`,
      }}>
        {children}
      </div>
    </div>
  );
}

const PageThumbnail = React.memo(function PageThumbnail({
  page, isActive, onClick, onPointerDown, isTimeUp,
}: {
  page: AlbumPageType;
  isActive: boolean;
  onClick: () => void;
  onPointerDown: PageOverviewProps['onPointerDown'];
  isTimeUp: boolean;
}) {
  return (
    <div
      className={`${styles.thumbnail} ${isActive ? styles.thumbnailActive : ''}`}
      onClick={onClick}
    >
      <ScaledThumbnail>
        <AlbumPage
          page={page}
          onPointerDown={onPointerDown}
          isTimeUp={isTimeUp}
        />
      </ScaledThumbnail>
      <div className={styles.pageNumber}>{page.id + 1}</div>
    </div>
  );
});

export function PageOverview({
  pages, currentPageIndex, showingCover, coverDesign, coverTitle, onSelectPage, onPointerDown, isTimeUp,
}: PageOverviewProps) {
  return (
    <div className={styles.overviewGrid}>
      {/* Cover thumbnail */}
      <div
        className={`${styles.thumbnail} ${showingCover ? styles.thumbnailActive : ''}`}
        onClick={() => onSelectPage(-1)}
      >
        <ScaledThumbnail>
          <AlbumCover design={coverDesign} title={coverTitle} isThumbnail />
        </ScaledThumbnail>
        <div className={styles.pageNumber}>表紙</div>
      </div>

      {/* Page thumbnails */}
      {pages.map((page, index) => (
        <PageThumbnail
          key={page.id}
          page={page}
          isActive={!showingCover && index === currentPageIndex}
          onClick={() => onSelectPage(index)}
          onPointerDown={onPointerDown}
          isTimeUp={isTimeUp}
        />
      ))}
    </div>
  );
}
