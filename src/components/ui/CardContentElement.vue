<script lang="ts" setup>
withDefaults(
  defineProps<{
    heading: string;
    actionLabel?: string;
  }>(),
  {
    actionLabel: 'See Details',
  },
);
</script>

<template>
  <div class="bg-[var(--white)] py-5 px-5 rounded-xl">
    <div class="flex justify-between flex-wrap gap-4">
      <h1 class="leading-[120%] font-bold text-[1.25rem] text-[var(--grey-900)]">{{ heading }}</h1>

      <span
        class="leading-[150%] font-normal text-[0.88rem] text-[var(--grey-500)] inline-flex items-center gap-4 cursor-pointer"
      >
        {{ actionLabel }}

        <img src="@/assets/images/icon-caret-right.svg" alt="caret-right" />
      </span>
    </div>

    <slot></slot>
  </div>
</template>
