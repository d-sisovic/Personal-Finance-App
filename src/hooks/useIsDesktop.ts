import { computed } from 'vue';
import { useScreenWidth } from './useWindowsWidth';

export function useIsDesktop() {
  const { screenWidth } = useScreenWidth();
  const isDesktop = computed(() => screenWidth.value > 375);

  return {
    isDesktop,
  };
}
