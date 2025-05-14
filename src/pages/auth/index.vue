<script lang="ts" setup>
import ContentWrapper from '@/components/common/ContentWrapper.vue';
</script>
<template>
	<main class="grid grid-cols-5 bg-slate-100 h-screen p-6 gap-4">
		<ContentWrapper class="col-span-2 rounded-3xl grid place-items-center relative">
			<div class="absolute top-8 left-8">
				<img alt="Logo" src="../../assets/logo.svg" />
			</div>

			<div class="w-3/5">
				<RouterView />
			</div>
		</ContentWrapper>
		<div class="col-span-3 overflow-hidden rounded-3xl">
			<img alt="" class="h-full w-full object-cover" />
		</div>
	</main>
</template>
