<template>
  <div class="container mx-auto px-4 py-12">
    <Breadcrumbs />
    <div class="max-w-4xl mx-auto prose prose-lg">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Политика конфиденциальности</h1>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">1. Общие положения</h2>
        <p class="text-gray-700 mb-4">
          Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных 
          пользователей сайта zefir-armavir.ru (далее — Сайт).
        </p>
        <p class="text-gray-700">
          Используя Сайт, вы соглашаетесь с условиями данной Политики конфиденциальности.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">2. Собираемая информация</h2>
        <p class="text-gray-700 mb-4">Мы можем собирать следующую информацию:</p>
        <ul class="list-disc pl-6 text-gray-700 space-y-2">
          <li>Имя и фамилия</li>
          <li>Контактная информация (email, телефон)</li>
          <li>Адрес доставки</li>
          <li>Информация о заказах</li>
          <li>Данные об использовании сайта (cookies, IP-адрес)</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">3. Использование информации</h2>
        <p class="text-gray-700 mb-4">Собранная информация используется для:</p>
        <ul class="list-disc pl-6 text-gray-700 space-y-2">
          <li>Обработки и выполнения заказов</li>
          <li>Связи с клиентами</li>
          <li>Улучшения качества обслуживания</li>
          <li>Отправки информационных рассылок (с вашего согласия)</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">4. Защита данных</h2>
        <p class="text-gray-700">
          Мы принимаем необходимые меры для защиты ваших персональных данных от несанкционированного доступа, 
          изменения, раскрытия или уничтожения.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">5. Ваши права</h2>
        <p class="text-gray-700 mb-4">Вы имеете право:</p>
        <ul class="list-disc pl-6 text-gray-700 space-y-2">
          <li>Получать информацию о ваших персональных данных</li>
          <li>Требовать исправления неточных данных</li>
          <li>Требовать удаления ваших данных</li>
          <li>Отозвать согласие на обработку данных</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">6. Контакты</h2>
        <p class="text-gray-700">
          По вопросам, связанным с обработкой персональных данных, обращайтесь:<br>
          Email: info@zefir-armavir.ru<br>
          Телефон: +7 (900) 123-45-67
        </p>
      </section>

      <p class="text-sm text-gray-500 mt-8">
        Дата последнего обновления: {{ new Date().toLocaleDateString('ru-RU') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
</script>
