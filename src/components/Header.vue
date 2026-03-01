<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20">
        <router-link to="/" class="flex items-center space-x-2">
          <span class="text-3xl">🌸</span>
          <div>
            <h1 class="text-xl font-display font-bold text-primary-600">Зефирные Букеты</h1>
            <p class="text-xs text-gray-500">Армавир</p>
          </div>
        </router-link>

        <nav class="hidden md:flex items-center space-x-8">
          <router-link v-for="link in navLinks" :key="link.path" :to="link.path" 
            class="text-gray-700 hover:text-primary-500 transition-colors font-medium"
            active-class="text-primary-600">
            {{ link.name }}
          </router-link>
        </nav>

        <div class="flex items-center space-x-4">
          <router-link to="/favorites" class="relative group hidden md:block">
            <svg class="w-7 h-7 text-gray-700 group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span v-if="favoritesStore.count > 0" 
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {{ favoritesStore.count }}
            </span>
          </router-link>

          <router-link to="/cart" class="relative group">
            <svg class="w-8 h-8 text-gray-700 group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="cartStore.totalItems > 0" 
              class="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {{ cartStore.totalItems }}
            </span>
          </router-link>

          <div v-if="userStore.isAuthenticated" class="relative hidden md:block">
            <button @click="showUserMenu = !showUserMenu" class="flex items-center space-x-2 text-gray-700 hover:text-primary-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <Transition name="fade">
              <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <router-link to="/profile" @click="showUserMenu = false" class="block px-4 py-2 hover:bg-gray-100">Профиль</router-link>
                <router-link to="/orders" @click="showUserMenu = false" class="block px-4 py-2 hover:bg-gray-100">Мои заказы</router-link>
                <button @click="logout" class="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Выход</button>
              </div>
            </Transition>
          </div>
          <button v-else @click="showAuthModal = true" class="hidden md:block text-gray-700 hover:text-primary-500">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </button>

          <button @click="toggleMobileMenu" class="md:hidden text-gray-700">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <Transition name="slide">
      <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t">
        <nav class="container mx-auto px-4 py-4 flex flex-col space-y-3">
          <router-link v-for="link in navLinks" :key="link.path" :to="link.path" 
            @click="closeMobileMenu"
            class="text-gray-700 hover:text-primary-500 transition-colors font-medium py-2">
            {{ link.name }}
          </router-link>
        </nav>
      </div>
    </Transition>

    <AuthModal :show="showAuthModal" @close="showAuthModal = false" />
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'
import { useUserStore } from '@/stores/user'
import AuthModal from './AuthModal.vue'

const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()
const userStore = useUserStore()
const mobileMenuOpen = ref(false)
const showUserMenu = ref(false)
const showAuthModal = ref(false)

const navLinks = [
  { name: 'Главная', path: '/' },
  { name: 'Каталог', path: '/catalog' },
  { name: 'Конструктор', path: '/constructor' },
  { name: 'Акции', path: '/promotions' },
  { name: 'О нас', path: '/about' },
  { name: 'Контакты', path: '/contacts' }
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const logout = () => {
  userStore.logout()
  showUserMenu.value = false
}
</script>
