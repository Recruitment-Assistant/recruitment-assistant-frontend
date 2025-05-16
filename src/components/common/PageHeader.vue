<template>
	<div class="mb-6">
		<h1 class="text-2xl font-bold">{{ title }}</h1>
		<p v-if="description" class="mt-1">{{ description }}</p>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
	title: string;
	description?: string;
}>();
</script>
