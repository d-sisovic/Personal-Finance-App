<script setup lang="ts">
import { computed } from 'vue';
import { useRootStore } from '@/stores/root';
import FooterElement from './FooterElement.vue';

const rootStore = useRootStore();

const shrinkedSidebar = computed(() => rootStore.shrinkedSidebar);

const containerClass = computed(() =>
  shrinkedSidebar.value
    ? 'max-w-[5.5rem] min-w-0 overflow-hidden h-screen bg-[var(--grey-900)] fixed left-0 top-0 bottom-0 rounded-r-[1rem]'
    : 'min-w-[18.75rem] h-screen bg-[var(--grey-900)] fixed left-0 top-0 bottom-0 rounded-r-[1rem]',
);
</script>

<template>
  <div :class="containerClass">
    <img
      src="@/assets/images/logo-large.svg"
      alt="expanded-logo"
      class="py-[2.5rem] px-[2rem]"
      v-if="!shrinkedSidebar"
    />

    <img src="@/assets/images/logo-letter.svg" alt="logo-letter" class="mb-6" v-else />

    <FooterElement :desktopMode="true" @toggle-menu="rootStore.handleToggleMenuWidth" />
  </div>
</template>
