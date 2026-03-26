import styles from './Card.module.css';
import { Card as CardType } from '@/lib/card-flip/types';

interface Props {
  card: CardType;
  onClick: () => void;
}

export default function Card({ card, onClick }: Props) {
  const cls = [
    styles.card,
    card.isFlipped || card.isMatched ? styles.flipped : '',
    card.isMatched ? styles.matched : '',
  ].join(' ');

  return (
    <div className={styles['card-wrapper']} onClick={onClick} role="button" aria-pressed={card.isFlipped}>
      <div className={cls}>
        <div className={`${styles.face} ${styles.back}`}>🂠</div>
        <div className={`${styles.face} ${styles.front}`}>{card.emoji}</div>
      </div>
    </div>
  );
}
