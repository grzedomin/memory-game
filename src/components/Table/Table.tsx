import { getGameHistoryFromLocalStorage } from "../../utils/localStorage";
import { formatGameDuration } from "../../utils/formatGameDuration";

const TABLE_HEADERS = ["Attempts", "Game duration", "Date"];

interface GameProps {
  attempts: number;
  gameDuration: number;
  day: string;
}

const Table = () => {
  const gameHistory = getGameHistoryFromLocalStorage();

  return (
    <>
      {gameHistory.length > 0 ? (
        <table>
          <thead>
            <tr>
              {TABLE_HEADERS.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gameHistory.map((game: GameProps, index: number) => (
              <tr key={index}>
                <td>{game.attempts}</td>
                <td>{formatGameDuration(game.gameDuration)}</td>
                <td>{game.day}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No games played yet</p>
      )}
    </>
  );
};

export default Table;
