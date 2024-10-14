import Table from "../Table/Table";
import "./gameStatistics.scss";
import useCounter from "../../hooks/useCounter";
import { useGameStatisticsStore } from "../../store/gameStatisticsStore";
import { formatGameDuration } from "../../utils/formatGameDuration";

const GameStatistics = () => {
  const score = useGameStatisticsStore((state) => state.matchedPairs);
  const attempts = useGameStatisticsStore((state) => state.numberOfAttempts);
  const revealedTiles = useGameStatisticsStore((state) => state.revealedTiles);

  const counter = useCounter();

  return (
    <div className="gameStatistics-container">
      <div className="statistics-container">
        <h2>Score: {score}</h2>
        <h2>Attempts: {attempts}</h2>
        <h2>Time elapsed: {formatGameDuration(counter)}</h2>
        <h2>Revealed tiles: {revealedTiles}</h2>
      </div>
      <div className="history-container">
        <h3>Game History</h3>
        <div className="table-container">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default GameStatistics;
