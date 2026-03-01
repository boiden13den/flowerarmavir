<template>
  <div class="container mx-auto px-4 py-12">
    <Breadcrumbs />
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Конструктор букетов</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="space-y-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold mb-4">Шаг 1: Выберите размер</h3>
          <div class="grid grid-cols-3 gap-4">
            <button v-for="size in sizes" :key="size.id" @click="bouquet.size = size"
              :class="bouquet.size?.id === size.id ? 'ring-2 ring-primary-500' : ''"
              class="p-4 border rounded-lg hover:border-primary-500 transition-colors">
              <div class="text-3xl mb-2">{{ size.icon }}</div>
              <div class="font-medium">{{ size.name }}</div>
              <div class="text-sm text-gray-500">{{ size.price }}₽</div>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold mb-4">Шаг 2: Выберите цветовую гамму</h3>
          <div class="grid grid-cols-4 gap-4">
            <button v-for="color in colors" :key="color.id" @click="bouquet.color = color"
              :class="bouquet.color?.id === color.id ? 'ring-2 ring-primary-500' : ''"
              class="p-4 border rounded-lg hover:border-primary-500 transition-colors">
              <div class="w-full h-12 rounded mb-2" :style="{ backgroundColor: color.hex }"></div>
              <div class="text-sm font-medium">{{ color.name }}</div>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold mb-4">Шаг 3: Выберите упаковку</h3>
          <div class="grid grid-cols-2 gap-4">
            <button v-for="pack in packaging" :key="pack.id" @click="bouquet.packaging = pack"
              :class="bouquet.packaging?.id === pack.id ? 'ring-2 ring-primary-500' : ''"
              class="p-4 border rounded-lg hover:border-primary-500 transition-colors">
              <div class="font-medium mb-1">{{ pack.name }}</div>
              <div class="text-sm text-gray-500">+{{ pack.price }}₽</div>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold mb-4">Шаг 4: Добавьте декор (опционально)</h3>
          <div class="space-y-3">
            <label v-for="decor in decorations" :key="decor.id" 
              class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div class="flex items-center">
                <input type="checkbox" :value="decor" v-model="bouquet.decorations"
                  class="w-5 h-5 text-primary-600 rounded">
                <span class="ml-3 font-medium">{{ decor.name }}</span>
              </div>
              <span class="text-gray-500">+{{ decor.price }}₽</span>
            </label>
          </div>
        </div>
      </div>

      <div class="lg:sticky lg:top-24 h-fit">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold mb-4">Ваш букет</h3>
          
          <div class="bg-gray-100 rounded-lg p-8 mb-6 text-center">
            <div class="text-8xl mb-4">🌸</div>
            <p class="text-gray-600">Предпросмотр букета</p>
          </div>

          <div class="space-y-3 mb-6">
            <div v-if="bouquet.size" class="flex justify-between">
              <span>Размер:</span>
              <span class="font-medium">{{ bouquet.size.name }} ({{ bouquet.size.price }}₽)</span>
            </div>
            <div v-if="bouquet.color" class="flex justify-between">
              <span>Цвет:</span>
              <span class="font-medium">{{ bouquet.color.name }}</span>
            </div>
            <div v-if="bouquet.packaging" class="flex justify-between">
              <span>Упаковка:</span>
              <span class="font-medium">{{ bouquet.packaging.name }} (+{{ bouquet.packaging.price }}₽)</span>
            </div>
            <div v-if="bouquet.decorations.length > 0">
              <div class="font-medium mb-2">Декор:</div>
              <div v-for="decor in bouquet.decorations" :key="decor.id" 
                class="flex justify-between text-sm ml-4">
                <span>{{ decor.name }}</span>
                <span>+{{ decor.price }}₽</span>
              </div>
            </div>
          </div>

          <div class="border-t pt-4 mb-6">
            <div class="flex justify-between text-2xl font-bold">
              <span>Итого:</span>
              <span class="text-primary-600">{{ totalPrice }}₽</span>
            </div>
          </div>

          <Button @click="addToCart" :disabled="!isValid" variant="primary" class="w-full">
            Добавить в корзину
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Button from '@/components/Button.vue'

const router = useRouter()
const cartStore = useCartStore()

const sizes = [
  { id: 1, name: 'Маленький', icon: '🌸', price: 1200 },
  { id: 2, name: 'Средний', icon: '💐', price: 1800 },
  { id: 3, name: 'Большой', icon: '🌺', price: 2500 }
]

const colors = [
  { id: 1, name: 'Розовый', hex: '#ec4899' },
  { id: 2, name: 'Мятный', hex: '#5eead4' },
  { id: 3, name: 'Лавандовый', hex: '#d8b4fe' },
  { id: 4, name: 'Микс', hex: 'linear-gradient(45deg, #ec4899, #5eead4, #d8b4fe)' }
]

const packaging = [
  { id: 1, name: 'Крафт-бумага', price: 100 },
  { id: 2, name: 'Прозрачная плёнка', price: 150 },
  { id: 3, name: 'Подарочная коробка', price: 300 }
]

const decorations = [
  { id: 1, name: 'Атласная лента', price: 50 },
  { id: 2, name: 'Открытка', price: 100 },
  { id: 3, name: 'Декоративные бусины', price: 150 }
]

const bouquet = reactive({
  size: null,
  color: null,
  packaging: null,
  decorations: []
})

const totalPrice = computed(() => {
  let price = bouquet.size?.price || 0
  price += bouquet.packaging?.price || 0
  price += bouquet.decorations.reduce((sum, d) => sum + d.price, 0)
  return price
})

const isValid = computed(() => {
  return bouquet.size && bouquet.color && bouquet.packaging
})

const addToCart = () => {
  if (!isValid.value) return

  const customProduct = {
    id: Date.now(),
    name: `Букет "${bouquet.size.name}" ${bouquet.color.name}`,
    slug: 'custom-' + Date.now(),
    price: totalPrice.value,
    images: ['/placeholder-bouquet.jpg']
  }

  cartStore.addItem(customProduct)
  alert('Букет добавлен в корзину!')
  router.push('/cart')
}
</script>
