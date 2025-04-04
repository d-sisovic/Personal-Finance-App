import { defineStore } from 'pinia';

const images = [
  'emma-richardson.jpg',
  'savory-bites-bistro.jpg',
  'daniel-carter.jpg',
  'sun-park.jpg',
  'urban-services-hub.jpg',
];

const names = [
  'Emma Richardson',
  'Savory Bites Bistro',
  'Daniel Carter',
  'Sun Park',
  'Urban Services Hub',
];

const categories = ['Personal care', 'Lifestyle', 'General', 'Bills', 'Transportation'];

const getRandomItem = <T>(data: Array<T>) => {
  return data[Math.floor(Math.random() * data.length)];
};

const getRandomValue = () => {
  return +(Math.random() * 200 - 100).toFixed(2); // Random value between -100 and 100
};

const getRandomDate = () => {
  const startDate = new Date(2024, 7, 1); // August 1, 2024
  const endDate = new Date(2024, 7, 31); // August 31, 2024
  const randomTime =
    startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  const randomDate = new Date(randomTime);

  return `${randomDate.getDate()} Aug 2024`;
};

const transactions = Array.from({ length: 10 }, () => ({
  image: getRandomItem(images),
  name: getRandomItem(names),
  category: getRandomItem(categories),
  value: getRandomValue(),
  date: getRandomDate(),
}));

export const useTransactionStore = defineStore('transaction', {
  state: () => ({ transactions }),
  actions: {},
});
