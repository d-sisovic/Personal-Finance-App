<script setup lang="ts">
import { computed } from 'vue';
import { useRootStore } from '@/stores/root';
import HomeContent from '@/components/home/HomeContent.vue';
import FooterElement from '@/components/ui/FooterElement.vue';
import SidenavElement from '@/components/ui/SidenavElement.vue';

const rootStore = useRootStore();

const notShrinkedSidebar = computed(() => !rootStore.shrinkedSidebar);
</script>

<template>
  <div class="bg-[var(--beige-100)] desktop:flex desktop:flex-row">
    <SidenavElement class="hidden desktop:block" />

    <div :class="`flex-1 ${notShrinkedSidebar ? 'desktop:ml-[18.75rem]' : 'desktop:ml-[5.5rem]'}`">
      <HomeContent />

      <FooterElement />
    </div>
  </div>
</template>
