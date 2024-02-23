export const getHoursDifference = (timestamp: Date) => {
  const now = new Date();
  const timeDifference = now.getTime() - new Date(timestamp).getTime();
  const hoursDifference = timeDifference / (1000 * 3600);
  return hoursDifference;
};

export const toFixedIfNecessary = (value: string, precision = 2) => {
  return +parseFloat(value).toFixed(precision);
};
