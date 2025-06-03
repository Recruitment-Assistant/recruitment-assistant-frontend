<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useJobStore } from '@/stores/job.store.ts';
import { useRoute } from 'vue-router';
import JobDetailsPanel from './JobDetailsPanel.vue';

const props = defineProps<{
	id?: string;
}>();

const jobStore = useJobStore();

onBeforeMount(() => {
	const route = useRoute();
	const jobId = props.id || (route.params.id as string);
	jobStore.getJobById(jobId);
});
</script>

<template>
	<div class="flex h-[calc(100vh-6rem)]">
		<JobDetailsPanel class="transition-width duration-75 ease-in-out" />
	</div>
</template>

<style scoped>
.transition-width {
	transition: width 0.1s ease-out;
}
</style>
