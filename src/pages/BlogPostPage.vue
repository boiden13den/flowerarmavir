<template>
  <div v-if="post" class="container mx-auto px-4 py-12">
    <Breadcrumbs />
    
    <article class="max-w-4xl mx-auto">
      <img :src="post.image" :alt="post.title" class="w-full h-96 object-cover rounded-2xl mb-8">
      
      <div class="mb-6">
        <div class="text-sm text-gray-500 mb-4">{{ formatDate(post.date) }}</div>
        <h1 class="text-4xl font-bold text-gray-900 mb-6">{{ post.title }}</h1>
      </div>

      <div class="prose prose-lg max-w-none mb-8" v-html="post.content"></div>

      <ShareButtons :title="post.title" />

      <div class="mt-12 pt-8 border-t">
        <router-link to="/blog" class="text-primary-600 hover:text-primary-700 font-medium">
          ← Вернуться к блогу
        </router-link>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import ShareButtons from '@/components/ShareButtons.vue'

const route = useRoute()
const post = ref(null)

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
    const posts = await response.json()
    post.value = posts.find(p => p.slug === route.params.slug)
  } catch (error) {
    console.error('Failed to load blog post:', error)
  }
})
</script>
