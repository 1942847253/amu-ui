import { ref, watch, onMounted, onUnmounted } from "vue";

export const onClickOutside = () => {
  const isClickOutside = ref(false);

  const element = ref<HTMLElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (element.value && !element.value.contains(event.target as HTMLElement)) {
      isClickOutside.value = true;
    } else {
      isClickOutside.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener("mousedown", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("mousedown", handleClickOutside);
  });

  return {
    element,
    isClickOutside,
    setElement: (el: HTMLElement) => {
      element.value = el;
    },
  };
};
