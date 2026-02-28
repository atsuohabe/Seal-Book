import { useRef, useState, useEffect } from 'react';
import styles from './StickerActionMenu.module.css';

interface StickerActionMenuProps {
  x: number;
  y: number;
  onRemove: () => void;
  onClose: () => void;
}

export function StickerActionMenu({ x, y, onRemove, onClose }: StickerActionMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x, y: y - 60 });

  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      let adjY = y - rect.height - 12;
      let adjX = x - rect.width / 2;
      adjX = Math.max(8, Math.min(window.innerWidth - rect.width - 8, adjX));
      adjY = Math.max(8, adjY);
      setPos({ x: adjX, y: adjY });
    }
  }, [x, y]);

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div
        ref={menuRef}
        className={styles.menu}
        style={{ left: pos.x, top: pos.y }}
      >
        <button className={styles.removeButton} onClick={onRemove}>
          はがす
        </button>
      </div>
    </>
  );
}
