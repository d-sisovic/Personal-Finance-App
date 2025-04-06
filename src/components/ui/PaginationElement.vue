<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  totalItems: number;
}>();

const emit = defineEmits(['selected-page']);

const selectedPageRef = ref<number>(1);
const availableDynamicPagesRef = ref<number[]>([1, 2]);

const onSelectPage = (page: number) => (selectedPageRef.value = page);

const onPreviousPageClick = () => {
  if (selectedPageRef.value === 1) return;

  if (availableDynamicPagesRef.value.some((value) => selectedPageRef.value - 1 === value)) {
    selectedPageRef.value -= 1;
    return;
  }

  const [minimumValue] = availableDynamicPagesRef.value;

  if (minimumValue === selectedPageRef.value) {
    availableDynamicPagesRef.value = [minimumValue - 2, minimumValue - 1];

    selectedPageRef.value = minimumValue - 2;
    return;
  }

  selectedPageRef.value = availableDynamicPagesRef.value[1];
};

const onNextPageClick = () => {
  if (selectedPageRef.value === props.totalItems) return;

  if (availableDynamicPagesRef.value.some((value) => selectedPageRef.value + 1 === value)) {
    selectedPageRef.value += 1;
    return;
  }

  selectedPageRef.value = props.totalItems;
};

const onExpandPages = () => {
  const [, biggestValueBeforeExpand] = availableDynamicPagesRef.value;

  if (props.totalItems - 1 === biggestValueBeforeExpand) return;

  availableDynamicPagesRef.value = [biggestValueBeforeExpand + 1, biggestValueBeforeExpand + 2];

  selectedPageRef.value = biggestValueBeforeExpand + 1;
};

watch(selectedPageRef, (newValue) => emit('selected-page', newValue));
</script>

<template>
  <div class="mt-6 flex flex-wrap justify-between items-center">
    <div
      @click="onPreviousPageClick"
      class="p-4 rounded-[0.5rem] border-[0.06rem] border-solid border-[#98908b] w-12 h-10 inline-flex items-center justify-center"
    >
      <img src="@/assets/images/icon-caret-left.svg" alt="icon-caret-left" />
    </div>

    <div
      :class="`${page === selectedPageRef ? 'bg-[#201F24] text-white' : ''} cursor-pointer
      p-4 rounded-[0.5rem] border-[0.06rem] border-solid border-[#98908b] w-10 h-10 inline-flex items-center justify-center text-[0.88rem] text-[#201F24]`"
      v-for="page of availableDynamicPagesRef"
      :key="page"
      @click="onSelectPage(page as number)"
    >
      {{ page }}
    </div>

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

    <div
      @click="onNextPageClick"
      class="p-4 rounded-[0.5rem] border-[0.06rem] border-solid border-[#98908b] w-12 h-10 inline-flex items-center justify-center"
    >
      <img src="@/assets/images/icon-caret-right.svg" alt="icon-caret-right" />
    </div>
  </div>
</template>
