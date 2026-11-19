<script setup>
import ForecastCard from './ForecastCard.vue'

defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <div class="card-grid">
    <ForecastCard v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>
