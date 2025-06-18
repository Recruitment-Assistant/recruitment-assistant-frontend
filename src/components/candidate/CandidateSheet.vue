<script lang="ts" setup>
import { Activity, Briefcase, FileText, GraduationCap, MessageSquare, User } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { Sheet } from '@/components/ui/sheet';
import SheetContentCustom from '../custom/SheetContentCustom.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetApplicationById } from '@/composables/useApplication.ts';
import CandidateOverview from '@/components/candidate/CandidateOverview.vue';
import type { ICandidate } from '@/types/candidate';
import CandidateSummary from './partials/CandidateSummary.vue';
import ResumeTab from './partials/ResumeTab.vue';
import ExperienceTab from './partials/ExperienceTab.vue';

const props = defineProps<{
	open: boolean;
	applicantId?: string;
}>();

const emits = defineEmits<{
	(e: 'update:open', payload: boolean): void;
}>();

const applicationId = computed(() => props.applicantId);

const { data: application } = useGetApplicationById(applicationId);

const activeTab = ref('summary');
const tabs = [
	{ id: 'summary', name: 'Summary', icon: User },
	{ id: 'resume', name: 'Resume', icon: FileText },
	{ id: 'experience', name: 'Experience', icon: Briefcase },
	{ id: 'education', name: 'Education', icon: GraduationCap },
	{ id: 'notes', name: 'Notes', icon: MessageSquare },
	{ id: 'activity', name: 'Activity Log', icon: Activity },
];

const handleUpdateTab = (value: string): any => {
	activeTab.value = value;
};

const handleOpen = (isOpen: boolean) => {
	activeTab.value = 'summary';
	emits('update:open', isOpen);
};
</script>

<template>
	<Sheet :open="open" @update:open="handleOpen">
		<SheetContentCustom
			class="rounded-l-3xl sm:max-w-[1200px] p-8 flex flex-col text-slate-600">
			<CandidateOverview :candidate="application?.data?.candidate as ICandidate" />

			<div class="flex items-start p-2 w-full">
				<Tabs
					:model-value="activeTab"
					class="flex flex-col"
					@update:model-value="handleUpdateTab">
					<TabsList class="flex space-x-8 px-6 items-start">
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

					<div>
						<TabsContent value="summary">
							<CandidateSummary
								:candidate="application?.data?.candidate as ICandidate" />
						</TabsContent>

						<TabsContent value="resume">
							<ResumeTab />
						</TabsContent>

						<TabsContent value="experience">
							<ExperienceTab
								:experience="application?.data?.candidate?.work_experience" />
						</TabsContent>
						<TabsContent value="education">Education</TabsContent>
						<TabsContent value="notes">notes</TabsContent>
						<TabsContent value="activity">activity</TabsContent>
					</div>
				</Tabs>
			</div>
		</SheetContentCustom>
	</Sheet>
</template>
