<template>
  <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2 mt-8">
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
      class="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
      ←
    </button>

    <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
      :class="page === currentPage ? 'bg-primary-500 text-white' : 'hover:bg-gray-50'"
      class="px-4 py-2 border rounded-lg transition-colors">
      {{ page }}
    </button>

    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
      class="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
      →
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  maxVisible: { type: Number, default: 5 }
})

const emit = defineEmits(['page-change'])

const visiblePages = computed(() => {
  const pages = []
  const half = Math.floor(props.maxVisible / 2)
  let start = Math.max(1, props.currentPage - half)
  let end = Math.min(props.totalPages, start + props.maxVisible - 1)
  
  if (end - start < props.maxVisible - 1) {
    start = Math.max(1, end - props.maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}
</script>
