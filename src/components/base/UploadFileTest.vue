<script lang="ts" setup>
import { CheckCircleIcon, File, Paperclip, Upload, X } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { ref } from 'vue';

const fileUploaded = ref(null);
const fileName = ref('');
const fileSize = ref(0);
const isDragging = ref(false);
const fileInputRef = ref(null);

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
		fileUploaded.value = file;
		fileName.value = file.name;
		fileSize.value = formatFileSize(file.size);

		showToast({
			message: 'Resume uploaded',
			type: 'success',
			description: `${file.name} is ready to submit.`,
		});
	} else {
		showToast({
			message: 'Invalid file type',
			type: 'error',
			description: 'Please upload a PDF, DOC, or DOCX file.',
		});
	}
};

const formatFileSize = (bytes: number): string => {
	if (bytes < 1024) return bytes + ' bytes';
	else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
	else return (bytes / 1048576).toFixed(1) + ' MB';
};

const removeFile = () => {};
</script>

<template>
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
				<File class="h-8 w-8 text-muted-foreground" />
			</div>

			<div class="space-y-2">
				<h3 class="text-base font-medium">Upload your resume</h3>
				<p class="text-sm text-muted-foreground max-w-md mx-auto">
					Drag and drop your resume here or click to browse
				</p>
			</div>

			<Button as="label" class="cursor-pointer" for="fileInput" size="sm" variant="outline">
				<Upload class="h-4 w-4 mr-2" />
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
					<Paperclip class="h-4 w-4 mr-1 text-muted-foreground" />
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
					<X class="h-4 w-4 mr-1" />
					Remove
				</Button>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
