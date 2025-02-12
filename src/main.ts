import '@/assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { firebaseApp } from '@/firebase';
import { VueFire, VueFireAuth } from 'vuefire';
import { SnackbarService } from 'vue3-snackbar';
import 'vue3-snackbar/styles';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});
app.use(router);
app.use(SnackbarService);

app.mount('#app');
