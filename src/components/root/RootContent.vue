<script setup lang="ts">
import { inject, type Ref } from 'vue';
import FooterElement from '../ui/FooterElement.vue';
import { GLOBAL_VARS } from '@/ts/enums/global-vars.enum';

const shrinkedSidebarRef = inject<Ref<boolean>>(GLOBAL_VARS.SHRINKED_SIDEBAR)!;
</script>

<template>
  <div
    :class="`flex flex-col justify-between flex-1 relative min-h-[inherit] ${!shrinkedSidebarRef ? 'desktop:ml-[18.75rem]' : 'desktop:ml-[5.5rem]'}`"
  >
    <router-view></router-view>

    <FooterElement />
  </div>
</template>
