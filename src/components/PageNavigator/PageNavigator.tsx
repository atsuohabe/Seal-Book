import { MAX_PAGES } from '../../data/constants';
import styles from './PageNavigator.module.css';

interface PageNavigatorProps {
  currentIndex: number;
  totalPages: number;
  showingCover: boolean;
  isOverview: boolean;
  onPrev: () => void;
  onNext: () => void;
  onAddPage: () => void;
  onToggleOverview: () => void;
  onFullscreen: () => void;
}

export function PageNavigator({
  currentIndex, totalPages, showingCover, isOverview,
  onPrev, onNext, onAddPage, onToggleOverview, onFullscreen,
}: PageNavigatorProps) {
  return (
    <div className={styles.nav}>
      <button
        className={styles.navButton}
        onClick={onPrev}
        disabled={showingCover || isOverview}
      >
        &#8249;
      </button>
      <span className={styles.pageInfo}>
        {isOverview ? '一覧' : showingCover ? '表紙' : `${currentIndex + 1} / ${totalPages}`}
      </span>
      <button
        className={styles.navButton}
        onClick={onNext}
        disabled={(!showingCover && currentIndex >= totalPages - 1) || isOverview}
      >
        &#8250;
      </button>
      <button
        className={styles.addButton}
        onClick={onAddPage}
        disabled={totalPages >= MAX_PAGES || isOverview}
        title="ページを追加"
      >
        +
      </button>
      <button
        className={`${styles.overviewButton} ${isOverview ? styles.overviewActive : ''}`}
        onClick={onToggleOverview}
        title={isOverview ? 'もどる' : '一覧'}
      >
        <span className={styles.gridIcon} />
      </button>
      <button
        className={styles.fullscreenButton}
        onClick={onFullscreen}
        title="全画面で見る"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="1,5 1,1 5,1" />
          <polyline points="11,1 15,1 15,5" />
          <polyline points="15,11 15,15 11,15" />
          <polyline points="5,15 1,15 1,11" />
        </svg>
      </button>
    </div>
  );
}
