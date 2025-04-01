import { useFirebaseApp } from 'vuefire';
import HomeView from '../views/HomeView.vue';
import { ROUTES } from '@/ts/enums/routes.enum';
import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import TransactionsView from '@/views/TransactionsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTES.HOME,
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/transactions',
      name: ROUTES.TRANSACTIONS,
      component: TransactionsView,
      meta: { requiresAuth: true },
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

router.beforeEach((to, _, next) => {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);

  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      next();
      return;
    }

    next({ name: ROUTES.LOGIN });
  });
});

export default router;
