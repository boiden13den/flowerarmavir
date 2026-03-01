<template>
  <section class="container mx-auto px-4 py-20">
    <div ref="targetRef" :class="['transition-all duration-1000', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
      <h2 class="section-title">Почему выбирают нас</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="(feature, index) in features" 
          :key="feature.title"
          class="text-center group cursor-pointer"
          :style="{ transitionDelay: `${index * 100}ms` }"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
        >
          <div class="relative inline-block mb-4">
            <div class="absolute inset-0 bg-primary-100 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div class="relative text-7xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              {{ feature.icon }}
            </div>
          </div>
          <h3 class="text-xl font-display font-semibold mb-3 group-hover:text-primary-500 transition-colors">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'

const { isVisible, targetRef } = useIntersectionObserver({ once: true, threshold: 0.2 })

const features = [
  {
    icon: '🎨',
    title: 'Ручная работа',
    description: 'Только начинаем, но уже вкладываем душу в каждый букет'
  },
  {
    icon: '🚚',
    title: 'Доставка по городу',
    description: 'Бесплатная доставка при заказе от 1500₽'
  },
  {
    icon: '✨',
    title: 'Свежие ингредиенты',
    description: 'Работаем только с проверенными поставщиками'
  }
]
</script>
