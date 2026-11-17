<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { weatherCategoryLabels } from '../services/weatherApi.js'
import { useWeatherStore } from '../stores/weather.js'
import { dayBadge, formatTemp, formatValue } from '../utils/format.js'

const route = useRoute()
const store = useWeatherStore()

onMounted(() => store.loadForecast())

const isLoading = computed(() => store.loading || (!store.hasLoaded && !store.error))
const day = computed(() => store.findDay(route.params.date))

const dayIndex = computed(() => store.days.indexOf(day.value))
const prevDay = computed(() => store.days[dayIndex.value - 1])
const nextDay = computed(() => (dayIndex.value === -1 ? undefined : store.days[dayIndex.value + 1]))

// ", від 17 листопада до 23 листопада"
const rangeText = computed(() => {
  if (store.days.length === 0) return ''
  const short = (id) =>
    new Date(`${id}T12:00:00`).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' })
  return `, від ${short(store.days[0].id)} до ${short(store.days[store.days.length - 1].id)}`
})

const tips = computed(() => {
  const d = day.value
  const list = []
  if (d.precipitationChance >= 50 || d.precipitation >= 1) {
    list.push('Ймовірні опади, візьміть парасольку.')
  }
  if (d.tempMin !== null && d.tempMin <= 0) {
    list.push('Можливий мороз і ожеледиця, одягайтеся тепліше.')
  }
  if (d.tempMax !== null && d.tempMax >= 25) {
    list.push('Спекотно, беріть із собою воду.')
  }
  if (d.windMax >= 10) {
    list.push('Сильний вітер, краще обрати прогулянку в закритих приміщеннях.')
  }
  if (d.uvIndex >= 6) {
    list.push('Високий УФ-індекс, знадобиться сонцезахисний крем.')
  }
  if (list.length === 0) {
    list.push('Гарний день для прогулянки центром Києва.')
  }
  return list
})
</script>

<template>
  <section class="section">
    <RouterLink class="back-link" :to="{ name: 'weather' }">← До прогнозу на тиждень</RouterLink>

    <p v-if="isLoading" class="load-status" role="status">
      <span class="spinner" aria-hidden="true"></span>
      Завантаження прогнозу…
    </p>

    <div v-else-if="store.error" role="alert">
      <p class="load-error">{{ store.error }}</p>
      <button class="button retry-button" type="button" @click="store.retry()">
        Спробувати ще раз
      </button>
    </div>

    <article v-else-if="day" class="weather-day">
      <p class="card-category">
        {{ weatherCategoryLabels[day.category] }}
        <span v-if="dayBadge(day.id)" class="day-badge">{{ dayBadge(day.id) }}</span>
      </p>
      <h2>{{ day.title }}</h2>
      <p class="forecast-temp forecast-temp-large">
        {{ formatTemp(day.tempMax) }}
        <span class="forecast-temp-min">{{ formatTemp(day.tempMin) }}</span>
      </p>
      <p>{{ day.description }}</p>

      <dl class="detail-list">
        <dt>Опади</dt>
        <dd>{{ formatValue(day.precipitation, 'мм') }}, ймовірність {{ formatValue(day.precipitationChance, '%') }}</dd>
        <dt>Вітер</dt>
        <dd>до {{ formatValue(day.windMax, 'м/с') }}</dd>
        <dt>УФ-індекс</dt>
        <dd>{{ formatValue(day.uvIndex, '') }}</dd>
        <dt>Схід сонця</dt>
        <dd>{{ day.sunrise || '—' }}</dd>
        <dt>Захід сонця</dt>
        <dd>{{ day.sunset || '—' }}</dd>
      </dl>

      <h3>Порада від рецепції</h3>
      <ul class="weather-tips">
        <li v-for="tip in tips" :key="tip">{{ tip }}</li>
      </ul>

      <template v-if="day.hours.length">
        <h3>Протягом дня</h3>
        <div class="table-wrap">
          <table class="hours-table">
            <thead>
              <tr>
                <th scope="col">Час</th>
                <th scope="col">Температура</th>
                <th scope="col">Опади</th>
                <th scope="col">Погода</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="hour in day.hours" :key="hour.time">
                <td>{{ hour.time }}</td>
                <td>{{ formatTemp(hour.temperature) }}</td>
                <td>{{ formatValue(hour.precipitationChance, '%') }}</td>
                <td>{{ hour.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <nav class="day-nav" aria-label="Інші дні">
        <RouterLink v-if="prevDay" :to="{ name: 'weather-day', params: { date: prevDay.id } }">
          ← {{ prevDay.title }}
        </RouterLink>
        <RouterLink
          v-if="nextDay"
          class="day-nav-next"
          :to="{ name: 'weather-day', params: { date: nextDay.id } }"
        >
          {{ nextDay.title }} →
        </RouterLink>
      </nav>
    </article>

    <div v-else class="not-found">
      <h2>День не знайдено</h2>
      <p>
        Для дати <code>{{ route.params.date }}</code> прогнозу немає. Прогноз доступний лише на 7
        днів{{ rangeText }}.
      </p>
      <RouterLink class="button" :to="{ name: 'weather' }">До прогнозу на тиждень</RouterLink>
    </div>
  </section>
</template>
