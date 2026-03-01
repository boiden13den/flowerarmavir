<template>
  <div>
    <HeroSection />
    <FeaturesSection />
    <PopularProductsSection :popular-products="popularProducts" :loading="loading" />
    <StatsSection />
    <ReviewsSection :reviews="reviews.slice(0, 3)" />
    <CTASection />
    <Toast :show="showNotification" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProducts, getReviews } from '@/utils/api'
import { useCart } from '@/composables/useCart'
import HeroSection from '@/components/home/HeroSection.vue'
import FeaturesSection from '@/components/home/FeaturesSection.vue'
import PopularProductsSection from '@/components/home/PopularProductsSection.vue'
import StatsSection from '@/components/home/StatsSection.vue'
import ReviewsSection from '@/components/home/ReviewsSection.vue'
import CTASection from '@/components/home/CTASection.vue'
import Toast from '@/components/Toast.vue'

const { showNotification } = useCart()

const popularProducts = ref([])
const reviews = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const [productsRes, reviewsRes] = await Promise.all([
      getProducts(),
      getReviews()
    ])
    popularProducts.value = productsRes.data.filter(p => p.isBestseller).slice(0, 4)
    reviews.value = reviewsRes.data
  } catch (error) {
    console.error('Failed to load data:', error)
  } finally {
    loading.value = false
  }
})
</script>
