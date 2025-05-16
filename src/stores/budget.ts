import { defineStore } from 'pinia';

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
  }),
  actions: {},
});
