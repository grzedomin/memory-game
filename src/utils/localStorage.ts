const localStorageKey = "gameScore";

export const saveGameHistoryInLocalStorage = (newGameHistory: any) => {
    const existingGameHistory = JSON.parse(localStorage.getItem(localStorageKey) || '[]') || [];
    const updatedGameHistory = [...existingGameHistory, newGameHistory];
    localStorage.setItem(localStorageKey, JSON.stringify(updatedGameHistory));
};

export const getGameHistoryFromLocalStorage = () =>
    JSON.parse(localStorage.getItem(localStorageKey) || '[]') || [];