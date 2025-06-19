import { onMounted, onUnmounted, ref, type Ref } from 'vue';

export function useClickOutside(elementRef: Ref<HTMLElement | null>) {
  const dropdownVisibleRef = ref<boolean>(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (!(elementRef.value && !elementRef.value.contains(event.target as Node))) return;

    dropdownVisibleRef.value = false;
  };

  const onToggleDropdown = () => (dropdownVisibleRef.value = !dropdownVisibleRef.value);

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });

  return {
    onToggleDropdown,
    dropdownVisibleRef,
  };
}
