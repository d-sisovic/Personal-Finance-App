<script setup lang="ts">
defineProps<{
  progress: number;
  progressColor: string;
}>();
</script>

<template>
  <div class="bg-[var(--beige-100)] rounded-[0.25rem] w-full h-8 p-1 flex">
    <div
      class="w-full h-full rounded-[0.25rem]"
      :class="progressColor"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>
