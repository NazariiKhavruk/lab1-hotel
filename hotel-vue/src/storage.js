import { userCategoryLabels } from './data/userCategories.js'

const KEY = 'web-lab9:hotel-notes:v1'

function isUserItems(value) {
  if (!Array.isArray(value)) {
    return false
  }

  const ids = new Set()

  return value.every((item) => {
    if (
      !item ||
      typeof item !== 'object' ||
      Array.isArray(item) ||
      typeof item.id !== 'string' ||
      !item.id.startsWith('user-') ||
      item.id.length <= 5 ||
      ids.has(item.id) ||
      typeof item.title !== 'string' ||
      item.title.trim().length < 3 ||
      item.title.length > 80 ||
      typeof item.description !== 'string' ||
      item.description.trim().length < 10 ||
      item.description.length > 500 ||
      !Object.hasOwn(userCategoryLabels, item.category)
    ) {
      return false
    }

    ids.add(item.id)
    return true
  })
}

export function readUserItems() {
  const raw = localStorage.getItem(KEY)
  if (raw === null) {
    return []
  }

  const value = JSON.parse(raw)
  if (!isUserItems(value)) {
    throw new Error('Некоректні записи')
  }

  return value
}

export function writeUserItems(items) {
  localStorage.setItem(KEY, JSON.stringify(items))
}

const FAVORITES_KEY = 'web-lab10:hotel-favorites:v1'

export function readFavoriteIds() {
  const raw = localStorage.getItem(FAVORITES_KEY)
  if (raw === null) {
    return []
  }

  const value = JSON.parse(raw)
  if (!Array.isArray(value) || !value.every(Number.isInteger)) {
    throw new Error('Некоректний список обраного')
  }

  return [...new Set(value)]
}

export function writeFavoriteIds(ids) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids))
}
