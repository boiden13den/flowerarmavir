import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref(null)

  const loadFromStorage = () => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')
    if (savedUser && savedToken) {
      user.value = JSON.parse(savedUser)
      token.value = savedToken
    }
  }

  const saveToStorage = () => {
    if (user.value && token.value) {
      localStorage.setItem('user', JSON.stringify(user.value))
      localStorage.setItem('token', token.value)
    } else {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }

  const login = async (email, password) => {
    // Mock login
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    const foundUser = users.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      user.value = { id: foundUser.id, name: foundUser.name, email: foundUser.email, phone: foundUser.phone }
      token.value = 'mock-token-' + Date.now()
      saveToStorage()
      return { success: true }
    }
    return { success: false, error: 'Неверный email или пароль' }
  }

  const register = async (data) => {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    
    if (users.find(u => u.email === data.email)) {
      return { success: false, error: 'Пользователь с таким email уже существует' }
    }

    const newUser = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      password: data.password
    }
    
    users.push(newUser)
    localStorage.setItem('registeredUsers', JSON.stringify(users))
    
    user.value = { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone }
    token.value = 'mock-token-' + Date.now()
    saveToStorage()
    
    return { success: true }
  }

  const logout = () => {
    user.value = null
    token.value = null
    saveToStorage()
  }

  const updateProfile = (data) => {
    if (user.value) {
      user.value = { ...user.value, ...data }
      saveToStorage()
      
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const index = users.findIndex(u => u.id === user.value.id)
      if (index !== -1) {
        users[index] = { ...users[index], ...data }
        localStorage.setItem('registeredUsers', JSON.stringify(users))
      }
    }
  }

  const isAuthenticated = computed(() => !!user.value && !!token.value)

  loadFromStorage()

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile
  }
})
