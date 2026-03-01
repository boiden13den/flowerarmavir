<template>
  <div class="container mx-auto px-4 py-12">
    <Breadcrumbs />
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Подарочные сертификаты</h1>
    <p class="text-gray-600 mb-8">Подарите радость близким — выберите сертификат на любую сумму</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="cert in certificates" :key="cert.id" 
        class="bg-gradient-to-br from-primary-50 via-mint-50 to-lavender-50 rounded-2xl p-8 relative overflow-hidden shadow-lg">
        <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
        
        <div class="relative z-10">
          <div class="text-5xl mb-4">🎁</div>
          <h3 class="text-3xl font-bold text-gray-900 mb-2">{{ cert.amount }}₽</h3>
          <p class="text-gray-700 mb-6">{{ cert.description }}</p>
          
          <ul class="space-y-2 mb-6 text-sm text-gray-600">
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
              </svg>
              Срок действия 1 год
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
              </svg>
              Электронный формат
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
              </svg>
              Можно использовать частями
            </li>
          </ul>

          <Button @click="addToCart(cert)" variant="primary" class="w-full">
            Купить сертификат
          </Button>
        </div>
      </div>
    </div>

    <div class="mt-12 bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Как использовать сертификат?</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="text-4xl mb-3">1️⃣</div>
          <h3 class="font-bold mb-2">Купите сертификат</h3>
          <p class="text-sm text-gray-600">Выберите номинал и оформите заказ</p>
        </div>
        <div class="text-center">
          <div class="text-4xl mb-3">2️⃣</div>
          <h3 class="font-bold mb-2">Получите код</h3>
          <p class="text-sm text-gray-600">Уникальный код придёт на email</p>
        </div>
        <div class="text-center">
          <div class="text-4xl mb-3">3️⃣</div>
          <h3 class="font-bold mb-2">Используйте</h3>
          <p class="text-sm text-gray-600">Введите код при оформлении заказа</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Button from '@/components/Button.vue'

const cartStore = useCartStore()

const certificates = ref([
  { id: 1, amount: 500, description: 'Идеально для небольшого букета' },
  { id: 2, amount: 1000, description: 'Популярный выбор для подарка' },
  { id: 3, amount: 2000, description: 'Для роскошного букета' }
])

const addToCart = (cert) => {
  const product = {
    id: 'cert-' + cert.id,
    name: `Подарочный сертификат ${cert.amount}₽`,
    slug: 'certificate-' + cert.id,
    price: cert.amount,
    images: ['/placeholder-certificate.jpg']
  }
  
  cartStore.addItem(product)
  alert('Сертификат добавлен в корзину!')
}
</script>
