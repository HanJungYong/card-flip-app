import styles from './DifficultySelector.module.css';
import { Difficulty } from '@/lib/card-flip/types';
import { DIFFICULTY_CONFIG } from '@/lib/card-flip/constants';

interface Props {
  current: Difficulty;
  onChange: (d: Difficulty) => void;
}

export default function DifficultySelector({ current, onChange }: Props) {
  return (
    <div className={styles.selector}>
      {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map(d => (
        <button
          key={d}
          className={`${styles.btn} ${current === d ? styles.active : ''}`}
          onClick={() => onChange(d)}
        >
          {DIFFICULTY_CONFIG[d].label}
        </button>
      ))}
    </div>
  );
}
