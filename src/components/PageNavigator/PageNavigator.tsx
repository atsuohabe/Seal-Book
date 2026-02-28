import { MAX_PAGES } from '../../data/constants';
import styles from './PageNavigator.module.css';

interface PageNavigatorProps {
  currentIndex: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onAddPage: () => void;
}

export function PageNavigator({ currentIndex, totalPages, onPrev, onNext, onAddPage }: PageNavigatorProps) {
  return (
    <div className={styles.nav}>
      <button className={styles.navButton} onClick={onPrev} disabled={currentIndex <= 0}>
        &#8249;
      </button>
      <span className={styles.pageInfo}>
        {currentIndex + 1} / {totalPages}
      </span>
      <button className={styles.navButton} onClick={onNext} disabled={currentIndex >= totalPages - 1}>
        &#8250;
      </button>
      <button className={styles.addButton} onClick={onAddPage} disabled={totalPages >= MAX_PAGES} title="ページを追加">
        +
      </button>
    </div>
  );
}
