<script setup>
import { computed, ref } from 'vue'
import RoomList from './components/RoomList.vue'
import { categoryLabels, rooms } from './data/rooms.js'

const query = ref('')
const category = ref('all')

const filteredRooms = computed(() => {
  const text = query.value.trim().toLowerCase()

  return rooms.filter(
    (item) =>
      (category.value === 'all' || item.category === category.value) &&
      `${item.title} ${item.description}`.toLowerCase().includes(text),
  )
})

const hasFilters = computed(() => query.value !== '' || category.value !== 'all')

function resetFilters() {
  query.value = ''
  category.value = 'all'
}
</script>

<template>
  <header class="site-header">
    <h1>Готель Hilton Київ</h1>
    <nav class="main-nav">
      <a href="#rooms">Номери</a>
    </nav>
  </header>

  <main class="content">
    <section id="rooms" class="section">
      <h2>Номери</h2>
      <p>У всіх номерах є кондиціонер, сейф і безкоштовний Wi-Fi. Прибирання — щодня.</p>

      <div class="form-row catalog-controls">
        <div class="form-field">
          <label for="room-search">Пошук</label>
          <input
            id="room-search"
            v-model.trim="query"
            type="search"
            placeholder="Введіть назву або опис"
          />
        </div>
        <div class="form-field">
          <label for="category-filter">Категорія</label>
          <select id="category-filter" v-model="category">
            <option value="all">Усі</option>
            <option v-for="(label, value) in categoryLabels" :key="value" :value="value">
              {{ label }}
            </option>
          </select>
        </div>
        <div class="form-field catalog-reset">
          <button class="button" type="button" :disabled="!hasFilters" @click="resetFilters">
            Очистити
          </button>
        </div>
      </div>

      <p class="results-count" aria-live="polite">Знайдено: {{ filteredRooms.length }}</p>
      <RoomList :items="filteredRooms" />
      <p v-if="filteredRooms.length === 0" class="empty-message">Нічого не знайдено.</p>
    </section>
  </main>

  <footer class="site-footer">
    <p>© 2026 Готель Hilton Київ</p>
  </footer>
</template>

<style scoped>
.catalog-reset {
  align-self: end;
}

.button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}
</style>
