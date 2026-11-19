<script setup>
import { computed, ref, watch } from 'vue'
import RoomList from './components/RoomList.vue'
import UserNoteForm from './components/UserNoteForm.vue'
import UserNoteList from './components/UserNoteList.vue'
import { categoryLabels, rooms } from './data/rooms.js'
import { readUserItems, writeUserItems } from './storage.js'

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

const statusMessage = ref('')
const noteForm = ref(null)

function restoreUserItems() {
  try {
    return readUserItems()
  } catch (error) {
    statusMessage.value = 'Не вдалося відновити записи. Список почато в пам’яті.'
    console.error(error)
    return []
  }
}

const userItems = ref(restoreUserItems())

watch(userItems, (items) => {
  try {
    writeUserItems(items)
  } catch (error) {
    statusMessage.value = 'Зміни є в пам’яті, але не збережені після закриття сторінки.'
    console.error(error)
  }
})

const hasFilters = computed(() => query.value !== '' || category.value !== 'all')

function resetFilters() {
  query.value = ''
  category.value = 'all'
}

function addUserItem(item) {
  userItems.value = [...userItems.value, item]
  statusMessage.value = 'Нотатку додано й збережено.'
}

function deleteUserItem(id) {
  userItems.value = userItems.value.filter((item) => item.id !== id)
  statusMessage.value = 'Нотатку видалено, зміни збережено.'
  noteForm.value.focusTitle()
}
</script>

<template>
  <header class="site-header">
    <h1>Готель Hilton Київ</h1>
    <nav class="main-nav">
      <a href="#rooms">Номери</a>
      <a href="#notes">Мої нотатки</a>
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

    <section id="notes" class="section">
      <h2>Мої нотатки до поїздки</h2>
      <p>Запишіть, що не хочете забути: побажання до номера, харчування чи дозвілля.</p>
      <UserNoteForm ref="noteForm" @add="addUserItem" />
      <p class="form-message" role="status">{{ statusMessage }}</p>
      <h3>Мої нотатки</h3>
      <UserNoteList :items="userItems" @delete="deleteUserItem" />
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
