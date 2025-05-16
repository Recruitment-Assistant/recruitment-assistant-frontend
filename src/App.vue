<script lang="ts" setup>
import { Toaster } from 'vue-sonner';
import { useColorMode } from '@vueuse/core';
import { computed } from 'vue';

const model = useColorMode();
const isDarkModel = computed(() => model.store.value === 'dark');
</script>

<template>
	<div :class="{ dark: isDarkModel }">
		<Toaster
			:toast-options="{
				actionButtonStyle: {
					backgroundColor: 'inherit',
					color: '#0e6eed',
					fontWeight: 500,
				},
			}"
			position="bottom-right" />
		<router-view v-slot="{ Component }">
			<transition name="slide">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
</template>
<style>
.slide-enter-active {
	@apply transition-transform duration-1000;
}

.slide-leave-active {
	@apply transition-transform duration-1000;
}

.slide-enter-from {
	@apply -translate-x-full opacity-100;
}

.slide-leave-to {
	@apply translate-x-full opacity-100;
}
</style>
