<template>
  <div class="container mx-auto px-4 py-12">
    <Breadcrumbs />
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-4xl font-bold text-gray-900">Сравнение товаров</h1>
      <Button v-if="compareStore.count > 0" @click="clearAll" variant="outline">
        Очистить всё
      </Button>
    </div>

    <div v-if="compareStore.count === 0" class="text-center py-16">
      <div class="text-6xl mb-4">⚖️</div>
      <p class="text-xl text-gray-600 mb-6">Список сравнения пуст</p>
      <Button @click="$router.push('/catalog')" variant="primary">
        Перейти в каталог
      </Button>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b">
            <th class="p-4 text-left font-medium text-gray-700">Характеристика</th>
            <th v-for="product in compareStore.compareProducts" :key="product.id" class="p-4">
              <div class="flex flex-col items-center">
                <img :src="product.images[0]" :alt="product.name" class="w-32 h-32 object-cover rounded-lg mb-3">
                <h3 class="font-bold text-center mb-2">{{ product.name }}</h3>
                <button @click="compareStore.removeFromCompare(product.id)" 
                  class="text-red-500 hover:text-red-700 text-sm">
                  Удалить
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="p-4 font-medium text-gray-700">Цена</td>
            <td v-for="product in compareStore.compareProducts" :key="product.id" 
              class="p-4 text-center text-2xl font-bold text-primary-600">
              {{ product.price }}₽
            </td>
          </tr>
          <tr class="border-b bg-gray-50">
            <td class="p-4 font-medium text-gray-700">Категория</td>
            <td v-for="product in compareStore.compareProducts" :key="product.id" 
              class="p-4 text-center">
              {{ product.category }}
            </td>
          </tr>
          <tr class="border-b">
            <td class="p-4 font-medium text-gray-700">Описание</td>
            <td v-for="product in compareStore.compareProducts" :key="product.id" 
              class="p-4 text-center text-sm text-gray-600">
              {{ product.description }}
            </td>
          </tr>
          <tr class="border-b bg-gray-50">
            <td class="p-4 font-medium text-gray-700">Действия</td>
            <td v-for="product in compareStore.compareProducts" :key="product.id" 
              class="p-4 text-center">
              <Button @click="addToCart(product)" variant="primary" size="sm">
                В корзину
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useCompareStore } from '@/stores/compare'
import { useCartStore } from '@/stores/cart'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Button from '@/components/Button.vue'

const compareStore = useCompareStore()
const cartStore = useCartStore()

const clearAll = () => {
  if (confirm('Вы уверены, что хотите очистить список сравнения?')) {
    compareStore.clearCompare()
  }
}

const addToCart = (product) => {
  cartStore.addItem(product)
  alert('Товар добавлен в корзину')
}
</script>
