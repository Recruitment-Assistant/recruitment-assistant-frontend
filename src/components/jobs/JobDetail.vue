<script setup lang="ts">
import { ref } from 'vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Job } from '@/types';

const props = defineProps<{
	job: Job;
}>();

const isDragging = ref(false);
const resumeFile = ref<File | null>(null);
const fileName = ref('');

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
	} else {
		// Handle invalid file type
		alert('Please upload a PDF, DOC, or DOCX file.');
	}
};

const submitApplication = () => {
	if (resumeFile.value) {
		// Handle submission logic here
		console.log('Submitting application with file:', resumeFile.value);
		// You would typically call an API here
	}
};
</script>

<template>
	<div class="flex flex-col lg:flex-row gap-6">
		<!-- Left Section: Job Details -->
		<Card class="lg:w-2/3">
			<CardHeader>
				<CardTitle class="text-2xl font-bold">{{ job.title }}</CardTitle>
				<div class="mb-4">
					<Badge variant="secondary">
						{{ job.job_code }}
					</Badge>
				</div>
			</CardHeader>
			<CardContent class="space-y-4">
				<div>
					<h2 class="text-lg font-semibold">Department</h2>
					<p class="text-sm">{{ job.department.name }}</p>
				</div>

				<div>
					<h2 class="text-lg font-semibold">Location</h2>
					<p class="text-sm">
						{{ job.location }}
						<span v-if="job.remote_eligible" class="text-muted-foreground"
						>(Remote Eligible)</span
						>
					</p>
				</div>

				<div>
					<h2 class="text-lg font-semibold">Employment Type</h2>
					<p class="text-sm">{{ job.employment_type.replace('_', ' ').toLowerCase() }}</p>
				</div>

				<div>
					<h2 class="text-lg font-semibold">Salary Range</h2>
					<p class="text-sm">
						{{ job.salary_range?.min.toLocaleString() }} -
						{{ job.salary_range?.max.toLocaleString() }}
						{{ job.salary_range?.currency }} / {{ job.salary_range?.interval }}
					</p>
					<p class="text-sm text-muted-foreground">
						<span v-if="job.salary_range?.bonus_eligible">Bonus Eligible</span>
						<span
							v-if="
								job.salary_range?.bonus_eligible && job.salary_range.equity_offered
							">
							•
						</span>
						<span v-if="job.salary_range?.equity_offered">Equity Offered</span>
					</p>
				</div>

				<div>
					<h2 class="text-lg font-semibold">Description</h2>
					<p class="text-sm">{{ job.description }}</p>
				</div>

				<div>
					<h2 class="text-lg font-semibold">Requirements</h2>
					<p class="text-sm">{{ job.requirements }}</p>
				</div>

				<div>
					<h2 class="text-lg font-semibold">Tags</h2>
					<div class="flex flex-wrap gap-2">
						<Badge v-for="tag in job.tags" :key="tag" variant="outline">
							{{ tag }}
						</Badge>
					</div>
				</div>

				<div>
					<h2 class="text-lg font-semibold">Published</h2>
					<p class="text-sm">{{ new Date(job.published_at).toLocaleDateString() }}</p>
				</div>

				<div>
					<h2 class="text-lg font-semibold">Status</h2>
					<p class="text-sm">{{ job.status.toLowerCase() }}</p>
				</div>

				<div>
					<h2 class="text-lg font-semibold">Created By</h2>
					<div class="flex items-center space-x-2">
						<Avatar>
							<AvatarImage :src="job.created_by_user?.avatar" />
							<AvatarFallback>{{
									job.created_by_user?.name.charAt(0)
								}}
							</AvatarFallback>
						</Avatar>
						<div>
							<p class="text-sm font-medium">{{ job.created_by_user?.name }}</p>
							<p class="text-sm text-muted-foreground">
								{{ job.created_by_user?.email }}
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>

		<!-- Right Section: Drag and Drop Upload -->
		<Card class="lg:w-1/3">
			<CardHeader>
				<CardTitle class="text-xl">Upload Your Resume</CardTitle>
			</CardHeader>
			<CardContent>
				<div
					@dragover.prevent="dragOver"
					@dragleave.prevent="dragLeave"
					@drop.prevent="drop"
					:class="[
						'w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer',
						isDragging ? 'border-primary bg-primary/10' : 'border-border',
					]">
					<input
						type="file"
						accept=".pdf,.doc,.docx"
						@change="handleFileUpload"
						class="hidden"
						id="fileInput" />
					<label for="fileInput" class="cursor-pointer">
						<p class="text-sm text-muted-foreground">
							{{
								fileName ||
								'Drag and drop your resume here or click to upload (PDF, DOC, DOCX)'
							}}
						</p>
					</label>
				</div>
				<Button @click="submitApplication" :disabled="!resumeFile" class="mt-4 w-full">
					Submit Application
				</Button>
			</CardContent>
		</Card>
	</div>
</template>
