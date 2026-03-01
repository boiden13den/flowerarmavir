<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-display font-bold mb-8">Оформление заказа</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="card p-6">
            <h3 class="text-xl font-display font-semibold mb-4">Контактные данные</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Имя *</label>
                <input v-model="formData.name" type="text" class="input" :class="{ 'border-red-500': errors.name }" />
                <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Телефон *</label>
                <input v-model="formData.phone" type="tel" placeholder="+7 (900) 123-45-67" class="input" :class="{ 'border-red-500': errors.phone }" />
                <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Email</label>
                <input v-model="formData.email" type="email" class="input" :class="{ 'border-red-500': errors.email }" />
                <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="text-xl font-display font-semibold mb-4">Доставка</h3>
            
            <div class="space-y-4">
              <div>
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input v-model="formData.deliveryType" type="radio" value="delivery" class="w-4 h-4" />
                  <span>Доставка по Армавиру</span>
                </label>
              </div>

              <div>
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input v-model="formData.deliveryType" type="radio" value="pickup" class="w-4 h-4" />
                  <span>Самовывоз (ул. Ленина, 123)</span>
                </label>
              </div>

              <div v-if="formData.deliveryType === 'delivery'">
                <label class="block text-sm font-medium mb-2">Адрес доставки *</label>
                <input v-model="formData.address" type="text" placeholder="Улица, дом, квартира" class="input" :class="{ 'border-red-500': errors.address }" />
                <p v-if="errors.address" class="text-red-500 text-sm mt-1">{{ errors.address }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Дата и время доставки</label>
                <input v-model="formData.deliveryDate" type="datetime-local" class="input" />
              </div>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="text-xl font-display font-semibold mb-4">Оплата</h3>
            
            <div class="space-y-4">
              <label class="flex items-center space-x-3 cursor-pointer">
                <input v-model="formData.paymentType" type="radio" value="cash" class="w-4 h-4" />
                <span>Наличными при получении</span>
              </label>

              <label class="flex items-center space-x-3 cursor-pointer">
                <input v-model="formData.paymentType" type="radio" value="card" class="w-4 h-4" />
                <span>Картой при получении</span>
              </label>

              <label class="flex items-center space-x-3 cursor-pointer">
                <input v-model="formData.paymentType" type="radio" value="online" class="w-4 h-4" />
                <span>Онлайн оплата</span>
              </label>
            </div>
          </div>

          <div class="card p-6">
            <label class="block text-sm font-medium mb-2">Комментарий к заказу</label>
            <textarea v-model="formData.comment" rows="4" class="input" placeholder="Пожелания к заказу..."></textarea>
          </div>

          <Button type="submit" :loading="submitting" size="lg" class="w-full">
            Подтвердить заказ
          </Button>
        </form>
      </div>

      <div class="lg:col-span-1">
        <div class="card p-6 sticky top-24">
          <h3 class="text-xl font-display font-semibold mb-4">Ваш заказ</h3>
          
          <div class="space-y-3 mb-6">
            <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between text-sm">
              <span>{{ item.name }} × {{ item.quantity }}</span>
              <span>{{ formatPrice(item.price * item.quantity) }}</span>
            </div>
          </div>

          <div class="border-t pt-4 space-y-2 mb-6">
            <div class="flex justify-between text-gray-600">
              <span>Товары:</span>
              <span>{{ formatPrice(cartStore.totalPrice) }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Доставка:</span>
              <span>{{ deliveryCost }}</span>
            </div>
            <div class="flex justify-between text-xl font-bold">
              <span>Итого:</span>
              <span class="text-primary-600">{{ totalWithDelivery }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useOrdersStore } from '@/stores/orders'
import { useFormValidation } from '@/composables/useFormValidation'
import { formatPrice } from '@/utils/helpers'
import Button from '@/components/Button.vue'

const router = useRouter()
const cartStore = useCartStore()
const ordersStore = useOrdersStore()
const { errors, validateForm } = useFormValidation()

const formData = ref({
  name: '',
  phone: '',
  email: '',
  deliveryType: 'delivery',
  address: '',
  deliveryDate: '',
  paymentType: 'cash',
  comment: ''
})

const submitting = ref(false)

const deliveryCost = computed(() => {
  if (formData.value.deliveryType === 'pickup') return 'Бесплатно'
  return cartStore.totalPrice >= 1500 ? 'Бесплатно' : formatPrice(200)
})

const totalWithDelivery = computed(() => {
  const delivery = formData.value.deliveryType === 'pickup' || cartStore.totalPrice >= 1500 ? 0 : 200
  return formatPrice(cartStore.totalPrice + delivery)
})

const validationRules = {
  name: { required: true, minLength: 2 },
  phone: { required: true, phone: true },
  email: { email: true }
}

const handleSubmit = async () => {
  const rules = { ...validationRules }
  if (formData.value.deliveryType === 'delivery') {
    rules.address = { required: true, minLength: 5 }
  }

  if (!validateForm(formData.value, rules)) {
    return
  }

  submitting.value = true
  try {
    const delivery = formData.value.deliveryType === 'pickup' || cartStore.totalPrice >= 1500 ? 0 : 200
    const orderData = {
      items: cartStore.items,
      total: cartStore.totalPrice + delivery,
      customer: {
        name: formData.value.name,
        phone: formData.value.phone,
        email: formData.value.email
      },
      delivery: {
        type: formData.value.deliveryType,
        address: formData.value.address,
        date: formData.value.deliveryDate,
        cost: delivery
      },
      payment: formData.value.paymentType,
      comment: formData.value.comment
    }
    
    const order = ordersStore.createOrder(orderData)
    cartStore.clearCart()
    router.push({ name: 'thanks', params: { orderId: order.id } })
  } catch (error) {
    console.error('Order submission failed:', error)
    alert('Ошибка при оформлении заказа. Попробуйте еще раз.')
  } finally {
    submitting.value = false
  }
}
</script>
