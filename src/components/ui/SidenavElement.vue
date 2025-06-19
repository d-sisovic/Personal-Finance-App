<script setup lang="ts">
import { computed, inject, type Ref } from 'vue';
import FooterElement from './FooterElement.vue';
import { GLOBAL_VARS } from '@/ts/enums/global-vars.enum';

const shrinkedSidebarRef = inject<Ref<boolean>>(GLOBAL_VARS.SHRINKED_SIDEBAR)!;

const containerClass = computed(() =>
  shrinkedSidebarRef.value
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
      v-if="!shrinkedSidebarRef"
    />

    <img src="@/assets/images/logo-letter.svg" alt="logo-letter" class="mb-6" v-else />

    <FooterElement :desktopMode="true" @toggle-menu="shrinkedSidebarRef = !shrinkedSidebarRef" />
  </div>
</template>
