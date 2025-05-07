<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  imagePath: string;
  mobileHeading: string;
  dropdownItems: string[];
  onSelectItem: (value: string) => void;
}>();

const selectedValueRef = ref<string>('');
const dropdownVisibleRef = ref<boolean>(false);
const dropdownRef = ref<HTMLElement | null>(null);

const images = import.meta.glob('@/assets/images/*', { eager: true });

const imageSrc = computed(
  () => (images[`/src/assets/images/${props.imagePath}`] as Record<string, string>)?.default || '',
);

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
    />

    <ul
      class="absolute rounded-[0.5rem] shadow-[0rem_0.25rem_1.5rem_0rem_rgba(0,0,0,0.25)] py-3 px-5 bg-white max-h-[18.75rem] min-w-[7.125rem] overflow-y-auto right-0 top-[1.781rem]"
      v-if="dropdownVisibleRef"
    >
      <li
        class="text-[0.88rem] text-[#98908B] whitespace-nowrap"
        @click="() => handleSelectItem('')"
      >
        {{ mobileHeading }}
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
