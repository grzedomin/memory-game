export const formatGameDuration = (seconds: number): string => {
    const roundedSeconds = Math.floor(seconds);
    const minutes = Math.floor(roundedSeconds / 60);
    const remainingSeconds = roundedSeconds % 60;

    return minutes > 0
        ? `${minutes}:${remainingSeconds.toString().padStart(2, '0')} min`
        : `${roundedSeconds} seconds`;
};