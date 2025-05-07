import { ref, onMounted, onUnmounted } from 'vue';

export function useScreenWidth() {
  const screenWidthRef = ref(window.innerWidth);

  const updateWidth = () => {
    screenWidthRef.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
  });

  return {
    screenWidth: screenWidthRef,
  };
}
