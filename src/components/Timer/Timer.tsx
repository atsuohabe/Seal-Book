import styles from './Timer.module.css';

interface TimerProps {
  remainingMinutes: number;
  remainingSeconds: number;
  isTimeUp: boolean;
}

export function Timer({ remainingMinutes, remainingSeconds, isTimeUp }: TimerProps) {
  const totalRemaining = remainingMinutes * 60 + remainingSeconds;
  const timeClass = totalRemaining <= 0 ? styles.critical
    : totalRemaining <= 120 ? styles.warning
    : '';

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <>
      <div className={`${styles.timer} ${timeClass}`}>
        <span className={styles.timerIcon}>&#9201;</span>
        <span className={styles.time}>{pad(remainingMinutes)}:{pad(remainingSeconds)}</span>
      </div>

      {isTimeUp && (
        <div className={styles.timeUpOverlay}>
          <div className={styles.timeUpCard}>
            <div className={styles.timeUpTitle}>
              今日のプレイ時間が終了しました
            </div>
            <div className={styles.timeUpMessage}>
              アルバムは保存されています。<br />
              また明日遊びに来てね！
            </div>
          </div>
        </div>
      )}
    </>
  );
}
