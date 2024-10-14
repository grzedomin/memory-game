import bear from "../images/bear.png";
import panda from "../images/panda.png";
import elephant from "../images/elephant.png";
import deer from "../images/deer.png";
import fox from "../images/fox.png";
import zebra from "../images/zebra.png";
import monkey from "../images/monkey.png";
import horse from "../images/horse.png";

interface Card {
    id: number;
    src: string;
    flipped: boolean;
    alt: string;
}

export const cardListEasy: Card[] = [
    { id: 1, src: bear, flipped: false, alt: 'Bear' },
    { id: 2, src: deer, flipped: false, alt: 'Deer' },
    { id: 3, src: elephant, flipped: false, alt: 'Elephant' },
    { id: 4, src: panda, flipped: false, alt: 'Panda' },
];

export const cardListMedium: Card[] = [
    ...cardListEasy,
    { id: 5, src: fox, flipped: false, alt: 'Fox' },
    { id: 6, src: zebra, flipped: false, alt: 'Zebra' },
];

export const cardListHard: Card[] = [
    ...cardListMedium,
    { id: 7, src: monkey, flipped: false, alt: 'Monkey' },
    { id: 8, src: horse, flipped: false, alt: 'Horse' },
];