'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './GameOverModal.module.css';
import { createClient } from '@/lib/supabase/client';
import { Difficulty } from '@/lib/card-flip/types';

interface Props {
  difficulty: Difficulty;
  moves: number;
  timeElapsed: number;
  onPlayAgain: () => void;
}

function formatTime(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function GameOverModal({ difficulty, moves, timeElapsed, onPlayAgain }: Props) {
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) { setError('이름을 입력해 주세요.'); return; }
    if (trimmed.length > 20) { setError('20자 이하로 입력해 주세요.'); return; }

    setSaving(true);
    setError('');
    const supabase = createClient();
    const { error: dbErr } = await supabase.from('card_scores').insert({
      player_name: trimmed,
      difficulty,
      moves,
      time_seconds: timeElapsed,
    });

    if (dbErr) {
      setError('저장에 실패했습니다. 다시 시도해 주세요.');
    } else {
      setSaved(true);
    }
    setSaving(false);
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.title}>🎉 클리어!</div>
        <p className={styles.subtitle}>모든 카드를 맞췄습니다</p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{formatTime(timeElapsed)}</span>
            <span className={styles.statLabel}>시간</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{moves}</span>
            <span className={styles.statLabel}>시도</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{difficulty}</span>
            <span className={styles.statLabel}>난이도</span>
          </div>
        </div>

        {!saved ? (
          <>
            <input
              className={styles.input}
              placeholder="이름을 입력하세요 (1–20자)"
              value={name}
              maxLength={20}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
            />
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.btnRow}>
              <button className={styles.btnPrimary} onClick={handleSave} disabled={saving}>
                {saving ? '저장 중…' : '점수 저장'}
              </button>
              <button className={styles.btnSecondary} onClick={onPlayAgain}>
                다시 하기
              </button>
            </div>
          </>
        ) : (
          <div className={styles.btnRow}>
            <button className={styles.btnPrimary} onClick={() => router.push('/leaderboard')}>
              리더보드 보기
            </button>
            <button className={styles.btnSecondary} onClick={onPlayAgain}>
              다시 하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
