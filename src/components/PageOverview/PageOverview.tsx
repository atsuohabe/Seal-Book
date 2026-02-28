import React from 'react';
import type { AlbumPage as AlbumPageType, StickerDef, CoverDesign } from '../../types';
import { AlbumPage } from '../AlbumPage/AlbumPage';
import { AlbumCover } from '../AlbumCover/AlbumCover';
import styles from './PageOverview.module.css';

interface PageOverviewProps {
  pages: AlbumPageType[];
  currentPageIndex: number;
  showingCover: boolean;
  coverDesign: CoverDesign;
  onSelectPage: (index: number) => void;
  onPointerDown: (
    e: React.PointerEvent,
    sticker: StickerDef,
    source: 'tray' | 'page',
    instanceId?: string,
  ) => void;
  isTimeUp: boolean;
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
      <div className={styles.thumbnailContent}>
        <AlbumPage
          page={page}
          onPointerDown={onPointerDown}
          isTimeUp={isTimeUp}
        />
      </div>
      <div className={styles.pageNumber}>{page.id + 1}</div>
    </div>
  );
});

export function PageOverview({
  pages, currentPageIndex, showingCover, coverDesign, onSelectPage, onPointerDown, isTimeUp,
}: PageOverviewProps) {
  return (
    <div className={styles.overviewGrid}>
      {/* Cover thumbnail */}
      <div
        className={`${styles.thumbnail} ${showingCover ? styles.thumbnailActive : ''}`}
        onClick={() => onSelectPage(-1)}
      >
        <div className={styles.thumbnailContent}>
          <AlbumCover design={coverDesign} isThumbnail />
        </div>
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
