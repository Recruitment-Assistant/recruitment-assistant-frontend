<script lang="ts" setup>
import { Button } from '@/components/ui/button';
import { X } from 'lucide-vue-next';
import type { Job } from '@/types';
import type { Table } from '@tanstack/vue-table';
import { computed, ref } from 'vue';
import DataTableFacetedFilter from '@/components/datatable/DataTableFacetedFilter.vue';
import { JOB_STATUS } from '@/constants/job.constant.ts';
import { Input } from '@/components/ui/input';

interface ToolBarProps {
	table: Table<Job>;
}

const props = defineProps<ToolBarProps>();

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);
const searchTerm = ref('');

const reset = () => {
	props.table.resetGlobalFilter();
	props.table.resetColumnFilters();
};

const onSearch = (value: string) => {
	searchTerm.value = value;
	props.table.setGlobalFilter(value);
};
</script>

<template>
	<div class="flex w-full space-x-3">
		<div>
			<Input
				:model-value="searchTerm"
				class="h-9 w-[500px]"
				placeholder="Search job"
				@update:model-value="onSearch" />
		</div>
		<div>
			<DataTableFacetedFilter
				:column="table.getColumn('status')"
				:options="
					Object.keys(JOB_STATUS).map((item: string) => {
						return {
							label: item,
							value: JOB_STATUS[item as keyof typeof JOB_STATUS],
						};
					})
				"
				title="Status" />
		</div>
		<Button
			v-if="isFiltered"
			class="h-8 flex flex-row text-foreground p-3 bg-muted-foreground/1.5"
			size="sm"
			variant="outline"
			@click.prevent="reset">
			Reset
			<X class="ml-2 h-4 w-4" />
		</Button>
	</div>
</template>
