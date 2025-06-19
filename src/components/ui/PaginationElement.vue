<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useIsDesktop } from '@/hooks/useIsDesktop';

const props = defineProps<{
  totalItems: number;
}>();

const getNumberOfPagesToRender = (isDesktop: boolean) => (isDesktop ? 5 : 2);

const getInitialPageValue = (isDesktop: boolean) => (isDesktop ? [1, 2, 3, 4, 5] : [1, 2]);

const emits = defineEmits(['selected-page']);

const { isDesktop } = useIsDesktop();

const selectedPageRef = ref<number>(1);
const availableDynamicPagesRef = ref<number[]>(getInitialPageValue(isDesktop.value));

const onSelectPage = (page: number) => (selectedPageRef.value = page);

const prevNextArrowStyle = computed(
  () => `cursor-pointer p-4 rounded-[0.5rem] border-[0.06rem] border-solid border-[#98908b] w-12 h-10 inline-flex items-center justify-center
${isDesktop.value ? 'w-auto' : ''}`,
);

const onPreviousPageClick = () => {
  if (selectedPageRef.value === 1) return;

  if (availableDynamicPagesRef.value.some((value) => selectedPageRef.value - 1 === value)) {
    selectedPageRef.value -= 1;
    return;
  }

  const [minimumValue] = availableDynamicPagesRef.value;
  const pagesToPresent = getNumberOfPagesToRender(isDesktop.value);

  if (minimumValue === selectedPageRef.value) {
    availableDynamicPagesRef.value = Array.from({ length: pagesToPresent }).map(
      (_, index) => minimumValue - (pagesToPresent - index),
    );

    selectedPageRef.value = minimumValue - pagesToPresent;
    return;
  }

  selectedPageRef.value = availableDynamicPagesRef.value[pagesToPresent - 1];
};

const onNextPageClick = () => {
  if (selectedPageRef.value === props.totalItems) return;

  if (availableDynamicPagesRef.value.some((value) => selectedPageRef.value + 1 === value)) {
    selectedPageRef.value += 1;
    return;
  }

  if (isDesktop.value) {
    onExpandPages();
    return;
  }

  selectedPageRef.value = props.totalItems;
};

const onExpandPages = () => {
  const pagesToPresent = getNumberOfPagesToRender(isDesktop.value);
  const biggestValueBeforeExpand = availableDynamicPagesRef.value[pagesToPresent - 1];

  if (props.totalItems - 1 === biggestValueBeforeExpand) return;

  availableDynamicPagesRef.value = Array.from({ length: pagesToPresent }).map(
    (_, index) => biggestValueBeforeExpand + index + 1,
  );

  selectedPageRef.value = biggestValueBeforeExpand + 1;
};

watch(selectedPageRef, (newValue) => emits('selected-page', newValue));

watch(isDesktop, (isDesktop) => (availableDynamicPagesRef.value = getInitialPageValue(isDesktop)));
</script>

<template>
  <div class="mt-6 gap-y-4 flex flex-wrap justify-between items-center">
    <div @click="onPreviousPageClick" :class="prevNextArrowStyle">
      <img src="@/assets/images/icon-caret-left.svg" alt="icon-caret-left" />

      <span v-if="isDesktop" class="ml-4 text-[0.88rem] leading-[150%]">Prev</span>
    </div>

    <div class="flex flex-wrap gap-1 tablet:gap-2">
      <div
        :class="`${page === selectedPageRef ? 'bg-[#201F24] text-white' : ''} cursor-pointer
      p-4 rounded-[0.5rem] border-[0.06rem] border-solid border-[#98908b] w-10 h-10 inline-flex items-center justify-center text-[0.88rem] text-[#201F24]`"
        v-for="page of availableDynamicPagesRef"
        :key="page"
        @click="onSelectPage(page as number)"
      >
        {{ page }}
      </div>
    </div>

    <template v-if="!isDesktop">
      <div
        @click="onExpandPages()"
        class="cursor-pointer p-4 rounded-[0.5rem] border-[0.06rem] border-solid border-[#98908b] w-10 h-10 inline-flex items-center justify-center text-[0.88rem] text-[#201F24]"
      >
        ...
      </div>

      <div
        @click="onSelectPage(totalItems)"
        :class="`${totalItems === selectedPageRef ? 'bg-[#201F24] text-white' : ''} cursor-pointer
       p-4 rounded-[0.5rem] border-[0.06rem] border-solid border-[#98908b] w-10 h-10 inline-flex items-center justify-center text-[0.88rem] text-[#201F24]`"
      >
        {{ totalItems }}
      </div>
    </template>

    <div @click="onNextPageClick" :class="prevNextArrowStyle">
      <span v-if="isDesktop" class="mr-4 text-[0.88rem] leading-[150%]">Next</span>

      <img src="@/assets/images/icon-caret-right.svg" alt="icon-caret-right" />
    </div>
  </div>
</template>
