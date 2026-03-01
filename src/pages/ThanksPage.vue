<template>
  <div class="container mx-auto px-4 py-20">
    <div class="max-w-2xl mx-auto text-center">
      <div class="text-8xl mb-6">✅</div>
      <h1 class="text-4xl font-display font-bold mb-4">Спасибо за заказ!</h1>
      <p class="text-xl text-gray-600 mb-6">
        Ваш заказ <span class="font-bold text-primary-600">#{{ orderId }}</span> успешно оформлен
      </p>
      <div class="card p-8 mb-8">
        <p class="text-gray-700 mb-4">
          Мы свяжемся с вами в ближайшее время для подтверждения заказа.
        </p>
        <p class="text-gray-700">
          Информация о заказе отправлена на указанный вами номер телефона.
        </p>
      </div>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button @click="$router.push('/')" size="lg">
          На главную
        </Button>
        <Button @click="$router.push('/catalog')" variant="secondary" size="lg">
          Продолжить покупки
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Button from '@/components/Button.vue'

const route = useRoute()
const orderId = route.params.orderId || 'UNKNOWN'
</script>
