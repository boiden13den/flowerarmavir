<template>
  <div>
    <section class="bg-gradient-to-r from-lavender-100 to-mint-100 py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-display font-bold mb-6">Контакты</h1>
        <p class="text-xl text-gray-700">
          Свяжитесь с нами удобным способом
        </p>
      </div>
    </section>

    <section class="container mx-auto px-4 py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 class="text-3xl font-display font-bold mb-8">Наши контакты</h2>
          
          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <div class="text-3xl">📍</div>
              <div>
                <h3 class="font-semibold mb-1">Адрес</h3>
                <p class="text-gray-600">г. Армавир, ул. Ленина, 123</p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="text-3xl">📞</div>
              <div>
                <h3 class="font-semibold mb-1">Телефон</h3>
                <a href="tel:+79001234567" class="text-primary-600 hover:text-primary-700">
                  +7 (900) 123-45-67
                </a>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="text-3xl">📧</div>
              <div>
                <h3 class="font-semibold mb-1">Email</h3>
                <a href="mailto:info@zefir-armavir.ru" class="text-primary-600 hover:text-primary-700">
                  info@zefir-armavir.ru
                </a>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="text-3xl">🕐</div>
              <div>
                <h3 class="font-semibold mb-1">Режим работы</h3>
                <p class="text-gray-600">
                  Ежедневно с 9:00 до 20:00<br>
                  Без выходных
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="text-3xl">💬</div>
              <div>
                <h3 class="font-semibold mb-1">Мессенджеры</h3>
                <div class="flex space-x-4 mt-2">
                  <a href="#" class="text-2xl hover:scale-110 transition-transform">📱</a>
                  <a href="#" class="text-2xl hover:scale-110 transition-transform">💬</a>
                  <a href="#" class="text-2xl hover:scale-110 transition-transform">📲</a>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-12">
            <h3 class="text-2xl font-display font-bold mb-4">Мы в соцсетях</h3>
            <div class="flex space-x-4">
              <a href="#" class="card p-4 hover:shadow-lg transition-shadow">
                <span class="text-3xl">📷</span>
              </a>
              <a href="#" class="card p-4 hover:shadow-lg transition-shadow">
                <span class="text-3xl">📱</span>
              </a>
              <a href="#" class="card p-4 hover:shadow-lg transition-shadow">
                <span class="text-3xl">💬</span>
              </a>
            </div>
          </div>
        </div>

        <div class="card p-8">
          <h2 class="text-2xl font-display font-bold mb-6">Напишите нам</h2>
          
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Имя *</label>
              <input v-model="formData.name" type="text" class="input" :class="{ 'border-red-500': errors.name }" />
              <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Телефон *</label>
              <input v-model="formData.phone" type="tel" class="input" :class="{ 'border-red-500': errors.phone }" />
              <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Email</label>
              <input v-model="formData.email" type="email" class="input" :class="{ 'border-red-500': errors.email }" />
              <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">Сообщение *</label>
              <textarea v-model="formData.message" rows="5" class="input" :class="{ 'border-red-500': errors.message }"></textarea>
              <p v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</p>
            </div>

            <Button type="submit" :loading="submitting" size="lg" class="w-full">
              Отправить сообщение
            </Button>

            <p v-if="successMessage" class="text-green-600 text-center">{{ successMessage }}</p>
          </form>
        </div>
      </div>
    </section>

    <section class="bg-white py-20">
      <div class="container mx-auto px-4">
        <h2 class="section-title">Как нас найти</h2>
        <div class="card p-8 max-w-4xl mx-auto">
          <div class="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
            <p class="text-gray-500">Карта с местоположением (интеграция с Яндекс.Картами)</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFormValidation } from '@/composables/useFormValidation'
import { submitContactForm } from '@/utils/api'
import Button from '@/components/Button.vue'

const { errors, validateForm, clearErrors } = useFormValidation()

const formData = ref({
  name: '',
  phone: '',
  email: '',
  message: ''
})

const submitting = ref(false)
const successMessage = ref('')

const validationRules = {
  name: { required: true, minLength: 2 },
  phone: { required: true, phone: true },
  email: { email: true },
  message: { required: true, minLength: 10 }
}

const handleSubmit = async () => {
  clearErrors()
  successMessage.value = ''

  if (!validateForm(formData.value, validationRules)) {
    return
  }

  submitting.value = true
  try {
    await submitContactForm(formData.value)
    successMessage.value = 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.'
    formData.value = { name: '', phone: '', email: '', message: '' }
  } catch (error) {
    console.error('Form submission failed:', error)
    alert('Ошибка при отправке сообщения. Попробуйте еще раз.')
  } finally {
    submitting.value = false
  }
}
</script>
