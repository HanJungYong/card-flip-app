'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Difficulty } from '@/lib/card-flip/types';
import { buildCards } from '@/lib/card-flip/engine';
import { DIFFICULTY_CONFIG, FLIP_DELAY_MS } from '@/lib/card-flip/constants';

function makeInitialState(difficulty: Difficulty): GameState {
  const { pairs } = DIFFICULTY_CONFIG[difficulty];
  return {
    cards: buildCards(difficulty),
    flippedIndices: [],
    matchedPairs: 0,
    totalPairs: pairs,
    moves: 0,
    timeElapsed: 0,
    isStarted: false,
    isGameOver: false,
    difficulty,
  };
}

export function useCardGame() {
  const [state, setState] = useState<GameState>(() => makeInitialState('4x4'));
  const lockRef = useRef(false);   // prevents triple-flip during match check
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer
  useEffect(() => {
    if (state.isStarted && !state.isGameOver) {
      timerRef.current = setInterval(() => {
        setState(s => ({ ...s, timeElapsed: s.timeElapsed + 1 }));
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.isStarted, state.isGameOver]);

  const flipCard = useCallback((idx: number) => {
    setState(s => {
      // Ignore if locked, already flipped, or already matched
      if (lockRef.current) return s;
      const card = s.cards[idx];
      if (card.isFlipped || card.isMatched) return s;
      if (s.flippedIndices.length >= 2) return s;

      const newFlipped = [...s.flippedIndices, idx];
      const newCards = s.cards.map((c, i) =>
        i === idx ? { ...c, isFlipped: true } : c
      );
      const isStarted = true;

      if (newFlipped.length === 2) {
        const [a, b] = newFlipped;
        const isMatch = newCards[a].pairId === newCards[b].pairId;
        const newMoves = s.moves + 1;

        if (isMatch) {
          const matchedCards = newCards.map((c, i) =>
            i === a || i === b ? { ...c, isMatched: true } : c
          );
          const newMatchedPairs = s.matchedPairs + 1;
          const isGameOver = newMatchedPairs === s.totalPairs;
          return {
            ...s,
            cards: matchedCards,
            flippedIndices: [],
            matchedPairs: newMatchedPairs,
            moves: newMoves,
            isStarted,
            isGameOver,
          };
        }

        // No match — lock and flip back after delay
        lockRef.current = true;
        setTimeout(() => {
          setState(prev => ({
            ...prev,
            cards: prev.cards.map((c, i) =>
              i === a || i === b ? { ...c, isFlipped: false } : c
            ),
            flippedIndices: [],
          }));
          lockRef.current = false;
        }, FLIP_DELAY_MS);

        return { ...s, cards: newCards, flippedIndices: newFlipped, moves: newMoves, isStarted };
      }

      return { ...s, cards: newCards, flippedIndices: newFlipped, isStarted };
    });
  }, []);

  const resetGame = useCallback((difficulty?: Difficulty) => {
    lockRef.current = false;
    setState(s => makeInitialState(difficulty ?? s.difficulty));
  }, []);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    lockRef.current = false;
    setState(makeInitialState(difficulty));
  }, []);

  return { state, flipCard, resetGame, setDifficulty };
}
