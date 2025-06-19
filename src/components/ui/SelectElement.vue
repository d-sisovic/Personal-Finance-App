<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import type { IDropdownValue } from '@/ts/interfaces/dropdown-item.model';

const props = defineProps<{
  label: string;
  dropdownValues: IDropdownValue[];
  preselectedItem: IDropdownValue | null;

  usedValues?: string[];
}>();

const emits = defineEmits(['setValue']);

const dropdownVisibleRef = ref<boolean>(false);
const dropdownRef = ref<HTMLElement | null>(null);
const colorClassRef = ref<string>(props.preselectedItem?.color || '');
const selectedItem = ref<IDropdownValue | null>(props.preselectedItem);

const onToggleDropdownVisibility = () => (dropdownVisibleRef.value = !dropdownVisibleRef.value);

const handleClickOutside = (event: MouseEvent) => {
  if (!(dropdownRef.value && !dropdownRef.value.contains(event.target as Node))) return;

  dropdownVisibleRef.value = false;
};

const onSelectItem = (item: IDropdownValue) => {
  if (props.usedValues?.includes(item?.color || item.value || '')) return;

  onToggleDropdownVisibility();

  selectedItem.value = item;

  colorClassRef.value = item.color || '';
};

const images = import.meta.glob('@/assets/images/*', { eager: true });

const arrowImageSrc =
  (images['/src/assets/images/icon-caret-down.svg'] as Record<string, string>)?.default || '';

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

watch(
  selectedItem,
  (item: IDropdownValue | null) => {
    emits('setValue', !item ? null : item.value);
  },
  { immediate: true },
);
</script>

<template>
  <div ref="dropdownRef">
    <div>
      <label v-if="label" class="text-[var(--grey-500)] text-xs font-bold leading-[150%]">
        {{ label }}
      </label>

      <div
        class="w-full py-3 px-5 mt-1 border-[0.06rem] border-[var(--beige-500)] rounded-[0.5rem] text-[0.88rem] leading-[137%] flex flex-wrap items-center justify-between cursor-pointer"
        @click="onToggleDropdownVisibility"
      >
        <div :class="colorClassRef ? 'inline-flex items-center gap-3' : ''">
          <span :class="colorClassRef ? `h-4 w-4 rounded-full block ${colorClassRef}` : ''"></span>

          <span v-if="selectedItem">{{ selectedItem.label }}</span>
        </div>

        <img :src="arrowImageSrc" alt="arrow" />
      </div>
    </div>

    <div
      class="my-4 px-5 py-3 rounded-lg shadow-custom max-h-[18.75rem] overflow-y-auto"
      v-if="dropdownVisibleRef"
    >
      <div class="cursor-pointer" v-for="(item, index) in dropdownValues" :key="item.value">
        <div class="flex items-center justify-between" @click="onSelectItem(item)">
          <div
            :class="[
              item.color ? 'inline-flex items-center gap-3' : '',
              usedValues?.includes(item.color || item.value || '') ? 'opacity-20' : '',
            ]"
          >
            <span class="h-4 w-4 block rounded-full" :class="item.color" v-if="item.color"></span>

            <span class="text-[0.88rem] leading-[150%]">{{ item.label }}</span>
          </div>

          <span
            class="text-[0.75rem] text-[var(--grey-500)]"
            v-if="usedValues?.includes(item.color || item.value || '')"
          >
            Already used
          </span>
        </div>

        <div
          class="h-[1px] w-full my-3 bg-[var(--grey-100)]"
          v-if="dropdownValues.length - 1 !== index"
        ></div>
      </div>
    </div>
  </div>
</template>
