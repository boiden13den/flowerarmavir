<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-display font-bold mb-8">Каталог букетов</h1>

    <div class="flex flex-col md:flex-row gap-8">
      <aside class="md:w-64 flex-shrink-0">
        <div class="card p-6 sticky top-24">
          <h3 class="font-display font-semibold text-lg mb-4">Категории</h3>
          <ul class="space-y-2">
            <li v-for="category in categories" :key="category.id">
              <button
                @click="selectCategory(category.id)"
                :class="[
                  'w-full text-left px-4 py-2 rounded-lg transition-colors',
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'hover:bg-gray-100'
                ]"
              >
                {{ category.name }}
              </button>
            </li>
          </ul>

          <h3 class="font-display font-semibold text-lg mb-4 mt-8">Сортировка</h3>
          <select v-model="sortBy" class="input">
            <option value="">По умолчанию</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
          </select>

          <h3 class="font-display font-semibold text-lg mb-4 mt-8">Поиск</h3>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Найти букет..."
            class="input"
          />
        </div>
      </aside>

      <div class="flex-grow">
        <div v-if="loading" class="text-center py-20">
          <div class="inline-block animate-spin text-6xl">⏳</div>
        </div>

        <div v-else-if="filteredProducts.length === 0" class="text-center py-20">
          <p class="text-xl text-gray-600">Товары не найдены</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </div>

    <Toast :show="showNotification" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCatalogStore } from '@/stores/catalog'
import { useCart } from '@/composables/useCart'
import { debounce } from '@/utils/helpers'
import ProductCard from '@/components/ProductCard.vue'
import Toast from '@/components/Toast.vue'

const route = useRoute()
const router = useRouter()
const catalogStore = useCatalogStore()
const { showNotification } = useCart()

const selectedCategory = ref('all')
const sortBy = ref('')
const searchQuery = ref('')
const loading = ref(true)

const categories = computed(() => catalogStore.categories)
const filteredProducts = computed(() => catalogStore.products)

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
  updateFilters()
}

const updateFilters = debounce(() => {
  const params = {
    category: selectedCategory.value,
    sort: sortBy.value,
    search: searchQuery.value
  }
  
  router.push({ query: params })
  fetchProducts(params)
}, 300)

const fetchProducts = async (params) => {
  loading.value = true
  await catalogStore.fetchProducts(params)
  loading.value = false
}

watch([sortBy, searchQuery], () => {
  updateFilters()
})

onMounted(async () => {
  await catalogStore.fetchCategories()
  
  if (route.query.category) {
    selectedCategory.value = route.query.category
  }
  if (route.query.sort) {
    sortBy.value = route.query.sort
  }
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
  
  await fetchProducts({
    category: selectedCategory.value,
    sort: sortBy.value,
    search: searchQuery.value
  })
})
</script>
