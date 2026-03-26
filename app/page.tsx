'use client';

import { useCardGame } from '@/hooks/useCardGame';
import GameBoard from '@/components/card-flip/GameBoard';
import ScorePanel from '@/components/card-flip/ScorePanel';
import DifficultySelector from '@/components/card-flip/DifficultySelector';
import GameOverModal from '@/components/card-flip/GameOverModal';
import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  const { state, flipCard, resetGame, setDifficulty } = useCardGame();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>🃏 카드 뒤집기</h1>
        <Link href="/leaderboard" className={styles.leaderboardLink}>리더보드</Link>
      </header>

      <DifficultySelector current={state.difficulty} onChange={setDifficulty} />
      <ScorePanel
        moves={state.moves}
        timeElapsed={state.timeElapsed}
        matchedPairs={state.matchedPairs}
        totalPairs={state.totalPairs}
      />

      <GameBoard cards={state.cards} difficulty={state.difficulty} onFlip={flipCard} />

      <button className={styles.resetBtn} onClick={() => resetGame()}>
        새 게임
      </button>

      {state.isGameOver && (
        <GameOverModal
          difficulty={state.difficulty}
          moves={state.moves}
          timeElapsed={state.timeElapsed}
          onPlayAgain={() => resetGame()}
        />
      )}
    </main>
  );
}
