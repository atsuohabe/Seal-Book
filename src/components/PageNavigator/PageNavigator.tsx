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
}

export function PageNavigator({
  currentIndex, totalPages, showingCover, isOverview,
  onPrev, onNext, onAddPage, onToggleOverview,
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
    </div>
  );
}
