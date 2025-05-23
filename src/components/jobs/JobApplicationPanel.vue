<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useJobStore } from '@/stores/job.store.ts';
import type { FinalAnalysisResult, Job, ResumeAnalysisStage } from '@/types';
import { useCustomToast } from '@/lib/customToast.ts';
import { uploadApplicantForJob } from '@/services/job.service.ts';
import { v4 as uuidv4 } from 'uuid';
import { Config } from '@/plugins/config.ts';
import UploadField from '@/components/common/UploadField.vue';
import ResumeAnalysis from '@/components/resume/ResumeAnalysis.vue';

const { showToast } = useCustomToast();
const jobStore = useJobStore();
const job = computed<Job | null>(() => jobStore.state.currentJob);

const isUploading = ref(false);
const resumeFile = ref<File | null>(null);

const analysisProgress = ref(0);
const stepOrder = [
	'idle',
	'reading',
	'uploading',
	'extracting',
	'analyzing',
	'storing',
	'complete',
	'failed',
];
const analysisDetails = ref({
	currentStep: '',
	totalSteps: 7,
	completedSteps: 0,
	message: '',
});
const analysisStage = ref<ResumeAnalysisStage>('idle');
const analysisResult = ref<FinalAnalysisResult | null>({
	resumeText: '',
	fileInfo: {},
	resumeData: {},
	analysis: {},
	candidateId: '',
	applicationId: '',
});
const showUploadMore = ref(false);
const showErrorDetails = ref(false);
const errorMessage = ref('');
const analysisHistory = ref<FinalAnalysisResult[]>([]);
const minimizedResults = ref<Set<string>>(new Set());
const presetConfig = reactive({
	acceptedTypes: ['.pdf', '.doc', '.docx'],
	title: 'Upload your resume',
	description: 'Drag and drop your resume here or click to browse',
});

const analysisResultSummary = computed(() => {
	if (!analysisResult.value || !analysisResult.value.analysis) return null;

	const analysis = analysisResult.value.analysis;
	return {
		overallScore: analysis.score_resume_match || 0,
		matchingSkills: analysis.matching_skills || [],
		missingSkills: analysis.missing_skills || [],
		experienceLevel: analysis.experience_level || 'Unknown',
		fileName: analysisResult.value.fileInfo?.original_filename || 'Unknown file',
	};
});

const canShowUploadMore = computed(() => {
	return analysisStage.value === 'complete' && analysisResult.value?.applicationId;
});

const resetAnalysis = () => {
	analysisStage.value = 'idle';
	analysisProgress.value = 0;
	analysisResult.value = {
		resumeText: '',
		fileInfo: {},
		resumeData: {},
		analysis: {},
		candidateId: '',
		applicationId: '',
	};
	analysisDetails.value = {
		currentStep: '',
		totalSteps: 7,
		completedSteps: 0,
		message: '',
	};
	errorMessage.value = '';
	showErrorDetails.value = false;
};

const handleError = (error: string, details?: string) => {
	errorMessage.value = error;
	analysisStage.value = 'failed';

	if (details) {
		console.error('Analysis error details:', details);
	}
};

const handleFileUpload = (files: any) => {
	resumeFile.value = files.file;
};

const handleFileRemove = (fileId: number) => {
	resetAnalysis();
	console.log('File removed:', fileId);
};

const updateProgress = (step: string) => {
	const index = stepOrder.indexOf(step);
	if (index !== -1) {
		analysisDetails.value.completedSteps = index + 1;
		analysisProgress.value = Math.floor(((index + 1) / analysisDetails.value.totalSteps) * 100);
		analysisStage.value = step as ResumeAnalysisStage;
	}
};

const submitApplication = async () => {
	if (!resumeFile.value) return;

	try {
		isUploading.value = true;
		resetAnalysis();

		const analysisId = uuidv4();
		const source = new EventSource(
			`${Config.baseURL as string}/jobs/resume/analyze?analysisId=${analysisId}`,
		);
		source.onmessage = (event) => {
			const { type, payload } = JSON.parse(event.data);
			console.log(payload);
			switch (type) {
				case 'reading':
					analysisResult.value.resumeText = payload;
					updateProgress('reading');
					break;
				case 'extracting':
					analysisResult.value.fileInfo = payload;
					updateProgress('extracting');
					break;
				case 'analyzing':
					analysisResult.value.resumeData = payload;
					updateProgress('analyzing');
					break;
				case 'storing':
					analysisResult.value.analysis = payload;
					break;
				case 'complete':
					analysisResult.value.candidateId = payload.candidate_id;
					analysisResult.value.applicationId = payload.application_id;
					updateProgress('complete');
					break;
			}
		};

		source.addEventListener('done', () => {
			console.log('Analysis complete');
			source.close();
		});

		source.addEventListener('error', (error) => {
			const payload = JSON.parse(error.data);
			const errorMessage = payload.message || 'Unknown error';

			showToast({
				message: 'Submission failed',
				description: `Error: ${errorMessage}. Please try again.`,
				type: 'error',
			});

			analysisStage.value = 'failed';
			source.close();
		});

		await uploadApplicantForJob(job?.value?.id as string, resumeFile.value, analysisId);

		if (analysisStage.value === 'complete') {
			showToast({
				message: 'Application submitted successfully!',
				description: `Your application for ${job.value.title} has been analyzed and submitted.`,
				type: 'success',
			});
		}
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		showToast({
			message: 'Submission failed',
			description: `Error: ${errorMessage}. Please try again.`,
			type: 'error',
		});
		analysisStage.value = 'failed';
		console.error('Submission error:', error);
	} finally {
		resumeFile.value = null;
		isUploading.value = false;
	}
};

const uploadMoreResumes = () => {
	showUploadMore.value = true;
	resumeFile.value = null;
	resetAnalysis();
};

// Watch for analysis completion to show upload more option
watch(analysisStage, (newStage) => {
	if (newStage === 'complete') {
		setTimeout(() => {
			showUploadMore.value = true;
		}, 2000);
	}
});
</script>

<template>
	<Card class="h-full overflow-auto border-l rounded-l-none shadow-none">
		<CardHeader>
			<CardTitle class="text-xl">Apply for this position</CardTitle>
			<CardDescription>
				Upload your resume to apply for the {{ job?.title }} position
			</CardDescription>
		</CardHeader>

		<CardContent class="space-y-6">
			<!-- Error Notification -->

			<!-- Previous Analysis Results (Minimized) -->

			<!-- Upload Field -->
			<UploadField
				:multiple="false"
				v-bind="presetConfig"
				@file-upload="handleFileUpload"
				@file-remove="handleFileRemove" />
		</CardContent>

		<!-- Analysis Progress Section -->
		<ResumeAnalysis
			:analysis-details="analysisDetails"
			:analysis-progress="analysisProgress"
			:analysis-result="analysisResult"
			:analysis-stage="analysisStage"
			:resume-file="analysisResult?.fileInfo" />

		<CardFooter class="pt-2">
			<!--			<div v-if="true" class="flex justify-between">-->
			<!--				<Button variant="secondary">Upload More</Button>-->
			<!--				<Button variant="secondary">View List</Button>-->
			<!--			</div>-->
			<Button
				:disabled="!resumeFile || isUploading"
				class="w-full bg-blue-500 hover:bg-blue-600 rounded-2xl h-auto py-3.5 px-10 text-white"
				size="lg"
				@click="submitApplication">
				<span v-if="isUploading" class="flex items-center">
					<svg
						class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
						fill="none"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"></circle>
						<path
							class="opacity-75"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							fill="currentColor"></path>
					</svg>
					Submitting...
				</span>
				<span v-else>Submit Application</span>
			</Button>
		</CardFooter>
	</Card>
</template>
