<script setup>
import RoomCard from './RoomCard.vue'

defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <div class="card-grid">
    <RoomCard v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>
