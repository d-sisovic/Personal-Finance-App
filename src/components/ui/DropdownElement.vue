<script setup lang="ts">
import { ref } from 'vue';
import DropdownMenu from './DropdownMenu.vue';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { useClickOutside } from '@/hooks/useClickOutside';

const props = defineProps<{
  heading: string;
  imagePath: string;
  dropdownItems: string[];
  onSelectItem: (value: string) => void;
}>();

const { isDesktop } = useIsDesktop();

const dropdownRef = ref<HTMLElement | null>(null);
const selectedValueRef = ref<string>(isDesktop ? props.dropdownItems[0] : '');

const { onToggleDropdown, dropdownVisibleRef } = useClickOutside(dropdownRef);

const images = import.meta.glob('@/assets/images/*', { eager: true });

const imageSrc =
  (images[`/src/assets/images/${props.imagePath}`] as Record<string, string>)?.default || '';

const selectDropdownItems = props.dropdownItems.map((item) => ({ label: item, value: item }));

const handleSelectItem = (value: string) => {
  props.onSelectItem(value);

  dropdownVisibleRef.value = false;

  selectedValueRef.value = value;
};
</script>

<template>
  <div class="relative" ref="dropdownRef">
    <img
      :src="imageSrc"
      :alt="imagePath"
      class="cursor-pointer"
      @click="onToggleDropdown"
      v-if="!isDesktop"
    />

    <div class="inline-flex gap-2 flex-wrap items-center" @click="onToggleDropdown" v-else>
      <span class="text-[0.88rem] text-[var(--grey-500)]">{{ heading }}</span>

      <div
        class="py-3 px-5 border-[0.06rem] border-[#98908b] rounded-[0.5rem] bg-white inline-flex items-center gap-4 cursor-pointer"
      >
        {{ selectedValueRef }}

        <img src="@/assets/images/icon-caret-down.svg" alt="arrow-down" />
      </div>
    </div>

    <DropdownMenu
      :heading="heading"
      :items="selectDropdownItems"
      :selectedValue="selectedValueRef"
      @select="handleSelectItem"
      v-if="dropdownVisibleRef"
    />
  </div>
</template>
