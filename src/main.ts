import { createApp } from 'vue';
import App from './App.vue';
import './assets/index.css';
import router from './routers';
import { createPinia } from 'pinia';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { Config } from '@/plugins/config.ts';
import vue3GoogleLogin from 'vue3-google-login';

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

const app = createApp(App);

const initApp = async () => {
	app.use(pinia);
	app.use(VueQueryPlugin, { queryClient });

	app.use(vue3GoogleLogin, {
		clientId: Config.oAuth.clientId,
	});

	app.use(router);
	router.isReady().then(() => {
		app.mount('#app');
	});
};

initApp();
