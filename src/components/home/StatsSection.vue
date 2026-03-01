<template>
  <section class="bg-gradient-to-br from-gray-50 to-white py-20">
    <div class="container mx-auto px-4">
      <div ref="targetRef" :class="['transition-all duration-1000', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']">
        <h2 class="section-title">Наши первые шаги</h2>
        <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Мы только начинаем, но уже гордимся нашими достижениями
        </p>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div 
            v-for="(stat, index) in stats" 
            :key="stat.label"
            :style="{ transitionDelay: `${index * 100}ms` }"
            :class="['text-center group', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
          >
            <div class="relative inline-block mb-3">
              <div class="absolute inset-0 bg-primary-100 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
              <div class="relative text-4xl md:text-5xl font-bold text-primary-600 group-hover:scale-110 transition-transform duration-300">
                {{ isVisible ? stat.value : '0' }}{{ stat.suffix }}
              </div>
            </div>
            <div class="text-gray-600 font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'

const { isVisible, targetRef } = useIntersectionObserver({ once: true, threshold: 0.3 })

const stats = [
  { value: '50', suffix: '+', label: 'Довольных клиентов' },
  { value: '15', suffix: '+', label: 'Видов букетов' },
  { value: '100', suffix: '%', label: 'Ручная работа' },
  { value: '2', suffix: '', label: 'Месяца работы' }
]
</script>
