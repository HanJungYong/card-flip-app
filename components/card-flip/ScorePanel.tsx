import styles from './ScorePanel.module.css';

interface Props {
  moves: number;
  timeElapsed: number;
  matchedPairs: number;
  totalPairs: number;
}

function formatTime(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function ScorePanel({ moves, timeElapsed, matchedPairs, totalPairs }: Props) {
  return (
    <div className={styles.panel}>
      <div className={styles.item}>
        <span>{formatTime(timeElapsed)}</span>
        <span className={styles.label}>시간</span>
      </div>
      <div className={styles.item}>
        <span>{moves}</span>
        <span className={styles.label}>시도</span>
      </div>
      <div className={styles.item}>
        <span>{matchedPairs} / {totalPairs}</span>
        <span className={styles.label}>맞춘 쌍</span>
      </div>
    </div>
  );
}
