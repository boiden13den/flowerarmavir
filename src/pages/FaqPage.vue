<template>
  <div class="container mx-auto px-4 py-12">
    <Breadcrumbs />
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Часто задаваемые вопросы</h1>

    <div class="max-w-3xl mx-auto space-y-4">
      <div v-for="(item, index) in faqItems" :key="index" 
        class="border border-gray-200 rounded-lg overflow-hidden">
        <button @click="toggle(index)" 
          class="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left">
          <span class="font-medium text-gray-900">{{ item.question }}</span>
          <svg :class="{ 'rotate-180': openIndex === index }" 
            class="w-5 h-5 text-gray-500 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <Transition name="accordion">
          <div v-if="openIndex === index" class="px-6 py-4 bg-gray-50 text-gray-700">
            {{ item.answer }}
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

const openIndex = ref(null)
const faqItems = ref([])

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

onMounted(async () => {
  try {
    const response = await fetch('/data/faq.json')
    faqItems.value = await response.json()
  } catch (error) {
    console.error('Failed to load FAQ:', error)
  }
})
</script>

<style scoped>
.accordion-enter-active, .accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
}
.accordion-enter-from, .accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
