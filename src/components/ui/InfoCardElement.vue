<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    label: string;
    value: string;
    isLightMode?: boolean;
  }>(),
  {
    isLightMode: true,
  },
);

const cardClass = computed(() =>
  props.isLightMode
    ? 'bg-[var(--white)] text-[var(--grey-900)]'
    : 'bg-[var(--grey-900)] text-[var(--white)]',
);
</script>

<template>
  <div
    class="rounded-xl p-5 flex flex-col gap-[0.75rem] max-w-[21.438rem] desktop:p-6 desktop:max-w-[21.125rem]"
    :class="cardClass"
  >
    <h3 class="leading-[150%] font-normal text-[0.88rem]">{{ label }}</h3>

    <span class="leading-[120%] font-bold text-[2rem] break-all">{{ value }}</span>
  </div>
</template>
