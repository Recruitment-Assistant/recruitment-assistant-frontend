<script lang="ts" setup>
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight } from 'lucide-vue-next';
import { ROWS_PER_PAGE } from '@/constants';
import type { Table } from '@tanstack/vue-table';
import Input from '../ui/input/Input.vue';
import { ref, watch } from 'vue';

interface DataTablePaginationProps {
	table: Table<any>;
}

const props = defineProps<DataTablePaginationProps>();

const currentPage = ref(props.table.getState().pagination.pageIndex + 1);

const handleSelect = (value: string) => {
	props.table.setPageSize(Number(value));
};

const handleUpdatePage = (event: any) => {
	if (event.target.value < 1) {
		currentPage.value = 1;
		props.table.setPageIndex(0);
		return;
	}
	if (event.target.value > props.table.getPageCount()) {
		currentPage.value = props.table.getPageCount();
		props.table.setPageIndex(props.table.getPageCount() - 1);
		return;
	}
	currentPage.value = event.target.value;
	props.table.setPageIndex(event.target.value - 1);
};

watch(
	() => props.table.getState().pagination.pageIndex,
	(newPage) => {
		currentPage.value = newPage + 1;
	},
);
</script>

<template>
	<div class="flex flex-wrap gap-2 items-center justify-between px-2">
		<div class="text-sm text-muted-foreground">
			{{ table.getFilteredRowModel().rows.length }} /
			{{ table.getRowCount() || table.getFilteredRowModel().rows.length }} row(s)
		</div>
		<div class="flex items-center gap-2 flex-wrap space-x-6 lg:space-x-8">
			<div class="flex items-center space-x-2">
				<p class="text-sm font-medium">Rows per page</p>
				<Select :model-value="`${table.getState().pagination.pageSize}`" @update:model-value="handleSelect">
					<SelectTrigger class="h-8 w-[70px]">
						<SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
					</SelectTrigger>
					<SelectContent side="top">
						<SelectItem v-for="pageSize in ROWS_PER_PAGE" :key="pageSize" :value="`${pageSize}`">
							{{ pageSize }}
						</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div class="flex gap-2 items-center justify-center text-sm font-medium !ml-0">
				Page
				<Input
					:max="table.getPageCount()"
					:model-value="currentPage"
					class="w-16 h-8 focus-visible:ring-0 focus-visible:ring-offset-0"
					min="1"
					type="number"
					@change="handleUpdatePage"
				/>
				of
				<span class="text-nowrap">{{ table.getPageCount() }}</span>
			</div>
			<div class="flex items-center space-x-2 !ml-0">
				<Button
					:disabled="!table.getCanPreviousPage()"
					class="hidden h-8 w-8 p-0 lg:flex"
					variant="outline"
					@click="table.setPageIndex(0)"
				>
					<span class="sr-only">Go to first page</span>
					<ChevronsLeft class="h-4 w-4" />
				</Button>
				<Button
					:disabled="!table.getCanPreviousPage()"
					class="h-8 w-8 p-0"
					variant="outline"
					@click="table.previousPage()"
				>
					<span class="sr-only">Go to previous page</span>
					<ChevronLeftIcon class="h-4 w-4" />
				</Button>
				<Button :disabled="!table.getCanNextPage()" class="h-8 w-8 p-0" variant="outline"
						@click="table.nextPage()">
					<span class="sr-only">Go to next page</span>
					<ChevronRightIcon class="h-4 w-4" />
				</Button>
				<Button
					:disabled="!table.getCanNextPage()"
					class="hidden h-8 w-8 p-0 lg:flex"
					variant="outline"
					@click="table.setPageIndex(table.getPageCount() - 1)"
				>
					<span class="sr-only">Go to last page</span>
					<ChevronsRight class="h-4 w-4" />
				</Button>
			</div>
		</div>
	</div>
</template>
