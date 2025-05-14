<template>
	<div class="bg-card text-card-foreground rounded-lg shadow-sm border p-6">
		<div class="flex items-center justify-between space-y-0 pb-2">
			<h3 class="tracking-tight text-sm font-medium">{{ title }}</h3>
			<component :is="icon" v-if="icon" class="h-4 w-4 text-muted-foreground" />
		</div>
		<div class="text-2xl font-bold">{{ value }}</div>
		<p v-if="description" class="text-xs text-muted-foreground mt-1">{{ description }}</p>
	</div>
</template>

<script lang="ts" setup>
import type { Component } from 'vue';

defineProps<{
	title: string;
	value: string | number;
	description?: string;
	icon?: Component;
}>();
</script>
