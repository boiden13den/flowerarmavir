<template>
  <div class="container mx-auto px-4 py-12">
    <Breadcrumbs />
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Акции и специальные предложения</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div v-for="promo in promotions" :key="promo.id" 
        class="bg-gradient-to-br from-primary-50 to-mint-50 rounded-2xl p-8 relative overflow-hidden">
        <div class="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
          {{ promo.discount }}
        </div>
        
        <div class="text-6xl mb-4">{{ promo.icon }}</div>
        <h2 class="text-2xl font-bold text-gray-900 mb-3">{{ promo.title }}</h2>
        <p class="text-gray-700 mb-4">{{ promo.description }}</p>
        
        <div class="flex items-center text-sm text-gray-600 mb-6">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          Действует до {{ formatDate(promo.validUntil) }}
        </div>

        <Button @click="$router.push('/catalog')" variant="primary">
          Перейти в каталог
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Button from '@/components/Button.vue'

const promotions = ref([])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

onMounted(async () => {
  try {
    const response = await fetch('/data/promotions.json')
    promotions.value = await response.json()
  } catch (error) {
    console.error('Failed to load promotions:', error)
  }
})
</script>
