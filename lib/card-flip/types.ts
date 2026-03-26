export type Difficulty = '4x4' | '6x6';

export interface Card {
  id: number;        // unique index in the grid
  pairId: number;    // emoji pair identifier (0..N-1)
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  flippedIndices: number[];  // at most 2 at once
  matchedPairs: number;
  totalPairs: number;
  moves: number;
  timeElapsed: number;       // seconds
  isStarted: boolean;
  isGameOver: boolean;
  difficulty: Difficulty;
}

export interface ScoreEntry {
  id: string;
  player_name: string;
  difficulty: Difficulty;
  moves: number;
  time_seconds: number;
  created_at: string;
}
