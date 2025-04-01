import { useFirebaseApp } from 'vuefire';
import RootView from '../views/RootView.vue';
import { ROUTES } from '@/ts/enums/routes.enum';
import NotFoundView from '@/views/NotFoundView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import HomeContent from '@/components/home/HomeContent.vue';
import TransactionsContent from '@/components/transactions/TransactionsContent.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTES.ROOT,
      component: RootView,
      meta: { requiresAuth: true },
      redirect: ROUTES.HOME,
      children: [
        {
          path: 'home',
          name: ROUTES.HOME,
          component: HomeContent,
        },
        {
          path: 'transactions',
          name: ROUTES.TRANSACTIONS,
          component: TransactionsContent,
        },
      ],
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
    {
      path: '/:pathMatch(.*)*',
      name: ROUTES.NOT_FOUND,
      component: NotFoundView,
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
