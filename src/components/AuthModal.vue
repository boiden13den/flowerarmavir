<template>
  <Modal :show="show" @close="$emit('close')" :title="isLogin ? 'Вход' : 'Регистрация'">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div v-if="!isLogin">
        <label class="block text-sm font-medium text-gray-700 mb-1">Имя</label>
        <input v-model="form.name" type="text" required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input v-model="form.email" type="email" required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
      </div>

      <div v-if="!isLogin">
        <label class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
        <input v-model="form.phone" type="tel"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
        <input v-model="form.password" type="password" required minlength="6"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
      </div>

      <div v-if="!isLogin">
        <label class="block text-sm font-medium text-gray-700 mb-1">Подтвердите пароль</label>
        <input v-model="form.confirmPassword" type="password" required minlength="6"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
      </div>

      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

      <Button type="submit" variant="primary" class="w-full">
        {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
      </Button>

      <button type="button" @click="toggleMode" class="w-full text-center text-primary-600 hover:text-primary-700 text-sm">
        {{ isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите' }}
      </button>
    </form>
  </Modal>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import Modal from './Modal.vue'
import Button from './Button.vue'

const emit = defineEmits(['close', 'success'])

defineProps({
  show: Boolean
})

const userStore = useUserStore()
const isLogin = ref(true)
const error = ref('')

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  error.value = ''
  resetForm()
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.password = ''
  form.confirmPassword = ''
}

const handleSubmit = async () => {
  error.value = ''

  if (!isLogin.value && form.password !== form.confirmPassword) {
    error.value = 'Пароли не совпадают'
    return
  }

  const result = isLogin.value 
    ? await userStore.login(form.email, form.password)
    : await userStore.register(form)

  if (result.success) {
    emit('success')
    emit('close')
    resetForm()
  } else {
    error.value = result.error
  }
}
</script>
