<template>
  <div class="container mx-auto px-4 py-12">
    <Breadcrumbs />
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-4xl font-bold text-gray-900">Избранное</h1>
      <Button v-if="favoritesStore.count > 0" @click="clearAll" variant="outline">
        Очистить всё
      </Button>
    </div>

    <div v-if="favoritesStore.count === 0" class="text-center py-16">
      <div class="text-6xl mb-4">💝</div>
      <p class="text-xl text-gray-600 mb-6">Ваш список избранного пуст</p>
      <Button @click="$router.push('/catalog')" variant="primary">
        Перейти в каталог
      </Button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard v-for="product in favoritesStore.favoriteProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
import { useFavoritesStore } from '@/stores/favorites'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import ProductCard from '@/components/ProductCard.vue'
import Button from '@/components/Button.vue'

const favoritesStore = useFavoritesStore()

const clearAll = () => {
  if (confirm('Вы уверены, что хотите очистить список избранного?')) {
    favoritesStore.clearFavorites()
  }
}
</script>
