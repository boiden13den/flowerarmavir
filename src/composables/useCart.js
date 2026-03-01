import { useCartStore } from '@/stores/cart'
import { ref } from 'vue'

export const useCart = () => {
  const cartStore = useCartStore()
  const showNotification = ref(false)

  const addToCart = (product, quantity = 1) => {
    cartStore.addItem(product, quantity)
    showNotification.value = true
    setTimeout(() => {
      showNotification.value = false
    }, 2000)
  }

  return {
    cart: cartStore,
    addToCart,
    showNotification
  }
}
