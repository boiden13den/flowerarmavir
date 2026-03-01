import axios from 'axios'

const USE_MOCK = true

const api = axios.create({
  baseURL: USE_MOCK ? '' : '/api',
  timeout: 10000
})

export const getProducts = async (params = {}) => {
  if (USE_MOCK) {
    const response = await fetch('/data/products.json')
    const data = await response.json()
    let products = data.products

    if (params.category && params.category !== 'all') {
      products = products.filter(p => p.category === params.category)
    }
    if (params.search) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(params.search.toLowerCase()) ||
        p.description.toLowerCase().includes(params.search.toLowerCase())
      )
    }
    if (params.sort === 'price-asc') {
      products.sort((a, b) => a.price - b.price)
    } else if (params.sort === 'price-desc') {
      products.sort((a, b) => b.price - a.price)
    }

    return { data: products }
  }
  return api.get('/products', { params })
}

export const getProductBySlug = async (slug) => {
  if (USE_MOCK) {
    const response = await fetch('/data/products.json')
    const data = await response.json()
    const product = data.products.find(p => p.slug === slug)
    return { data: product }
  }
  return api.get(`/products/${slug}`)
}

export const getCategories = async () => {
  if (USE_MOCK) {
    const response = await fetch('/data/products.json')
    const data = await response.json()
    return { data: data.categories }
  }
  return api.get('/categories')
}

export const getReviews = async () => {
  if (USE_MOCK) {
    const response = await fetch('/data/products.json')
    const data = await response.json()
    return { data: data.reviews }
  }
  return api.get('/reviews')
}

export const submitOrder = async (orderData) => {
  if (USE_MOCK) {
    console.log('Order submitted:', orderData)
    return { 
      data: { 
        success: true, 
        orderId: Math.random().toString(36).substr(2, 9).toUpperCase() 
      } 
    }
  }
  return api.post('/orders', orderData)
}

export const submitContactForm = async (formData) => {
  if (USE_MOCK) {
    console.log('Contact form submitted:', formData)
    return { data: { success: true } }
  }
  return api.post('/contact', formData)
}
