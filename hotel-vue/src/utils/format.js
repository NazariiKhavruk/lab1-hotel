export function formatTemp(value) {
  if (value === null) return '—'
  const rounded = Math.round(value)
  return `${rounded > 0 ? '+' : ''}${rounded}°`
}

// 2.7 -> "2,7 мм", null -> "—"
export function formatValue(value, unit) {
  if (value === null) return '—'
  const number = value.toLocaleString('uk-UA', { maximumFractionDigits: 1 })
  return unit ? `${number} ${unit}` : number
}

// Дата сьогодні в Києві у форматі YYYY-MM-DD, як у відповіді API
function kyivDate(offsetDays = 0) {
  const date = new Date(Date.now() + offsetDays * 24 * 60 * 60 * 1000)
  return date.toLocaleDateString('sv-SE', { timeZone: 'Europe/Kyiv' })
}

export function dayBadge(id) {
  if (id === kyivDate()) return 'Сьогодні'
  if (id === kyivDate(1)) return 'Завтра'
  return ''
}
