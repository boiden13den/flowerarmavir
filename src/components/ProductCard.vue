<template>
  <div class="card overflow-hidden group relative">
    <div class="absolute top-4 right-4 z-10 flex gap-2">
      <button @click.prevent="toggleFavorite" 
        :class="isFavorite ? 'text-red-500' : 'text-gray-400'"
        class="w-10 h-10 bg-white rounded-full shadow-md hover:scale-110 transition-transform flex items-center justify-center">
        <svg class="w-6 h-6" :fill="isFavorite ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      <button @click.prevent="toggleCompare" 
        :class="isInCompare ? 'text-primary-500' : 'text-gray-400'"
        class="w-10 h-10 bg-white rounded-full shadow-md hover:scale-110 transition-transform flex items-center justify-center">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>
    </div>
    
    <router-link :to="`/catalog/${product.slug}`" class="block relative overflow-hidden">
      <img
        :src="product.images[0]"
        :alt="product.name"
        class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div v-if="product.isNew" class="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
        Новинка
      </div>
      <div v-if="product.isBestseller" class="absolute top-4 right-4 bg-mint-300 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
        Хит
      </div>
    </router-link>
    
    <div class="p-5">
      <router-link :to="`/catalog/${product.slug}`">
        <h3 class="text-xl font-display font-semibold mb-2 hover:text-primary-500 transition-colors">
          {{ product.name }}
        </h3>
      </router-link>
      
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ product.description }}
      </p>
      
      <div class="flex items-center justify-between">
        <span class="text-2xl font-bold text-primary-600">
          {{ formatPrice(product.price) }}
        </span>
        
        <Button @click="handleAddToCart" size="sm">
          В корзину
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCart } from '@/composables/useCart'
import { useFavoritesStore } from '@/stores/favorites'
import { useCompareStore } from '@/stores/compare'
import { formatPrice } from '@/utils/helpers'
import Button from './Button.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { addToCart } = useCart()
const favoritesStore = useFavoritesStore()
const compareStore = useCompareStore()

const isFavorite = computed(() => favoritesStore.isFavorite(props.product.id))
const isInCompare = computed(() => compareStore.isInCompare(props.product.id))

const handleAddToCart = () => {
  addToCart(props.product)
}

const toggleFavorite = () => {
  favoritesStore.toggleFavorites(props.product.id)
}

const toggleCompare = () => {
  const added = compareStore.toggleCompare(props.product.id)
  if (!added && !isInCompare.value) {
    alert(`Можно сравнить максимум ${compareStore.maxItems} товара`)
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
