<script setup lang="ts">
defineProps<{
  label: string;
  type?: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-[var(--grey-500)] text-xs font-bold leading-[150%]">{{
      label
    }}</label>

    <input
      :type="type || 'text'"
      class="py-3 px-5 border-[0.06rem] border-[var(--beige-500)] rounded-[0.5rem] var(--white) leading-[0.313rem]"
    />
  </div>
</template>
