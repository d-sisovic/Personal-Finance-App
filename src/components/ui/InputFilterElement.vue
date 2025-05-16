<script setup lang="ts">
import { useDebouncedEmit } from '@/hooks/useDebouncedEmit';

withDefaults(
  defineProps<{
    inputClass?: string;
    placeholder?: string;
  }>(),
  {
    placeholder: '',
  },
);

const emit = defineEmits(['update-filter-input' as string]);
const debouncedEmit = useDebouncedEmit(emit, 'update-filter-input', 300);
</script>

<template>
  <div class="relative">
    <input
      type="text"
      :class="inputClass"
      :placeholder="placeholder"
      @input="debouncedEmit(($event.target as HTMLInputElement).value)"
      class="py-3 px-5 rounded-[0.5rem] border-[#98908B] border text-[0.88rem] text-[#98908B] pr-[3.25rem] w-[13.438rem] outline-none"
    />

    <img
      src="@/assets/images/icon-search.svg"
      alt="search"
      class="absolute right-[1.25rem] top-1/2 -translate-y-1/2"
    />
  </div>
</template>
