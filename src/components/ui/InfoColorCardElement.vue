<script lang="ts" setup>
defineProps<{
  label: string;
  value: string;
  color: string;
}>();
</script>

<template>
  <div class="flex gap-4 items-center flex-1 min-w-[calc(50%-0.5rem)] tablet:max-h-[2.688rem]">
    <div :class="color" class="w-1 h-[2.688rem] rounded-[0.5rem]"></div>

    <div>
      <h4 class="leading-[150%] font-normal text-[0.75rem] text-[var(--grey-500)]">{{ label }}</h4>

      <p class="mt-1 leading-[150%] font-bold text-[0.88rem] text-[var(--grey-900)] tablet:mt-1">
        {{ value }}
      </p>
    </div>
  </div>
</template>
