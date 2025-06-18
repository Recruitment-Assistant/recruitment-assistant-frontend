<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import Title from '@/components/common/Title.vue';
import { useJobStore } from '@/stores/job.store.ts';
import type { IJob, IJobFilter } from '@/types/jobs';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import { Search } from 'lucide-vue-next';
import { debounce } from '@/lib/utils.ts';
import JobCardItem from '@/components/jobs/JobCardItem.vue';
import ServerPagination from '@/components/datatable/ServerPagination.vue';
import JobDetailsPanel from '@/components/jobs/JobDetailsPanel.vue';
import type { IPaging } from '@/types';

const jobStore = useJobStore();
const meta = computed(() => jobStore.state.jobMeta);

const filters = ref<IJobFilter>({
	page: DEFAULT_PAGE,
	limit: DEFAULT_PAGE_SIZE,
	keywords: '',
});
const isResizing = ref(false);
const leftPanelWidth = ref(33.333); // Default 1/3 width in percentage
const startX = ref(0);
const startLeftWidth = ref(0);
const jobSelected = ref<IJob>();

onBeforeMount(() => {
	if (meta?.value?.limit) {
		filters.value.limit = meta.value.limit;
	}

	if (meta?.value?.current_page) {
		filters.value.page = meta.value.current_page;
	}
	fetchJobs();
});

// Actions
const fetchJobs = async () => {
	await jobStore.fetchPublicJobs(filters.value);
};

const handleSearch = (payload: string) => {
	filters.value.keywords = payload;
	debouncedFunction(filters.value);
};
const debouncedFunction = debounce(fetchJobs, 300);

// Resize panel functionality
const startResize = (e: MouseEvent) => {
	isResizing.value = true;
	startX.value = e.clientX;
	startLeftWidth.value = leftPanelWidth.value;

	document.addEventListener('mousemove', handleResize);
	document.addEventListener('mouseup', stopResize);
	document.body.style.cursor = 'col-resize';
	document.body.style.userSelect = 'none';
};

const handleResize = (e: MouseEvent) => {
	if (!isResizing.value) return;

	const container = document.querySelector('.resizable-container')?.getBoundingClientRect();
	if (!container) return;

	const dx = e.clientX - startX.value;
	const newWidthPercent = startLeftWidth.value + (dx / container.width) * 100;

	// Constrain between 30% and 70%
	leftPanelWidth.value = Math.min(Math.max(newWidthPercent, 30), 70);
};

const stopResize = () => {
	isResizing.value = false;
	document.removeEventListener('mousemove', handleResize);
	document.removeEventListener('mouseup', stopResize);
	document.body.style.cursor = '';
	document.body.style.userSelect = '';
};

const handleSelectJob = (job: IJob) => {
	console.log(job);
	jobSelected.value = job;
};

watch(
	() => jobStore.state.jobs,
	() => {
		jobSelected.value = jobStore.state.jobs[0];
	},
);
</script>

<template>
	<ContentWrapper class="space-y-6">
		<Title>Jobs</Title>
		<div class="flex flex-wrap gap-2 justify-between">
			<InputWithIcon
				:icon="Search"
				:model-value="filters.keywords as string"
				class="py-2 flex-1 max-w-2xl rounded-full"
				placeholder="Search job"
				@update:model-value="handleSearch" />
		</div>
		<div class="resizable-container flex h-[calc(100vh-6rem)]">
			<!-- Left Panel: Job Details -->
			<ContentWrapper
				:style="{ width: `${leftPanelWidth}%` }"
				class="grid grid-cols-1 gap-4 overflow-y-auto transition-width duration-75 ease-in-out pr-2">
				<JobCardItem
					v-for="job in jobStore.state.jobs"
					:key="job.id"
					:class="{ 'border-red-500 border-2': jobSelected?.id === job.id }"
					:job="job"
					@click="handleSelectJob(job)" />
			</ContentWrapper>

			<!-- Resize Handle -->
			<div
				class="resize-handle flex items-center justify-center cursor-col-resize z-10 w-4 hover:bg-muted/80 active:bg-primary/20 transition-colors"
				@mousedown="startResize">
				<div class="w-0.5 h-8 bg-border rounded-full"></div>
			</div>

			<JobDetailsPanel
				:job="jobSelected"
				:style="{ width: `${100 - leftPanelWidth}%` }"
				class="transition-width duration-75 ease-in-out" />
		</div>

		<ServerPagination :meta="meta as IPaging" />
	</ContentWrapper>
</template>

<style scoped>
.transition-width {
	transition: width 0.1s ease-out;
}

/* Disable transition during resize for better performance */
.resizable-container:has(.resize-handle:active) .transition-width {
	transition: none;
}
</style>
