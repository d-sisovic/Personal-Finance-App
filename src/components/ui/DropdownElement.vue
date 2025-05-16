<script setup lang="ts">
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps<{
  heading: string;
  imagePath: string;
  dropdownItems: string[];
  onSelectItem: (value: string) => void;
}>();

const { isDesktop } = useIsDesktop();

const selectedValueRef = ref<string>(isDesktop ? props.dropdownItems[0] : '');
const dropdownVisibleRef = ref<boolean>(false);
const dropdownRef = ref<HTMLElement | null>(null);

const images = import.meta.glob('@/assets/images/*', { eager: true });

const imageSrc =
  (images[`/src/assets/images/${props.imagePath}`] as Record<string, string>)?.default || '';

const arrowDownSrc =
  (images[`/src/assets/images/icon-caret-down.svg`] as Record<string, string>)?.default || '';

const selectDropdownItems = props.dropdownItems.map((item) => ({ label: item, value: item }));

const toggleDropdownVisibility = () => {
  dropdownVisibleRef.value = !dropdownVisibleRef.value;
};

const handleClickOutside = (event: MouseEvent) => {
  if (!(dropdownRef.value && !dropdownRef.value.contains(event.target as Node))) return;

  dropdownVisibleRef.value = false;
};

const handleSelectItem = (value: string) => {
  props.onSelectItem(value);

  dropdownVisibleRef.value = false;

  selectedValueRef.value = value;
};

const ulClass = computed(() => {
  const topStyle = isDesktop ? '' : 'top-[1.781rem]';

  return `absolute rounded-[0.5rem] shadow-[0rem_0.25rem_1.5rem_0rem_rgba(0,0,0,0.25)] py-3 px-5 bg-white max-h-[18.75rem] min-w-[7.125rem] overflow-y-auto right-0 ${topStyle}`;
});

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="relative" ref="dropdownRef">
    <img
      :src="imageSrc"
      :alt="imagePath"
      class="cursor-pointer"
      @click="toggleDropdownVisibility"
      v-if="!isDesktop"
    />

    <div class="inline-flex gap-2 flex-wrap items-center" @click="toggleDropdownVisibility" v-else>
      <span class="text-[0.88rem] text-[var(--grey-500)]">{{ heading }}</span>

      <div
        class="py-3 px-5 border-[0.06rem] border-[#98908b] rounded-[0.5rem] bg-white inline-flex items-center gap-4 cursor-pointer"
      >
        {{ selectedValueRef }}

        <img :src="arrowDownSrc" alt="arrow-down" />
      </div>
    </div>

    <ul :class="ulClass" v-if="dropdownVisibleRef">
      <li
        class="text-[0.88rem] text-[#98908B] whitespace-nowrap"
        @click="() => handleSelectItem('')"
        v-if="!isDesktop"
      >
        {{ heading }}
        <div class="my-3 border-[0.06rem] border-[#F2F2F2]"></div>
      </li>

      <li
        v-for="({ label, value }, index) in selectDropdownItems"
        :key="value"
        :class="`cursor-pointer text-[0.88rem] text-[#201F24] whitespace-nowrap ${selectedValueRef === value ? 'font-bold' : ''}`"
        @click="() => handleSelectItem(value)"
      >
        {{ label }}
        <div
          class="my-3 border-[0.06rem] border-[#F2F2F2]"
          v-if="selectDropdownItems.length !== index + 1"
        ></div>
      </li>
    </ul>
  </div>
</template>
