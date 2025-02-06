<script setup lang="ts">
defineProps<{
  label: string;
  disabled?: boolean;
  clickHandler: () => void;
}>();
</script>

<template>
  <button
    class="w-full p-4 rounded-lg bg-[#201f24] text-white text-[0.88rem] font-bold leading-[150%] cursor-pointer disabled:cursor-default"
    :disabled="disabled"
    @click="clickHandler"
  >
    {{ label }}
  </button>
</template>
