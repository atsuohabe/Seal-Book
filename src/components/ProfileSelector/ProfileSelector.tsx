import { useState } from 'react';
import type { UserProfile } from '../../types';
import styles from './ProfileSelector.module.css';

interface ProfileSelectorProps {
  profiles: UserProfile[];
  activeProfile: string;
  onSelect: (name: string) => void;
  onCreate: (name: string) => void;
  onDelete: (name: string) => void;
  onViewAlbum: (name: string) => void;
  onClose: () => void;
}

export function ProfileSelector({
  profiles,
  activeProfile,
  onSelect,
  onCreate,
  onDelete,
  onViewAlbum,
  onClose,
}: ProfileSelectorProps) {
  const [showCreateInput, setShowCreateInput] = useState(false);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');

  function handleCreate() {
    const trimmed = newName.trim();
    if (!trimmed) {
      setError('なまえをにゅうりょくしてください');
      return;
    }
    if (profiles.some(p => p.name === trimmed)) {
      setError('そのなまえはすでにつかわれています');
      return;
    }
    onCreate(trimmed);
    setNewName('');
    setShowCreateInput(false);
    setError('');
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleCreate();
    if (e.key === 'Escape') {
      setShowCreateInput(false);
      setNewName('');
      setError('');
    }
  }

  function handleDelete(name: string) {
    if (window.confirm(`「${name}」のデータをけしますか？\nこのそうさはもとにもどせません。`)) {
      onDelete(name);
    }
  }

  return (
    <div className={styles.overlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.modal}>
        <div className={styles.title}>だれのシールちょう？</div>

        <div className={styles.profileList}>
          {profiles.map(profile => (
            <div
              key={profile.name}
              className={`${styles.profileRow} ${profile.name === activeProfile ? styles.active : ''}`}
            >
              <button
                className={styles.profileName}
                onClick={() => { onSelect(profile.name); onClose(); }}
                title={profile.name === activeProfile ? '（いまのユーザー）' : `${profile.name}にきりかえる`}
              >
                {profile.name}
                {profile.name === activeProfile && ' ✓'}
              </button>

              {/* View friend's album (not available for own profile) */}
              {profile.name !== activeProfile && (
                <button
                  className={`${styles.iconButton} ${styles.viewButton}`}
                  onClick={() => { onViewAlbum(profile.name); onClose(); }}
                  title={`${profile.name}のシールちょうをみる`}
                >
                  👁
                </button>
              )}

              {/* Delete (not available for the only profile) */}
              {profiles.length > 1 && (
                <button
                  className={`${styles.iconButton} ${styles.deleteButton}`}
                  onClick={() => handleDelete(profile.name)}
                  title={`${profile.name}をけす`}
                >
                  🗑
                </button>
              )}
            </div>
          ))}
        </div>

        <hr className={styles.divider} />

        <div className={styles.createSection}>
          {showCreateInput ? (
            <>
              <div className={styles.nameInputRow}>
                <input
                  className={`${styles.nameInput} ${error ? styles.error : ''}`}
                  type="text"
                  value={newName}
                  onChange={e => { setNewName(e.target.value); setError(''); }}
                  onKeyDown={handleKeyDown}
                  placeholder="なまえ（10もじまで）"
                  maxLength={10}
                  autoFocus
                />
                <button className={styles.confirmButton} onClick={handleCreate}>
                  つくる
                </button>
              </div>
              {error && <div className={styles.errorMsg}>{error}</div>}
            </>
          ) : (
            <button
              className={styles.createButton}
              onClick={() => setShowCreateInput(true)}
            >
              ＋ あたらしくつくる
            </button>
          )}
        </div>

        <button className={styles.closeButton} onClick={onClose}>
          とじる
        </button>
      </div>
    </div>
  );
}
