<script lang="ts" setup>
import { computed } from 'vue';
import type { IListItem } from '@/ts/interfaces/list.model';

const props = defineProps<{
  listItem: IListItem;
  hideImage?: boolean;
  showLine?: boolean;
  borderClass?: string;
}>();

const images = import.meta.glob('@/assets/images/avatars/*', { eager: true });

const valueColor = computed(() => ({ 'text-[var(--green)]': props.listItem.value > 0 }));

const imageSrc = computed(
  () =>
    (images[`/src/assets/images/avatars/${props.listItem.image}`] as Record<string, string>)
      ?.default || '',
);

const formattedValue = computed(() => {
  const absValue = Math.abs(props.listItem.value).toFixed(2);

  return props.listItem.value > 0 ? `+$${absValue}` : `-$${absValue}`;
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="inline-flex items-center gap-4">
        <img
          :src="imageSrc"
          :alt="props.listItem.name"
          class="rounded-full h-8 w-8 tablet:h-10 tablet:w-10"
          v-if="!hideImage"
        />

        <div :class="`${props.listItem.category ? 'flex flex-col' : ''}`">
          <span class="leading-[150%] font-bold text-[0.88rem] text-[var(--grey-900)]">
            {{ props.listItem.name }}
          </span>

          <span class="text-[0.75rem] text-[#696868] mt-1" v-if="props.listItem.category">{{
            props.listItem.category
          }}</span>
        </div>
      </div>

      <div
        :class="`${props.listItem.category ? 'gap-1' : 'gap-2'} inline-flex flex-col text-right`"
      >
        <span class="leading-[150%] font-bold text-[0.88rem]" :class="valueColor">
          {{ formattedValue }}
        </span>

        <span class="leading-[150%] font-normal text-[0.75rem] text-[var(--grey-500)]">
          {{ props.listItem.date }}
        </span>
      </div>
    </div>

    <div
      v-if="props.showLine"
      class="w-full h-[0.06rem] bg-[var(--grey-100)] mt-5"
      :class="props.borderClass || ''"
    ></div>
  </div>
</template>
