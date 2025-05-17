export const formatToNiceNumber = (value: number, minimumFractionDigits: number) =>
  `$${value.toLocaleString('en-US', { minimumFractionDigits, maximumFractionDigits: 2 })}`;

export const formatStringToNumber = (value: string) => parseFloat(value.replace('$', ''));

export const getRandomDate = () => {
  const startDate = new Date(2024, 7, 1); // August 1, 2024
  const endDate = new Date(2024, 7, 31); // August 31, 2024
  const randomTime =
    startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  const randomDate = new Date(randomTime);

  return `${randomDate.getDate()} Aug 2024`;
};

export const getRandomItem = <T>(data: Array<T>) => {
  return data[Math.floor(Math.random() * data.length)];
};

export const getRandomValue = () => {
  return +(Math.random() * 200 - 100).toFixed(2); // Random value between -100 and 100
};
