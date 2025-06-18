<script lang="ts" setup>
import { cn } from '@/lib/utils.ts';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useAppStore } from '@/stores/app.store.ts';
import type { IFilterApplication, Stage } from '@/types';
import { computed, onBeforeMount, ref } from 'vue';
import { useCustomToast } from '@/lib/customToast.ts';
import KanbanCandidateColumn from '@/components/candidate/kanban-view/KanbanCandidateColumn.vue';
import { useApplication, useUpdateApplicationStage } from '@/composables/useApplication.ts';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, ORDER } from '@/constants';
import { useRoute } from 'vue-router';
import type { IBaseCandidate } from '@/types/candidate.ts';
import CandidateSheet from '@/components/candidate/CandidateSheet.vue';

const appStore = useAppStore();

interface Props {
	stages?: Stage[];
}

const props = defineProps<Props>();

const { showToast } = useCustomToast();
const isOpenSheet = ref(false);
const filter = ref<IFilterApplication>({
	limit: DEFAULT_PAGE_SIZE,
	page: DEFAULT_PAGE,
	order: ORDER.DESC,
});
const dataSent = ref('');

const {
	data: listApplication,
	refetch: refetchListApplication,
	isLoading,
} = useApplication(filter.value);
const { mutate: updateStage } = useUpdateApplicationStage();

const list = computed<Record<string, IBaseCandidate[]>>(() =>
	listApplication?.value?.data.reduce(
		(acc, item) => {
			const candidateOverview: IBaseCandidate = {
				id: item.candidate.id,
				full_name: item.candidate.full_name,
				email: item.candidate.email,
				phone_number: item.candidate.phone_number,
				applied_at: item.applied_at,
				application_id: item.id,
				score_resume_match: item.score_resume_match,
			};

			if (!acc[item.current_stage_id]) {
				acc[item.current_stage_id] = [];
			}
			acc[item.current_stage_id].push(candidateOverview);

			return acc;
		},
		{} as Record<string, IBaseCandidate[]>,
	),
);

onBeforeMount(() => {
	const route = useRoute();
	filter.value.job_id = [route.params.id as string];
});

const onAdd = (event: any) => {
	const targetColumnId = event.to.dataset.id as string;
	const movedItem = event.item.__draggable_context.element;

	updateStage(
		{
			id: movedItem.application_id,
			stageId: targetColumnId,
		},
		{
			onError: () => {
				refetchListApplication();
			},
			onSuccess: () => {
				showToast({
					message: 'Success!',
					type: 'success',
				});
			},
		},
	);
};

const handleOpenSheet = (id: string) => {
	isOpenSheet.value = true;
	dataSent.value = id;
};

const handleCloseSheet = (open: boolean) => {
	isOpenSheet.value = open;
};
</script>

<template>
	<ScrollArea
		:class="
			cn(
				'transition-all duration-300 ease-in-out pb-3',
				appStore.isSmallSidebar ? 'w-[calc(100vw-160px)]' : 'w-[calc(100vw-320px)]',
			)
		">
		<div class="flex flex-nowrap gap-4">
			<KanbanCandidateColumn
				v-for="stage in stages"
				:column-name="stage.name"
				:colounm-id="stage.id"
				:is-loading="isLoading"
				:label="stage.name"
				:list="list[stage.id] ? list[stage.id] : []"
				group="applicants"
				@add="onAdd"
				@item:click="handleOpenSheet" />
		</div>

		<ScrollBar orientation="horizontal" />
	</ScrollArea>

	<CandidateSheet :applicant-id="dataSent" :open="isOpenSheet" @update:open="handleCloseSheet" />
</template>
