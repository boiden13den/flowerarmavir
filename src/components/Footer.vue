<template>
  <footer class="bg-gray-900 text-white mt-20">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-xl font-display font-bold mb-4 text-primary-300">Зефирные Букеты</h3>
          <p class="text-gray-400 text-sm">
            Дизайнерские букеты из зефира ручной работы в Армавире
          </p>
        </div>

        <div>
          <h4 class="font-semibold mb-4">Навигация</h4>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/catalog" class="text-gray-400 hover:text-primary-300 transition-colors">Каталог</router-link></li>
            <li><router-link to="/constructor" class="text-gray-400 hover:text-primary-300 transition-colors">Конструктор</router-link></li>
            <li><router-link to="/promotions" class="text-gray-400 hover:text-primary-300 transition-colors">Акции</router-link></li>
            <li><router-link to="/certificates" class="text-gray-400 hover:text-primary-300 transition-colors">Сертификаты</router-link></li>
            <li><router-link to="/blog" class="text-gray-400 hover:text-primary-300 transition-colors">Блог</router-link></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-4">Информация</h4>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/about" class="text-gray-400 hover:text-primary-300 transition-colors">О нас</router-link></li>
            <li><router-link to="/delivery" class="text-gray-400 hover:text-primary-300 transition-colors">Доставка</router-link></li>
            <li><router-link to="/faq" class="text-gray-400 hover:text-primary-300 transition-colors">FAQ</router-link></li>
            <li><router-link to="/reviews" class="text-gray-400 hover:text-primary-300 transition-colors">Отзывы</router-link></li>
            <li><router-link to="/contacts" class="text-gray-400 hover:text-primary-300 transition-colors">Контакты</router-link></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-4">Контакты</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>📞 +7 (900) 123-45-67</li>
            <li>📧 info@zefir-armavir.ru</li>
            <li>📍 г. Армавир, ул. Ленина, 123</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-4">Мы в соцсетях</h4>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-primary-300 transition-colors text-2xl">📷</a>
            <a href="#" class="text-gray-400 hover:text-primary-300 transition-colors text-2xl">📱</a>
            <a href="#" class="text-gray-400 hover:text-primary-300 transition-colors text-2xl">💬</a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8">
        <Newsletter />
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>&copy; 2024 Зефирные Букеты Армавир. Все права защищены.</p>
        <div class="flex gap-4 mt-4 md:mt-0">
          <router-link to="/privacy" class="hover:text-primary-300 transition-colors">Политика конфиденциальности</router-link>
          <router-link to="/terms" class="hover:text-primary-300 transition-colors">Пользовательское соглашение</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Newsletter from './Newsletter.vue'
</script>
