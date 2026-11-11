<script setup>
import { ref } from 'vue'
import { userCategoryLabels } from '../data/userCategories.js'

const emit = defineEmits(['add'])

const title = ref('')
const category = ref('')
const description = ref('')
const error = ref('')

const titleInput = ref(null)
const categorySelect = ref(null)
const descriptionInput = ref(null)

function fail(message, field) {
  error.value = message
  field.value.focus()
}

function submitForm() {
  const cleanTitle = title.value.trim()
  const cleanDescription = description.value.trim()

  if (cleanTitle.length < 3 || cleanTitle.length > 80) {
    fail('Назва має містити від 3 до 80 символів.', titleInput)
    return
  }

  if (!Object.hasOwn(userCategoryLabels, category.value)) {
    fail('Оберіть категорію.', categorySelect)
    return
  }

  if (cleanDescription.length < 10 || cleanDescription.length > 500) {
    fail('Опис має містити від 10 до 500 символів.', descriptionInput)
    return
  }

  error.value = ''
  emit('add', {
    id: `user-${crypto.randomUUID()}`,
    title: cleanTitle,
    category: category.value,
    description: cleanDescription,
  })

  title.value = ''
  category.value = ''
  description.value = ''
  titleInput.value.focus()
}

function focusTitle() {
  titleInput.value.focus()
}

defineExpose({ focusTitle })
</script>

<template>
  <form class="booking-form" @submit.prevent="submitForm" @invalid.capture="error = ''">
    <div class="form-field">
      <label for="user-title">Назва</label>
      <input
        id="user-title"
        ref="titleInput"
        v-model="title"
        name="title"
        required
        minlength="3"
        maxlength="80"
      />
    </div>

    <div class="form-field">
      <label for="user-category">Категорія</label>
      <select id="user-category" ref="categorySelect" v-model="category" name="category" required>
        <option value="">Оберіть категорію</option>
        <option v-for="(label, value) in userCategoryLabels" :key="value" :value="value">
          {{ label }}
        </option>
      </select>
    </div>

    <div class="form-field">
      <label for="user-description">Опис</label>
      <textarea
        id="user-description"
        ref="descriptionInput"
        v-model="description"
        name="description"
        rows="4"
        required
        minlength="10"
        maxlength="500"
      ></textarea>
    </div>

    <p v-if="error" class="form-message is-error" role="alert">{{ error }}</p>

    <button type="submit" class="button">Додати</button>
  </form>
</template>
