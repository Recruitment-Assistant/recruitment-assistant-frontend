import { defineStore } from 'pinia';
import { ref } from 'vue';

type Theme = 'light' | 'dark';

export const useThemeStore = defineStore('theme-store', () => {
	const theme = ref<Theme>('light');

	const initTheme = () => {
		const savedTheme = localStorage.getItem('theme') as Theme | null;
		if (savedTheme) {
			theme.value = savedTheme;
			applyTheme(savedTheme);
		} else {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			theme.value = prefersDark ? 'dark' : 'light';
			applyTheme(theme.value);
		}
	};

	const toggle = () => {
		theme.value = theme.value === 'light' ? 'dark' : 'light';
		applyTheme(theme.value);
	};

	const setTheme = (newTheme: Theme) => {
		theme.value = newTheme;
		applyTheme(newTheme);
	};

	const applyTheme = (theme: Theme) => {
		localStorage.setItem('theme', theme);

		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};

	return {
		theme,
		initTheme,
		toggle,
		setTheme,
	};
});
