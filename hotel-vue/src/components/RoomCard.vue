<script setup>
import { categoryLabels } from '../data/rooms.js'
import { useRoomsStore } from '../stores/rooms.js'

defineProps({
  item: { type: Object, required: true },
})

const store = useRoomsStore()
</script>

<template>
  <article class="card" :class="{ 'is-active': store.isFavorite(item.id) }">
    <img class="card-image" :src="item.image" :alt="item.title" />
    <p class="card-category">{{ categoryLabels[item.category] }}</p>
    <h3 class="card-title">{{ item.title }}</h3>
    <p class="card-text">{{ item.description }}</p>
    <div class="card-actions">
      <button
        class="button favorite-button"
        :class="{ 'is-active': store.isFavorite(item.id) }"
        type="button"
        :aria-pressed="store.isFavorite(item.id)"
        @click="store.toggleFavorite(item.id)"
      >
        {{ store.isFavorite(item.id) ? 'Прибрати з обраного' : 'До обраного' }}
      </button>
    </div>
  </article>
</template>
