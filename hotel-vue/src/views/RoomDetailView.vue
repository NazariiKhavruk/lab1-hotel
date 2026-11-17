<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { categoryLabels } from '../data/rooms.js'
import { useRoomsStore } from '../stores/rooms.js'

const route = useRoute()
const store = useRoomsStore()

const room = computed(() =>
  store.rooms.find((entry) => String(entry.id) === String(route.params.id)),
)

const similarRooms = computed(() =>
  room.value
    ? store.rooms.filter(
        (entry) => entry.category === room.value.category && entry.id !== room.value.id,
      )
    : [],
)

const price = computed(() => room.value?.price.toLocaleString('uk-UA'))
</script>

<template>
  <article v-if="room" class="section room-detail">
    <RouterLink class="back-link" :to="{ name: 'home' }">← До каталогу</RouterLink>

    <div class="room-detail-layout">
      <img class="room-detail-image" :src="room.image" :alt="room.title" />

      <div>
        <p class="card-category">{{ categoryLabels[room.category] }}</p>
        <h2>{{ room.title }}</h2>
        <p>{{ room.description }}</p>

        <dl class="detail-list">
          <dt>Площа</dt>
          <dd>{{ room.area }} м²</dd>
          <dt>Гостей</dt>
          <dd>до {{ room.guests }}</dd>
          <dt>Ліжко</dt>
          <dd>{{ room.bed }}</dd>
          <dt>Вид з вікна</dt>
          <dd>{{ room.view }}</dd>
          <dt>Ціна</dt>
          <dd>від {{ price }} грн за ніч</dd>
        </dl>

        <button
          class="button favorite-button"
          :class="{ 'is-active': store.isFavorite(room.id) }"
          type="button"
          :aria-pressed="store.isFavorite(room.id)"
          @click="store.toggleFavorite(room.id)"
        >
          {{ store.isFavorite(room.id) ? 'Прибрати з обраного' : 'До обраного' }}
        </button>
      </div>
    </div>

    <h3>У номері</h3>
    <ul class="amenities">
      <li v-for="amenity in room.amenities" :key="amenity">{{ amenity }}</li>
    </ul>

    <template v-if="similarRooms.length">
      <h3>Інші номери категорії {{ categoryLabels[room.category] }}</h3>
      <ul class="similar-links">
        <li v-for="entry in similarRooms" :key="entry.id">
          <RouterLink :to="{ name: 'room', params: { id: entry.id } }">{{ entry.title }}</RouterLink>
        </li>
      </ul>
    </template>
  </article>

  <section v-else class="section not-found">
    <h2>Номер не знайдено</h2>
    <p>
      Номера з id <code>{{ route.params.id }}</code> у каталозі немає. Можливо, посилання застаріло.
    </p>
    <RouterLink class="button" :to="{ name: 'home' }">Повернутися до каталогу</RouterLink>
  </section>
</template>
