<script setup lang="ts">
import { provide, ref } from 'vue';
import { GLOBAL_VARS } from '@/ts/enums/global-vars.enum';
import RootContent from '@/components/root/RootContent.vue';
import SidenavElement from '@/components/ui/SidenavElement.vue';

const shrinkedSidebarRef = ref<boolean>(false);

provide(GLOBAL_VARS.SHRINKED_SIDEBAR, shrinkedSidebarRef);
</script>

<template>
  <div class="bg-[var(--beige-100)] desktop:flex desktop:flex-row min-h-screen">
    <SidenavElement class="hidden desktop:block" />

    <RootContent />
  </div>
</template>
