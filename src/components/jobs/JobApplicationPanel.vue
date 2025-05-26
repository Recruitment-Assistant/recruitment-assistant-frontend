<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
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
import type { Job } from '@/types';
import { useCustomToast } from '@/lib/customToast.ts';
import UploadField from '@/components/common/UploadField.vue';

const { showToast } = useCustomToast();
const jobStore = useJobStore();
const job = computed<Job | null>(() => jobStore.state.currentJob);

const isUploading = ref(false);
const resumeFile = ref<File | null>(null);
const presetConfig = reactive({
	acceptedTypes: ['.pdf', '.doc', '.docx'],
	title: 'Upload your resume',
	description: 'Drag and drop your resume here or click to browse',
});

const handleFileUpload = (files: any) => {
	resumeFile.value = files.file;
};

const handleFileRemove = (fileId: number) => {
	console.log('File removed:', fileId);
};

const submitApplication = async () => {
	if (!resumeFile.value) return;
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
			<!-- Upload Field -->
			<UploadField
				:multiple="false"
				v-bind="presetConfig"
				@file-upload="handleFileUpload"
				@file-remove="handleFileRemove" />
		</CardContent>

		<CardFooter class="pt-2">
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
