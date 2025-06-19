<template>
  <ul :class="ulClass">
    <li
      class="text-[0.88rem] text-[#98908B] whitespace-nowrap"
      @click="() => onSelectItem('')"
      v-if="!isDesktop"
    >
      {{ heading }}
      <div class="my-3 border-[0.06rem] border-[#F2F2F2]"></div>
    </li>

    <li
      v-for="({ label, value, color }, index) in items"
      :key="value"
      :class="`cursor-pointer text-[0.88rem] text-[#201F24] whitespace-nowrap ${selectedValue === value ? 'font-bold' : ''} ${color}`"
      @click="() => onSelectItem(value)"
    >
      {{ label }}
      <div class="my-3 border-[0.06rem] border-[#F2F2F2]" v-if="items.length !== index + 1"></div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import type { IDropdownValue } from '@/ts/interfaces/dropdown-item.model';

defineProps<{
  heading: string;
  selectedValue: string;
  items: IDropdownValue[];
}>();

const emits = defineEmits(['select']);

const { isDesktop } = useIsDesktop();

const ulClass = computed(() => {
  const topStyle = isDesktop ? '' : 'top-[1.781rem]';

  return `absolute rounded-[0.5rem] shadow-[0rem_0.25rem_1.5rem_0rem_rgba(0,0,0,0.25)] py-3 px-5 bg-white max-h-[18.75rem] min-w-[7.125rem] overflow-y-auto right-0 ${topStyle}`;
});

const onSelectItem = (value: string) => emits('select', value);
</script>
