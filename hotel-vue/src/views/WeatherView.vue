<script setup>
import { computed, onMounted, ref } from 'vue'
import ForecastList from '../components/ForecastList.vue'
import { HOTEL_LOCATION } from '../config/api.js'
import { useWeatherStore } from '../stores/weather.js'

const store = useWeatherStore()
const filter = ref('all')

onMounted(() => store.loadForecast())

const isLoading = computed(() => store.loading || (!store.hasLoaded && !store.error))

const filteredDays = computed(() =>
  store.days.filter((day) => {
    if (filter.value === 'dry') return !day.precipitation
    if (filter.value === 'wet') return day.precipitation > 0
    return true
  }),
)
</script>

<template>
  <section class="section">
    <h2>Погода для гостей</h2>
    <p>
      Прогноз на тиждень для району готелю: {{ HOTEL_LOCATION.address }}. Дані завантажуються з
      відкритого сервісу Open-Meteo.
    </p>

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

    <p v-else-if="store.days.length === 0" class="empty-message">
      Сервіс погоди не повернув жодного дня прогнозу. Спробуйте пізніше.
    </p>

    <template v-else>
      <div class="form-row weather-controls">
        <div class="form-field">
          <label for="weather-filter">Показати дні</label>
          <select id="weather-filter" v-model="filter">
            <option value="all">Усі</option>
            <option value="dry">Без опадів</option>
            <option value="wet">З опадами</option>
          </select>
        </div>
        <div class="form-field weather-refresh">
          <button class="button button-secondary" type="button" @click="store.loadForecast(true)">
            Оновити прогноз
          </button>
        </div>
      </div>

      <p class="results-count" aria-live="polite">
        Показано: {{ filteredDays.length }} з {{ store.days.length }}. Оновлено о
        {{ store.updatedAt }}.
      </p>
      <ForecastList v-if="filteredDays.length" :items="filteredDays" />
      <p v-else class="empty-message">Немає днів, які підходять під фільтр.</p>
    </template>
  </section>
</template>
