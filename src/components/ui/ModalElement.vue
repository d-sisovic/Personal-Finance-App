<script setup lang="ts">
import { onUnmounted, watch } from 'vue';

const props = defineProps<{
  heading: string;
  showModal: boolean;
}>();

const emits = defineEmits(['close-modal']);

watch(
  () => props.showModal,
  (showModal) => {
    document.body.style.overflow = showModal ? 'hidden' : '';
  },
);

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<template>
  <teleport to="body" v-if="showModal">
    <div class="fixed top-0 left-0 right-0 bottom-0 bg-gray-400 bg-opacity-90">
      <div
        class="py-6 px-5 rounded-xl max-h-full overflow-y-auto bg-white max-w-[20.938rem] tablet:max-w-[35rem] w-full absolute left-[50%] top-[5rem] translate-x-[-50%]"
      >
        <div class="flex justify-between items-center flex-wrap">
          <h3 class="text-[1.25rem] font-bold leading-[120%]">{{ heading }}</h3>

          <img
            src="@/assets/images/icon-close-modal.svg"
            alt="close"
            class="cursor-pointer"
            @click="emits('close-modal')"
          />
        </div>

        <slot></slot>
      </div>
    </div>
  </teleport>
</template>
