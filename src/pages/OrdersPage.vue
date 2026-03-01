<template>
  <div class="container mx-auto px-4 py-12">
    <Breadcrumbs />
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Мои заказы</h1>

    <div v-if="ordersStore.userOrders.length === 0" class="text-center py-16">
      <div class="text-6xl mb-4">📦</div>
      <p class="text-xl text-gray-600 mb-6">У вас пока нет заказов</p>
      <Button @click="$router.push('/catalog')" variant="primary">
        Перейти в каталог
      </Button>
    </div>

    <div v-else class="space-y-6">
      <div v-for="order in ordersStore.userOrders" :key="order.id" 
        class="bg-white rounded-lg shadow-md p-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h3 class="text-lg font-bold text-gray-900">Заказ {{ order.number }}</h3>
            <p class="text-sm text-gray-500">{{ formatDate(order.date) }}</p>
          </div>
          <div class="mt-2 md:mt-0">
            <span :class="statusClass(order.status)" 
              class="px-4 py-2 rounded-full text-sm font-medium">
              {{ statusText(order.status) }}
            </span>
          </div>
        </div>

        <div class="border-t pt-4">
          <div v-for="item in order.items" :key="item.id" 
            class="flex items-center gap-4 mb-3">
            <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded">
            <div class="flex-1">
              <p class="font-medium">{{ item.name }}</p>
              <p class="text-sm text-gray-500">{{ item.quantity }} шт. × {{ item.price }}₽</p>
            </div>
          </div>
        </div>

        <div class="border-t pt-4 flex justify-between items-center">
          <span class="text-lg font-bold">Итого: {{ order.total }}₽</span>
          <Button @click="$router.push(`/thanks/${order.id}`)" variant="outline" size="sm">
            Подробнее
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrdersStore } from '@/stores/orders'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Button from '@/components/Button.vue'

const ordersStore = useOrdersStore()

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const statusText = (status) => {
  const statuses = {
    pending: 'Обрабатывается',
    processing: 'Собирается',
    delivering: 'Доставляется',
    completed: 'Выполнен',
    cancelled: 'Отменён'
  }
  return statuses[status] || status
}

const statusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    delivering: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script>
