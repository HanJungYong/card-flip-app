import { Card, Difficulty } from './types';
import { EMOJI_POOL, DIFFICULTY_CONFIG } from './constants';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildCards(difficulty: Difficulty): Card[] {
  const { pairs } = DIFFICULTY_CONFIG[difficulty];
  const emojis = EMOJI_POOL.slice(0, pairs);

  const doubled = [...emojis, ...emojis].map((emoji, idx) => ({
    pairId: emojis.indexOf(emoji),
    emoji,
  }));

  return shuffle(doubled).map((c, id) => ({
    id,
    pairId: c.pairId,
    emoji: c.emoji,
    isFlipped: false,
    isMatched: false,
  }));
}
