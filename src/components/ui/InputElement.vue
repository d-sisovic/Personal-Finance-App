<script setup lang="ts">
defineProps<{
  label: string;
  type?: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-[rgb(105,104,104)] text-xs font-bold leading-[150%]">{{
      label
    }}</label>

    <input
      :type="type || 'text'"
      class="py-3 px-5 border-[0.06rem] border-[rgb(152,144,139)] rounded-[0.5rem] bg-white leading-[0.313rem]"
    />
  </div>
</template>
