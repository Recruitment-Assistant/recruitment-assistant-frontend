<script lang="ts" setup>
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import {
	Archive,
	CheckCircle,
	File,
	FileText,
	Image as ImageIcon,
	Music,
	Paperclip,
	Upload,
	Video,
	X,
} from 'lucide-vue-next';
import { formatFileSize } from '@/lib/utils.js';

// Props
const props = defineProps({
	acceptedTypes: {
		type: Array,
		default: () => ['.pdf', '.doc', '.docx'],
	},
	multiple: {
		type: Boolean,
		default: false,
	},
	maxFileSize: {
		type: Number,
		default: 10 * 1024 * 1024, // 10MB
	},
	title: {
		type: String,
		default: 'Upload your files',
	},
	description: {
		type: String,
		default: 'Drag and drop your files here or click to browse',
	},
	className: {
		type: String,
		default: '',
	},
	variant: {
		type: String,
		default: 'default',
		validator: (value) => ['default', 'compact', 'minimal'].includes(value),
	},
});

// Emits
const emit = defineEmits(['file-upload', 'file-remove']);

// Reactive data
const files = ref([]);
const isDragging = ref(false);
const fileInputRef = ref(null);

// Methods
const getFileCategory = (fileName) => {
	const extension = fileName.split('.').pop().toLowerCase();
	if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) return 'image';
	if (['mp4', 'avi', 'mov', 'wmv', 'flv'].includes(extension)) return 'video';
	if (['mp3', 'wav', 'flac', 'aac'].includes(extension)) return 'audio';
	if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) return 'archive';
	if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension)) return 'document';
	return 'file';
};

const getFileIcon = (fileName) => {
	const category = getFileCategory(fileName);

	switch (category) {
		case 'image':
			return ImageIcon;
		case 'video':
			return Video;
		case 'audio':
			return Music;
		case 'archive':
			return Archive;
		case 'document':
			return FileText;
		default:
			return File;
	}
};

const validateFile = (file) => {
	// Check file size
	if (file.size > props.maxFileSize) {
		alert(
			`File "${file.name}" is too large. Maximum size is ${formatFileSize(props.maxFileSize)}.`,
		);
		return false;
	}

	// Check file type
	const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
	if (!props.acceptedTypes.includes(fileExtension)) {
		alert(
			`File type "${fileExtension}" is not supported. Accepted types: ${props.acceptedTypes.join(', ')}`,
		);
		return false;
	}

	return true;
};

const handleFiles = (newFiles) => {
	const validFiles = Array.from(newFiles).filter(validateFile);

	if (validFiles.length === 0) return;

	const processedFiles = validFiles.map((file) => ({
		id: Date.now() + Math.random(),
		file,
		name: file.name,
		size: formatFileSize(file.size),
		category: getFileCategory(file.name),
	}));

	let updatedFiles;
	if (props.multiple) {
		updatedFiles = [...files.value, ...processedFiles];
	} else {
		updatedFiles = processedFiles;
	}

	files.value = updatedFiles;
	emit('file-upload', props.multiple ? updatedFiles : updatedFiles[0]);
};

const handleFileUpload = (event) => {
	const newFiles = event.target.files;
	if (newFiles.length > 0) {
		handleFiles(newFiles);
	}
};

const removeFile = (fileId) => {
	const updatedFiles = files.value.filter((f) => f.id !== fileId);
	files.value = updatedFiles;
	emit('file-remove', fileId);
};

const dragOver = (e) => {
	e.preventDefault();
	isDragging.value = true;
};

const dragLeave = (e) => {
	e.preventDefault();
	isDragging.value = false;
};

const drop = (e) => {
	e.preventDefault();
	isDragging.value = false;
	const droppedFiles = e.dataTransfer.files;
	if (droppedFiles.length > 0) {
		handleFiles(droppedFiles);
	}
};

const openFileDialog = () => {
	fileInputRef.value?.click();
};
</script>

<template>
	<div :class="`space-y-6 ${className}`">
		<!-- Default Variant -->
		<div
			v-if="variant === 'default'"
			:class="`
        border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer
        ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
        ${files.length > 0 ? 'bg-gray-50' : ''}
      `"
			@click="openFileDialog"
			@dragleave="dragLeave"
			@dragover="dragOver"
			@drop="drop">
			<input
				ref="fileInputRef"
				:accept="acceptedTypes.join(',')"
				:multiple="multiple"
				class="hidden"
				type="file"
				@change="handleFileUpload" />

			<!-- Empty State -->
			<div v-if="files.length === 0" class="flex flex-col items-center space-y-4">
				<div class="p-3 rounded-full bg-gray-100">
					<File :size="32" class="text-gray-400" />
				</div>
				<div class="space-y-2">
					<h3 class="text-base font-medium text-gray-900">{{ title }}</h3>
					<p class="text-sm text-gray-500 max-w-md mx-auto">{{ description }}</p>
				</div>
				<Button class="inline-flex items-center" variant="outline">
					<Upload :size="16" class="mr-2" />
					Select {{ multiple ? 'files' : 'file' }}
				</Button>
				<p class="text-xs text-gray-500">
					Accepted types: {{ acceptedTypes.join(', ') }} • Max size:
					{{ formatFileSize(maxFileSize) }}
				</p>
			</div>

			<!-- Files Uploaded State -->
			<div v-else class="space-y-4">
				<div class="p-3 rounded-full bg-green-100 mx-auto w-fit">
					<CheckCircle :size="32" class="text-green-600" />
				</div>
				<div class="space-y-3">
					<div
						v-for="file in files"
						:key="file.id"
						class="flex items-center justify-between p-3 bg-white rounded-lg border">
						<div class="flex items-center space-x-3">
							<component :is="getFileIcon(file.name)" :size="20" />
							<div class="flex-1 min-w-0">
								<p class="text-sm font-medium text-gray-900 flex items-center">
									<Paperclip :size="16" class="mr-1 text-gray-400" />
									{{ file.name }}
								</p>
								<p class="text-sm text-gray-500">{{ file.size }}</p>
							</div>
						</div>
						<Button
							class="p-1 text-gray-400 hover:text-red-500 transition-colors"
							size="sm"
							variant="ghost"
							@click.stop="removeFile(file.id)">
							<X :size="16" />
						</Button>
					</div>
				</div>
				<div class="flex justify-center space-x-3">
					<Button size="sm" variant="outline">
						{{ multiple ? 'Add more files' : 'Change file' }}
					</Button>
				</div>
			</div>
		</div>

		<!-- Compact Variant -->
		<div v-else-if="variant === 'compact'" class="space-y-4">
			<div class="flex items-center space-x-4">
				<Button
					class="flex items-center space-x-2"
					variant="outline"
					@click="openFileDialog">
					<Upload :size="16" />
					<span class="text-sm font-medium">{{ title }}</span>
				</Button>
				<span class="text-xs text-gray-500">
					{{ acceptedTypes.join(', ') }} • Max {{ formatFileSize(maxFileSize) }}
				</span>
			</div>
			<input
				ref="fileInputRef"
				:accept="acceptedTypes.join(',')"
				:multiple="multiple"
				class="hidden"
				type="file"
				@change="handleFileUpload" />
			<div v-if="files.length > 0" class="space-y-2">
				<div
					v-for="file in files"
					:key="file.id"
					class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
					<div class="flex items-center space-x-2">
						<component :is="getFileIcon(file.name)" :size="20" />
						<div class="flex-1 min-w-0">
							<p class="text-sm font-medium text-gray-900 truncate">
								{{ file.name }}
							</p>
							<p class="text-xs text-gray-500">{{ file.size }}</p>
						</div>
					</div>
					<Button
						class="p-1 text-gray-400 hover:text-red-500 transition-colors"
						size="sm"
						variant="ghost"
						@click="removeFile(file.id)">
						<X :size="16" />
					</Button>
				</div>
			</div>
		</div>

		<!-- Minimal Variant -->
		<div v-else-if="variant === 'minimal'">
			<input
				ref="fileInputRef"
				:accept="acceptedTypes.join(',')"
				:multiple="multiple"
				class="hidden"
				type="file"
				@change="handleFileUpload" />
			<Button
				class="text-sm text-blue-600 hover:text-blue-800 underline p-0"
				variant="link"
				@click="openFileDialog">
				{{ files.length > 0 ? 'Change file' : 'Upload file' }}
			</Button>
			<div v-if="files.length > 0" class="mt-2 space-y-1">
				<div
					v-for="file in files"
					:key="file.id"
					class="flex items-center space-x-2 text-sm">
					<component :is="getFileIcon(file.name)" :size="16" />
					<span class="text-gray-700">{{ file.name }}</span>
					<span class="text-gray-500">({{ file.size }})</span>
					<Button
						class="text-red-500 hover:text-red-700 p-0 h-auto"
						size="sm"
						variant="ghost"
						@click="removeFile(file.id)">
						<X :size="12" />
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>
