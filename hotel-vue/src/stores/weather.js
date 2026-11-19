import { defineStore } from 'pinia'
import { fetchForecast } from '../services/weatherApi.js'

function errorMessage(error) {
  if (error.message.startsWith('HTTP')) {
    return `Сервіс погоди відповів помилкою (${error.message}).`
  }
  if (error instanceof TypeError) {
    return 'Немає з’єднання із сервісом погоди. Перевірте інтернет.'
  }
  return 'Сервіс погоди повернув дані в незрозумілому форматі.'
}

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    days: [],
    loading: false,
    error: '',
    hasLoaded: false,
    updatedAt: '',
  }),

  getters: {
    findDay: (state) => (id) => state.days.find((day) => day.id === String(id)),
  },

  actions: {
    async loadForecast(force = false) {
      if (this.loading) return
      if (this.hasLoaded && !force) return

      this.loading = true
      this.error = ''

      try {
        this.days = await fetchForecast()
        this.hasLoaded = true
        this.updatedAt = new Date().toLocaleTimeString('uk-UA', {
          hour: '2-digit',
          minute: '2-digit',
        })
      } catch (error) {
        this.days = []
        this.hasLoaded = false
        this.error = errorMessage(error)
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    retry() {
      return this.loadForecast(true)
    },
  },
})
