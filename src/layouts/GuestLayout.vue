<script lang="ts" setup>
import SpinnerLoad from '@/components/common/SpinnerLoad.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Footer from '@/layouts/footer/Footer.vue';
import HeaderGuest from '@/layouts/header/HeaderGuest.vue';

const router = useRouter();
const isLoading = ref(false);

router.beforeEach((to, from, next) => {
	isLoading.value = true;
	setTimeout(() => {
		isLoading.value = false;
		next();
	}, 300);
});
</script>
<template>
	<div class="bg-muted/80 min-h-screen flex transition-all duration-100 text-sm font-normal">
		<div class="flex-1">
			<HeaderGuest />
			<main class="relative bg-background rounded-md border flex-1 m-5 p-2 sm:p-4">
				<div
					v-if="isLoading"
					class="w-full bg-white h-full bg-opacity-60 absolute right-0 top-0 z-30">
					<div class="grid place-items-center min-h-[calc(100vh-80px)]">
						<SpinnerLoad />
					</div>
				</div>
				<RouterView />
			</main>
			<Footer />
		</div>
	</div>
</template>
