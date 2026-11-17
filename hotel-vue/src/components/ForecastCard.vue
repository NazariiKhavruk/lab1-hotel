<script setup>
import { weatherCategoryLabels } from '../services/weatherApi.js'
import { dayBadge, formatTemp, formatValue } from '../utils/format.js'

defineProps({
  item: { type: Object, required: true },
})
</script>

<template>
  <article class="card forecast-card" :class="`forecast-card--${item.category}`">
    <p class="card-category">
      {{ weatherCategoryLabels[item.category] }}
      <span v-if="dayBadge(item.id)" class="day-badge">{{ dayBadge(item.id) }}</span>
    </p>
    <h3 class="card-title">{{ item.title }}</h3>
    <p class="forecast-temp">
      {{ formatTemp(item.tempMax) }}
      <span class="forecast-temp-min">{{ formatTemp(item.tempMin) }}</span>
    </p>
    <p class="card-text">{{ item.description }}</p>
    <p class="card-text">
      Опади: {{ formatValue(item.precipitationChance, '%') }},
      {{ formatValue(item.precipitation, 'мм') }}
    </p>
    <div class="card-actions">
      <RouterLink
        class="button button-secondary"
        :to="{ name: 'weather-day', params: { date: item.id } }"
        :aria-label="`Докладніше про погоду: ${item.title}`"
      >
        Докладніше
      </RouterLink>
    </div>
  </article>
</template>
