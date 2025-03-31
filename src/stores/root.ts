import { defineStore } from 'pinia';

export const useRootStore = defineStore('root', {
  state: () => ({ shrinkedSidebar: false }),
  actions: {
    handleToggleMenuWidth() {
      this.shrinkedSidebar = !this.shrinkedSidebar;
    },
  },
});
