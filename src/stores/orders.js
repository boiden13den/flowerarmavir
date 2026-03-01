import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref([])

  const loadFromStorage = () => {
    const saved = localStorage.getItem('orders')
    if (saved) {
      orders.value = JSON.parse(saved)
    }
  }

  const saveToStorage = () => {
    localStorage.setItem('orders', JSON.stringify(orders.value))
  }

  const createOrder = (orderData) => {
    const order = {
      id: Date.now(),
      number: 'ORD-' + Date.now(),
      date: new Date().toISOString(),
      status: 'pending',
      items: orderData.items,
      total: orderData.total,
      customer: orderData.customer,
      delivery: orderData.delivery
    }
    
    orders.value.unshift(order)
    saveToStorage()
    return order
  }

  const getOrderById = (orderId) => {
    return orders.value.find(order => order.id === parseInt(orderId))
  }

  const getOrderByNumber = (orderNumber) => {
    return orders.value.find(order => order.number === orderNumber)
  }

  const userOrders = computed(() => {
    return orders.value.sort((a, b) => new Date(b.date) - new Date(a.date))
  })

  loadFromStorage()

  return {
    orders,
    userOrders,
    createOrder,
    getOrderById,
    getOrderByNumber
  }
})
