<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <section class="section not-found">
    <h2>Сторінку не знайдено</h2>
    <p>
      Адреси <code>{{ route.fullPath }}</code> на сайті немає. Можливо, посилання застаріло або в
      ньому помилка.
    </p>
    <RouterLink class="button" :to="{ name: 'home' }">Повернутися до каталогу</RouterLink>
  </section>
</template>
