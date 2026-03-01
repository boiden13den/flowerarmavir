import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getProducts, getCategories } from '@/utils/api'

export const useCatalogStore = defineStore('catalog', () => {
  const products = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchProducts = async (params = {}) => {
    loading.value = true
    error.value = null
    try {
      const response = await getProducts(params)
      products.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await getCategories()
      categories.value = response.data
    } catch (err) {
      console.error('Failed to fetch categories:', err)
    }
  }

  return {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    fetchCategories
  }
})
