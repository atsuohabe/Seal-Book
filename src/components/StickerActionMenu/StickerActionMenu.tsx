import { useRef, useState, useEffect } from 'react';
import styles from './StickerActionMenu.module.css';

interface StickerActionMenuProps {
  x: number;
  y: number;
  currentName?: string;
  onRemove: () => void;
  onName: (name: string) => void;
  onClose: () => void;
}

export function StickerActionMenu({ x, y, currentName, onRemove, onName, onClose }: StickerActionMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x, y: y - 60 });
  const [isNaming, setIsNaming] = useState(false);
  const [nameInput, setNameInput] = useState(currentName || '');

  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      let adjY = y - rect.height - 12;
      let adjX = x - rect.width / 2;
      adjX = Math.max(8, Math.min(window.innerWidth - rect.width - 8, adjX));
      adjY = Math.max(8, adjY);
      setPos({ x: adjX, y: adjY });
    }
  }, [x, y, isNaming]);

  function handleConfirmName() {
    if (nameInput.trim()) {
      onName(nameInput.trim());
    }
  }

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div
        ref={menuRef}
        className={styles.menu}
        style={{ left: pos.x, top: pos.y }}
      >
        {isNaming ? (
          <div className={styles.nameInputWrapper}>
            <input
              className={styles.nameInput}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleConfirmName();
                if (e.key === 'Escape') setIsNaming(false);
              }}
              autoFocus
              maxLength={10}
              placeholder="なまえ"
            />
            <button className={styles.confirmButton} onClick={handleConfirmName}>
              けってい
            </button>
          </div>
        ) : (
          <>
            <button className={styles.nameButton} onClick={() => {
              setNameInput(currentName || '');
              setIsNaming(true);
            }}>
              {currentName ? 'なまえをかえる' : 'なまえをつける'}
            </button>
            <button className={styles.removeButton} onClick={onRemove}>
              はがす
            </button>
          </>
        )}
      </div>
    </>
  );
}
