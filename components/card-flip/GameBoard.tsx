import styles from './GameBoard.module.css';
import CardItem from './Card';
import { Card } from '@/lib/card-flip/types';
import { DIFFICULTY_CONFIG } from '@/lib/card-flip/constants';

interface Props {
  cards: Card[];
  difficulty: '4x4' | '6x6';
  onFlip: (idx: number) => void;
}

export default function GameBoard({ cards, difficulty, onFlip }: Props) {
  const { cols } = DIFFICULTY_CONFIG[difficulty];
  const colClass = cols === 4 ? styles.cols4 : styles.cols6;

  return (
    <div className={`${styles.board} ${colClass}`} style={{ maxWidth: cols === 6 ? 560 : 400 }}>
      {cards.map(card => (
        <CardItem key={card.id} card={card} onClick={() => onFlip(card.id)} />
      ))}
    </div>
  );
}
