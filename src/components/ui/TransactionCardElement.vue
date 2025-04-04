<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  date: string;
  name: string;
  image: string;
  value: number;
  category?: string;
  showLine?: boolean;
}>();

const images = import.meta.glob('@/assets/images/avatars/*', { eager: true });

const valueColor = computed(() => ({ 'text-[var(--green)]': props.value > 0 }));

const imageSrc = computed(
  () =>
    (images[`/src/assets/images/avatars/${props.image}`] as Record<string, string>)?.default || '',
);

const formattedValue = computed(() => {
  const absValue = Math.abs(props.value).toFixed(2);

  return props.value > 0 ? `+$${absValue}` : `-$${absValue}`;
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="inline-flex items-center gap-4">
        <img :src="imageSrc" :alt="name" class="rounded-full h-8 w-8 tablet:h-10 tablet:w-10" />

        <div :class="`${category ? 'flex flex-col' : ''}`">
          <span class="leading-[150%] font-bold text-[0.88rem] text-[var(--grey-900)]">
            {{ name }}
          </span>

          <span class="text-[0.75rem] text-[#696868] mt-1" v-if="category">{{ category }}</span>
        </div>
      </div>

      <div :class="`${category ? 'gap-1' : 'gap-2'} inline-flex flex-col text-right`">
        <span class="leading-[150%] font-bold text-[0.88rem]" :class="valueColor">
          {{ formattedValue }}
        </span>

        <span class="leading-[150%] font-normal text-[0.75rem] text-[var(--grey-500)]">
          {{ date }}
        </span>
      </div>
    </div>

    <div v-if="showLine" class="w-full h-[0.06rem] bg-[var(--grey-100)] mt-5"></div>
  </div>
</template>
