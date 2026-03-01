<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="text-center">
      <div class="text-9xl mb-4">🌸</div>
      <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p class="text-2xl text-gray-600 mb-8">Страница не найдена</p>
      <p class="text-gray-500 mb-8">К сожалению, запрашиваемая страница не существует</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button @click="$router.push('/')" variant="primary">
          На главную
        </Button>
        <Button @click="$router.push('/catalog')" variant="outline">
          В каталог
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue'
</script>
