<template>
  <section class="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
    <!-- Parallax Background Layers -->
    <div 
      class="absolute inset-0 bg-gradient-to-br from-pink-100 via-lavender-50 to-mint-100"
      :style="{ transform: `translateY(${offset * 0.3}px)` }"
    ></div>
    
    <!-- Floating Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        v-for="(item, i) in floatingElements" 
        :key="i"
        class="absolute text-6xl opacity-20 animate-float"
        :style="{ 
          left: item.left, 
          top: item.top,
          animationDelay: `${i * 0.5}s`,
          transform: `translateY(${offset * item.speed}px)`
        }"
      >
        {{ item.emoji }}
      </div>
    </div>

    <!-- Content -->
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <div class="animate-fade-in-up">
        <span class="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-6 animate-bounce-slow">
          🎉 Новая кондитерская в Армавире
        </span>
        <h1 class="text-5xl md:text-7xl font-display font-bold mb-6 text-gray-800 leading-tight">
          Зефирные букеты<br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-lavender-500">
            ручной работы
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Создаём сладкие шедевры с любовью. Каждый букет — уникальное произведение искусства
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button @click="$router.push('/catalog')" size="lg" class="group">
            <span>Смотреть каталог</span>
            <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
          <Button @click="$router.push('/constructor')" variant="secondary" size="lg">
            Создать свой букет
          </Button>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useParallax } from '@/composables/useParallax'
import Button from '@/components/Button.vue'

const { offset } = useParallax(0.5)

const floatingElements = [
  { emoji: '🌸', left: '10%', top: '20%', speed: 0.2 },
  { emoji: '🍬', left: '80%', top: '30%', speed: 0.3 },
  { emoji: '🎀', left: '15%', top: '70%', speed: 0.25 },
  { emoji: '💐', left: '85%', top: '60%', speed: 0.35 },
  { emoji: '🌺', left: '50%', top: '15%', speed: 0.4 }
]
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out;
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}
</style>
