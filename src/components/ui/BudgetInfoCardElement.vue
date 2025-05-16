<script setup lang="ts">
defineProps<{
  label: string;
  color: string;
  total: string;
  current: string;
}>();
</script>

<template>
  <div class="flex items-center justify-between flex-wrap">
    <div class="inline-flex items-center gap-4">
      <span class="h-[1.313rem] w-1 rounded-[0.5rem] block" :class="color"></span>

      <span class="text-[var(--grey-500)] text-[0.88rem]">{{ label }}</span>
    </div>

    <div class="inline-flex items-center gap-2">
      <span class="font-bold text-[1rem]">{{ current }}</span>

      <span class="text-[var(--grey-500)] text-[0.75rem]">of {{ total }}</span>
    </div>
  </div>
</template>
