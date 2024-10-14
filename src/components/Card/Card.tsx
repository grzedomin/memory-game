import "./card.scss";
import { HiQuestionMarkCircle } from "react-icons/hi";

interface CardProps {
  onClick: (id: number) => void;
  id: number;
  isFlipped?: boolean;
  src: string;
  alt: string;
}

const Card = ({ onClick, id, isFlipped, src, alt }: CardProps) => {
  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={() => onClick(id)}
    >
      <div className="card-back">
        <HiQuestionMarkCircle size={50} />
      </div>
      <div className="card-front">{isFlipped && <img src={src} alt={alt} />}</div>
    </div>
  );
};

export default Card;
