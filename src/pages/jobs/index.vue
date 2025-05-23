<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import Title from '@/components/common/Title.vue';
import { useJobStore } from '@/stores/job.store.ts';
import type { IJobFilter } from '@/types/jobs/job.ts';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants';
import InputWithIcon from '@/components/common/InputWithIcon.vue';
import { Plus, Search } from 'lucide-vue-next';
import { debounce } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button';
import JobSheetForm from '@/components/jobs/JobSheetForm.vue';
import JobCardItem from '@/components/jobs/JobCardItem.vue';

const jobStore = useJobStore();

const isOpenModal = ref(false);

const filters = ref<IJobFilter>({
	page: DEFAULT_PAGE,
	limit: DEFAULT_PAGE_SIZE,
	keywords: '',
});

const currentPage = ref(1);
const totalPages = 5;

onBeforeMount(() => {
	fetchJobs();
});

// Actions
const fetchJobs = async () => {
	await jobStore.fetchJobs(filters.value);
};

const createJob = () => {
	/* navigate to job creation */
};
const editJob = (id: string) => {
	/* edit logic */
};
const viewApplicants = (id: string) => {
	/* navigate to applicant list */
};
const duplicateJob = (id: string) => {
	/* duplicate logic */
};
const deleteJob = (id: string) => {
	/* delete logic */
};
const onPageChange = (page: number) => {
	currentPage.value = page;
};

const handleOpenModal = () => {
	isOpenModal.value = true;
};

const handleCloseDialog = (open: boolean) => {
	isOpenModal.value = open;
};

const handleSearch = (payload: string) => {
	filters.value.keywords = payload;
	debouncedFunction(filters.value);
};
const debouncedFunction = debounce(fetchJobs, 300);
</script>

<template>
	<ContentWrapper class="p-6 space-y-6">
		<Title>Jobs</Title>
		<div class="flex flex-wrap gap-2 justify-between">
			<InputWithIcon
				:icon="Search"
				:model-value="filters.keywords as string"
				class="py-2 flex-1 max-w-2xl rounded-full"
				placeholder="Search job"
				@update:model-value="handleSearch" />
			<Button
				class="bg-blue-500 hover:bg-blue-600"
				variant="default"
				@click="handleOpenModal">
				<Plus :size="16" class="mr-2" />
				Create a Job
			</Button>
		</div>
		<ContentWrapper class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			<JobCardItem v-for="job in jobStore.state.jobs" :key="job.id" :job="job" />
		</ContentWrapper>
		<JobSheetForm :model-value="isOpenModal" @update:open="handleCloseDialog" />
	</ContentWrapper>
</template>
