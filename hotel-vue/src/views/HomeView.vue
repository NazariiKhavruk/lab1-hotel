<script setup>
import { computed, ref } from 'vue'
import RoomList from '../components/RoomList.vue'
import { categoryLabels } from '../data/rooms.js'
import { useRoomsStore } from '../stores/rooms.js'

const store = useRoomsStore()

const query = ref('')
const category = ref('all')
const onlyFavorites = ref(false)

const filteredRooms = computed(() => {
  const text = query.value.trim().toLowerCase()

  return store.rooms.filter(
    (item) =>
      (category.value === 'all' || item.category === category.value) &&
      (!onlyFavorites.value || store.isFavorite(item.id)) &&
      `${item.title} ${item.description}`.toLowerCase().includes(text),
  )
})

const hasFilters = computed(
  () => query.value !== '' || category.value !== 'all' || onlyFavorites.value,
)

const emptyText = computed(() =>
  onlyFavorites.value && store.favoriteCount === 0
    ? 'В обраному поки немає номерів. Натисніть «До обраного» на картці.'
    : 'Нічого не знайдено.',
)

function resetFilters() {
  query.value = ''
  category.value = 'all'
  onlyFavorites.value = false
}
</script>

<template>
  <section class="section">
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

    <label class="checkbox-field">
      <input v-model="onlyFavorites" type="checkbox" />
      Лише обрані ({{ store.favoriteCount }})
    </label>

    <p class="results-count" aria-live="polite">Знайдено: {{ filteredRooms.length }}</p>
    <RoomList :items="filteredRooms" />
    <p v-if="filteredRooms.length === 0" class="empty-message">{{ emptyText }}</p>
  </section>
</template>

<style scoped>
.catalog-reset {
  align-self: end;
}
</style>
