<template>
  <div class="container mx-auto px-4 py-12">
    <Breadcrumbs />
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Мой профиль</h1>

    <div class="max-w-2xl bg-white rounded-lg shadow-md p-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Имя</label>
          <input v-model="form.name" type="text" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input v-model="form.email" type="email" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
          <input v-model="form.phone" type="tel"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
        </div>

        <div class="flex gap-4">
          <Button type="submit" variant="primary">
            Сохранить изменения
          </Button>
          <Button @click="$router.push('/orders')" variant="outline">
            Мои заказы
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Button from '@/components/Button.vue'

const userStore = useUserStore()

const form = reactive({
  name: '',
  email: '',
  phone: ''
})

onMounted(() => {
  if (userStore.user) {
    form.name = userStore.user.name
    form.email = userStore.user.email
    form.phone = userStore.user.phone || ''
  }
})

const handleSubmit = () => {
  userStore.updateProfile(form)
  alert('Профиль успешно обновлён')
}
</script>
