<script setup>
import { userCategoryLabels } from '../data/userCategories.js'

defineProps({
  items: { type: Array, required: true },
})

const emit = defineEmits(['delete'])
</script>

<template>
  <p v-if="items.length === 0" class="empty-message">Власних нотаток поки немає.</p>
  <div v-else class="user-list">
    <article v-for="item in items" :key="item.id" class="card user-card">
      <p class="card-category">{{ userCategoryLabels[item.category] }}</p>
      <h4 class="card-title">{{ item.title }}</h4>
      <p class="card-text">{{ item.description }}</p>
      <button
        class="button delete-button"
        type="button"
        :aria-label="`Видалити нотатку «${item.title}»`"
        @click="emit('delete', item.id)"
      >
        Видалити
      </button>
    </article>
  </div>
</template>
