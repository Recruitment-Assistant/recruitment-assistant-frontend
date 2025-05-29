<script lang="ts" setup>
import { Button } from '@/components/ui/button';
import {
	Pagination,
	PaginationEllipsis,
	PaginationFirst,
	PaginationLast,
	PaginationList,
	PaginationListItem,
	PaginationNext,
	PaginationPrev,
} from '@/components/ui/pagination';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, ROWS_PER_PAGE } from '@/constants';
import { onMounted, ref } from 'vue';
import Input from '../ui/input/Input.vue';
import Label from '../ui/label/Label.vue';
import router from '@/routers';
import { useRoute } from 'vue-router';
import type { IPaging } from '@/types';

interface Props {
	meta: IPaging;
}

const props = defineProps<Props>();
const emit = defineEmits<{
	(e: 'update:page', page: number): void;
	(e: 'update:limit', value: { page: number; limit: number }): void;
}>();

const route = useRoute();
const pageSize = ref();
const currentPage = ref(0);

onMounted(() => {
	pageSize.value = String(route.query.limit || DEFAULT_PAGE_SIZE);
	currentPage.value = Number(route.query.page) || DEFAULT_PAGE;
});

const pushUpQuery = () => {
	const path = route.path;
	const currentQuery = route.query;

	router.push({
		path: path,
		query: {
			...currentQuery,
			page: currentPage.value,
			limit: pageSize.value,
		},
	});
};

const handleSelect = (value: string) => {
	currentPage.value = 1;
	pageSize.value = value;

	pushUpQuery();

	emit('update:limit', {
		limit: Number(value),
		page: 1,
	});
};

const handleChangePage = (page: number) => {
	currentPage.value = page;

	pushUpQuery();

	emit('update:page', page);
};

const handleInputPage = () => {
	if (currentPage.value < 1) {
		currentPage.value = 1;
	}
	if (currentPage.value > props.meta.total_pages!) {
		currentPage.value = props.meta.total_pages!;
	}
	if (currentPage.value !== props.meta.current_page) emit('update:page', currentPage.value);

	pushUpQuery();
};
</script>

<template>
	<div class="flex flex-wrap gap-2 items-center justify-between px-2">
		<div class="flex-1 text-sm text-muted-foreground">
			{{ meta?.total_records || 0 }} row(s)
		</div>
		<div class="flex items-center gap-2 flex-wrap space-x-6 lg:space-x-8">
			<div class="flex items-center space-x-2">
				<p class="text-sm font-medium">Rows per page</p>
				<Select :model-value="pageSize" @update:model-value="handleSelect">
					<SelectTrigger class="h-8 w-[70px]">
						<SelectValue :placeholder="`${pageSize}`" />
					</SelectTrigger>
					<SelectContent side="top">
						<SelectItem
							v-for="pageSize in [10].concat(ROWS_PER_PAGE)"
							:key="pageSize"
							:value="`${pageSize}`">
							{{ pageSize }}
						</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div class="flex gap-2 items-center">
				<Label>Page</Label>
				<Input
					v-model="currentPage"
					class="h-8 w-14 focus-visible:ring-0 focus-visible:ring-offset-0"
					min="1"
					type="number"
					@blur="handleInputPage"></Input>
			</div>
			<Pagination
				v-slot="{ page }"
				:items-per-page="meta?.limit || 20"
				:page="currentPage"
				:sibling-count="1"
				:total="(meta?.total_pages || 1) * 10"
				show-edges
				@update:page="handleChangePage">
				<PaginationList v-slot="{ items }" class="flex items-center gap-1">
					<PaginationFirst class="w-8 h-8 p-0" />
					<PaginationPrev class="w-8 h-8 p-0" />

					<template v-for="(item, index) in items">
						<PaginationListItem
							v-if="item.type === 'page'"
							:key="index"
							:value="item.value"
							as-child>
							<Button
								:class="item.value === page ? 'text-white' : ''"
								:variant="item.value === page ? 'default' : 'outline'"
								class="w-8 h-8 p-0">
								{{ item.value }}
							</Button>
						</PaginationListItem>
						<PaginationEllipsis v-else :key="item.type" :index="index" />
					</template>

					<PaginationNext class="w-8 h-8 p-0" />
					<PaginationLast class="w-8 h-8 p-0" />
				</PaginationList>
			</Pagination>
		</div>
	</div>
</template>
