import { create } from "zustand";

type GameStatus = "idle" | "start" | "end";
type DifficultyLevel = "none" | "easy" | "medium" | "hard";

type State = {
  gameStatus: GameStatus;
  isGameActive: boolean;
  difficultyLevel: DifficultyLevel;

  setGameStatus: (newStatus: GameStatus) => void;
  setDifficultyLevel: (level: DifficultyLevel) => void;
  setIsGameActive: (isActive: boolean) => void;
};

export const useAppStore = create<State>((set) => ({
  gameStatus: "idle",
  isGameActive: false,
  revealedTiles: 0,
  matchedPairs: 0,
  numberOfAttempts: 0,
  startTime: undefined,
  elapsedTime: 0,
  difficultyLevel: "none",
  setIsGameActive: (isActive: boolean) =>
    set(() => ({ isGameActive: isActive })),
  setDifficultyLevel: (level: DifficultyLevel) =>
    set(() => ({ difficultyLevel: level })),
  setGameStatus: (newStatus: GameStatus) =>
    set(() => ({ gameStatus: newStatus })),
}));
