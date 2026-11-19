<script setup>
import { useRoomsStore } from './stores/rooms.js'

const store = useRoomsStore()
</script>

<template>
  <header class="site-header">
    <h1>Готель Hilton Київ</h1>
    <nav class="main-nav" aria-label="Головне меню">
      <RouterLink :to="{ name: 'home' }">Номери</RouterLink>
      <RouterLink :to="{ name: 'notes' }">Мої нотатки</RouterLink>
      <span class="favorite-badge" aria-live="polite">Обране: {{ store.favoriteCount }}</span>
    </nav>
  </header>

  <main class="content">
    <RouterView />
  </main>

  <footer class="site-footer">
    <p>© 2026 Готель Hilton Київ</p>
  </footer>
</template>
