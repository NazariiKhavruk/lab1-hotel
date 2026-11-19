// Готель Hilton Київ, бульвар Тараса Шевченка, 30
export const HOTEL_LOCATION = {
  address: 'Київ, бульвар Тараса Шевченка, 30',
  latitude: 50.4433,
  longitude: 30.5077,
}

const params = new URLSearchParams({
  latitude: HOTEL_LOCATION.latitude,
  longitude: HOTEL_LOCATION.longitude,
  daily: [
    'weather_code',
    'temperature_2m_max',
    'temperature_2m_min',
    'precipitation_sum',
    'precipitation_probability_max',
    'wind_speed_10m_max',
    'uv_index_max',
    'sunrise',
    'sunset',
  ].join(','),
  hourly: ['temperature_2m', 'precipitation_probability', 'weather_code'].join(','),
  timezone: 'Europe/Kyiv',
  wind_speed_unit: 'ms',
  forecast_days: 7,
})

export const API_URL =
  import.meta.env.VITE_API_URL || `https://api.open-meteo.com/v1/forecast?${params}`
