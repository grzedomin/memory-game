import { useAppStore } from "../../store/appStore";
import Button from "../Button/Button";
import "./difficultyLevels.scss";

const DifficultyLevels = () => {
  const difficultyLevels = ["easy", "medium", "hard"];

  const setDiffucultyLevel = useAppStore((state) => state.setDifficultyLevel);
  const setIsGameActive = useAppStore((state) => state.setIsGameActive);

  const onClick = (level: any) => {
    setDiffucultyLevel(level);
    setIsGameActive(true);
  };

  return (
    <div className="difficultyLevels-container">
      <h2>Select difficulty level</h2>
      <div className="buttons-container">
        {difficultyLevels?.map((level) => (
          <Button key={level} onClick={() => onClick(level)} text={level} />
        ))}
      </div>
    </div>
  );
};

export default DifficultyLevels;
