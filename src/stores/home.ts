import { defineStore } from 'pinia';

export const useHomeStore = defineStore('home', {
  state: () => ({
    balanceOverview: {
      income: 3814.25,
      expenses: 1700.5,
      currentBalance: 4836,
    },
    pots: {
      totalSaved: 850,
      gift: 40,
      savings: 158,
      concertTicket: 100,
      newLaptop: 10,
    },
    transactions: [
      {
        image: 'emma-richardson.jpg',
        name: 'Emma Richardson',
        value: 75.5,
        date: '19 Aug 2024',
      },
      {
        image: 'savory-bites-bistro.jpg',
        name: 'Savory Bites Bistro',
        value: -55.5,
        date: '19 Aug 2024',
      },
      {
        image: 'daniel-carter.jpg',
        name: 'Daniel Carter',
        value: -42.3,
        date: '18 Aug 2024',
      },
      {
        image: 'sun-park.jpg',
        name: 'Sun Park',
        value: 120.0,
        date: '17 Aug 2024',
      },
      {
        image: 'urban-services-hub.jpg',
        name: 'Urban Services Hub',
        value: -65,
        date: '17 Aug 2024',
      },
    ],
    budgets: {
      entertainment: 50,
      bills: 750,
      diningOut: 75,
      personalCare: 100,
    },
    budgetsChart: {
      current: 338,
      limit: 975,
      values: [50, 750, 75, 100],
    },
    recurring: {
      paid: 190.0,
      totalUpcoming: 194.98,
      dueSoon: 59.98,
    },
  }),
  actions: {},
});
