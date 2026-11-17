<script setup>
import { ref, watch } from 'vue'
import UserNoteForm from '../components/UserNoteForm.vue'
import UserNoteList from '../components/UserNoteList.vue'
import { readUserItems, writeUserItems } from '../storage.js'

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
  <section class="section">
    <h2>Мої нотатки до поїздки</h2>
    <p>Запишіть, що не хочете забути: побажання до номера, харчування чи дозвілля.</p>
    <UserNoteForm ref="noteForm" @add="addUserItem" />
    <p class="form-message" role="status">{{ statusMessage }}</p>
    <h3>Мої нотатки</h3>
    <UserNoteList :items="userItems" @delete="deleteUserItem" />
  </section>
</template>
