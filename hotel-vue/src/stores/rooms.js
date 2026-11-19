import { defineStore } from 'pinia'
import { rooms } from '../data/rooms.js'
import { readFavoriteIds, writeFavoriteIds } from '../storage.js'

function restoreFavoriteIds() {
  try {
    const roomIds = rooms.map((room) => room.id)
    return readFavoriteIds().filter((id) => roomIds.includes(id))
  } catch (error) {
    console.error(error)
    return []
  }
}

export const useRoomsStore = defineStore('rooms', {
  state: () => ({
    rooms,
    favoriteIds: restoreFavoriteIds(),
  }),

  getters: {
    favoriteCount: (state) => state.favoriteIds.length,
    isFavorite: (state) => (id) => state.favoriteIds.includes(id),
  },

  actions: {
    toggleFavorite(id) {
      this.favoriteIds = this.favoriteIds.includes(id)
        ? this.favoriteIds.filter((roomId) => roomId !== id)
        : [...this.favoriteIds, id]

      try {
        writeFavoriteIds(this.favoriteIds)
      } catch (error) {
        console.error(error)
      }
    },
  },
})
