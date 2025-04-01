<script setup lang="ts">
import { useRootStore } from '@/stores/root';
import HomeContent from '@/components/home/HomeContent.vue';
import FooterElement from '@/components/ui/FooterElement.vue';
import SidenavElement from '@/components/ui/SidenavElement.vue';

const rootStore = useRootStore();
</script>

<template>
  <div class="bg-[var(--beige-100)] desktop:flex desktop:flex-row">
    <SidenavElement class="hidden desktop:block" />

    <div
      :class="`flex-1 ${!rootStore.shrinkedSidebar ? 'desktop:ml-[18.75rem]' : 'desktop:ml-[5.5rem]'}`"
    >
      <HomeContent />

      <FooterElement />
    </div>
  </div>
</template>
