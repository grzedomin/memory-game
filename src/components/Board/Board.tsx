import { useState, useEffect } from "react";
import { useAppStore } from "../../store/appStore";
import Card from "../Card/Card";
import "./board.scss";
import {
  cardListEasy,
  cardListMedium,
  cardListHard,
} from "../../assets/cardList";
import Button from "../Button/Button";
import { saveGameHistoryInLocalStorage } from "../../utils/localStorage";
import { useGameStatisticsStore } from "../../store/gameStatisticsStore";

const Board = () => {
  const doubledCardList = () => {
    if (useAppStore.getState().difficultyLevel === "easy") {
      return [...cardListEasy, ...cardListEasy];
    } else if (useAppStore.getState().difficultyLevel === "medium") {
      return [...cardListMedium, ...cardListMedium];
    } else if (useAppStore.getState().difficultyLevel === "hard") {
      return [...cardListHard, ...cardListHard];
    }
    return [];
  };

  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(shuffleArray(doubledCardList()));

  const [firstSelectedCard, setFirstSelectedCard] = useState<number | null>(
    null
  );
  const [secondSelectedCard, setSecondSelectedCard] = useState<number | null>(
    null
  );

  const gameStatus = useAppStore((state) => state.gameStatus);
  const setGameStatus = useAppStore((state) => state.setGameStatus);
  const setIsGameActive = useAppStore((state) => state.setIsGameActive);

  const incrementNumberOfAttempts = useGameStatisticsStore(
    (state) => state.incrementNumberOfAttempts
  );
  const setGameScore = useGameStatisticsStore(
    (state) => state.incrementMatchedPairs
  );
  const resetGameScore = useGameStatisticsStore(
    (state) => state.resetGameScore
  );
  const setRevealedTiles = useGameStatisticsStore(
    (state) => state.setRevealedTiles
  );
  const resetUserAttempts = useGameStatisticsStore(
    (state) => state.resetUserAttempts
  );
  const setStartTime = useGameStatisticsStore((state) => state.setStartTime);
  const startTime = useGameStatisticsStore((state) => state.startTime);
  const setElapsedTime = useGameStatisticsStore(
    (state) => state.setElapsedTime
  );

  const onClick = (index: number) => {
    setGameStatus("start");

    if (startTime === null) {
      setStartTime(new Date());
    }

    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, flipped: true } : card
      )
    );

    if (firstSelectedCard === null) {
      setFirstSelectedCard(index);
    } else if (secondSelectedCard === null) {
      setSecondSelectedCard(index);
      incrementNumberOfAttempts();
    }
  };

  useEffect(() => {
    if (firstSelectedCard !== null && secondSelectedCard !== null) {
      checkMatch();
    }
  }, [firstSelectedCard, secondSelectedCard]);

  const checkMatch = () => {
    if (firstSelectedCard !== null && secondSelectedCard !== null) {
      const firstCard = cards[firstSelectedCard];
      const secondCard = cards[secondSelectedCard];

      if (firstCard.id === secondCard.id) {
        setCards((prevCards) =>
          prevCards.map((card, index) =>
            index === firstSelectedCard || index === secondSelectedCard
              ? { ...card, flipped: true }
              : card
          )
        );
        setGameScore();
        setRevealedTiles();
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, index) =>
              index === firstSelectedCard || index === secondSelectedCard
                ? { ...card, flipped: false }
                : card
            )
          );
        }, 1000);
      }

      setFirstSelectedCard(null);
      setSecondSelectedCard(null);

      const allFlipped = cards.every((card) => card.flipped);
      if (allFlipped) {
        const endTime = new Date();
        if (startTime) {
          const gameDuration = (endTime.getTime() - startTime.getTime()) / 1000;

          saveGameHistoryInLocalStorage({
            attempts: useGameStatisticsStore.getState().numberOfAttempts,
            day: new Date().toLocaleDateString(),
            gameDuration,
          });
          setGameStatus("end");
        }
      }
    }
  };

  const resetGame = () => {
    setCards(
      shuffleArray(
        doubledCardList().map((card) => ({ ...card, flipped: false }))
      )
    );

    setFirstSelectedCard(null);
    setSecondSelectedCard(null);

    setStartTime(null);
    resetGameScore();
    resetUserAttempts();
  };

  const changeDifficultyLevel = () => {
    setIsGameActive(false);
    setGameStatus("end");
    setElapsedTime(0);
    setStartTime(null);
    resetGameScore();
    resetUserAttempts();
  };

  return (
    <>
      <div className="card-container">
        {cards.map((card, index) => (
          <Card
            key={index}
            id={index}
            onClick={() => onClick(index)}
            src={card.src}
            alt={card.alt}
            isFlipped={card.flipped}
          />
        ))}
      </div>
      <div className="buttons-container">
        {gameStatus !== "idle" && <Button onClick={resetGame} text="Reset" />}
        <Button onClick={changeDifficultyLevel} text="Go Back" />
      </div>
    </>
  );
};

export default Board;
