<script setup lang="ts">
defineProps<{
  label: string;
  type?: string;
  customInputClass?: string;
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-[var(--grey-500)] text-xs font-bold leading-[150%]">
      {{ label }}
    </label>

    <div class="relative">
      <slot></slot>

      <input
        :type="type || 'text'"
        class="w-full py-3 px-5 border-[0.06rem] border-[var(--beige-500)] rounded-[0.5rem] leading-[0.313rem]"
        :class="customInputClass"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>
