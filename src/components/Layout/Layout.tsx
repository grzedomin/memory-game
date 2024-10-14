import { useAppStore } from "../../store/appStore";
import Board from "../Board/Board";
import DifficultyLevels from "../DifficultyLevels/DifficultyLevels";
import GameStatistics from "../GameStatistics/GameStatistics";
import Header from "../Header";
import "./layout.scss";

const Layout = () => {
  const isGameActive = useAppStore((state) => state.isGameActive);

  return (
    <div className="container">
      <Header />
      <main>
        {!isGameActive ? (
          <DifficultyLevels />
        ) : (
          <div className="board-container">
            <Board />
            <GameStatistics />
          </div>
        )}
      </main>
      <footer>
        Copyright &copy;
        Grzegorz Domin
      </footer>
    </div>
  );
};

export default Layout;
