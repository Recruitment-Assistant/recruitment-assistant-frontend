<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import ContentWrapper from '@/components/common/ContentWrapper.vue';
import Title from '@/components/common/Title.vue';
import type { IJob, IJobFilter } from '@/types/jobs';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants';
import { Plus } from 'lucide-vue-next';
import { valueUpdater } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button';
import MCreateJob from '@/components/jobs/MCreateJob.vue';
import {
	getCoreRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type PaginationState,
	useVueTable,
	type VisibilityState,
} from '@tanstack/vue-table';
import { jobColumn } from '@/components/jobs/job.column';
import type { IPaging } from '@/types';
import { useRoute, useRouter } from 'vue-router';
import DataTable from '@/components/datatable/DataTable.vue';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import { Separator } from '@/components/ui/separator';
import JobToolBar from '@/components/jobs/JobToolBar.vue';
import AlertPopup from '@/components/common/AlertPopup.vue';
import { useJob, useUpdateJobStatus } from '@/composables/useJob.ts';

const route = useRoute();
const router = useRouter();

const filters = computed<IJobFilter>(() => {
	return {
		page: DEFAULT_PAGE,
		limit: DEFAULT_PAGE_SIZE,
		keywords: '',
	};
});

const isModalOpen = ref(false);
const jobTemp = ref<IJob | undefined>();
const rowSelection = ref({});
const columnVisibility = ref<VisibilityState>({});
const sorting = ref([]);
const columnFilters = ref([]);
const globalFilter = ref('');
const isOpenAlert = ref(false);
const query = computed(() => route.query);
const pageIndex = ref(query.value.page ? Number(query.value.page) - 1 : DEFAULT_PAGE - 1);

const pageSize = ref(query.value.limit ? Number(query.value.limit) : DEFAULT_PAGE_SIZE);

const pageCount = computed(() => meta.value?.total_pages);
const jobs = computed<IJob[]>(() => data.value?.data || []);
const meta = computed<IPaging | undefined>(() => data.value?.meta);

const { data, isLoading } = useJob(filters);
const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateJobStatus(filters);

const pagination = computed<PaginationState>(() => ({
	pageIndex: pageIndex.value,
	pageSize: pageSize.value,
}));

const setPageSize = (newSize: number) => (pageSize.value = newSize);
const setPageIndex = (newIndex: number) => (pageIndex.value = newIndex);

const setPagination = ({ pageIndex, pageSize }: PaginationState): PaginationState => {
	setPageIndex(pageIndex);
	setPageSize(pageSize);

	return { pageIndex, pageSize };
};

const handleDeleteJob = () => {
};

const handleEditJob = (data: IJob) => {
	jobTemp.value = data;
	isModalOpen.value = true;
};

const handleUpdateStatusJob = (id: string, status: string) => {
	updateStatus({
		id,
		status,
	});
};

const table = useVueTable({
	get data() {
		return jobs;
	},
	get pageCount() {
		return pageCount.value ?? 0;
	},
	get rowCount() {
		return meta.value?.total_records ?? 0;
	},
	columns: jobColumn(handleEditJob, handleUpdateStatusJob, handleDeleteJob),
	filterFns: {},
	enableGlobalFilter: true,
	state: {
		get rowSelection() {
			return rowSelection.value;
		},
		get columnVisibility() {
			return columnVisibility.value;
		},
		get sorting() {
			return sorting.value;
		},
		get columnFilters() {
			return columnFilters.value;
		},
		get globalFilter() {
			return globalFilter.value;
		},
	},
	initialState: {
		pagination: pagination.value,
	},
	manualPagination: true,
	manualFiltering: true,
	getCoreRowModel: getCoreRowModel(),
	onPaginationChange: (updater) => {
		if (typeof updater === 'function') {
			setPagination(updater(pagination.value));
		} else {
			setPagination(updater);
		}
	},
	onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
	onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
	enableRowSelection: true,
	getPaginationRowModel: getPaginationRowModel(),
	getSortedRowModel: getSortedRowModel(),
	getFilteredRowModel: getFilteredRowModel(),
	onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
	onColumnFiltersChange: (updaterOrValue) => {
		valueUpdater(updaterOrValue, columnFilters);
	},
	onGlobalFilterChange: (value) => {
		globalFilter.value = value;
		pagination.value.pageIndex = 0;
	},
	getFacetedRowModel: getFacetedRowModel(),
	getFacetedUniqueValues: getFacetedUniqueValues(),
	getFacetedMinMaxValues: getFacetedMinMaxValues(),
});

const openModal = () => {
	isModalOpen.value = true;
};

const handleCloseAlert = () => {
	isOpenAlert.value = false;
};

const handleViewJob = (data: IJob) => {
	router.push({ name: 'Job Overview', params: { id: data.id } });
};

watch(
	() => [pageSize.value, pageIndex.value, globalFilter.value],
	() => {
		filters.value.page = pageIndex.value + 1;
		filters.value.limit = pageSize.value;
		filters.value.keywords = globalFilter.value;
	},
);

watch(
	() => isModalOpen.value,
	() => {
		if (isModalOpen.value === false) {
			jobTemp.value = undefined;
		}
	},
);
</script>

<template>
	<ContentWrapper class="p-6 space-y-6">
		<Title>Jobs</Title>
		<div class="flex justify-between">
			<JobToolBar :table="table" />
			<Button class="bg-blue-500 hover:bg-blue-600" variant="default" @click="openModal">
				<Plus :size="16" class="mr-2" />
				Create new job
			</Button>
		</div>

		<ContentWrapper>
			<DataTable :is-loading="isLoading" :table="table" @row:click="handleViewJob" />
			<Separator class="mb-4" />
			<DataTablePagination :meta="meta" :table="table" />
		</ContentWrapper>

		<MCreateJob v-model:open="isModalOpen" :data="jobTemp" :filter="filters" class="w-full" />
		<AlertPopup
			:open="isOpenAlert"
			title="Are  you sure you want to delete this request?"
			@confirm="handleDeleteJob"
			@update:open="handleCloseAlert" />
	</ContentWrapper>
</template>
