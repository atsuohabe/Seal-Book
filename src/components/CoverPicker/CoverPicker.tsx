import type { CoverDesign } from '../../types';
import { COVER_DESIGNS } from '../../data/constants';
import { AlbumCover } from '../AlbumCover/AlbumCover';
import styles from './CoverPicker.module.css';

interface CoverPickerProps {
  currentDesign: CoverDesign;
  onSelect: (design: CoverDesign) => void;
  onClose: () => void;
}

export function CoverPicker({ currentDesign, onSelect, onClose }: CoverPickerProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title}>ひょうしをえらぼう</div>
        <div className={styles.grid}>
          {COVER_DESIGNS.map((d) => (
            <button
              key={d.id}
              className={`${styles.option} ${d.id === currentDesign ? styles.active : ''}`}
              onClick={() => onSelect(d.id)}
            >
              <div className={styles.preview}>
                <AlbumCover design={d.id} isThumbnail />
              </div>
              <span className={styles.label}>{d.label}</span>
            </button>
          ))}
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          とじる
        </button>
      </div>
    </div>
  );
}
