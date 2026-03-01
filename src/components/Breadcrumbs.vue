<template>
  <nav v-if="breadcrumbs.length > 1" class="flex items-center space-x-2 text-sm text-gray-600 mb-6">
    <router-link v-for="(crumb, index) in breadcrumbs" :key="index" 
      :to="crumb.path"
      :class="index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : 'hover:text-primary-600'"
      class="transition-colors">
      {{ crumb.name }}
      <span v-if="index < breadcrumbs.length - 1" class="mx-2">/</span>
    </router-link>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
  const crumbs = [{ name: 'Главная', path: '/' }]
  
  const pathMap = {
    '/catalog': 'Каталог',
    '/cart': 'Корзина',
    '/checkout': 'Оформление заказа',
    '/favorites': 'Избранное',
    '/compare': 'Сравнение',
    '/profile': 'Профиль',
    '/orders': 'Мои заказы',
    '/about': 'О нас',
    '/delivery': 'Доставка',
    '/contacts': 'Контакты',
    '/faq': 'Вопросы и ответы',
    '/reviews': 'Отзывы',
    '/blog': 'Блог',
    '/promotions': 'Акции',
    '/constructor': 'Конструктор букетов',
    '/certificates': 'Сертификаты',
    '/privacy': 'Политика конфиденциальности',
    '/terms': 'Пользовательское соглашение'
  }

  const path = route.path
  
  if (pathMap[path]) {
    crumbs.push({ name: pathMap[path], path })
  } else if (path.startsWith('/catalog/')) {
    crumbs.push({ name: 'Каталог', path: '/catalog' })
    crumbs.push({ name: route.meta.title || 'Товар', path })
  } else if (path.startsWith('/blog/')) {
    crumbs.push({ name: 'Блог', path: '/blog' })
    crumbs.push({ name: route.meta.title || 'Статья', path })
  }

  return crumbs
})
</script>
