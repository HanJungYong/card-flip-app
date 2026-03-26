'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { ScoreEntry, Difficulty } from '@/lib/card-flip/types';
import styles from './page.module.css';

function formatTime(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const MEDAL = ['🥇', '🥈', '🥉'];

export default function LeaderboardPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>('4x4');
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const supabase = createClient();
    supabase
      .from('card_scores')
      .select('*')
      .eq('difficulty', difficulty)
      .order('moves', { ascending: true })
      .order('time_seconds', { ascending: true })
      .limit(20)
      .then(({ data }) => {
        setScores((data as ScoreEntry[]) ?? []);
        setLoading(false);
      });
  }, [difficulty]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>🏆 리더보드</h1>
        <Link href="/" className={styles.backLink}>← 게임으로</Link>
      </header>

      <div className={styles.tabs}>
        {(['4x4', '6x6'] as Difficulty[]).map(d => (
          <button
            key={d}
            className={`${styles.tab} ${difficulty === d ? styles.tabActive : ''}`}
            onClick={() => setDifficulty(d)}
          >
            {d}
          </button>
        ))}
      </div>

      {loading ? (
        <p className={styles.empty}>불러오는 중…</p>
      ) : scores.length === 0 ? (
        <p className={styles.empty}>아직 기록이 없습니다. 첫 번째 도전자가 되세요!</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>순위</th>
              <th>이름</th>
              <th>시도 횟수</th>
              <th>시간</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, i) => (
              <tr key={s.id}>
                <td className={`${styles.rank} ${i < 3 ? styles[`rank${i + 1}` as keyof typeof styles] : ''}`}>
                  {i < 3 ? MEDAL[i] : i + 1}
                </td>
                <td>{s.player_name}</td>
                <td>{s.moves}</td>
                <td>{formatTime(s.time_seconds)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
