<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  size: string;
}>();

const spinnerSize = computed(() => `${props.size}rem`);
</script>

<template>
  <div
    class="border-2 border-gray-300 border-t-primary border-l-transparent rounded-full animate-spin"
    :style="{ width: spinnerSize, height: spinnerSize }"
  ></div>
</template>
