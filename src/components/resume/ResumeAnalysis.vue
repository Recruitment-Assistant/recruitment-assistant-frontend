<script lang="ts" setup>
import ResumeAnalysisHeader from './ResumeAnalysisHeader.vue';
import AnalysisProgress from './AnalysisProgress.vue';
import CandidateSummaryCard from './CandidateSummaryCard.vue';
import MatchAnalysisCard from './MatchAnalysisCard.vue';
import ContactInformationCard from './ContactInformationCard.vue';
import FileInformationCard from '@/components/common/FileInformationCard.vue';

defineProps({
	resumeFile: {
		type: Object,
		default: null,
	},
	analysisStage: {
		type: String,
		required: true,
	},
	analysisProgress: {
		type: Number,
		default: 0,
	},
	analysisDetails: {
		type: Object,
		default: () => ({
			message: '',
			completedSteps: 0,
			totalSteps: 0,
		}),
	},
	analysisResult: {
		type: Object,
		default: null,
	},
});

const getAnalysisStageLabel = (stage: string) => {
	const labels = {
		idle: 'Idle',
		processing: 'Processing Resume...',
		analyzing: 'Analyzing Content...',
		complete: 'Analysis Complete',
		failed: 'Analysis Failed',
	};
	return labels[stage] || stage;
};
</script>
<template>
	<div
		v-if="resumeFile && analysisStage !== 'idle'"
		class="space-y-4 border rounded-lg p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
		<!-- Header -->
		<ResumeAnalysisHeader :analysis-stage="analysisStage" />

		<!-- Progress -->
		<AnalysisProgress
			:details="analysisDetails"
			:progress="analysisProgress"
			:stage-label="getAnalysisStageLabel(analysisStage)" />

		<!-- Analysis Results -->
		<div v-if="analysisStage === 'complete' && analysisResult" class="mt-4 space-y-4">
			<!-- File Information -->
			<FileInformationCard :file-info="analysisResult.fileInfo" />

			<!-- Candidate Summary -->
			<CandidateSummaryCard :summary="analysisResult.analysis.ai_summary" />

			<!-- Match Analysis -->
			<MatchAnalysisCard :analysis="analysisResult.analysis" />

			<!-- Contact Information -->
			<ContactInformationCard :resume-data="analysisResult.resumeData" />
		</div>
	</div>
</template>
