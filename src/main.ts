import { createApp } from 'vue';
import App from './App.vue';
import './assets/index.css';
import router from './routers';
import { createPinia } from 'pinia';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

const theme = localStorage.getItem('theme') || 'light';
if (theme === 'dark') {
	document.documentElement.classList.add('dark');
} else {
	document.documentElement.classList.remove('dark');
}

const pinia = createPinia();

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

createApp(App).use(router).use(pinia).use(VueQueryPlugin, { queryClient }).mount('#app');
