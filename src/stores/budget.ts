import { defineStore } from 'pinia';
import { getRandomDate, getRandomItem, getRandomValue } from '@/util';

const images = ['bytewise.jpg', 'urban-services-hub.jpg', 'nimbus-data-storage.jpg'];

const names = ['Papa Software', 'Quebec Services', 'Romeo Cloud Service'];

const spendings = Array.from({ length: 3 }, (_, index: number) => ({
  uuid: `${index}`,
  image: getRandomItem(images),
  name: getRandomItem(names),
  value: getRandomValue(),
  date: getRandomDate(),
}));

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    budgetsChart: {
      current: 407,
      limit: 975,
      values: [25, 250, 67, 65],
    },
    summary: {
      billsCurrent: 250,
      billsTotal: 750,
      diningOutCurrent: 67,
      dinningOutTotal: 75,
      personalCareCurrent: 65,
      personalCareTotal: 100,
      entertainmentCurrent: 25,
      entertainmentTotal: 50,
    },
    spendings,
  }),
  actions: {},
});
