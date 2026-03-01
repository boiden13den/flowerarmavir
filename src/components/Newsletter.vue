<template>
  <div class="bg-gradient-to-r from-primary-50 to-mint-50 rounded-2xl p-8">
    <div class="max-w-2xl mx-auto text-center">
      <h3 class="text-2xl font-bold text-gray-900 mb-2">Подпишитесь на рассылку</h3>
      <p class="text-gray-600 mb-6">Получайте новости об акциях и новых букетах</p>
      
      <form @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row gap-3">
        <input v-model="email" type="email" required placeholder="Ваш email"
          class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
        <Button type="submit" variant="primary" :disabled="loading">
          {{ loading ? 'Отправка...' : 'Подписаться' }}
        </Button>
      </form>

      <p v-if="message" :class="success ? 'text-green-600' : 'text-red-600'" class="mt-3 text-sm">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from './Button.vue'

const email = ref('')
const loading = ref(false)
const message = ref('')
const success = ref(false)

const handleSubmit = async () => {
  loading.value = true
  message.value = ''
  
  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]')
  
  if (subscribers.includes(email.value)) {
    message.value = 'Вы уже подписаны на рассылку'
    success.value = false
  } else {
    subscribers.push(email.value)
    localStorage.setItem('subscribers', JSON.stringify(subscribers))
    message.value = 'Спасибо за подписку!'
    success.value = true
    email.value = ''
  }
  
  loading.value = false
}
</script>
