import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCatalogStore } from './catalog'

export const useFavoritesStore = defineStore('favorites', () => {
  const items = ref([])

  const loadFromStorage = () => {
    const saved = localStorage.getItem('favorites')
    if (saved) {
      items.value = JSON.parse(saved)
    }
  }

  const saveToStorage = () => {
    localStorage.setItem('favorites', JSON.stringify(items.value))
  }

  const addToFavorites = (productId) => {
    if (!items.value.includes(productId)) {
      items.value.push(productId)
      saveToStorage()
    }
  }

  const removeFromFavorites = (productId) => {
    items.value = items.value.filter(id => id !== productId)
    saveToStorage()
  }

  const toggleFavorites = (productId) => {
    if (items.value.includes(productId)) {
      removeFromFavorites(productId)
    } else {
      addToFavorites(productId)
    }
  }

  const clearFavorites = () => {
    items.value = []
    saveToStorage()
  }

  const isFavorite = (productId) => {
    return items.value.includes(productId)
  }

  const favoriteProducts = computed(() => {
    const catalogStore = useCatalogStore()
    return items.value.map(id => catalogStore.products.find(p => p.id === id)).filter(Boolean)
  })

  const count = computed(() => items.value.length)

  loadFromStorage()

  return {
    items,
    favoriteProducts,
    count,
    addToFavorites,
    removeFromFavorites,
    toggleFavorites,
    clearFavorites,
    isFavorite
  }
})
