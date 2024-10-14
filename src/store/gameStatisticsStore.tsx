import { create } from "zustand";

type State = {
  revealedTiles: number;
  matchedPairs: number;
  numberOfAttempts: number;
  startTime: Date | null;
  elapsedTime: number;

  incrementMatchedPairs: () => void;
  incrementNumberOfAttempts: () => void;
  setRevealedTiles: () => void;
  setStartTime: (time: Date | null) => void;
  resetGameScore: () => void;
  resetUserAttempts: () => void;
  setElapsedTime: (time: number) => void;
};

export const useGameStatisticsStore = create<State>((set) => ({
  revealedTiles: 0,
  matchedPairs: 0,
  numberOfAttempts: 0,
  startTime: null,
  elapsedTime: 0,

  incrementMatchedPairs: () =>
    set((state: State) => ({ matchedPairs: state.matchedPairs + 1 })),
  incrementNumberOfAttempts: () =>
    set((state: State) => ({ numberOfAttempts: state.numberOfAttempts + 1 })),
  setRevealedTiles: () =>
    set((state: State) => ({
      revealedTiles: state.matchedPairs === 0 ? 0 : state.matchedPairs * 2,
    })),
  setStartTime: (time) => set({ startTime: time }),
  resetGameScore: () => set(() => ({ matchedPairs: 0 })),
  resetUserAttempts: () => set(() => ({ numberOfAttempts: 0 })),
  setElapsedTime: (time) => set(() => ({ elapsedTime: time })),
}));
