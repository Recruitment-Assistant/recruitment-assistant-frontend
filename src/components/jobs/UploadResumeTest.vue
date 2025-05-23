<script lang="ts" setup>
import { computed, ref } from 'vue';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

import { useJobStore } from '@/stores/job.store.ts';
import type { Job } from '@/types';
import { useCustomToast } from '@/lib/customToast.ts';

const { showToast } = useCustomToast();
const jobStore = useJobStore();
const job = computed<Job | null>(() => jobStore.state.currentJob);

const isDragging = ref(false);
const isUploading = ref(false);
const isAnalyzing = ref(false);
const resumeFile = ref<File | null>(null);
const fileName = ref('');
const fileSize = ref('');

// Resume analysis states
const analysisStage = ref<'idle' | 'extracting' | 'matching' | 'scoring' | 'complete' | 'failed'>(
	'idle',
);
const analysisProgress = ref(0);
const analysisResult = ref<{
	score: number;
	matchPercentage: number;
	keySkills: { name: string; match: boolean }[];
	recommendation: string;
} | null>(null);

const dragOver = () => {
	isDragging.value = true;
};

const dragLeave = () => {
	isDragging.value = false;
};

const drop = (e: DragEvent) => {
	isDragging.value = false;
	if (e.dataTransfer?.files) {
		handleFiles(e.dataTransfer.files);
	}
};

const handleFileUpload = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target.files) {
		handleFiles(target.files);
	}
};

const handleFiles = (files: FileList) => {
	const allowedTypes = [
		'application/pdf',
		'application/msword',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	];
	const file = files[0];

	if (file && allowedTypes.includes(file.type)) {
		resumeFile.value = file;
		fileName.value = file.name;
		fileSize.value = formatFileSize(file.size);

		showToast({
			message: 'Resume uploaded',
			description: `${file.name} is ready for analysis.`,
			type: 'success',
		});

		// Start resume analysis automatically
		analyzeResume();
	} else {
		showToast({
			message: 'Invalid file type',
			description: 'Please upload a PDF, DOC, or DOCX file.',
			type: 'error',
		});
	}
};

const formatFileSize = (bytes: number): string => {
	if (bytes < 1024) return bytes + ' bytes';
	else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
	else return (bytes / 1048576).toFixed(1) + ' MB';
};

const removeFile = () => {
	resumeFile.value = null;
	fileName.value = '';
	fileSize.value = '';
	analysisStage.value = 'idle';
	analysisProgress.value = 0;
	analysisResult.value = null;
};

// Simulate resume analysis process
const analyzeResume = async () => {
	if (!resumeFile.value) return;

	try {
		isAnalyzing.value = true;
		analysisStage.value = 'extracting';
		analysisProgress.value = 10;

		// Stage 1: Text extraction
		await new Promise((resolve) => setTimeout(resolve, 1000));
		analysisProgress.value = 30;

		// Stage 2: Skills matching
		analysisStage.value = 'matching';
		await new Promise((resolve) => setTimeout(resolve, 1200));
		analysisProgress.value = 60;

		// Stage 3: Scoring
		analysisStage.value = 'scoring';
		await new Promise((resolve) => setTimeout(resolve, 800));
		analysisProgress.value = 90;

		// Complete analysis
		await new Promise((resolve) => setTimeout(resolve, 500));
		analysisProgress.value = 100;
		analysisStage.value = 'complete';

		// Generate mock analysis result - in a real app this would come from your backend
		analysisResult.value = {
			score: 85,
			matchPercentage: 78,
			keySkills: [
				{ name: 'Vue.js', match: true },
				{ name: 'TypeScript', match: true },
				{ name: 'UI/UX Design', match: true },
				{ name: 'Backend Development', match: false },
				{
					name: 'Test Driven Development',
					match: job.value?.tags?.includes('TDD') || false,
				},
			],
			recommendation:
				'Your profile shows a strong match for this position. Consider highlighting your project management experience in your application.',
		};

		showToast({
			message: 'Analysis complete',
			description: 'Your resume has been analyzed and matched against job requirements.',
			type: 'success',
		});
	} catch (error) {
		analysisStage.value = 'failed';
		showToast({
			message: 'Analysis failed',
			description: "We couldn't analyze your resume. Please try uploading again.",
			type: 'error',
		});
	} finally {
		isAnalyzing.value = false;
	}
};

const submitApplication = async () => {
	if (!resumeFile.value) return;

	try {
		isUploading.value = true;
		// Simulating upload delay
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// Here you would normally send the file to your backend
		console.log('Submitting application with file:', resumeFile.value);

		showToast({
			message: 'Application submitted!',
			description: `Your application for ${job.value?.title} has been received.`,
			type: 'success',
		});

		// Clear the form after successful submission
		removeFile();
	} catch (error) {
		showToast({
			message: 'Submission failed',
			description: 'There was an error submitting your application. Please try again.',
			type: 'error',
		});
	} finally {
		isUploading.value = false;
	}
};

// Helper functions for the analysis display
const getAnalysisStageLabel = (stage: string): string => {
	switch (stage) {
		case 'extracting':
			return 'Extracting content from your resume';
		case 'matching':
			return 'Matching skills and experience';
		case 'scoring':
			return 'Calculating compatibility score';
		case 'complete':
			return 'Analysis complete';
		case 'failed':
			return 'Analysis failed';
		default:
			return 'Ready to analyze';
	}
};

const getMatchColor = (percentage: number): string => {
	if (percentage >= 80) return 'text-green-500';
	if (percentage >= 60) return 'text-amber-500';
	return 'text-red-500';
};
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
			<div
				:class="[
					'border-2 border-dashed rounded-lg p-8 text-center transition-all',
					isDragging
						? 'border-primary bg-primary/5'
						: 'border-muted hover:border-muted-foreground/50',
					resumeFile ? 'bg-muted/5' : '',
				]"
				@dragover.prevent="dragOver"
				@dragleave.prevent="dragLeave"
				@drop.prevent="drop">
				<input
					id="fileInput"
					accept=".pdf,.doc,.docx"
					class="hidden"
					type="file"
					@change="handleFileUpload" />

				<div v-if="!resumeFile" class="flex flex-col items-center space-y-4">
					<div class="p-3 rounded-full bg-muted">
						<DocumentIcon class="h-8 w-8 text-muted-foreground" />
					</div>

					<div class="space-y-2">
						<h3 class="text-base font-medium">Upload your resume</h3>
						<p class="text-sm text-muted-foreground max-w-md mx-auto">
							Drag and drop your resume here or click to browse
						</p>
					</div>

					<Button
						as="label"
						class="cursor-pointer"
						for="fileInput"
						size="sm"
						variant="outline">
						<ArrowUpTrayIcon class="h-4 w-4 mr-2" />
						Select file
					</Button>

					<p class="text-xs text-muted-foreground">Accepted file types: PDF, DOC, DOCX</p>
				</div>

				<div v-else class="flex flex-col items-center space-y-4">
					<div class="p-3 rounded-full bg-primary/10">
						<CheckCircleIcon class="h-8 w-8 text-primary" />
					</div>

					<div class="space-y-1">
						<h3 class="text-base font-medium flex items-center justify-center">
							<PaperClipIcon class="h-4 w-4 mr-1 text-muted-foreground" />
							{{ fileName }}
						</h3>
						<p class="text-sm text-muted-foreground">{{ fileSize }}</p>
					</div>

					<div class="flex space-x-2">
						<Button
							as="label"
							class="cursor-pointer"
							for="fileInput"
							size="sm"
							variant="outline">
							Change file
						</Button>
						<Button size="sm" variant="ghost" @click="removeFile">
							<XCircleIcon class="h-4 w-4 mr-1" />
							Remove
						</Button>
					</div>
				</div>
			</div>

			<!-- Resume Analysis Progress -->
			<div
				v-if="resumeFile && (isAnalyzing || analysisStage !== 'idle')"
				class="space-y-4 border rounded-lg p-4 bg-muted/5">
				<div class="flex items-center justify-between">
					<h3 class="text-sm font-medium flex items-center">
						<ChartBarIcon class="h-4 w-4 mr-2 text-primary" />
						Resume Analysis
					</h3>
					<span
						v-if="analysisStage === 'complete'"
						class="text-xs font-medium text-green-500 flex items-center">
						<CheckCircleIcon class="h-4 w-4 mr-1" />
						Complete
					</span>
					<span
						v-else-if="analysisStage === 'failed'"
						class="text-xs font-medium text-red-500 flex items-center">
						<XCircleIcon class="h-4 w-4 mr-1" />
						Failed
					</span>
					<span v-else class="text-xs font-medium text-amber-500 flex items-center">
						<ClockIcon class="h-4 w-4 mr-1" />
						In Progress
					</span>
				</div>

				<div class="space-y-2">
					<div class="flex justify-between items-center text-xs text-muted-foreground">
						<span>{{ getAnalysisStageLabel(analysisStage) }}</span>
						<span>{{ analysisProgress }}%</span>
					</div>
					<Progress :value="analysisProgress" class="h-2" />
				</div>

				<!-- Analysis Results -->
				<div v-if="analysisStage === 'complete' && analysisResult" class="mt-4 space-y-4">
					<div class="grid grid-cols-2 gap-4 mt-2">
						<div class="bg-muted/20 p-3 rounded-lg text-center">
							<p class="text-xs text-muted-foreground">Match Score</p>
							<p
								:class="[
									'text-xl font-bold',
									getMatchColor(analysisResult.matchPercentage),
								]">
								{{ analysisResult.matchPercentage }}%
							</p>
						</div>

						<div class="bg-muted/20 p-3 rounded-lg text-center">
							<p class="text-xs text-muted-foreground">Overall Rating</p>
							<p class="text-xl font-bold text-primary">
								{{ analysisResult.score }}/100
							</p>
						</div>
					</div>

					<div>
						<h4 class="text-sm font-medium mb-2 flex items-center">
							<DocumentCheckIcon class="h-4 w-4 mr-1 text-muted-foreground" />
							Skills Assessment
						</h4>
						<ul class="space-y-1">
							<li
								v-for="skill in analysisResult.keySkills"
								:key="skill.name"
								class="flex items-center justify-between text-sm p-1 border-b border-muted/40 last:border-0">
								<span>{{ skill.name }}</span>
								<Badge
									:variant="skill.match ? 'success' : 'outline'"
									class="text-xs">
									{{ skill.match ? 'Match' : 'Missing' }}
								</Badge>
							</li>
						</ul>
					</div>

					<div>
						<h4 class="text-sm font-medium mb-2 flex items-center">
							<LightBulbIcon class="h-4 w-4 mr-1 text-amber-400" />
							Recommendation
						</h4>
						<p
							class="text-sm text-muted-foreground bg-muted/10 p-3 rounded border border-muted italic">
							{{ analysisResult.recommendation }}
						</p>
					</div>
				</div>
			</div>

			<!-- Additional form fields could be added here if needed -->
		</CardContent>

		<CardFooter class="pt-2">
			<Button
				:disabled="
					!resumeFile ||
					isUploading ||
					isAnalyzing ||
					analysisStage === 'idle' ||
					analysisStage === 'failed'
				"
				class="w-full"
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
				<span v-else-if="analysisStage === 'complete'">Submit Application</span>
				<span v-else>Waiting for Analysis</span>
			</Button>
		</CardFooter>
	</Card>
</template>
