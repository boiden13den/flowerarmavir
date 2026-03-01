import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCatalogStore } from './catalog'

export const useCompareStore = defineStore('compare', () => {
  const items = ref([])
  const maxItems = 4

  const loadFromStorage = () => {
    const saved = localStorage.getItem('compare')
    if (saved) {
      items.value = JSON.parse(saved)
    }
  }

  const saveToStorage = () => {
    localStorage.setItem('compare', JSON.stringify(items.value))
  }

  const addToCompare = (productId) => {
    if (!items.value.includes(productId) && items.value.length < maxItems) {
      items.value.push(productId)
      saveToStorage()
      return true
    }
    return false
  }

  const removeFromCompare = (productId) => {
    items.value = items.value.filter(id => id !== productId)
    saveToStorage()
  }

  const toggleCompare = (productId) => {
    if (items.value.includes(productId)) {
      removeFromCompare(productId)
      return false
    } else {
      return addToCompare(productId)
    }
  }

  const clearCompare = () => {
    items.value = []
    saveToStorage()
  }

  const isInCompare = (productId) => {
    return items.value.includes(productId)
  }

  const compareProducts = computed(() => {
    const catalogStore = useCatalogStore()
    return items.value.map(id => catalogStore.products.find(p => p.id === id)).filter(Boolean)
  })

  const count = computed(() => items.value.length)
  const isFull = computed(() => items.value.length >= maxItems)

  loadFromStorage()

  return {
    items,
    compareProducts,
    count,
    isFull,
    maxItems,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    clearCompare,
    isInCompare
  }
})
