<template>
  <div class="container mx-auto px-4 py-12">
    <Breadcrumbs />
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Блог</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article v-for="post in paginatedPosts" :key="post.id" 
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <router-link :to="`/blog/${post.slug}`">
          <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover">
        </router-link>
        <div class="p-6">
          <div class="text-sm text-gray-500 mb-2">{{ formatDate(post.date) }}</div>
          <router-link :to="`/blog/${post.slug}`">
            <h2 class="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
              {{ post.title }}
            </h2>
          </router-link>
          <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
          <router-link :to="`/blog/${post.slug}`" 
            class="text-primary-600 hover:text-primary-700 font-medium">
            Читать далее →
          </router-link>
        </div>
      </article>
    </div>

    <Pagination :current-page="currentPage" :total-pages="totalPages" @page-change="changePage" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Pagination from '@/components/Pagination.vue'

const posts = ref([])
const currentPage = ref(1)
const perPage = 9

const totalPages = computed(() => Math.ceil(posts.value.length / perPage))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return posts.value.slice(start, start + perPage)
})

const changePage = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(async () => {
  try {
    const response = await fetch('/data/blog.json')
    posts.value = await response.json()
  } catch (error) {
    console.error('Failed to load blog posts:', error)
  }
})
</script>
