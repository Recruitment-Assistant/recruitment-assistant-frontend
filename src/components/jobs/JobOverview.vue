<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue';
import { Activity, List, Users } from 'lucide-vue-next';
import { useJobStore } from '@/stores/job.store.ts';
import { useRoute } from 'vue-router';
import type { Job, JobSummary } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import JobHeader from '@/components/jobs/JobHeader.vue';

const props = defineProps<{
	id?: string;
}>();

const jobStore = useJobStore();
const jobData = computed<Job>(() => jobStore.state.currentJob);
const jobSummary = ref<JobSummary>({
	active_candidates: 0,
	dropped_candidates: 0,
	total_candidates: 0,
});

onBeforeMount(() => {
	const route = useRoute();
	const jobId = props.id || (route.params.id as string);
	jobStore.getJobById(jobId);
});

interface Candidate {
	id: string;
	name: string;
	email: string;
	stage: string;
	score: number;
	visibleToGuests: boolean;
}

interface PipelineStage {
	name: string;
	count: number;
	percentage: number;
}

interface Activity {
	id: string;
	description: string;
	time: string;
}

const activeTab = ref('candidates');

const tabs = [
	{ id: 'candidates', name: 'Candidates', icon: Users },
	{ id: 'summary', name: 'Summary', icon: List },
	{ id: 'analytics', name: 'Analytics', icon: Activity },
];

const handleUpdateTab = (value: string): any => {
	activeTab.value = value;
};
</script>

<template>
	<div class="w-full">
		<!-- Header Section -->
		<div class="rounded-lg shadow-sm border p-5">
			<JobHeader :job="jobData" :job-summary="jobSummary" />
		</div>

		<!-- Main Content Tabs -->
		<div>
			<div class="border-b">
				<Tabs
					:model-value="activeTab"
					class="flex space-x-8 px-6"
					@update:model-value="handleUpdateTab">
					<TabsList class="flex space-x-8 px-6">
						<TabsTrigger
							v-for="tab in tabs"
							:class="[
								'font-medium text-sm transition-colors',
								activeTab === tab.id
									? 'border-blue-500 text-blue-600'
									: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
							]"
							:value="tab.id">
							<component :is="tab.icon" class="w-4 h-4 inline mr-2" />
							{{ tab.name }}
						</TabsTrigger>
					</TabsList>

					<TabsContent value="candidates"> Candidate </TabsContent>
					<TabsContent value="summary"> Summary </TabsContent>
					<TabsContent value="analysis"> Analysis </TabsContent>
				</Tabs>
			</div>
		</div>
	</div>
</template>
