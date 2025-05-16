<script lang="ts" setup>
import { onMounted } from 'vue';
import { Moon, Sun } from 'lucide-vue-next';
import { useThemeStore } from '@/stores/theme.store.ts';
import { Button } from '@/components/ui/button';

const themeStore = useThemeStore();

// Initialize the theme when the component is mounted
onMounted(() => {
	themeStore.initTheme();
});

// Toggle between light and dark themes
const toggleTheme = () => {
	themeStore.toggle();
};
</script>

<template>
	<Button aria-label="Toggle theme" size="icon" variant="ghost" @click="toggleTheme">
		<Sun v-if="themeStore.theme === 'dark'" class="h-5 w-5 transition-all" />
		<Moon v-else class="h-5 w-5 transition-all" />
		<span class="sr-only">Toggle theme</span>
	</Button>
</template>
