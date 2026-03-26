import { Difficulty } from './types';

export const EMOJI_POOL = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊',
  '🐻', '🐼', '🐨', '🐯', '🦁', '🐮',
  '🐷', '🐸', '🐵', '🐔', '🐧', '🦆',
  '🦅', '🦉', '🦇', '🐺', '🐗', '🐴',
];

export const DIFFICULTY_CONFIG: Record<Difficulty, { cols: number; pairs: number; label: string }> = {
  '4x4': { cols: 4, pairs: 8,  label: '4 × 4 (쉬움)' },
  '6x6': { cols: 6, pairs: 18, label: '6 × 6 (어려움)' },
};

export const FLIP_DELAY_MS = 1000;
