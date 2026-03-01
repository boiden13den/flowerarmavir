import { ref, onMounted, onUnmounted } from 'vue'

export function useParallax(speed = 0.5) {
  const offset = ref(0)

  const handleScroll = () => {
    offset.value = window.pageYOffset * speed
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { offset }
}
