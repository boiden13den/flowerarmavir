<template>
  <section class="bg-white py-20 relative overflow-hidden">
    <!-- Decorative Background -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-lavender-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-mint-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div ref="targetRef" :class="['transition-all duration-1000', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
        <h2 class="section-title">Наши букеты</h2>
        <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Мы только начинаем свой путь, но уже готовы удивлять вас уникальными композициями
        </p>
        
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin text-4xl">⏳</div>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(product, index) in popularProducts"
            :key="product.id"
            :style="{ transitionDelay: `${index * 100}ms` }"
            :class="['transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
          >
            <ProductCard :product="product" />
          </div>
        </div>
        
        <div class="text-center mt-12">
          <Button @click="$router.push('/catalog')" size="lg" class="group">
            <span>Все букеты</span>
            <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import ProductCard from '@/components/ProductCard.vue'
import Button from '@/components/Button.vue'

defineProps({
  popularProducts: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const { isVisible, targetRef } = useIntersectionObserver({ once: true, threshold: 0.1 })
</script>
