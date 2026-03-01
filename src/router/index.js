import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import HomePage from '@/pages/HomePage.vue'
import CatalogPage from '@/pages/CatalogPage.vue'
import ProductPage from '@/pages/ProductPage.vue'
import CartPage from '@/pages/CartPage.vue'
import CheckoutPage from '@/pages/CheckoutPage.vue'
import ThanksPage from '@/pages/ThanksPage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import DeliveryPage from '@/pages/DeliveryPage.vue'
import ContactsPage from '@/pages/ContactsPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'Зефирные Букеты Армавир | Главная',
      description: 'Дизайнерские букеты из зефира в Армавире. Доставка и самовывоз.'
    }
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: CatalogPage,
    meta: {
      title: 'Каталог букетов | Зефирные Букеты Армавир',
      description: 'Выберите букет из зефира на любой вкус и праздник'
    }
  },
  {
    path: '/catalog/:slug',
    name: 'product',
    component: ProductPage,
    meta: {
      title: 'Букет | Зефирные Букеты Армавир'
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
    meta: {
      title: 'Корзина | Зефирные Букеты Армавир'
    }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutPage,
    meta: {
      title: 'Оформление заказа | Зефирные Букеты Армавир'
    }
  },
  {
    path: '/thanks/:orderId',
    name: 'thanks',
    component: ThanksPage,
    meta: {
      title: 'Спасибо за заказ | Зефирные Букеты Армавир'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage,
    meta: {
      title: 'О нас | Зефирные Букеты Армавир',
      description: 'Узнайте больше о нашей компании и процессе создания букетов'
    }
  },
  {
    path: '/delivery',
    name: 'delivery',
    component: DeliveryPage,
    meta: {
      title: 'Доставка и оплата | Зефирные Букеты Армавир',
      description: 'Условия доставки по Армавиру и способы оплаты'
    }
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: ContactsPage,
    meta: {
      title: 'Контакты | Зефирные Букеты Армавир',
      description: 'Свяжитесь с нами любым удобным способом'
    }
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('@/pages/FaqPage.vue'),
    meta: { title: 'Часто задаваемые вопросы | Зефирные Букеты Армавир' }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('@/pages/FavoritesPage.vue'),
    meta: { title: 'Избранное | Зефирные Букеты Армавир' }
  },
  {
    path: '/compare',
    name: 'compare',
    component: () => import('@/pages/ComparePage.vue'),
    meta: { title: 'Сравнение товаров | Зефирные Букеты Армавир' }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/ProfilePage.vue'),
    meta: { title: 'Мой профиль | Зефирные Букеты Армавир', requiresAuth: true }
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/pages/OrdersPage.vue'),
    meta: { title: 'Мои заказы | Зефирные Букеты Армавир', requiresAuth: true }
  },
  {
    path: '/reviews',
    name: 'reviews',
    component: () => import('@/pages/ReviewsPage.vue'),
    meta: { title: 'Отзывы | Зефирные Букеты Армавир' }
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/pages/BlogPage.vue'),
    meta: { title: 'Блог | Зефирные Букеты Армавир' }
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: () => import('@/pages/BlogPostPage.vue'),
    meta: { title: 'Статья | Зефирные Букеты Армавир' }
  },
  {
    path: '/promotions',
    name: 'promotions',
    component: () => import('@/pages/PromotionsPage.vue'),
    meta: { title: 'Акции | Зефирные Букеты Армавир' }
  },
  {
    path: '/constructor',
    name: 'constructor',
    component: () => import('@/pages/ConstructorPage.vue'),
    meta: { title: 'Конструктор букетов | Зефирные Букеты Армавир' }
  },
  {
    path: '/certificates',
    name: 'certificates',
    component: () => import('@/pages/CertificatesPage.vue'),
    meta: { title: 'Подарочные сертификаты | Зефирные Букеты Армавир' }
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('@/pages/PrivacyPage.vue'),
    meta: { title: 'Политика конфиденциальности | Зефирные Букеты Армавир' }
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('@/pages/TermsPage.vue'),
    meta: { title: 'Пользовательское соглашение | Зефирные Букеты Армавир' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { title: 'Страница не найдена | Зефирные Букеты Армавир' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  document.title = to.meta.title || 'Зефирные Букеты Армавир'
  
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription && to.meta.description) {
    metaDescription.setAttribute('content', to.meta.description)
  }
  
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
