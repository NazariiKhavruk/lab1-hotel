<script setup>
import { categoryLabels } from '../data/rooms.js'

defineProps({
  item: { type: Object, required: true },
})
</script>

<template>
  <article class="card">
    <img class="card-image" :src="item.image" :alt="item.title" />
    <p class="card-category">{{ categoryLabels[item.category] }}</p>
    <h3 class="card-title">{{ item.title }}</h3>
    <p class="card-text">{{ item.description }}</p>
  </article>
</template>
