<script lang="ts" setup>
defineProps<{
  date: string;
  name: string;
  image: string;
  value: number;
}>();
</script>

<template>
  <div>
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="inline-flex items-center gap-4">
        <img :src="'/assets/images/avatars/' + image" :alt="name" class="rounded-full h-8 w-8" />

        <span class="leading-[150%] font-bold text-[0.88rem] text-[var(--grey-900)]">{{
          name
        }}</span>
      </div>

      <div class="inline-flex flex-col gap-2 text-right">
        <span class="leading-[150%] font-bold text-[0.88rem]">${{ value }}</span>

        <span class="leading-[150%] font-normal text-[0.75rem] text-[var(--grey-500)]">{{
          date
        }}</span>
      </div>
    </div>

    <div class="w-full h-[0.06rem] bg-[var(--grey-100)] mt-5"></div>
  </div>
</template>
