<script setup lang="ts">
const props = defineProps<{
  size: string;
}>();

const spinnerSize = `${props.size}rem`;
</script>

<template>
  <div
    class="border-2 border-gray-300 border-t-primary border-l-transparent rounded-full animate-spin"
    :style="{ width: spinnerSize, height: spinnerSize }"
  ></div>
</template>
