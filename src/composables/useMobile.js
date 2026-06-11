import { ref } from "vue";

export function useMobile() {
  const isMobile = ref(window.innerWidth < window.innerHeight || window.innerWidth / window.innerHeight <= 1.25);
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < window.innerHeight || window.innerWidth / window.innerHeight <= 1.25;
  });
  return { isMobile };
}
