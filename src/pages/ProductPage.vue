<template>
  <div class="container mx-auto px-4 py-12">
    <div v-if="loading" class="text-center py-20">
      <div class="inline-block animate-spin text-6xl">⏳</div>
    </div>

    <div v-else-if="!product" class="text-center py-20">
      <h2 class="text-2xl font-bold mb-4">Товар не найден</h2>
      <Button @click="$router.push('/catalog')">Вернуться в каталог</Button>
    </div>

    <div v-else>
      <button @click="$router.back()" class="flex items-center text-gray-600 hover:text-primary-500 mb-8">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Назад
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div class="card overflow-hidden">
            <img :src="currentImage" :alt="product.name" class="w-full h-[500px] object-cover" />
          </div>
          <div v-if="product.images.length > 1" class="flex gap-4 mt-4">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              @click="currentImage = image"
              :class="[
                'w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
                currentImage === image ? 'border-primary-500' : 'border-transparent'
              ]"
            >
              <img :src="image" :alt="`${product.name} ${index + 1}`" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <div>
          <div class="flex gap-2 mb-4">
            <span v-if="product.isNew" class="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Новинка
            </span>
            <span v-if="product.isBestseller" class="bg-mint-300 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              Хит продаж
            </span>
          </div>

          <h1 class="text-4xl font-display font-bold mb-4">{{ product.name }}</h1>
          
          <div class="text-4xl font-bold text-primary-600 mb-6">
            {{ formatPrice(product.price) }}
          </div>

          <p class="text-gray-700 text-lg mb-6">{{ product.description }}</p>

          <div class="space-y-4 mb-8">
            <div class="border-t pt-4">
              <h3 class="font-semibold mb-2">Состав:</h3>
              <p class="text-gray-600">{{ product.composition }}</p>
            </div>
            <div class="border-t pt-4">
              <h3 class="font-semibold mb-2">Размер:</h3>
              <p class="text-gray-600">{{ product.size }}</p>
            </div>
            <div class="border-t pt-4">
              <h3 class="font-semibold mb-2">Условия хранения:</h3>
              <p class="text-gray-600">{{ product.care }}</p>
            </div>
          </div>

          <div class="flex items-center gap-4 mb-6">
            <label class="font-semibold">Количество:</label>
            <div class="flex items-center border rounded-lg">
              <button @click="decreaseQuantity" class="px-4 py-2 hover:bg-gray-100">−</button>
              <input v-model.number="quantity" type="number" min="1" class="w-16 text-center border-x py-2" />
              <button @click="increaseQuantity" class="px-4 py-2 hover:bg-gray-100">+</button>
            </div>
          </div>

          <Button @click="handleAddToCart" size="lg" class="w-full">
            Добавить в корзину
          </Button>
        </div>
      </div>
    </div>

    <Toast :show="showNotification" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProductBySlug } from '@/utils/api'
import { formatPrice } from '@/utils/helpers'
import { useCart } from '@/composables/useCart'
import Button from '@/components/Button.vue'
import Toast from '@/components/Toast.vue'

const route = useRoute()
const { addToCart, showNotification } = useCart()

const product = ref(null)
const loading = ref(true)
const quantity = ref(1)
const currentImage = ref('')

const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const handleAddToCart = () => {
  addToCart(product.value, quantity.value)
}

onMounted(async () => {
  try {
    const response = await getProductBySlug(route.params.slug)
    product.value = response.data
    currentImage.value = product.value.images[0]
  } catch (error) {
    console.error('Failed to load product:', error)
  } finally {
    loading.value = false
  }
})
</script>
