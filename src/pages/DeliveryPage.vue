<template>
  <div>
    <section class="bg-gradient-to-r from-mint-100 to-primary-100 py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-display font-bold mb-6">Доставка и оплата</h1>
        <p class="text-xl text-gray-700">
          Удобные условия доставки по Армавиру
        </p>
      </div>
    </section>

    <section class="container mx-auto px-4 py-20">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div class="card p-8">
          <div class="text-5xl mb-4">🚚</div>
          <h2 class="text-2xl font-display font-bold mb-4">Доставка</h2>
          
          <div class="space-y-4">
            <div>
              <h3 class="font-semibold mb-2">По Армавиру</h3>
              <p class="text-gray-600">
                Доставка по городу — 200₽<br>
                <span class="text-primary-600 font-semibold">Бесплатно при заказе от 1500₽</span>
              </p>
            </div>

            <div>
              <h3 class="font-semibold mb-2">Время доставки</h3>
              <p class="text-gray-600">
                Ежедневно с 9:00 до 21:00<br>
                Доставка в течение 2-4 часов после оформления заказа
              </p>
            </div>

            <div>
              <h3 class="font-semibold mb-2">Срочная доставка</h3>
              <p class="text-gray-600">
                Доставка в течение 1 часа — 400₽<br>
                Доступна при наличии букета в наличии
              </p>
            </div>

            <div>
              <h3 class="font-semibold mb-2">Самовывоз</h3>
              <p class="text-gray-600">
                Бесплатно из нашего магазина<br>
                г. Армавир, ул. Ленина, 123<br>
                Ежедневно с 9:00 до 20:00
              </p>
            </div>
          </div>
        </div>

        <div class="card p-8">
          <div class="text-5xl mb-4">💳</div>
          <h2 class="text-2xl font-display font-bold mb-4">Оплата</h2>
          
          <div class="space-y-4">
            <div>
              <h3 class="font-semibold mb-2">Наличными</h3>
              <p class="text-gray-600">
                Оплата курьеру при получении заказа
              </p>
            </div>

            <div>
              <h3 class="font-semibold mb-2">Банковской картой</h3>
              <p class="text-gray-600">
                Оплата курьеру при получении<br>
                Принимаем карты Visa, MasterCard, МИР
              </p>
            </div>

            <div>
              <h3 class="font-semibold mb-2">Онлайн оплата</h3>
              <p class="text-gray-600">
                Оплата на сайте при оформлении заказа<br>
                Безопасная оплата через защищенное соединение
              </p>
            </div>

            <div>
              <h3 class="font-semibold mb-2">Перевод на карту</h3>
              <p class="text-gray-600">
                Оплата по реквизитам после согласования заказа
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-20">
      <div class="container mx-auto px-4">
        <h2 class="section-title">Зона доставки</h2>
        <div class="card p-8 max-w-4xl mx-auto">
          <p class="text-gray-700 mb-6 text-center">
            Мы доставляем букеты по всему Армавиру и ближайшим районам
          </p>
          <div class="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
            <p class="text-gray-500">Карта доставки (интеграция с Яндекс.Картами)</p>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-20">
      <h2 class="section-title">Часто задаваемые вопросы</h2>
      <div class="max-w-3xl mx-auto space-y-4">
        <div v-for="(faq, index) in faqs" :key="index" class="card p-6">
          <h3 class="font-display font-semibold mb-2">{{ faq.question }}</h3>
          <p class="text-gray-600">{{ faq.answer }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const faqs = [
  {
    question: 'Как долго хранится букет?',
    answer: 'Наши букеты сохраняют свежесть до 14 дней при правильном хранении в сухом месте при температуре 18-22°C.'
  },
  {
    question: 'Можно ли заказать букет на определенное время?',
    answer: 'Да, при оформлении заказа вы можете указать желаемое время доставки. Мы постараемся доставить букет точно в срок.'
  },
  {
    question: 'Делаете ли вы букеты на заказ?',
    answer: 'Да, мы можем создать уникальный букет по вашим пожеланиям. Свяжитесь с нами для обсуждения деталей.'
  },
  {
    question: 'Можно ли отменить или изменить заказ?',
    answer: 'Вы можете отменить или изменить заказ до начала его изготовления. Свяжитесь с нами как можно скорее.'
  }
]
</script>
