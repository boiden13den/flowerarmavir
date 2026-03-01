<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-display font-bold mb-8">Корзина</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-20">
      <div class="text-6xl mb-4">🛒</div>
      <h2 class="text-2xl font-bold mb-4">Корзина пуста</h2>
      <p class="text-gray-600 mb-8">Добавьте товары из каталога</p>
      <Button @click="$router.push('/catalog')" size="lg">
        Перейти в каталог
      </Button>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-4">
        <div v-for="item in cartStore.items" :key="item.id" class="card p-6 flex gap-6">
          <img :src="item.image" :alt="item.name" class="w-32 h-32 object-cover rounded-lg" />
          
          <div class="flex-grow">
            <router-link :to="`/catalog/${item.slug}`" class="text-xl font-display font-semibold hover:text-primary-500 mb-2 block">
              {{ item.name }}
            </router-link>
            <p class="text-2xl font-bold text-primary-600 mb-4">
              {{ formatPrice(item.price) }}
            </p>
            
            <div class="flex items-center gap-4">
              <div class="flex items-center border rounded-lg">
                <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="px-3 py-1 hover:bg-gray-100">−</button>
                <input 
                  :value="item.quantity" 
                  @input="cartStore.updateQuantity(item.id, parseInt($event.target.value) || 1)"
                  type="number" 
                  min="1" 
                  class="w-16 text-center border-x py-1" 
                />
                <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="px-3 py-1 hover:bg-gray-100">+</button>
              </div>
              
              <button @click="cartStore.removeItem(item.id)" class="text-red-500 hover:text-red-700 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          
          <div class="text-right">
            <p class="text-sm text-gray-500 mb-1">Итого:</p>
            <p class="text-2xl font-bold">{{ formatPrice(item.price * item.quantity) }}</p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        <div class="card p-6 sticky top-24">
          <h3 class="text-2xl font-display font-bold mb-6">Итого</h3>
          
          <div class="space-y-3 mb-6">
            <div class="flex justify-between text-gray-600">
              <span>Товары ({{ cartStore.totalItems }}):</span>
              <span>{{ formatPrice(cartStore.totalPrice) }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Доставка:</span>
              <span>{{ cartStore.totalPrice >= 1500 ? 'Бесплатно' : formatPrice(200) }}</span>
            </div>
            <div class="border-t pt-3 flex justify-between text-xl font-bold">
              <span>Всего:</span>
              <span class="text-primary-600">
                {{ formatPrice(cartStore.totalPrice + (cartStore.totalPrice >= 1500 ? 0 : 200)) }}
              </span>
            </div>
          </div>

          <Button @click="$router.push('/checkout')" size="lg" class="w-full">
            Оформить заказ
          </Button>

          <p class="text-sm text-gray-500 text-center mt-4">
            Бесплатная доставка по Армавиру от 1500₽
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { formatPrice } from '@/utils/helpers'
import Button from '@/components/Button.vue'

const cartStore = useCartStore()
</script>
