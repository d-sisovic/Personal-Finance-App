<script lang="ts" setup>
defineProps<{
  label: string;
  color: string;
  value: string;
}>();
</script>

<template>
  <div
    class="rounded-lg bg-[var(--beige-100)] py-5 px-4 flex justify-between flex-wrap items-center gap-4 leading-[150%] text-[0.88rem]"
    :style="{ borderLeft: `4px solid ${color}` }"
  >
    <span class="text-[var(--grey-500)]">{{ label }}</span>

    <span class="font-bold text-[var(--grey-900)]">{{ value }}</span>
  </div>
</template>
