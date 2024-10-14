import { useEffect } from "react";
import { useAppStore } from "../store/appStore";
import { useGameStatisticsStore } from "../store/gameStatisticsStore";

const MILISECONDS_IN_SECOND = 1000;

const useCounter = () => {
  const gameStatus = useAppStore((state) => state.gameStatus);

  const startTime = useGameStatisticsStore((state) => state.startTime);
  const elapsedTime = useGameStatisticsStore((state) => state.elapsedTime);
  const setElapsedTime = useGameStatisticsStore(
    (state) => state.setElapsedTime
  );

  useEffect(() => {
    if (gameStatus === "end" || "idle") {
      setElapsedTime(0);
    }

    if (startTime && gameStatus !== "end") {
      const interval = setInterval(() => {
        const currentTime = new Date();
        const elapsed = Math.floor(
          (currentTime.getTime() - new Date(startTime).getTime()) /
            MILISECONDS_IN_SECOND
        );
        setElapsedTime(elapsed);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, gameStatus]);

  return elapsedTime;
};

export default useCounter;
