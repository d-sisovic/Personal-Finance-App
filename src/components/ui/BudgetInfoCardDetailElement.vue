<script setup lang="ts">
import { formatStringToNumber } from '@/util';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import ProgressBarElement from './ProgressBarElement.vue';
import CardContentElement from './CardContentElement.vue';
import type { IListItem } from '@/ts/interfaces/list.model';
import TransactionCardElement from './TransactionCardElement.vue';

const props = defineProps<{
  spent: string;
  label: string;
  color: string;
  maximum: string;
  spendings: IListItem[];
  spacingTopClass?: string;
}>();

const { isDesktop } = useIsDesktop();

const spentPercentage =
  (formatStringToNumber(props.spent) / formatStringToNumber(props.maximum)) * 100;

const images = import.meta.glob('@/assets/images/*', { eager: true });

const dotsImageSrc =
  (images[`/src/assets/images/icon-ellipsis.svg`] as Record<string, string>)?.default || '';
</script>

<template>
  <div class="mt-6 bg-[var(--white)] p-6 rounded-xl tablet:p-8" :class="spacingTopClass">
    <div class="flex justify-between flex-wrap items-center mb-[1.25rem]">
      <div class="flex gap-4 items-center flex-wrap">
        <span class="w-4 h-4 rounded-full block" :class="color"></span>

        <h3 class="text-[var(--grey-900)] font-bold text-[1.25rem] leading-6">{{ label }}</h3>
      </div>

      <img :src="dotsImageSrc" alt="dots" class="cursor-pointer" />
    </div>

    <h3 class="mb-5 text-[var(--grey-500)] text-[0.88rem]">Maximum of {{ maximum }}</h3>

    <ProgressBarElement :progress="spentPercentage" :progress-color="color" />

    <div class="flex flex-wrap gap-4 items-center mt-4">
      <div class="inline-flex items-center gap-4 flex-1">
        <span class="w-1 h-[2.688rem] block rounded-lg" :class="color"></span>

        <div class="inline-flex flex-col">
          <span class="text-[var(--grey-500)] text-[0.75rem] mb-1">Spent</span>

          <span class="font-bold text-[0.88rem]">{{ spent }}</span>
        </div>
      </div>

      <div class="inline-flex items-center gap-4 flex-1">
        <span class="w-1 h-[2.688rem] block bg-[var(--beige-100)] rounded-lg"></span>

        <div class="inline-flex flex-col">
          <span class="text-[var(--grey-500)] text-[0.75rem] mb-1">Free</span>

          <span class="font-bold text-[0.88rem]">{{ maximum }}</span>
        </div>
      </div>
    </div>

    <CardContentElement
      heading="Latest Spending"
      actionLabel="See All"
      class="mt-5 !bg-[var(--beige-100)] !p-4"
    >
      <div class="mt-8 flex flex-col gap-6">
        <TransactionCardElement
          v-for="(item, index) in spendings"
          :key="item.name"
          :list-item="item"
          :show-line="spendings.length !== index + 1"
          :hide-image="!isDesktop"
          borderClass="!bg-[#69686826]"
        />
      </div>
    </CardContentElement>
  </div>
</template>
