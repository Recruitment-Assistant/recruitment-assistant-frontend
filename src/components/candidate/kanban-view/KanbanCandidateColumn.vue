<script lang="ts" setup>
import { ScrollArea } from '@/components/ui/scroll-area';
import draggable from 'vuedraggable';
import { Skeleton } from '@/components/ui/skeleton';
import type { IBaseCandidate } from '@/types/candidate.ts';
import CandidateCard from '@/components/candidate/partials/CandidateCard.vue';

const props = defineProps<{
	list?: IBaseCandidate[];
	label: string;
	group: string;
	columnName: string;
	isLoading?: boolean;
}>();

const emits = defineEmits<{
	(e: 'add', event: any): void;
	(e: 'item:click', id: string): void;
}>();

const onAdd = (event: any) => {
	emits('add', event);
};

const handleClickItem = (id: string) => {
	emits('item:click', id);
};
</script>
<template>
	<div class="bg-slate-100 rounded-2xl p-4 pr-1 w-[340px]">
		<h3 class="text-base font-semibold">{{ label }} ({{ list?.length ?? 0 }})</h3>
		<ScrollArea class="mt-2 h-[calc(100vh-390px)] pr-3">
			<div v-if="isLoading" class="flex flex-col gap-2">
				<div class="bg-background flex flex-col gap-2 rounded-2xl p-3">
					<div class="flex items-center gap-2">
						<Skeleton class="h-10 w-10 rounded-full" />
						<div class="flex flex-col gap-1">
							<Skeleton class="h-5 w-60" />
							<Skeleton class="h-4 w-60" />
						</div>
					</div>
					<Skeleton class="h-5 w-[284px]" />
					<Skeleton class="h-5 w-[284px]" />
				</div>
				<div class="bg-background flex flex-col gap-2 rounded-2xl p-3">
					<div class="flex items-center gap-2">
						<Skeleton class="h-10 w-10 rounded-full" />
						<div class="flex flex-col gap-1">
							<Skeleton class="h-5 w-60" />
							<Skeleton class="h-4 w-60" />
						</div>
					</div>
					<Skeleton class="h-5 w-[284px]" />
					<Skeleton class="h-5 w-[284px]" />
				</div>
				<div class="bg-background flex flex-col gap-2 rounded-2xl p-3">
					<div class="flex items-center gap-2">
						<Skeleton class="h-10 w-10 rounded-full" />
						<div class="flex flex-col gap-1">
							<Skeleton class="h-5 w-60" />
							<Skeleton class="h-4 w-60" />
						</div>
					</div>
					<Skeleton class="h-5 w-[284px]" />
					<Skeleton class="h-5 w-[284px]" />
				</div>
				<div class="bg-background flex flex-col gap-2 rounded-2xl p-3">
					<div class="flex items-center gap-2">
						<Skeleton class="h-10 w-10 rounded-full" />
						<div class="flex flex-col gap-1">
							<Skeleton class="h-5 w-60" />
							<Skeleton class="h-4 w-60" />
						</div>
					</div>
					<Skeleton class="h-5 w-[284px]" />
					<Skeleton class="h-5 w-[284px]" />
				</div>
				<div class="bg-background flex flex-col gap-2 rounded-2xl p-3">
					<div class="flex items-center gap-2">
						<Skeleton class="h-10 w-10 rounded-full" />
						<div class="flex flex-col gap-1">
							<Skeleton class="h-5 w-60" />
							<Skeleton class="h-4 w-60" />
						</div>
					</div>
					<Skeleton class="h-5 w-[284px]" />
					<Skeleton class="h-5 w-[284px]" />
				</div>
			</div>
			<draggable
				v-else
				:animation="200"
				:data-name="columnName"
				:disabled="isLoading"
				:group="group"
				:list="list"
				class="flex flex-col gap-2 h-[calc(100vh-390px)]"
				item-key="id"
				@add="onAdd">
				<template #item="{ element }">
					<CandidateCard
						:candidate="element"
						@click="handleClickItem(element.application_id)" />
				</template>
			</draggable>
		</ScrollArea>
	</div>
</template>
