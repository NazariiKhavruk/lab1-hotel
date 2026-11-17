import { API_URL } from '../config/api.js'

// Коди погоди WMO, які повертає Open-Meteo
const weatherCodes = {
  0: ['Ясно', 'clear'],
  1: ['Переважно ясно', 'clear'],
  2: ['Мінлива хмарність', 'cloudy'],
  3: ['Хмарно', 'cloudy'],
  45: ['Туман', 'fog'],
  48: ['Туман з інеєм', 'fog'],
  51: ['Слабка мряка', 'rain'],
  53: ['Мряка', 'rain'],
  55: ['Сильна мряка', 'rain'],
  56: ['Крижана мряка', 'rain'],
  57: ['Сильна крижана мряка', 'rain'],
  61: ['Невеликий дощ', 'rain'],
  63: ['Дощ', 'rain'],
  65: ['Сильний дощ', 'rain'],
  66: ['Крижаний дощ', 'rain'],
  67: ['Сильний крижаний дощ', 'rain'],
  71: ['Невеликий сніг', 'snow'],
  73: ['Сніг', 'snow'],
  75: ['Сильний сніг', 'snow'],
  77: ['Снігова крупа', 'snow'],
  80: ['Невелика злива', 'rain'],
  81: ['Злива', 'rain'],
  82: ['Сильна злива', 'rain'],
  85: ['Невеликий снігопад', 'snow'],
  86: ['Сильний снігопад', 'snow'],
  95: ['Гроза', 'storm'],
  96: ['Гроза з градом', 'storm'],
  99: ['Гроза з сильним градом', 'storm'],
}

export const weatherCategoryLabels = {
  clear: 'Ясно',
  cloudy: 'Хмарно',
  fog: 'Туман',
  rain: 'Дощ',
  snow: 'Сніг',
  storm: 'Гроза',
  other: 'Інше',
}

const DAILY_FIELDS = [
  'time',
  'weather_code',
  'temperature_2m_max',
  'temperature_2m_min',
  'precipitation_sum',
  'precipitation_probability_max',
  'wind_speed_10m_max',
  'uv_index_max',
  'sunrise',
  'sunset',
]

const HOURLY_FIELDS = ['time', 'temperature_2m', 'precipitation_probability', 'weather_code']

function describeCode(code) {
  const [label, category] = weatherCodes[code] || ['Немає даних', 'other']
  return { label, category }
}

function toNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function formatDayTitle(date) {
  const text = new Date(`${date}T12:00:00`).toLocaleDateString('uk-UA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// "2026-11-18T07:16" -> "07:16"
function timeOnly(value) {
  return typeof value === 'string' ? value.slice(11, 16) : ''
}

function hasArrays(block, fields) {
  return (
    block !== null &&
    typeof block === 'object' &&
    fields.every((field) => Array.isArray(block[field])) &&
    fields.every((field) => block[field].length === block.time.length)
  )
}

function normalizeHours(hourly, date) {
  const hours = []

  hourly.time.forEach((time, index) => {
    const hour = Number(time.slice(11, 13))
    if (!time.startsWith(date) || hour % 3 !== 0) {
      return
    }

    hours.push({
      time: timeOnly(time),
      temperature: toNumber(hourly.temperature_2m[index]),
      precipitationChance: toNumber(hourly.precipitation_probability[index]),
      description: describeCode(hourly.weather_code[index]).label,
    })
  })

  return hours
}

function normalizeDay(daily, hourly, index) {
  const date = daily.time[index]
  const { label, category } = describeCode(daily.weather_code[index])

  return {
    id: date,
    title: formatDayTitle(date),
    category,
    description: label,
    tempMax: toNumber(daily.temperature_2m_max[index]),
    tempMin: toNumber(daily.temperature_2m_min[index]),
    precipitation: toNumber(daily.precipitation_sum[index]),
    precipitationChance: toNumber(daily.precipitation_probability_max[index]),
    windMax: toNumber(daily.wind_speed_10m_max[index]),
    uvIndex: toNumber(daily.uv_index_max[index]),
    sunrise: timeOnly(daily.sunrise[index]),
    sunset: timeOnly(daily.sunset[index]),
    hours: hourly ? normalizeHours(hourly, date) : [],
  }
}

export function normalizeForecast(payload) {
  if (!payload || !hasArrays(payload.daily, DAILY_FIELDS)) {
    throw new Error('Некоректна структура відповіді')
  }

  const hourly = hasArrays(payload.hourly, HOURLY_FIELDS) ? payload.hourly : null

  return payload.daily.time.map((date, index) => normalizeDay(payload.daily, hourly, index))
}

export async function fetchForecast() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const payload = await response.json()
  return normalizeForecast(payload)
}
