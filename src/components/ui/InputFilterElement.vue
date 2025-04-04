<script setup lang="ts">
withDefaults(
  defineProps<{
    placeholder?: string;
  }>(),
  {
    placeholder: '',
  },
);
</script>

<template>
  <div class="relative">
    <input
      type="text"
      :placeholder="placeholder"
      class="py-3 px-5 rounded-[0.5rem] border-[#98908B] border text-[0.88rem] text-[#98908B] pr-[3.25rem] w-[13.438rem] outline-none"
    />

    <img
      src="@/assets/images/icon-search.svg"
      alt="search"
      class="absolute left-[11.188rem] top-1/2 -translate-y-1/2"
    />
  </div>
</template>
