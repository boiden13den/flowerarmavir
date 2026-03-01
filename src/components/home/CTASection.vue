<template>
  <section class="relative py-20 overflow-hidden">
    <!-- Animated Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-r from-primary-500 via-lavender-400 to-primary-500 animate-gradient"></div>
    
    <!-- Pattern Overlay -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 30px 30px;"></div>
    </div>
    
    <div ref="targetRef" class="container mx-auto px-4 text-center relative z-10">
      <div :class="['transition-all duration-1000', isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95']">
        <h2 class="text-3xl md:text-5xl font-display font-bold mb-4 text-white">
          Готовы попробовать?
        </h2>
        <p class="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
          Мы новая кондитерская, и каждый ваш заказ помогает нам расти. Специальные цены для первых клиентов!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button @click="$router.push('/catalog')" variant="secondary" size="lg" class="bg-white hover:bg-gray-50">
            Выбрать букет
          </Button>
          <Button @click="$router.push('/promotions')" size="lg" class="bg-primary-700 hover:bg-primary-800 border-2 border-white">
            Акции для новичков
          </Button>
        </div>
        
        <!-- Trust Indicators -->
        <div class="mt-12 flex flex-wrap justify-center gap-8 text-white/90">
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Бесплатная доставка</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Свежие ингредиенты</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Индивидуальный подход</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import Button from '@/components/Button.vue'

const { isVisible, targetRef } = useIntersectionObserver({ once: true, threshold: 0.3 })
</script>

<style scoped>
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}
</style>
