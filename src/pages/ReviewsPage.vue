<template>
  <div class="container mx-auto px-4 py-12">
    <Breadcrumbs />
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Отзывы наших клиентов</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="review in reviews" :key="review.id" 
        class="bg-white rounded-lg shadow-md overflow-hidden">
        <img :src="review.image" :alt="review.name" class="w-full h-64 object-cover">
        <div class="p-6">
          <div class="flex items-center mb-3">
            <div class="flex text-yellow-400">
              <span v-for="i in 5" :key="i">{{ i <= review.rating ? '★' : '☆' }}</span>
            </div>
          </div>
          <p class="text-gray-700 mb-4">{{ review.text }}</p>
          <div class="flex items-center">
            <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold mr-3">
              {{ review.name.charAt(0) }}
            </div>
            <div>
              <p class="font-medium text-gray-900">{{ review.name }}</p>
              <p class="text-sm text-gray-500">{{ formatDate(review.date) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 text-center">
      <Button @click="showReviewModal = true" variant="primary">
        Оставить отзыв
      </Button>
    </div>

    <Modal :show="showReviewModal" @close="showReviewModal = false" title="Оставить отзыв">
      <form @submit.prevent="submitReview" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
          <input v-model="reviewForm.name" type="text" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Оценка</label>
          <div class="flex gap-2">
            <button v-for="i in 5" :key="i" type="button" @click="reviewForm.rating = i"
              class="text-3xl" :class="i <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'">
              ★
            </button>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Отзыв</label>
          <textarea v-model="reviewForm.text" required rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"></textarea>
        </div>
        <Button type="submit" variant="primary" class="w-full">
          Отправить отзыв
        </Button>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'

const reviews = ref([])
const showReviewModal = ref(false)

const reviewForm = reactive({
  name: '',
  rating: 5,
  text: ''
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const submitReview = () => {
  alert('Спасибо за ваш отзыв! Он будет опубликован после модерации.')
  showReviewModal.value = false
  reviewForm.name = ''
  reviewForm.rating = 5
  reviewForm.text = ''
}

onMounted(async () => {
  try {
    const response = await fetch('/data/reviews.json')
    reviews.value = await response.json()
  } catch (error) {
    console.error('Failed to load reviews:', error)
  }
})
</script>
