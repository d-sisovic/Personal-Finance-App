import { defineStore } from 'pinia';
import { getRandomDate, getRandomItem, getRandomValue } from '@/util';

const names = ['Papa Software', 'Quebec Services', 'Romeo Cloud Service'];
const images = ['bytewise.jpg', 'urban-services-hub.jpg', 'nimbus-data-storage.jpg'];

const spendings = Array.from({ length: 3 }, (_, index: number) => ({
  uuid: `${index}`,
  image: getRandomItem(images),
  name: getRandomItem(names),
  value: getRandomValue(),
  date: getRandomDate(),
}));

const budgetItems = [
  {
    uuid: '0',
    label: 'Entertainment',
    color: 'bg-[var(--green)]',
    spent: 25,
    maxAllowed: 50,
    spendings,
  },
  {
    uuid: '1',
    label: 'Bills',
    color: 'bg-[var(--cyan)]',
    spent: 250,
    maxAllowed: 750,
    spendings,
  },
  {
    uuid: '2',
    label: 'Dining Out',
    color: 'bg-[var(--yellow)]',
    spent: 67,
    maxAllowed: 75,
    spendings,
  },
  {
    uuid: '3',
    label: 'Personal Care',
    color: 'bg-[var(--navy)]',
    spent: 65,
    maxAllowed: 100,
    spendings,
  },
];

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    budgetsChart: {
      current: 407,
      limit: 975,
      values: [25, 250, 67, 65],
    },
    spendings,
    budgetItems,
  }),
  actions: {
    addNewBudget(color: string, maxAllowed: number, label: string) {
      const uuid = `${this.$state.budgetItems.length}`;

      this.$state.budgetItems = [
        {
          uuid,
          label,
          color,
          spent: 0,
          spendings,
          maxAllowed,
        },
        ...this.$state.budgetItems,
      ];
    },
  },
});
