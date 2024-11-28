export const formatTime = (seconds: number) => {
  const value = Math.floor(seconds);
  const minutes = Math.floor(value / 60);
  const remainingSeconds = Math.floor(value % 60);

  const result = `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  return result;
};
