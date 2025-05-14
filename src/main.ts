import { createApp } from 'vue';
import App from './App.vue';
import './assets/index.css';
import router from './routers';
import { createPinia } from 'pinia';

const theme = localStorage.getItem('theme') || 'light';
if (theme === 'dark') {
	document.documentElement.classList.add('dark');
} else {
	document.documentElement.classList.remove('dark');
}

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app');
