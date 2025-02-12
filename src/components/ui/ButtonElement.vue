<script setup lang="ts">
defineProps<{
  label: string;
  disabled?: boolean;
  clickHandler: () => void;
}>();
</script>

<template>
  <button
    class="w-full p-4 rounded-lg bg-[var(--grey-900)] text-white text-[0.88rem] font-bold leading-[150%] cursor-pointer disabled:cursor-default disabled:opacity-50 inline-flex justify-center items-center gap-2"
    :disabled="disabled"
    @click="clickHandler"
  >
    {{ label }}

    <slot></slot>
  </button>
</template>
