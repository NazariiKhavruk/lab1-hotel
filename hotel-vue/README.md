# hotel-vue

Vue 3 + Vite версія сайту готелю Hilton Київ (лабораторні роботи №9-11).

- лаба 9: компоненти, `props` і `emits`;
- лаба 10: Vue Router (каталог, детальна сторінка номера, нотатки, «не знайдено») і Pinia (обрані номери);
- лаба 11: прогноз погоди з Open-Meteo API (`/weather`, `/weather/:date`) зі станами loading, error, empty і повтором запиту.

Адресу API можна змінити змінною `VITE_API_URL` у файлі `.env` (див. `.env.example`). Ключ не потрібен.

Повні звіти у [головному README](../README.md).

## Команди

```
npm install
npm run dev
npm run build
```

У PowerShell замість `npm` писати `npm.cmd`. Потрібна актуальна LTS-версія Node.js (перевірено на 24.22.1).
