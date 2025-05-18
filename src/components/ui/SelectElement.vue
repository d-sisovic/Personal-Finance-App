<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

interface IDropdownValue {
  label: string;
  value: string;
  color?: string;
}

const props = defineProps<{
  label: string;
  preselectedItem: IDropdownValue;
  dropdownValues: IDropdownValue[];
  usedValues: string[];
  preselectedColorClass?: string;
}>();

const emit = defineEmits(['setValue']);

const dropdownVisibleRef = ref<boolean>(false);
const dropdownRef = ref<HTMLElement | null>(null);
const selectedItem = ref<IDropdownValue>(props.preselectedItem);

const onToggleDropdownVisibility = () => (dropdownVisibleRef.value = !dropdownVisibleRef.value);

const handleClickOutside = (event: MouseEvent) => {
  if (!(dropdownRef.value && !dropdownRef.value.contains(event.target as Node))) return;

  dropdownVisibleRef.value = false;
};

const onSelectItem = (item: IDropdownValue) => {
  if (props.usedValues.includes(item.value)) return;

  emit('setValue', item.value);

  onToggleDropdownVisibility();

  selectedItem.value = item;
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
        <div :class="preselectedColorClass ? 'inline-flex items-center gap-3' : ''">
          <span :class="preselectedColorClass"></span>

          <span>{{ selectedItem.label }}</span>
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
              usedValues.includes(item.value) ? 'opacity-20' : '',
            ]"
          >
            <span class="h-4 w-4 block rounded-full" :class="item.color" v-if="item.color"></span>

            <span class="text-[0.88rem] leading-[150%]">{{ item.label }}</span>
          </div>

          <span
            class="text-[0.75rem] text-[var(--grey-500)]"
            v-if="usedValues.includes(item.value)"
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
