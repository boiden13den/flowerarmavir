<template>
  <div>
    <section class="bg-gradient-to-r from-primary-100 to-lavender-100 py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl font-display font-bold mb-6">О нас</h1>
        <p class="text-xl text-gray-700 max-w-3xl mx-auto">
          Мы создаем уникальные букеты из зефира ручной работы в Армавире
        </p>
      </div>
    </section>

    <section class="container mx-auto px-4 py-20">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-display font-bold mb-6">Наша история</h2>
          <p class="text-gray-700 mb-4">
            Мы начали свою работу в 2020 году с простой идеи — создавать не просто сладости, 
            а настоящие произведения искусства, которые дарят радость и незабываемые эмоции.
          </p>
          <p class="text-gray-700 mb-4">
            Каждый букет создается вручную нашими мастерами с любовью и вниманием к деталям. 
            Мы используем только качественные ингредиенты и следим за свежестью каждого изделия.
          </p>
          <p class="text-gray-700">
            Сегодня мы гордимся тем, что наши букеты украшают праздники жителей Армавира 
            и дарят улыбки нашим клиентам.
          </p>
        </div>
        <div class="card overflow-hidden">
          <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800" alt="О нас" class="w-full h-96 object-cover" />
        </div>
      </div>
    </section>

    <section class="bg-white py-20">
      <div class="container mx-auto px-4">
        <h2 class="section-title">Почему выбирают нас</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card p-8 text-center">
            <div class="text-5xl mb-4">🎨</div>
            <h3 class="text-xl font-display font-semibold mb-3">Ручная работа</h3>
            <p class="text-gray-600">
              Каждый букет создается индивидуально с учетом ваших пожеланий
            </p>
          </div>
          <div class="card p-8 text-center">
            <div class="text-5xl mb-4">✨</div>
            <h3 class="text-xl font-display font-semibold mb-3">Качество</h3>
            <p class="text-gray-600">
              Используем только свежие ингредиенты высшего качества
            </p>
          </div>
          <div class="card p-8 text-center">
            <div class="text-5xl mb-4">💝</div>
            <h3 class="text-xl font-display font-semibold mb-3">С любовью</h3>
            <p class="text-gray-600">
              Вкладываем душу в каждое изделие, чтобы порадовать вас
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-20">
      <h2 class="section-title">Процесс создания</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div v-for="(step, index) in steps" :key="index" class="text-center">
          <div class="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            {{ index + 1 }}
          </div>
          <h3 class="font-display font-semibold mb-2">{{ step.title }}</h3>
          <p class="text-gray-600 text-sm">{{ step.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const steps = [
  {
    title: 'Выбор ингредиентов',
    description: 'Отбираем только качественные продукты'
  },
  {
    title: 'Приготовление',
    description: 'Готовим зефир по авторским рецептам'
  },
  {
    title: 'Оформление',
    description: 'Создаем уникальную композицию'
  },
  {
    title: 'Доставка',
    description: 'Бережно доставляем вам букет'
  }
]
</script>
