<script lang="ts" setup>
import { Badge } from '@/components/ui/badge';
import { CheckCircleIcon, Target, XCircleIcon } from 'lucide-vue-next';
import SkillsDisplay from './SkillsDisplay.vue';

defineProps({
	analysis: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div class="bg-white/80 p-3 rounded-lg border border-gray-200">
		<h4 class="text-sm font-semibold text-gray-800 mb-2 flex items-center">
			<Target class="h-4 w-4 mr-2" />
			Match Analysis
		</h4>
		<div class="space-y-3">
			<!-- Score and Selection Status -->
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-2">
					<span class="text-xs text-gray-600">Match Score:</span>
					<Badge
						:class="{
							'bg-green-100 text-green-800': analysis.score_resume_match >= 80,
							'bg-yellow-100 text-yellow-800':
								analysis.score_resume_match >= 60 &&
								analysis.score_resume_match < 80,
							'bg-red-100 text-red-800': analysis.score_resume_match < 60,
						}"
						variant="secondary">
						{{ analysis.score_resume_match }}%
					</Badge>
				</div>
				<div class="flex items-center space-x-2">
					<span class="text-xs text-gray-600">Status:</span>
					<Badge
						:class="
							analysis.selected
								? 'bg-green-100 text-green-800'
								: 'bg-gray-100 text-gray-800'
						"
						:variant="analysis.selected ? 'default' : 'secondary'">
						<CheckCircleIcon v-if="analysis.selected" class="h-3 w-3 mr-1" />
						<XCircleIcon v-else class="h-3 w-3 mr-1" />
						{{ analysis.selected ? 'Selected' : 'Not Selected' }}
					</Badge>
				</div>
			</div>

			<!-- Experience Level -->
			<div class="flex items-center space-x-2">
				<span class="text-xs text-gray-600">Experience Level:</span>
				<Badge
					:class="{
						'bg-blue-100 text-blue-800': analysis.experience_level === 'junior',
						'bg-purple-100 text-purple-800': analysis.experience_level === 'mid',
						'bg-orange-100 text-orange-800': analysis.experience_level === 'senior',
					}"
					variant="secondary">
					{{
						analysis.experience_level.charAt(0).toUpperCase() +
						analysis.experience_level.slice(1)
					}}
				</Badge>
			</div>

			<!-- Skills Display -->
			<SkillsDisplay
				:core-skills="analysis.ai_summary.core_skills"
				:matching-skills="analysis.matching_skills"
				:missing-skills="analysis.missing_skills" />

			<!-- Notable Projects -->
			<div v-if="analysis.ai_summary.notable_projects.length > 0">
				<span class="text-xs text-gray-600 block mb-1">Notable Projects:</span>
				<ul class="text-xs text-gray-700 space-y-1">
					<li
						v-for="project in analysis.ai_summary.notable_projects"
						:key="project"
						class="flex items-start">
						<div class="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
						{{ project }}
					</li>
				</ul>
			</div>

			<!-- Feedback -->
			<div v-if="analysis.feedback" class="mt-3 pt-3 border-t border-gray-200">
				<span class="text-xs text-gray-600 block mb-1">AI Feedback:</span>
				<p class="text-xs text-gray-700 leading-relaxed">
					{{ analysis.feedback }}
				</p>
			</div>
		</div>
	</div>
</template>
