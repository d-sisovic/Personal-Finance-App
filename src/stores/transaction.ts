import { defineStore } from 'pinia';
import { getRandomDate, getRandomItem, getRandomValue } from '@/util';

const sortFunctions: Record<
  string,
  (a: (typeof transactions)[0], b: (typeof transactions)[0]) => number
> = {
  latest: (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  oldest: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  'a to z': (a, b) => a.name.localeCompare(b.name),
  'z to a': (a, b) => b.name.localeCompare(a.name),
  highest: (a, b) => b.value - a.value,
  lowest: (a, b) => a.value - b.value,
};

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

const transactions = Array.from({ length: 10 }, (_, index: number) => ({
  uuid: `${index}`,
  image: getRandomItem(images),
  name: getRandomItem(names),
  category: getRandomItem(categories),
  value: getRandomValue(),
  date: getRandomDate(),
}));

export const useTransactionStore = defineStore('transaction', {
  state: () => ({ transactions, searchKeyword: '', sort: '', category: '' }),
  actions: {
    onSetSearchFilter(searchKeyword: string) {
      this.searchKeyword = searchKeyword;
    },
    onSetSort(sort: string) {
      this.sort = sort;
    },
    onSetCategory(category: string) {
      this.category = category;
    },
  },
  getters: {
    filteredTransactions(state) {
      const sort = state.sort.toLowerCase();
      const stateCategory = state.category.toLowerCase();
      const searchKeyword = state.searchKeyword.trim().toLowerCase();

      const filteredTransactions = state.transactions.filter(({ name, category }) => {
        const nameMatches = !searchKeyword || name.toLowerCase().includes(searchKeyword);
        const categoryMatches =
          !stateCategory ||
          stateCategory === 'all transactions' ||
          category.toLowerCase() === stateCategory;

        return nameMatches && categoryMatches;
      });

      return sortFunctions[sort]
        ? [...filteredTransactions].sort(sortFunctions[sort])
        : filteredTransactions;
    },
  },
});
