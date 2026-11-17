import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotesView from '../views/NotesView.vue'
import NotFoundView from '../views/NotFoundView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/rooms' },
    { path: '/rooms', name: 'home', component: HomeView, meta: { title: 'Номери' } },
    { path: '/notes', name: 'notes', component: NotesView, meta: { title: 'Мої нотатки' } },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: 'Сторінку не знайдено' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = `${to.meta.title} | Готель Hilton Київ`
})
