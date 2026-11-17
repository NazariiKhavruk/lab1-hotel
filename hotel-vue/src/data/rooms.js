export const categoryLabels = {
  standard: 'Standard',
  deluxe: 'Deluxe',
  suite: 'Suite'
}

export const rooms = [
  {
    id: 1,
    title: 'Standard',
    category: 'standard',
    description: '1-2 особи, двоспальне ліжко, вікна у двір.',
    image: '/images/room-standard.jpg',
    area: 28,
    guests: 2,
    bed: 'Двоспальне ліжко queen-size',
    view: 'Внутрішній двір',
    price: 5200,
    amenities: ['Кондиціонер', 'Сейф', 'Wi-Fi', 'Чайник', 'Фен']
  },
  {
    id: 2,
    title: 'Standard Twin',
    category: 'standard',
    description: '1-2 особи, два односпальні ліжка, робочий стіл.',
    image: '/images/room-standard-twin.jpg',
    area: 28,
    guests: 2,
    bed: 'Два односпальні ліжка',
    view: 'Внутрішній двір',
    price: 5200,
    amenities: ['Кондиціонер', 'Сейф', 'Wi-Fi', 'Робочий стіл', 'Фен']
  },
  {
    id: 3,
    title: 'Standard Accessible',
    category: 'standard',
    description: '1-2 особи, номер для гостей з обмеженою мобільністю.',
    image: '/images/room-standard-accessible.jpg',
    area: 32,
    guests: 2,
    bed: 'Двоспальне ліжко queen-size',
    view: 'Бульвар Тараса Шевченка',
    price: 5200,
    amenities: ['Широкі двері', 'Душ без порогу', 'Поручні у ванній', 'Кнопка виклику', 'Wi-Fi']
  },
  {
    id: 4,
    title: 'Deluxe',
    category: 'deluxe',
    description: '2 особи, вид на місто.',
    image: '/images/room-deluxe.jpg',
    area: 34,
    guests: 2,
    bed: 'Двоспальне ліжко queen-size',
    view: 'Місто',
    price: 6800,
    amenities: ['Кондиціонер', 'Сейф', 'Wi-Fi', 'Кавомашина', 'Халати й капці']
  },
  {
    id: 5,
    title: 'Deluxe King',
    category: 'deluxe',
    description: '2 особи, ліжко king-size, велика ванна кімната.',
    image: '/images/room-deluxe-king.jpg',
    area: 38,
    guests: 2,
    bed: 'Ліжко king-size',
    view: 'Місто',
    price: 7400,
    amenities: ['Кондиціонер', 'Ванна й окремий душ', 'Wi-Fi', 'Кавомашина', 'Халати й капці']
  },
  {
    id: 6,
    title: 'Deluxe з балконом',
    category: 'deluxe',
    description: '2 особи, балкон з виглядом на центр Києва.',
    image: '/images/room-deluxe-balcony.jpg',
    area: 40,
    guests: 2,
    bed: 'Ліжко king-size',
    view: 'Центр Києва, балкон',
    price: 8100,
    amenities: ['Балкон', 'Кондиціонер', 'Wi-Fi', 'Кавомашина', 'Міні-бар']
  },
  {
    id: 7,
    title: 'Executive Suite',
    category: 'suite',
    description: '2-4 особи, окрема вітальня.',
    image: '/images/room-executive-suite.jpg',
    area: 62,
    guests: 4,
    bed: 'Ліжко king-size і диван-ліжко',
    view: 'Центр Києва',
    price: 12500,
    amenities: ['Окрема вітальня', 'Доступ до Executive Lounge', 'Wi-Fi', 'Кавомашина', 'Міні-бар']
  },
  {
    id: 8,
    title: 'Family Suite',
    category: 'suite',
    description: 'До 4 осіб, дві спальні, міні-кухня.',
    image: '/images/room-family-suite.jpg',
    area: 70,
    guests: 4,
    bed: 'Ліжко king-size і два односпальні',
    view: 'Місто',
    price: 13900,
    amenities: ['Дві спальні', 'Міні-кухня', 'Дитяче ліжечко на запит', 'Wi-Fi', 'Пральна машина']
  }
]
