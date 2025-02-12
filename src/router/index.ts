import HomeView from '../views/HomeView.vue';
import { ROUTES } from '@/ts/enums/routes.enum';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTES.HOME,
      component: HomeView,
    },
    {
      path: '/login',
      name: ROUTES.LOGIN,
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: ROUTES.SIGNUP,
      component: () => import('../views/SignupView.vue'),
    },
  ],
});

export default router;
