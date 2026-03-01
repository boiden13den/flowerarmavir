<template>
  <section class="container mx-auto px-4 py-20">
    <div ref="targetRef" :class="['transition-all duration-1000', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
      <h2 class="section-title">Первые отзывы</h2>
      <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Мы только открылись, но уже радуем наших первых клиентов
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="(review, index) in reviews" 
          :key="review.id"
          :style="{ transitionDelay: `${index * 150}ms` }"
          :class="['card p-6 hover:scale-105 transition-all duration-500 cursor-pointer', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
        >
          <div class="flex items-center mb-4">
            <div class="text-yellow-400 text-xl">★★★★★</div>
          </div>
          <p class="text-gray-700 mb-4 italic">"{{ review.text }}"</p>
          <div class="flex items-center justify-between text-sm">
            <span class="font-semibold text-primary-600">{{ review.name }}</span>
            <span class="text-gray-500">{{ formatDate(review.date) }}</span>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-12">
        <Button @click="$router.push('/reviews')" variant="secondary">
          Все отзывы
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { formatDate } from '@/utils/helpers'
import Button from '@/components/Button.vue'

defineProps({
  reviews: {
    type: Array,
    default: () => []
  }
})

const { isVisible, targetRef } = useIntersectionObserver({ once: true, threshold: 0.2 })
</script>
