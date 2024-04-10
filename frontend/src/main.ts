import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from "./router";
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

import 'vue3-toastify/dist/index.css'
import "@material/web/all";
import './scss/main.scss'

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.use(Vue3Toastify, {
  position: 'bottom-right',
} as ToastContainerOptions);

app.mount('#app');