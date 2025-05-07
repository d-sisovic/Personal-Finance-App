import { onBeforeUnmount } from 'vue';

export function useDebouncedEmit<T>(
  emit: (event: string, payload: T) => void,
  eventName: string,
  delay = 300,
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  function debouncedEmit(payload: T) {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      emit(eventName, payload);
    }, delay);
  }

  onBeforeUnmount(() => {
    if (timeout) clearTimeout(timeout);
  });

  return debouncedEmit;
}
